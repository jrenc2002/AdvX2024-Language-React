// src/pages/Contact.tsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backend } from '@/global'
import { Button, MessagePlugin } from 'tdesign-react'

const StudyView = () => {
  const [loaded, setLoaded] = useState(false)
  const [list, setList] = useState([])

  useEffect(() => {
    if (!loaded) {
      axios
        .get(backend + 'lang/words', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
        .then((res) => {
          setList(res.data.list)
          setLoaded(true)
        })
        .catch((err) => {
          MessagePlugin.error('获取生词表失败')
        })
    }
  }, [loaded])

  const handleDeleteWord = (word) => {
    axios
      .delete(backend + 'lang/lean/' + word, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((res) => {
        MessagePlugin.success('删除生词成功')
        setList(list.filter((item) => item.first !== word))
      })
      .catch((err) => {
        MessagePlugin.error('删除生词失败')
      })
  }

  return (
    <div className="dark:bg-black dark:bg-dot-white/[0.2] flex h-screen w-full items-start justify-center overflow-x-scroll bg-white bg-dot-black/[0.4]">
      <div className="dark:bg-black pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="z-10 w-full max-w-4xl p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {list.map((word) => (
            <div
              key={word.first}
              className="dark:bg-gray-800 rounded-lg border border-gray-300 bg-white p-4 shadow-md"
            >
              <h4 className="dark:text-white mb-2 text-lg font-semibold text-gray-800">
                {word.first}
              </h4>
              <p className="dark:text-gray-300 mb-3 text-sm text-gray-600">
                添加时间：{new Date(word.second).toLocaleString()}
              </p>

              <Button
                theme="danger"
                variant="outline"
                onClick={() => handleDeleteWord(word.first)}
                className="w-full"
              >
                删除生词
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudyView
