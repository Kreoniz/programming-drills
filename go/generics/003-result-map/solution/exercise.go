package drill

type Result[T any] struct {
  Value T
  Err   error
}

func Ok[T any](value T) Result[T] {
  return Result[T]{Value: value}
}

func Err[T any](err error) Result[T] {
  return Result[T]{Err: err}
}

func MapResult[T any, U any](result Result[T], fn func(T) U) Result[U] {
  if result.Err != nil {
    return Result[U]{Err: result.Err}
  }
  return Ok(fn(result.Value))
}
