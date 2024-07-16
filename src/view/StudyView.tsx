// src/pages/Contact.tsx
import React from 'react'

const StudyView = (): React.ReactElement => {
  return (
    <div className="flex h-screen w-full items-start justify-center overflow-x-scroll bg-white bg-dot-black/[0.4] dark:bg-black dark:bg-dot-white/[0.2]">
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="z-10 grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
        <div className="w-80 rounded-lg border border-gray-300 bg-white p-6 shadow-md dark:bg-gray-800">
          <h3 className="mb-2 pl-2 text-xl font-bold">问题热榜</h3>
        </div>
        <div className="w-80 rounded-lg border border-gray-300 bg-white p-6 shadow-md dark:bg-gray-800">
          <h3 className="mb-2 pl-2 text-xl font-bold">帖子热榜</h3>
        </div>
      </div>
    </div>
  )
}

export default StudyView
