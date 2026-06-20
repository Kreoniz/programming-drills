package drill

func MapSlice[T any, U any](values []T, fn func(T) U) []U {
  out := make([]U, 0, len(values))
  for _, value := range values {
    out = append(out, fn(value))
  }
  return out
}

func FilterSlice[T any](values []T, keep func(T) bool) []T {
  out := make([]T, 0, len(values))
  for _, value := range values {
    if keep(value) {
      out = append(out, value)
    }
  }
  return out
}
