import React, { useState } from 'react'

import { Skeleton } from 'antd'

import PdfApi from '@/api/Pdf'
import { useAppSelector } from '@/redux/hooks'
import { PdfData } from '@/types/Pdf'

import Pdf from './Pdf'

type Props = {
  chapter: string
  index: number
}

export default function Chapter({ chapter, index }: Props) {
  const darkMode = useAppSelector(state => state.theme.darkMode)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<PdfData[] | null>(null)

  const handleOpen = async () => {
    setOpen(open => !open)
    if (!data) {
      const res = await PdfApi.get(index)
      setData(res)
      setLoading(false)
    }
  }

  return (
    <div className='cursor-pointer'>
      <h2
        style={{ background: darkMode ? '#222' : '#e5e5e5' }}
        onClick={handleOpen}
        className='p-2 px-6 mt-4 rounded-md'
      >
        {chapter}
      </h2>
      {open && (
        <Skeleton loading={loading} active>
          <div className='flex flex-wrap'>
            {data?.map((pdf, index) => (
              <div key={index} className='mt-5'>
                <Pdf url={pdf.address} name={pdf.sectionName} />
              </div>
            ))}
          </div>
        </Skeleton>
      )}
    </div>
  )
}
