import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      setLoggedIn(true)
    }
    setCheckingStatus(false)
  })

  return { loggedIn, checkingStatus }
}
export default useAuthStatus
