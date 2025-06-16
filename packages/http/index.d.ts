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

  appendHeader(
    name: string,
    value: string
  ): HttpTransport<RTransformer, ETransformer>;

  delete(
    endpoint: string,
    params?: HttpTransportSearchParams,
    options?: HttpTransportRequestOptions
  ): Promise<ReturnType<RTransformer> | ReturnType<ETransformer>>;

  deleteHeader(name: string): HttpTransport<RTransformer, ETransformer>;

  get(
    endpoint: string,
    params?: HttpTransportSearchParams,
    options?: HttpTransportRequestOptions
  ): Promise<ReturnType<RTransformer> | ReturnType<ETransformer>>;

  head(
    endpoint: string,
    params?: HttpTransportSearchParams,
    options?: HttpTransportRequestOptions
  ): Promise<ReturnType<RTransformer> | ReturnType<ETransformer>>;

  patch(
    endpoint: string,
    params?: HttpTransportSearchParams,
    body?: HttpTransportBody | null,
    options?: HttpTransportRequestOptions
  ): Promise<ReturnType<RTransformer> | ReturnType<ETransformer>>;

  post(
    endpoint: string,
    params?: HttpTransportSearchParams,
    body?: HttpTransportBody | null,
    options?: HttpTransportRequestOptions
  ): Promise<ReturnType<RTransformer> | ReturnType<ETransformer>>;

  put(
    endpoint: string,
    params?: HttpTransportSearchParams,
    body?: HttpTransportBody | null,
    options?: HttpTransportRequestOptions
  ): Promise<ReturnType<RTransformer> | ReturnType<ETransformer>>;

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
  headers?: HttpTransportHeadersInit;
  signal?: AbortSignal;
};

export declare type HttpTransportResponseTransformer = (r: Response) => any;

export declare type HttpTransportSearchParams =
  | Record<string, any>
  | URLSearchParams;
