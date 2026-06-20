package drill

func MapSlice[T any, U any](values []T, fn func(T) U) []U {
  // TODO: map each value.
  return nil
}

func FilterSlice[T any](values []T, keep func(T) bool) []T {
  // TODO: keep matching values.
  return nil
}
