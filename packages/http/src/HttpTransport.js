import { identity, isNil, isType } from "lamb";

/** @import {HttpTransport as HttpTransportType} from ".." */

/** @typedef {import("..").HttpTransportBody} HttpTransportBody */
/** @typedef {import("..").HttpTransportErrorTransformer} HttpTransportErrorTransformer */
/** @typedef {import("..").HttpTransportHeadersInit} HttpTransportHeadersInit */
/** @typedef {import("..").HttpTransportRequestOptions} HttpTransportRequestOptions */
/** @typedef {import("..").HttpTransportResponseTransformer} HttpTransportResponseTransformer */
/** @typedef {import("..").HttpTransportSearchParams} HttpTransportSearchParams */

/** @type {(v: any) => v is Record<string, any>} */
const isObject = isType("Object");

/**
 * @param {Headers} commonHeaders
 * @param {HttpTransportHeadersInit} userHeaders
 * @returns {Headers}
 */
function mergeHeaders(commonHeaders, userHeaders) {
  const result = new Headers(commonHeaders);
  const entries =
    userHeaders instanceof Headers
      ? userHeaders.entries()
      : Array.isArray(userHeaders)
        ? userHeaders
        : Object.entries(userHeaders);

  for (const [key, value] of entries) {
    if (isNil(value)) {
      result.delete(key);
    } else {
      result.set(key, value);
    }
  }

  return result;
}

/**
 * @template {HttpTransportResponseTransformer} T
 * @implements {HttpTransportType<T>}
 */
class HttpTransport {
  /** @param {import("..").HttpTransportOptions<T>} options */
  constructor(options) {
    const { baseURL, headers, errorTransformer, responseTransformer } = options;

    this.#baseURL = baseURL.endsWith("/") ? baseURL : `${baseURL}/`;
    this.#headers = new Headers(headers);
    this.#errorTransformer = errorTransformer;
    this.#responseTransformer = responseTransformer ?? identity;
  }

  /** @type {string} */
  #baseURL;

  /** @type {HttpTransportErrorTransformer | undefined} */
  #errorTransformer;

  /** @type {Headers} */
  #headers;

  /** @type {HttpTransportResponseTransformer} */
  #responseTransformer;

  /**
   * @param {"DELETE" | "GET" | "HEAD" | "PATCH" | "POST" | "PUT"} method
   * @param {string} endpoint
   * @param {HttpTransportSearchParams} [params]
   * @param {HttpTransportBody?} [body]
   * @param {HttpTransportRequestOptions} [options]
   */
  async #fetch(method, endpoint, params, body, options = {}) {
    endpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;

    const { headers, signal } = options;
    const url = new URL(endpoint, this.#baseURL);

    if (params) {
      url.search = new URLSearchParams(params).toString();
    }

    const result = fetch(url, {
      body: isObject(body) ? JSON.stringify(body) : body,
      headers: headers ? mergeHeaders(this.#headers, headers) : this.#headers,
      method,
      signal,
    }).then(this.#responseTransformer);

    return this.#errorTransformer
      ? result.catch(this.#errorTransformer)
      : result;
  }

  /** @type {HttpTransportType<T>["appendHeader"]} */
  appendHeader(name, value) {
    this.#headers.append(name, value);

    return this;
  }

  /** @type {HttpTransportType<T>["delete"]} */
  delete(endpoint, params, options) {
    return this.#fetch("DELETE", endpoint, params, undefined, options);
  }

  /** @type {HttpTransportType<T>["deleteHeader"]} */
  deleteHeader(name) {
    this.#headers.delete(name);

    return this;
  }

  /** @type {HttpTransportType<T>["get"]} */
  get(endpoint, params, options) {
    return this.#fetch("GET", endpoint, params, undefined, options);
  }

  /** @type {HttpTransportType<T>["head"]} */
  head(endpoint, params, options) {
    return this.#fetch("HEAD", endpoint, params, undefined, options);
  }

  /** @type {HttpTransportType<T>["patch"]} */
  patch(endpoint, params, body, options) {
    return this.#fetch("PATCH", endpoint, params, body, options);
  }

  /** @type {HttpTransportType<T>["post"]} */
  post(endpoint, params, body, options) {
    return this.#fetch("POST", endpoint, params, body, options);
  }

  /** @type {HttpTransportType<T>["put"]} */
  put(endpoint, params, body, options) {
    return this.#fetch("PUT", endpoint, params, body, options);
  }

  /** @type {HttpTransportType<T>["setHeader"]} */
  setHeader(name, value) {
    this.#headers.set(name, value);

    return this;
  }
}

export default HttpTransport;
