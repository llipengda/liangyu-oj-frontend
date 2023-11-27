export type Problem = {
  id: number
  createTime: string
  deleteTime: string
  title: string
  chapter: number
  description: string
  reservedCode: string
  input: string
  output: string
  sampleInput: string
  sampleOutput: string
  hint: string
  timeLimit: number
  memoryLimit: number
  accepted: number
  submitted: number
}

export type TryProblemResult = {
  status: 'AC' | 'WA' | 'TLE' | 'MLE' | 'RE' | 'CE'
  message: string
  time: number
}
