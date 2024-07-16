// src/view/HomeView.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { showContentAtom } from '@/store/ContentManager'

const HomeView: React.FC = () => {
  const navigate = useNavigate()
  const [_, setContentData] = useAtom(showContentAtom)

  const questionHotList = [
    {
      question: '美国波音的星际客机回不来的原因到底是什么？',
      reply: '这里是关于美国波音的星际客机回不来的原因的详细内容。',
      questionID: 23,
      replyID: 10
    },
    {
      question:
        '如果以缩短中国3000年历史的代价，让中国文明进步1000年，你愿意吗？',
      reply: '这里是关于缩短中国3000年历史让中国文明进步1000年的讨论内容。',
      questionID: 24,
      replyID: 11
    },
    {
      question: '如何评价电视剧《长相思》第二季第 11-12 集？',
      reply: '这里是对电视剧《长相思》第二季第 11-12 集的评价内容。',
      questionID: 25,
      replyID: 12
    },
    {
      question: '我是一个老实人，怎么改变被歧视被欺负的命运',
      reply: '这里是关于如何改变被歧视被欺负命运的建议和讨论。',
      questionID: 26,
      replyID: 13
    },
    {
      question: '杭州有哪些地方可以一个人安安静静待一天？',
      reply: '这里是杭州适合一个人安安静静待一天的地方推荐。',
      questionID: 27,
      replyID: 14
    }
  ]

  const handleTitleClick = (content: {
    question: string
    reply: string
    questionID: number
    replyID: number
  }) => {
    setContentData(content)
    navigate(`/content/${content.questionID}`)
  }

  return (
    <div className="flex h-screen w-full items-start justify-center overflow-x-scroll bg-white bg-dot-black/[0.4] dark:bg-black dark:bg-dot-white/[0.2]">
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="z-10 grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
        <div className="w-80 rounded-lg border border-gray-300 bg-white p-6 shadow-md dark:bg-gray-800">
          <h3 className="mb-2 pl-2 text-xl font-bold">问题热榜</h3>
          {questionHotList.map((questionData, index) => (
            <p
              key={index}
              className={`rounded p-2 hover:cursor-pointer hover:bg-gray-100 ${
                index !== questionHotList.length - 1 ? 'border-b' : ''
              }`}
              onClick={() => handleTitleClick(questionData)}
            >
              {questionData.question}
            </p>
          ))}
        </div>
        <div className="w-80 rounded-lg border border-gray-300 bg-white p-6 shadow-md dark:bg-gray-800">
          <h3 className="mb-2 pl-2 text-xl font-bold">帖子热榜</h3>
          {questionHotList.map((postData, index) => (
            <p
              key={index}
              className={`rounded p-2 hover:cursor-pointer hover:bg-gray-100 ${
                index !== questionHotList.length - 1 ? 'border-b' : ''
              }`}
              onClick={() => handleTitleClick(postData)}
            >
              {postData.question}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeView
