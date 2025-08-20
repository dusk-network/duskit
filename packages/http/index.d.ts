/**
 * Transforms a `Response` into a `Promise` that resolves
 * with the `Response` itself if its status is ok, and
 * rejects with an `Error` otherwise.
 */
export declare function failureToRejection(
  response: Response
): Promise<Response>;

export declare class HttpTransport<
  RTransformer extends HttpTransportResponseTransformer = (
    r: Response
  ) => Response,
  ETransformer extends HttpTransportErrorTransformer = (
    reason: unknown
  ) => never,
> {
  constructor(options: HttpTransportOptions<RTransformer, ETransformer>);

  /**
   * Appends a value to an existing HTTP Header or creates the
   * header if doesn't exist.
   *
   * @type {HttpTransportType<T>["appendHeader"]}
   */
  appendHeader(
    name: string,
    value: string
  ): HttpTransport<RTransformer, ETransformer>;

  /**
   * Performs a DELETE request.
   * Headers passed in the options will be merged
   * with the transport headers for this call.
   * Note that:
   * - existing header values will be replaced (not appended)
   * - setting an header value to `null` or `undefined`
   *   will delete the corresponding header, if present
   */
  delete(
    endpoint: string,
    params?: HttpTransportSearchParams,
    options?: HttpTransportRequestOptions
  ): Promise<Awaited<ReturnType<RTransformer> | ReturnType<ETransformer>>>;

  /**
   * Deletes an HTTP header.
   */
  deleteHeader(name: string): HttpTransport<RTransformer, ETransformer>;

  /**
   * Performs a GET request.
   * Headers passed in the options will be merged
   * with the transport headers for this call.
   * Note that:
   * - existing header values will be replaced (not appended)
   * - setting an header value to `null` or `undefined`
   *   will delete the corresponding header, if present
   */
  get(
    endpoint: string,
    params?: HttpTransportSearchParams,
    options?: HttpTransportRequestOptions
  ): Promise<Awaited<ReturnType<RTransformer> | ReturnType<ETransformer>>>;

  /**
   * Performs a HEAD request.
   * Headers passed in the options will be merged
   * with the transport headers for this call.
   * Note that:
   * - existing header values will be replaced (not appended)
   * - setting an header value to `null` or `undefined`
   *   will delete the corresponding header, if present
   */
  head(
    endpoint: string,
    params?: HttpTransportSearchParams,
    options?: HttpTransportRequestOptions
  ): Promise<Awaited<ReturnType<RTransformer> | ReturnType<ETransformer>>>;

  /**
   * Performs a PATCH request.
   * Headers passed in the options will be merged
   * with the transport headers for this call.
   * Note that:
   * - existing header values will be replaced (not appended)
   * - setting an header value to `null` or `undefined`
   *   will delete the corresponding header, if present
   */
  patch(
    endpoint: string,
    params?: HttpTransportSearchParams,
    body?: HttpTransportBody | null,
    options?: HttpTransportRequestOptions
  ): Promise<Awaited<ReturnType<RTransformer> | ReturnType<ETransformer>>>;

  /**
   * Performs a POST request.
   * Headers passed in the options will be merged
   * with the transport headers for this call.
   * Note that:
   * - existing header values will be replaced (not appended)
   * - setting an header value to `null` or `undefined`
   *   will delete the corresponding header, if present
   */
  post(
    endpoint: string,
    params?: HttpTransportSearchParams,
    body?: HttpTransportBody | null,
    options?: HttpTransportRequestOptions
  ): Promise<Awaited<ReturnType<RTransformer> | ReturnType<ETransformer>>>;

  /**
   * Performs a PUT request.
   * Headers passed in the options will be merged
   * with the transport headers for this call.
   * Note that:
   * - existing header values will be replaced (not appended)
   * - setting an header value to `null` or `undefined`
   *   will delete the corresponding header, if present
   */
  put(
    endpoint: string,
    params?: HttpTransportSearchParams,
    body?: HttpTransportBody | null,
    options?: HttpTransportRequestOptions
  ): Promise<Awaited<ReturnType<RTransformer> | ReturnType<ETransformer>>>;

  /**
   * Sets or replace a HTTP header.
   */
  setHeader(
    name: string,
    value: string
  ): HttpTransport<RTransformer, ETransformer>;
}

export declare type HttpTransportBody = Record<string, any> | BodyInit;

export declare type HttpTransportErrorTransformer = (reason: unknown) => any;

/**
 * Extension of the standard `HeadersInit`, allowing `null` or
 * `undefined` in the array and object formats to signal temporary
 * header deletion while performing a single request.
 */
export declare type HttpTransportHeadersInit =
  | [string, string | undefined | null][]
  | Record<string, string | undefined | null>
  | Headers;

export declare type HttpTransportOptions<
  Transfomer extends HttpTransportResponseTransformer = (
    r: Response
  ) => Response,
  ETransformer extends HttpTransportErrorTransformer = (
    reason: unknown
  ) => never,
> = {
  baseURL: string;
  errorTransformer?: ETransformer;
  headers?: HeadersInit;
  responseTransformer?: Transfomer;
};

export declare type HttpTransportRequestOptions = {
  headers?: HttpTransportHeadersInit | HeadersInit;
  signal?: AbortSignal;
};

export declare type HttpTransportResponseTransformer = (r: Response) => any;

export declare type HttpTransportSearchParams =
  | Record<string, any>
  | URLSearchParams;
