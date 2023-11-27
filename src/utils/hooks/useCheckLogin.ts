import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setOpenLogin } from '@/redux/slice/loginSlice'

const useCheckLogin = () => {
  const [isFirstRender, setIsFirstRender] = useState(true)

  const needLogin = useAppSelector(state => state.user.needLogin)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (needLogin && !isFirstRender) {
      dispatch(setOpenLogin(true))
      setIsFirstRender(false)
    }
  }, [dispatch, isFirstRender, needLogin])
}

export default useCheckLogin
