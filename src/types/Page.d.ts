export type Page<T> = {
  pageNum: number
  pageSize: number
  total: number
  pages: number
  list: T[]
}
