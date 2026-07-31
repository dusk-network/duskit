import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { allOf, hasKeyValue, isInstanceOf, skipIn } from "lamb";

import { HttpTransport } from "../..";

/** @typedef {{ bar: string, foo: number }} TestData */

describe("HttpTransport", () => {
  /** @type {TestData} */
  const data = { bar: "baz", foo: 2 };
  const fetchSpy = vi
    .spyOn(global, "fetch")
    .mockImplementation(async () => Response.json(data, { statusText: "OK" }));
  const baseOptions = {
    baseURL: "https://api.example.com/",
    headers: {
      Accept: "application/json",
      "X-Api-Key": "12345",
    },
  };

  afterEach(() => {
    fetchSpy.mockClear();
  });

  afterAll(() => {
    fetchSpy.mockRestore();
  });

  describe("Initialization and URL/Header Handling", () => {
    const urlTestCases = [
      {
        baseURL: "https://api.example.com/",
        description: "baseURL with slash, endpoint without slash",
        endpoint: "users",
      },
      {
        baseURL: "https://api.example.com",
        description: "baseURL without slash, endpoint without slash",
        endpoint: "users",
      },
      {
        baseURL: "https://api.example.com/",
        description: "baseURL with slash, endpoint with slash",
        endpoint: "/users",
      },
      {
        baseURL: "https://api.example.com",
        description: "baseURL without slash, endpoint with slash",
        endpoint: "/users",
      },
      {
        baseURL: "https://api.example.com/v1/",
        description: "baseURL with path and slash, endpoint without slash",
        endpoint: "users",
      },
      {
        baseURL: "https://api.example.com/v1",
        description:
          "baseURL with path and without slash, endpoint without slash",
        endpoint: "users",
      },
      {
        baseURL: "https://api.example.com/v1/",
        description: "baseURL with path and slash, endpoint with slash",
        endpoint: "/users",
      },
      {
        baseURL: "https://api.example.com/v1",
        description: "baseURL with path and without slash, endpoint with slash",
        endpoint: "/users",
      },
    ];

    it.each(urlTestCases)(
      "should correctly construct URL and pass initial headers for: $description",
      async ({ baseURL, endpoint }) => {
        const expectedUrl = baseURL.includes("/v1")
          ? "https://api.example.com/v1/users"
          : "https://api.example.com/users";
        const headers = baseOptions.headers;
        const transport = new HttpTransport({ baseURL, headers });

        const result = await transport.get(endpoint).then((r) => r.json());

        expect(fetchSpy).toHaveBeenCalledTimes(1);
        expect(result).toStrictEqual(data);

        const [calledUrl, fetchOptions] = /** @type {[URL, RequestInit]} */ (
          fetchSpy.mock.calls[0]
        );
        const requestHeaders = /** @type {Headers} */ (fetchOptions.headers);

        expect(calledUrl.href).toBe(expectedUrl);
        expect(requestHeaders).toBeInstanceOf(Headers);
        expect(requestHeaders.get("Accept")).toBe(headers.Accept);
        expect(requestHeaders.get("X-Api-Key")).toBe(headers["X-Api-Key"]);
      }
    );

    it("should use a custom fetch implementation when provided", async () => {
      const customFetch = vi.fn(async () => Response.json(data));
      const transport = new HttpTransport({
        ...baseOptions,
        fetch: customFetch,
      });

      const result = await transport
        .get("users")
        .then((response) => response.json());

      expect(result).toStrictEqual(data);
      expect(customFetch).toHaveBeenCalledExactlyOnceWith(
        new URL("https://api.example.com/users"),
        expect.objectContaining({ method: "GET" })
      );
      expect(fetchSpy).not.toHaveBeenCalled();
    });
  });

  describe("Request Methods", () => {
    /** @type {["delete", "get", "head"]} */
    const methodsWithoutBody = ["delete", "get", "head"];

    /** @type {["patch", "post", "put"]} */
    const methodsWithBody = ["patch", "post", "put"];

    const params1 = { active: true, userId: 123 };
    const params2 = new URLSearchParams({ active: "true", userId: "123" });
    const expectedUrl = `${baseOptions.baseURL}some-endpoint`;
    const expectedParamsUrl = `${expectedUrl}?active=true&userId=123`;

    it.each(methodsWithoutBody)(
      'should perform a "%s" request and support search params and an `AbortSignal`',
      async (method) => {
        const transport = new HttpTransport(baseOptions);
        const controller = new AbortController();

        await transport[method]("some-endpoint", undefined, {
          signal: controller.signal,
        });

        expect(fetchSpy).toHaveBeenCalledTimes(1);

        let [fetchUrl, fetchOptions] = fetchSpy.mock.calls[0];

        expect(fetchUrl.toString()).toBe(expectedUrl);
        expect(fetchOptions?.method).toBe(method.toUpperCase());
        expect(fetchOptions?.body).toBeUndefined();
        expect(fetchOptions?.signal).toBe(controller.signal);

        await transport[method]("some-endpoint", params1);

        expect(fetchSpy).toHaveBeenCalledTimes(2);

        [fetchUrl, fetchOptions] = fetchSpy.mock.calls[1];

        expect(fetchUrl.toString()).toBe(expectedParamsUrl);
        expect(fetchOptions?.method).toBe(method.toUpperCase());
        expect(fetchOptions?.body).toBeUndefined();

        await transport[method]("some-endpoint", params2);

        expect(fetchSpy).toHaveBeenCalledTimes(3);

        [fetchUrl, fetchOptions] = fetchSpy.mock.calls[2];

        expect(fetchUrl.toString()).toBe(expectedParamsUrl);
        expect(fetchOptions?.method).toBe(method.toUpperCase());
        expect(fetchOptions?.body).toBeUndefined();
      }
    );

    it.each(methodsWithBody)(
      'should perform a "%s" request with a JSON body and support search params and an `AbortSignal`',
      async (method) => {
        const transport = new HttpTransport(baseOptions);
        const controller = new AbortController();
        const body = { message: "hello" };

        await transport[method]("some-endpoint", undefined, body, {
          signal: controller.signal,
        });

        expect(fetchSpy).toHaveBeenCalledTimes(1);

        let [fetchUrl, fetchOptions] = fetchSpy.mock.calls[0];

        expect(fetchUrl.toString()).toBe(expectedUrl);
        expect(fetchOptions?.method).toBe(method.toUpperCase());
        expect(fetchOptions?.body).toBe(JSON.stringify(body));
        expect(fetchOptions?.signal).toBe(controller.signal);

        await transport[method]("some-endpoint", params1, body);

        expect(fetchSpy).toHaveBeenCalledTimes(2);

        [fetchUrl, fetchOptions] = fetchSpy.mock.calls[1];

        expect(fetchUrl.toString()).toBe(expectedParamsUrl);
        expect(fetchOptions?.method).toBe(method.toUpperCase());
        expect(fetchOptions?.body).toBe(JSON.stringify(body));

        await transport[method]("some-endpoint", params2, body);

        expect(fetchSpy).toHaveBeenCalledTimes(3);

        [fetchUrl, fetchOptions] = fetchSpy.mock.calls[2];

        expect(fetchUrl.toString()).toBe(expectedParamsUrl);
        expect(fetchOptions?.method).toBe(method.toUpperCase());
        expect(fetchOptions?.body).toBe(JSON.stringify(body));
      }
    );

    it("should not pass `undefined` keys in `fetch`'s options", async () => {
      const transport = new HttpTransport(baseOptions);
      const body = { message: "hello" };
      const controller = new AbortController();

      // GET request (no body and no signal provided)
      await transport.get("some-endpoint");

      const getOptions = fetchSpy.mock.calls[0][1];

      expect(getOptions).not.toHaveProperty("body");
      expect(getOptions).not.toHaveProperty("signal");

      // POST request (with body, but no signal provided)
      await transport.post("some-endpoint", undefined, body);

      const postOptions = fetchSpy.mock.calls[1][1];

      expect(postOptions).toHaveProperty("body", JSON.stringify(body));
      expect(postOptions).not.toHaveProperty("signal");

      // GET request (no body, but with a signal provided)
      await transport.get("some-endpoint", undefined, {
        signal: controller.signal,
      });

      const getWithOptions = fetchSpy.mock.calls[2][1];

      expect(getWithOptions).not.toHaveProperty("body");
      expect(getWithOptions).toHaveProperty("signal", controller.signal);
    });
  });

  describe("Response and Error Transformers", () => {
    it("should return the raw Response object with the default transformer", async () => {
      const response = new Response("raw body");

      fetchSpy.mockResolvedValueOnce(response);

      const transport = new HttpTransport(baseOptions);
      const result = await transport.get("raw");

      expect(result).toBeInstanceOf(Response);
      expect(await result.text()).toBe("raw body");
    });

    it("should use a custom responseTransformer to parse data", async () => {
      const transport = new HttpTransport({
        ...baseOptions,
        responseTransformer: (r) => r.json(),
      });
      const result = await transport.get("data");

      expect(result).toStrictEqual(data);
    });

    it("should reject the promise if fetch fails (default behavior)", async () => {
      const networkError = new Error("Failed to fetch");

      fetchSpy.mockRejectedValueOnce(networkError);

      const transport = new HttpTransport(baseOptions);

      await expect(transport.get("bad-endpoint")).rejects.toThrow(networkError);
    });

    it("should handle errors and return a value with a custom errorTransformer", async () => {
      const requestError = "Failed to fetch";

      fetchSpy.mockRejectedValueOnce(requestError);

      const transport = new HttpTransport({
        ...baseOptions,
        errorTransformer: (reason) => Promise.reject(new Error(String(reason))),
      });

      await expect(transport.get("some-endpoint")).rejects.toThrow(
        expect.toSatisfy(
          allOf([isInstanceOf(Error), hasKeyValue("message", requestError)])
        )
      );
    });

    it("should accept an error transformer that transforms the error in the same format of the response transformer", async () => {
      const requestError = new Error("Failed to fetch");

      /** @typedef {{ success: boolean, value: Response | Error }} Result */

      /** @type {(reason: any) => Result} */
      const errorTransformer = (reason) => ({
        success: false,
        value: reason,
      });

      /** @type {(res: Response) => Result} */
      const responseTransformer = (res) => ({ success: true, value: res });

      fetchSpy.mockRejectedValueOnce(requestError);

      const transport = new HttpTransport({
        ...baseOptions,
        errorTransformer,
        responseTransformer,
      });

      const result = await transport.get("some-endpoint");

      expect(result).toStrictEqual({
        success: false,
        value: requestError,
      });
    });
  });

  describe("Header Management", () => {
    const objectHeaders = {
      accept: null,
      "x-api-key": "67890",
      "x-request-id": "abc-987",
    };
    const arrayHeaders = Object.entries(objectHeaders);
    const headers = new Headers(skipIn(objectHeaders, ["accept"]));
    const headerCases = [
      {
        type: "plain object",
        value: objectHeaders,
      },
      {
        type: "array of arrays",
        value: arrayHeaders,
      },
      {
        type: "Headers instance",
        value: headers,
      },
    ];

    it.each(headerCases)(
      "should merge per-request headers passed as a $type (add, replace, delete)",
      async ({ type, value }) => {
        const transport = new HttpTransport(baseOptions);

        await transport.get("data", undefined, { headers: value });

        const requestHeaders = /** @type {Headers} */ (
          fetchSpy.mock.calls[0][1]?.headers
        );

        expect(fetchSpy).toHaveBeenCalledTimes(1);
        expect(requestHeaders.get("x-request-id")).toBe("abc-987");
        expect(requestHeaders.get("x-api-key")).toBe("67890");
        expect(requestHeaders.has("accept")).toBe(type === "Headers instance");
      }
    );

    it("should append header values with appendHeader", async () => {
      const transport = new HttpTransport(baseOptions);

      transport.appendHeader("Accept", "application/xml");

      await transport.get("data");

      const requestHeaders = /** @type {Headers} */ (
        fetchSpy.mock.calls[0][1]?.headers
      );

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(requestHeaders.get("Accept")).toBe(
        "application/json, application/xml"
      );
    });

    it("should allow chaining of header manipulation methods", async () => {
      const transport = new HttpTransport(baseOptions);

      transport
        .setHeader("X-Chained-Header", "true")
        .appendHeader("Accept", "text/plain")
        .deleteHeader("X-Api-Key");

      await transport.get("data");

      const requestHeaders = /** @type {Headers} */ (
        fetchSpy.mock.calls[0][1]?.headers
      );

      expect(requestHeaders.get("X-Chained-Header")).toBe("true");
      expect(requestHeaders.get("Accept")).toBe("application/json, text/plain");
      expect(requestHeaders.has("X-Api-Key")).toBe(false);
    });
  });

  /** @see https://github.com/dusk-network/duskit/issues/176 */
  describe("Type correctness for async transformers", () => {
    const methods = /** @type {const} */ ([
      "delete",
      "get",
      "head",
      "patch",
      "post",
      "put",
    ]);

    it.each(methods)(
      "should allow casting to a flattened `Promise<TestData>` for async transformers using method '%s'",
      async (method) => {
        /** @type {import('../..').HttpTransportOptions<(r: Response) => Promise<TestData>>} */
        const options = {
          ...baseOptions,
          responseTransformer: async (r) => r.json(),
        };
        const transport = new HttpTransport(options);

        /**
         * This only tests that the type returned by
         * an async transformer is flattened by TS:
         * there is no effect on the JS test at all.
         * If the `get` return type wasn't `Awaited`
         * we would have a TS error here because the type
         * would have been `Promise<Promise<TestData>>`.
         *
         * @type {Promise<TestData>}
         */
        const result = transport[method]("test-endpoint");

        await expect(result).resolves.toStrictEqual(data);
      }
    );
  });
});
