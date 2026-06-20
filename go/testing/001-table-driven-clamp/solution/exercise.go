package drill

func Clamp(value, min, max int) int {
  if min > max {
    min, max = max, min
  }
  if value < min {
    return min
  }
  if value > max {
    return max
  }
  return value
}
