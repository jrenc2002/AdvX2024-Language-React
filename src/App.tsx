import { DockDemo } from '@/components/DockDemo'
import { GridBg } from '@/components/magicui/GirdBg'
import ContentView from '@/view/ContentView'
import HomeView from '@/view/HomeView'
import SetView from '@/view/SetView'
import StudyView from '@/view/StudyView'
import React from 'react'
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation
} from 'react-router-dom'

import '@/i18n' // 引入 i18n 配置文件
import PostView from './view/PostView.jsx'
import GuideView from './view/GuideView'

const App = (): React.ReactElement => {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <GridBg>
          <MainContent />
        </GridBg>
      </div>
    </Router>
  )
}

const MainContent = () => {
  const location = useLocation()
  const isGuideViewRoute = ['/login', '/register', '/land'].includes(
    location.pathname
  )

  return (
    <main className="h-screen w-full grow">
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="ring-1 ring-zinc-100 dark:ring-zinc-400/20 w-full bg-zinc-50/90 dark:bg-zinc-900/80">
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/home" element={<HomeView />} />
              <Route path="/study" element={<StudyView />} />
              <Route path="/set" element={<SetView />} />
              <Route path="/content/:title" element={<ContentView />} />
              <Route path="/login" element={<GuideView />} />
              <Route path="/register" element={<GuideView />} />
              <Route path="/post/:id" element={<PostView />} />
              <Route path="/land" element={<GuideView />} />
            </Routes>
          </div>
        </div>
      </div>
      {!isGuideViewRoute && <DockDemo />}
    </main>
  )
}

export default App
