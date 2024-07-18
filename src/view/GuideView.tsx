import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import GlobeDemo from '@/components/GlobeDemo'
import BlurShow from '@/components/magicui/BlurShow'
import LoginView from '@/view/LoginView'
import HomeView from '@/view/HomeView'
import RegisterView from '@/view/RegisterView'
import axios from 'axios'
import { backend } from '../global'

// 判断是否登录的函数
const checkLogin = async () => {
  try {
    const response = await axios.get(`${backend}/auth/check`)
    return response.data.loggedIn
  } catch (error) {
    console.error('Error checking login status:', error)
    return false
  }
}

function RightComponent() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const fetchLoginStatus = async () => {
      const loggedIn = await checkLogin()
      setIsLoggedIn(loggedIn)
      if (
        !loggedIn &&
        location.pathname !== '/login' &&
        location.pathname !== '/register'
      ) {
        navigate('/login')
      }
    }
    fetchLoginStatus()
  }, [location.pathname, navigate])

  let ComponentToRender
  switch (location.pathname) {
    case '/login':
      ComponentToRender = LoginView
      break
    case '/register':
      ComponentToRender = RegisterView
      break
    default:
      ComponentToRender = isLoggedIn ? HomeView : LoginView
  }

  return <ComponentToRender />
}

function LeftComponent() {
  return (
    <>
      <GlobeDemo />
      <BlurShow />
    </>
  )
}

export default function GuideView() {
  return (
    <div className="flex h-screen w-full items-center justify-center overflow-x-scroll bg-white bg-dot-black/[0.4] dark:bg-black dark:bg-dot-white/[0.2]">
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="relative z-10 grid h-full w-full items-center gap-4 p-4">
        <div className="relative flex h-[90vh] w-full rounded-lg border border-gray-300 bg-white p-6 shadow-md dark:bg-gray-800">
          <div className="absolute h-[calc(100%-3rem)] w-3/5 shrink-0">
            <LeftComponent />
          </div>
          <div className="absolute right-0 h-[calc(100%-3rem)] w-2/5">
            <RightComponent />
          </div>
        </div>
      </div>
    </div>
  )
}
