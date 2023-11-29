import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import { Link } from 'react-router-dom'

import { InputNumber, Skeleton, Tooltip } from 'antd'

import {
  DownloadOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  LeftCircleFilled,
  MinusCircleFilled,
  PlusCircleFilled,
  RightCircleFilled
} from '@ant-design/icons'

import { useAppSelector } from '@/redux/hooks'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const WIDTH = 500

export default function Pdf({ url, name }: { url: string; name: string }) {
  const [pageNumber, setPageNumber] = useState(1)
  const [pageNumberInput, setPageNumberInput] = useState<number | ''>(1)
  const [pageNumberFocus, setPageNumberFocus] = useState(false)
  const [numPages, setNumPages] = useState(0)
  const [pageWidth, setPageWidth] = useState(WIDTH)
  const [fullscreen, setFullscreen] = useState(false)

  const darkMode = useAppSelector(state => state.theme.darkMode)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  const lastPage = () => {
    if (pageNumber == 1) {
      return
    }
    const page = pageNumber - 1
    setPageNumber(page)
    setPageNumberInput(page)
  }

  const nextPage = () => {
    if (pageNumber == numPages) {
      return
    }
    const page = pageNumber + 1
    setPageNumber(page)
    setPageNumberInput(page)
  }

  const onPageNumberFocus = () => {
    setPageNumberFocus(true)
  }

  const onPageNumberBlur = () => {
    setPageNumberFocus(false)
    setPageNumberInput(pageNumber)
  }

  const onPageNumberChange = (value: number | '' | null) => {
    if (value == '' || value == null) {
      setPageNumberInput('')
      return
    }
    value = value <= 0 ? 1 : value
    value = value >= numPages ? numPages : value
    setPageNumberInput(value)
  }

  const toPage: React.KeyboardEventHandler<HTMLInputElement> = e => {
    //@ts-expect-error 存在value
    setPageNumber(Number(e.target.value))
  }

  const pageZoomOut = () => {
    if (pageWidth <= WIDTH) {
      return
    }
    const newPageWidth = pageWidth * 0.8
    setPageWidth(newPageWidth)
  }
  const pageZoomIn = () => {
    const newPageWidth = pageWidth * 1.2
    setPageWidth(newPageWidth)
  }

  const pageFullscreen = () => {
    if (fullscreen) {
      setFullscreen(false)
      setPageWidth(WIDTH)
    } else {
      setFullscreen(true)
      setPageWidth(window.screen.width / 1.6)
    }
  }

  return (
    <div
      className='relative w-min p-5 rounded-md mr-6'
      style={{ background: darkMode ? '#333' : '#efefef' }}
    >
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className='w-full'>
            <Skeleton active className='w-96' />
            <Skeleton active className='w-96' />
          </div>
        }
        className='w-min'
      >
        <Page
          pageNumber={pageNumber}
          width={pageWidth}
          renderTextLayer={false}
          className='w-min'
        />
      </Document>
      {numPages > 0 && (
        <div
          className='absolute bottom-16 flex items-center justify-center space-x-1 left-1/2 transform -translate-x-1/2 w-fit p-1 rounded-md'
          style={{ background: darkMode ? '#333' : '#efefef' }}
        >
          <Tooltip title={pageNumber == 1 ? '已是第一页' : '上一页'}>
            <LeftCircleFilled onClick={lastPage} />
          </Tooltip>
          <InputNumber
            value={pageNumberFocus ? pageNumberInput : pageNumber}
            onFocus={onPageNumberFocus}
            onBlur={onPageNumberBlur}
            onChange={onPageNumberChange}
            onPressEnter={toPage}
            controls={false}
            className='w-8'
          />{' '}
          / {numPages}
          <Tooltip title={pageNumber == numPages ? '已是最后一页' : '下一页'}>
            <RightCircleFilled onClick={nextPage} />
          </Tooltip>
          <Tooltip title='放大'>
            <PlusCircleFilled onClick={pageZoomIn} />
          </Tooltip>
          <Tooltip title='缩小'>
            <MinusCircleFilled onClick={pageZoomOut} />
          </Tooltip>
          <Tooltip title={fullscreen ? '恢复默认' : '适合窗口'}>
            {fullscreen ? (
              <FullscreenExitOutlined onClick={pageFullscreen} />
            ) : (
              <FullscreenOutlined onClick={pageFullscreen} />
            )}
          </Tooltip>
          <Tooltip title='下载'>
            <Link to={url} className='text-current hover:text-current'>
              <DownloadOutlined />
            </Link>
          </Tooltip>
        </div>
      )}
      <h3 className='text-center mt-2'>{name}</h3>
    </div>
  )
}
