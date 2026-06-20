type SegmentParam<Segment extends string> =
  Segment extends `:${infer Name}` ? { [K in Name]: string } : {};

export type RouteParams<Path extends string> =
  string extends Path
    ? Record<string, string>
    : Path extends `${infer Head}/${infer Rest}`
      ? SegmentParam<Head> & RouteParams<Rest>
      : SegmentParam<Path>;
