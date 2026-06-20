export type EndpointSpec = Record<string, { request: unknown; response: unknown }>;
export type RequestFor<E extends EndpointSpec, K extends keyof E> = E[K]["request"];
export type ResponseFor<E extends EndpointSpec, K extends keyof E> = E[K]["response"];
export type Client<E extends EndpointSpec> = {
  request<K extends keyof E>(key: K, input: RequestFor<E, K>): Promise<ResponseFor<E, K>>;
};
