// src/App.tsx
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import HomeView from '@/view/HomeView'
import SetView from '@/view/SetView'
import StudyView from '@/view/StudyView'
import ContentView from '@/view/ContentView'
import { DockDemo } from '@/components/DockDemo'
import { GridBg } from '@/components/magicui/GirdBg'
import { useTranslation } from 'react-i18next'

import '@/i18n' // 引入 i18n 配置文件

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
