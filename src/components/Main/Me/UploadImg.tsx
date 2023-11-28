import { useState } from 'react'

import { UploadProps } from 'antd'
import Upload, { UploadChangeParam, UploadFile } from 'antd/es/upload'

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

import UserApi from '@/api/User'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setUserAvatar } from '@/redux/slice/userSlice'

export default function UploadImg() {
  const user = useAppSelector(state => state.user.user)
  const dispatch = useAppDispatch()

  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>(user.avatar || '')

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile<string>>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      setLoading(false)
      const url = info.file.response
      if (!url) {
        return
      }
      setImageUrl(url)
      dispatch(setUserAvatar(url))
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className='mt-2'>上传</div>
    </div>
  )

  return (
    <div>
      <Upload
        name='avatar'
        listType='picture-card'
        showUploadList={false}
        onChange={handleChange}
        customRequest={async ({ file, onSuccess }) => {
          const data = await UserApi.upload(file as File)
          onSuccess?.(data)
        }}
      >
        {imageUrl ? (
          <img src={imageUrl} alt='avatar' className='w-full h-fit' />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  )
}
