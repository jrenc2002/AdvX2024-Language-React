import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { showContentAtom } from '@/store/ContentManager'
import axios from 'axios'
import { Button, Form, Input, MessagePlugin } from 'tdesign-react'
import { backend } from '@/global'
import FormItem from 'tdesign-react/es/form/FormItem.js'

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

  const handleContentClick = (content) => {
    console.log('Clicked content:', content) // 添加这行来调试
    if (content && content.id) {
      setContentData(content)
      navigate(`/content/${content.id}`)
    } else {
      console.error('Invalid content object:', content)
    }
  }

  return (
    <div className="dark:bg-black dark:bg-dot-white/[0.2] flex h-screen w-full items-start justify-center overflow-x-scroll bg-white bg-dot-black/[0.4]">
      <div className="dark:bg-black pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div>
        {' '}
        <div className="w-40">
          <Form
            onSubmit={(e) => {
              axios
                .post(
                  backend + 'post/new',
                  {
                    title: e.fields.title,
                    content: e.fields.content,
                    anonymous: false,
                    block: 1,
                    top: false
                  },
                  {
                    headers: {
                      Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                  }
                )
                .then((res) => {
                  MessagePlugin.success('发送成功')
                  navigate('/post/' + res.data.post)
                })
                .catch((err) => {
                  MessagePlugin.error('发送失败')
                })
            }}
          >
            <FormItem name="title">
              <Input placeholder="标题" />
            </FormItem>
            <FormItem name="content">
              <Input placeholder="内容" />
            </FormItem>
            <FormItem>
              <Button type="submit">发帖</Button>
            </FormItem>
          </Form>
        </div>
      </div>
      <div
        className="z-10 p-4"
        style={{
          columnCount: 2,
          columnGap: '1rem',
          width: '70%'
        }}
      >
        {recommend.list.map((i, index) => (
          <div
            key={index}
            onClick={() => handleContentClick(i)}
            className="mb-4 block cursor-pointer break-inside-avoid"
          >
            <div className="dark:bg-gray-800 w-full rounded-lg border border-gray-300 bg-white p-6 shadow-md">
              <div className="mb-2 text-xl font-bold">{i.title}</div>
              <div className="text-md font-light">{i.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeView
