// src/view/ContentView.tsx
import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { showContentAtom } from '@/store/ContentManager'
import BlurIn from '@/components/magicui/Blur'

const ContentView: React.FC = () => {
  const { title } = useParams<{ title: string }>()
  const [contentData] = useAtom(showContentAtom)
  const navigate = useNavigate()

  useEffect(() => {
    if (!title) {
      navigate(`/content/${contentData.questionID}`)
    }
  }, [title, contentData, navigate])

  return (
    <BlurIn mode={false}>
      <div className="flex h-screen w-full  items-start justify-center overflow-x-scroll bg-white bg-dot-black/[0.4] dark:bg-black dark:bg-dot-white/[0.2]">
        <div className="z-10 flex w-full flex-col gap-4 p-4 ">
          <div className=" mt-10 w-3/5  rounded-lg border border-gray-300 bg-white p-6  shadow-md dark:bg-gray-800">
            <h3 className=" pl-2 text-xl font-bold leading-8 ">
              {contentData.question}
            </h3>
          </div>
          <div className=" h-[60vh] w-full rounded-lg border border-gray-300 bg-white p-6 shadow-md dark:bg-gray-800">
            <h3 className="mb-2 pl-2 text-xl font-light">
              {' '}
              {contentData.reply}
            </h3>
          </div>
        </div>
      </div>
    </BlurIn>
  )
}
/* todo 接下来要做的事情
  1. 分词系统
  将内容进行基本的划分，将其划分成 “单词”。
    a. 分类
      - 英文划分（空格划分）
      - 中文划分（汉语分词工具，jieba，hankcs，or...）
      - 其他语种划分
    b. 前端实现 /后端实现
      - 前端实现：会有重复工作，但节省数据库内容，减轻数据库压力。
      - 后端实现：数据库内容也不会增加，没有重复工作，减少API调用。（偏向）
    c. 输入
      - 输入内容
    d. 输出
      - 输出分割后的词
  2. 前端渲染
  讲划分好的词进行渲染
    a. 渲染
      - 将单词进行循环单个渲染
    b. 给每个单词增加绑定事件
      - 可以将单词存入生词库中去
  其它 ~
 */
export default ContentView
