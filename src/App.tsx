// src/App.tsx
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomeView from '@/view/HomeView'
import SetView from '@/view/SetView'
import StudyView from '@/view/StudyView'
import { DockDemo } from '@/components/DockDemo'
import { GridBg } from '@/components/magicui/GirdBg'
import { useTranslation } from 'react-i18next'
import './i18n' // 引入 i18n 配置文件

const App = (): React.ReactElement => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <Router>
      <div className="flex min-h-screen flex-col ">
        <GridBg>
          <main className="h-screen w-full grow">
            <div className="fixed   inset-0  flex justify-center sm:px-8">
              <div className="flex w-full max-w-7xl lg:px-8">
                <div className="ring-1 ring-zinc-100 dark:ring-zinc-400/20 w-full bg-zinc-50/90 dark:bg-zinc-900/80">
                  {/*<header className="bg-blue-600 text-white p-4 text-center h-[10vh] max-h-[4rem]">*/}

                  {/*  <nav>*/}

                  {/*    <button onClick={() => changeLanguage('en')} className="m-2">English</button>*/}
                  {/*    <button onClick={() => changeLanguage('cn')} className="m-2">中文</button>*/}
                  {/*  </nav>*/}
                  {/*</header>*/}
                  <Routes>
                    <Route path="/" element={<HomeView />} />
                    <Route path="study" element={<StudyView />} />
                    <Route path="set" element={<SetView />} />
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
