import axios from 'axios'

import { PdfData } from '@/types/Pdf'
import { Result } from '@/types/Result'

const get = async (chapter: number) => {
  const data = await axios.get<Result<PdfData[]>>('/pdf/get', {
    params: { id: chapter }
  })
  return data.data.data
}

const PdfApi = {
  get
}

export default PdfApi
