package drill

func ParallelSum(nums []int, workers int) int {
  if workers < 1 {
    workers = 1
  }
  if workers > len(nums) && len(nums) > 0 {
    workers = len(nums)
  }
  if len(nums) == 0 {
    return 0
  }
  results := make(chan int, workers)
  chunk := (len(nums) + workers - 1) / workers
  launched := 0
  for start := 0; start < len(nums); start += chunk {
    end := start + chunk
    if end > len(nums) {
      end = len(nums)
    }
    launched++
    go func(part []int) {
      sum := 0
      for _, n := range part {
        sum += n
      }
      results <- sum
    }(nums[start:end])
  }
  total := 0
  for i := 0; i < launched; i++ {
    total += <-results
  }
  return total
}
