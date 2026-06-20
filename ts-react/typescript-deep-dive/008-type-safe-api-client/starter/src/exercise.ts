export type EndpointSpec = Record<string, { request: unknown; response: unknown }>;
export type RequestFor<E extends EndpointSpec, K extends keyof E> = unknown; // TODO
export type ResponseFor<E extends EndpointSpec, K extends keyof E> = unknown; // TODO
export type Client<E extends EndpointSpec> = {
  request<K extends keyof E>(key: K, input: unknown): Promise<unknown>; // TODO
};
