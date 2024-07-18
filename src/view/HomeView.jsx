// src/view/HomeView.tsx
import { backend } from '@/global'
import { showContentAtom } from '@/store/ContentManager'
import axios from 'axios'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, MessagePlugin } from 'tdesign-react'

const HomeView = () => {
  const navigate = useNavigate()
  const [_, setContentData] = useAtom(showContentAtom)
  const [loaded, setLoaded] = useState(false)
  const [recommend, setRecommend] = useState({ list: [] })

  useEffect(() => {
    if (!loaded) {
      axios
        .get(backend + 'home/recommend', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
        .then((res) => {
          setRecommend(res.data)
          setLoaded(true)
        })
        .catch((err) => {
          MessagePlugin.error('加载首页推荐失败')
          console.error(err)
        })
    }
  }, [loaded])

  const handleTitleClick = (content) => {
    setContentData(content)
    navigate(`/content/${content.questionID}`)
  }

  return (
    <div className="dark:bg-black dark:bg-dot-white/[0.2] flex h-screen w-full items-start justify-center overflow-x-scroll bg-white bg-dot-black/[0.4]">
      <div className="dark:bg-black pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div
        className="z-10 p-4"
        style={{
          columnCount: 2,
          columnGap: '1rem',
          width: '70%'
        }}
      >
        {recommend.list.map((i, index) => (
          <a
            key={index}
            href={'/post/' + i.id}
            className="mb-4 block break-inside-avoid"
          >
            <div className="dark:bg-gray-800 w-full rounded-lg border border-gray-300 bg-white p-6 shadow-md">
              <div className="mb-2 text-xl font-bold">{i.title}</div>
              <div className="text-md font-light">{i.content}</div>
            </div>
          </a>
        ))}
      </div>
      <a href="/post/new" className="fixed bottom-4 right-4">
        <Button>发帖</Button>
      </a>
    </div>
  )
}

export default HomeView
