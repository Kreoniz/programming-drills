package drill

import "sync"

type indexedJob struct {
  index int
  value int
}

func ProcessJobs(jobs []int, workers int, fn func(int) int) []int {
  if workers < 1 {
    workers = 1
  }
  in := make(chan indexedJob)
  out := make([]int, len(jobs))
  var wg sync.WaitGroup
  for i := 0; i < workers; i++ {
    wg.Add(1)
    go func() {
      defer wg.Done()
      for job := range in {
        out[job.index] = fn(job.value)
      }
    }()
  }
  for i, value := range jobs {
    in <- indexedJob{index: i, value: value}
  }
  close(in)
  wg.Wait()
  return out
}
