// src/App.tsx
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
  Routes
} from 'react-router-dom'

import '@/i18n'; // 引入 i18n 配置文件
import LoginView from './view/LoginView'

const App = (): React.ReactElement => {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <GridBg>
          <main className="h-screen w-full grow">
            <div className="fixed inset-0 flex justify-center sm:px-8">
              <div className="flex w-full max-w-7xl lg:px-8">
                <div className="ring-1 ring-zinc-100 dark:ring-zinc-400/20 w-full bg-zinc-50/90 dark:bg-zinc-900/80">
                  <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<HomeView />} />
                    <Route path="/study" element={<StudyView />} />
                    <Route path="/set" element={<SetView />} />
                    <Route path="/content/:title" element={<ContentView />} />
                    <Route path="/login" element={<LoginView />} />
                  </Routes>
                </div>
              </div>
            </div>
          </main>
          <DockDemo />
        </GridBg>
      </div>
    </Router>
  )
}

export default App
