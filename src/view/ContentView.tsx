// src/view/ContentView.tsx
import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { showContentAtom } from '@/store/ContentManager'
import BlurIn from '@/components/magicui/Blur'
import { InputDemo } from '@/components/InputDemo'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import { PlaceholdersAndVanishInput } from '@/components/magicui/placeholders-and-vanish-input'
import DifyStreamingComponent from '@/api/Dify'
const ContentView: React.FC = () => {
  const { title } = useParams<{ title: string }>()
  const [contentData] = useAtom(showContentAtom)
  const navigate = useNavigate()
  const placeholders = [
    '说些你想说的🫵！',
    '良言三冬暖，恶语四月寒🤙',
    '不喜欢咱就拉黑🙏',
    '谁骂你就找我🧑🏻‍🔧'
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submitted')
  }
  useEffect(() => {
    if (!title) {
      navigate(`/content/${contentData.questionID}`)
    }
  }, [title, contentData, navigate])

  return (
    <BlurIn mode={false}>
      <div className="dark:bg-black dark:bg-dot-white/[0.2] flex  h-screen w-full  items-start justify-center bg-white bg-dot-black/[0.4]">
        <div className="z-10 flex w-1/2 flex-col gap-4  p-2 ">
          <div className="dark:bg-gray-800 mt-10 h-[15vh]  w-full rounded-lg border border-gray-300 bg-white  p-6 shadow-md">
            <h3 className=" pl-2 text-xl font-bold leading-8 ">
              {contentData.question}
            </h3>
          </div>
          <div className=" dark:bg-gray-800 h-[60vh] w-full rounded-lg border border-gray-300 bg-white p-6 shadow-md">
            <h3 className="mb-2 pl-2 text-xl font-light">
              {' '}
              {contentData.reply}
            </h3>
          </div>
        </div>
        <div className="flex  w-1/2 flex-col gap-4   p-2">
          <div className="dark:bg-gray-800 relative  mt-10 h-[calc(65vh-1.6rem)]  w-full rounded-lg border border-gray-300 bg-white  p-6 shadow-md">
            <div className="h-full w-full overflow-auto overflow-x-hidden ">
              <div className="h-full w-full whitespace-pre-wrap break-words bg-white pl-2 text-xl font-light leading-8">
                {
                  'sdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsada'
                }
                <DifyStreamingComponent></DifyStreamingComponent>
              </div>
              <div className="absolute bottom-4 right-6   font-light text-gray-500">
                ✨现在是AI指导的内容
              </div>
            </div>
          </div>
          <div className="flex h-[10vh] w-full flex-col gap-3    ">
            <div className="flex h-[calc(10vh)]  w-full gap-3 ">
              <button
                className="relative flex h-full w-24 items-center justify-center rounded-md border bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-800 shadow-md  hover:bg-white"
                // onClick={() => navigate('/login')}
              >
                <svg
                  className="mr-1 h-5 w-5"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.8978 10.7299L22 6L24.1022 10.7299C26.2002 15.4503 29.7651 19.3679 34.2674 21.9004L38 24L34.2674 26.0996C29.7651 28.6321 26.2002 32.5497 24.1022 37.2701L22 42L19.8978 37.2701C17.7998 32.5497 14.2349 28.6321 9.73261 26.0996L6 24L9.73261 21.9004C14.2349 19.3679 17.7998 15.4503 19.8978 10.7299Z"
                    stroke="#1F2937"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M38.4742 4.32318L38.4765 4.32214L38.4742 4.32318ZM38.4742 4.32318L38.4624 4.32843L38.4742 4.32318ZM35.6543 10C36.5415 9.26841 37.33 8.4252 38 7.49187C38.67 8.4252 39.4585 9.26841 40.3457 10C39.4585 10.7316 38.67 11.5748 38 12.5081C37.33 11.5748 36.5415 10.7316 35.6543 10ZM38.1079 4.48599L38 4.43805L38.1079 4.48599Z"
                    stroke="#1F2937"
                    strokeWidth="4"
                  />
                </svg>
                AI指导
              </button>
              <button
                className="relative flex h-full  w-24 items-center justify-center rounded-md border bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-800 shadow-md hover:bg-white"
                // onClick={() => navigate('/login')}
              >
                <svg
                  className="mr-1 h-5 w-5"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M36.7278 22.5859L35.3135 21.1717C31.4083 17.2664 25.0767 17.2664 21.1714 21.1717V21.1717C17.2662 25.0769 17.2662 31.4085 21.1714 35.3138L22.5856 36.728M9.85769 24.0003L23.9998 38.1424C27.9051 42.0477 34.2367 42.0477 38.142 38.1424V38.1424C42.0472 34.2372 42.0472 27.9056 38.142 24.0003L23.9998 9.85818C20.0946 5.95293 13.7629 5.95293 9.85769 9.85818V9.85818C5.95245 13.7634 5.95245 20.0951 9.85769 24.0003Z"
                    stroke="#1F2937"
                    strokeWidth="4"
                  />
                </svg>
                AI翻译
              </button>
              <input
                placeholder="如果你写不出来在这可以写中文💖"
                className="relative flex h-full w-[calc(100%-13rem)] items-center justify-center rounded-md border bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-800 shadow-md hover:bg-white"
              ></input>
            </div>
            <div className="relative bottom-0 h-12 ">
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
              />
            </div>
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
