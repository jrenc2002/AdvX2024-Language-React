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
import 'tdesign-react/es/style/index.css'

import '@/i18n' // 引入 i18n 配置文件
import GuideView from './view/GuideView'
import LangListView from './view/LangListView'
import PostAITranslateView from './view/PostAITranslateView'
import PostTranslateView from './view/PostTranslateView'
import PostView from './view/PostView.jsx'
import SendPostView from './view/SendPostView.jsx'

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
          <div className="ring-1 ring-zinc-100 dark:ring-zinc-400/20 dark:bg-zinc-900/80 w-full bg-zinc-50/90">
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
              <Route path="/post/new" element={<SendPostView />} />
              <Route path="/list" element={<LangListView />} />
              <Route
                path="/post/translate/:id"
                element={<PostTranslateView />}
              />
              <Route
                path="/post/translateai/:id"
                element={<PostAITranslateView />}
              />
            </Routes>
          </div>
        </div>
      </div>
      {!isGuideViewRoute && <DockDemo />}
    </main>
  )
}

export default App
