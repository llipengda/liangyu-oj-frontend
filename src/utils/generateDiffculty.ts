const generateDiffculty = (difficulty: number) => {
  switch (true) {
    case difficulty <= 3:
      return ['EASY', 'green']
    case difficulty <= 6:
      return ['MEDIUM', 'orange']
    case difficulty <= 9:
      return ['HARD', 'red']
    default:
      return ['UNKNOWN', 'grey']
  }
}

export default generateDiffculty
