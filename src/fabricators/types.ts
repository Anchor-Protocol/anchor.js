export type Expire =
  | { at_height: number }
  | { at_time: number }
  // eslint-disable-next-line @typescript-eslint/ban-types
  | { never: {} };
