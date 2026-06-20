package drill

type Result[T any] struct {
  Value T
  Err   error
}

func Ok[T any](value T) Result[T] {
  // TODO: create successful result.
  return Result[T]{}
}

func Err[T any](err error) Result[T] {
  // TODO: create failed result.
  return Result[T]{}
}

func MapResult[T any, U any](result Result[T], fn func(T) U) Result[U] {
  // TODO: map success and preserve errors.
  return Result[U]{}
}
