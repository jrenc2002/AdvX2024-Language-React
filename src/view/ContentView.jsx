import BlurIn from '@/components/magicui/Blur'
import { PlaceholdersAndVanishInput } from '@/components/magicui/placeholders-and-vanish-input'
import { backend, language } from '@/global'
import { showContentAtom } from '@/store/ContentManager'
import axios from 'axios'
import { useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessagePlugin } from 'tdesign-react'

const ContentView = () => {
  const pathname = window.location.pathname
  const id = pathname.split('/').pop()
  const [contentData] = useAtom(showContentAtom)
  const navigate = useNavigate()
  const [post, setPost] = useState({ title: '', content: [], language: '' })
  const [comments, setComments] = useState([])
  const [author, setAuthor] = useState({ username: '' })
  const [likeStatus, setLikeStatus] = useState('')
  const [newComment, setNewComment] = useState('')
  const [newBComment, setNewBComment] = useState('')
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0)
  const inputRef = useRef(null)
  const placeholders = [
    '说些你想说的🫵！',
    '良言三冬暖，恶语四月寒🤙',
    '不喜欢咱就拉黑🙏',
    '谁骂你就找我🧑🏻‍🔧'
  ]
  useEffect(() => {
    if (!id) {
      console.error('No id provided in URL')
      navigate('/') // 或者显示一个错误消息
      return
    }

    if (contentData && contentData.id === id) {
      console.log('Using contentData from atom')
      setPost(contentData)
    } else {
      console.log('Fetching post data from server')
      fetchPostData()
    }
    fetchComments()
    fetchLikeStatus()
  }, [id, contentData, navigate])
  useEffect(() => {
    const handleScroll = () => {
      if (isInputFocused && comments.length > 0) {
        const newIndex = (currentCommentIndex + 1) % comments.length
        setCurrentCommentIndex(newIndex)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isInputFocused, comments, currentCommentIndex])
  const fetchPostData = async () => {
    try {
      console.log('Fetching post data for id:', id)
      const res = await axios.get(`${backend}post/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      console.log('Fetched post data:', res.data)
      setPost(res.data)
      const authorRes = await axios.get(
        `${backend}user/info/${res.data.author}`
      )
      setAuthor(authorRes.data)
    } catch (err) {
      console.error('Error fetching post data:', err)
      await MessagePlugin.error('获取帖子失败')
      navigate('/')
    }
  }
  const fetchComments = async () => {
    try {
      const res = await axios.get(`${backend}comment/post/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setComments(res.data)
    } catch (err) {
      await MessagePlugin.error('获取评论失败')
    }
  }

  const fetchLikeStatus = async () => {
    try {
      const res = await axios.get(`${backend}post/${id}/like`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setLikeStatus(res.data.type)
    } catch (err) {
      await MessagePlugin.error('获取点赞信息失败')
    }
  }

  const handleLike = async (type) => {
    try {
      await axios.post(
        `${backend}post/${id}/like`,
        { type },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      )
      fetchLikeStatus()
    } catch (err) {
      await MessagePlugin.error('操作失败')
    }
  }

  const handleTranslate = async (word) => {
    try {
      const res = await axios.post(
        `${backend}lang/translate`,
        { lang: post.language, word },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      )
      MessagePlugin.success(`词汇"${word}"的翻译结果：${res.data}`)
    } catch (err) {
      await MessagePlugin.error('翻译失败')
    }
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        `${backend}comment/post/${id}`,
        { content: newComment },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      )
      MessagePlugin.success('发送成功')
      setNewComment('')
      fetchComments()
    } catch (err) {
      await MessagePlugin.error('发送失败')
    }
  }

  return (
    <BlurIn mode={false}>
      <div className="dark:bg-black dark:bg-dot-white/[0.2] flex h-screen w-full items-start justify-center bg-white bg-dot-black/[0.4]">
        <div className="z-10 flex w-1/2 flex-col gap-4 p-2">
          <div className="dark:bg-gray-800 mt-10 h-[15vh] w-full rounded-lg border border-gray-300 bg-white p-6 shadow-md">
            <h3 className="pl-2 text-xl font-bold leading-8">{post.title}</h3>
          </div>
          <div className="dark:bg-gray-800 relative h-[50vh] w-full overflow-auto rounded-lg border border-gray-300 bg-white p-6 shadow-md">
            {post.content.map((a, index) =>
              a.second ? (
                <span
                  key={index}
                  onClick={() => handleTranslate(a.first)}
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                  {a.first}
                </span>
              ) : (
                a.first
              )
            )}
            <div className="absolute bottom-3 flex text-sm font-light text-gray-600 ">
              {new Date(post.create).toLocaleString()}
            </div>
            <div className="absolute bottom-3 right-5 flex text-sm font-light text-gray-600 ">
              {author.username}
            </div>
          </div>
          <div className="flex h-auto w-full flex-col space-y-4 rounded-lg border border-gray-300 bg-white p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex space-x-4 text-sm text-gray-600">
                <p>👁️ 浏览数：{post.view}</p>
                <p>🌐 语言：{language[post.language]}</p>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    console.log(
                      likeStatus,
                      likeStatus === 'LIKE',
                      likeStatus === 'LIKE' ? 'UNLIKE' : 'LIKE'
                    )
                    handleLike(likeStatus === 'LIKE' ? 'UNLIKE' : 'LIKE')
                  }}
                  className={` relative flex h-full items-center justify-center rounded-md border px-3 py-1.5 text-sm font-semibold leading-6 shadow-md transition-colors duration-200 ${
                    likeStatus === 'LIKE'
                      ? 'bg-green-600 text-white'
                      : 'rounded-lg border border-gray-300 bg-white'
                  }`}
                >
                  👍 {likeStatus === 'LIKE' ? '已点赞' : '点赞'} {post.like}
                </button>
                <button
                  onClick={() =>
                    handleLike(likeStatus === 'DISLIKE' ? 'UNLIKE' : 'DISLIKE')
                  }
                  className={`relative flex h-full  items-center justify-center rounded-md border px-3 py-1.5 text-sm font-semibold leading-6 shadow-md transition-colors duration-200 ${
                    likeStatus === 'DISLIKE'
                      ? 'bg-green-600 text-white'
                      : 'rounded-lg border border-gray-300 bg-white'
                  }`}
                >
                  👎 {likeStatus === 'DISLIKE' ? '已点踩' : '点踩'}{' '}
                  {post.dislike}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-1/2 flex-col gap-4 p-2">
          <div className="dark:bg-gray-800 relative mt-10 h-[calc(65vh-1.6rem)] w-full rounded-lg border border-gray-300 bg-white p-6 shadow-md">
            <div className="h-full w-full overflow-auto overflow-x-hidden">
              <div></div>
              <div className="absolute bottom-4 right-6 font-light text-gray-500">
                ✨现在是AI指导的内容
              </div>
            </div>
          </div>
          <div className="flex h-[10vh] w-full flex-col gap-3">
            <div className="flex h-[calc(10vh)] w-full gap-3">
              <button
                onClick={() => {
                  axios
                    .post(
                      backend + 'ai/write',
                      {
                        input: newComment,
                        userIntendedContent: newBComment
                      },
                      {
                        headers: {
                          Authorization:
                            'Bearer ' + localStorage.getItem('token')
                        }
                      }
                    )
                    .then((res) => {
                      MessagePlugin.info(
                        '词汇“' + a.first + '”的翻译结果：' + res.data
                      )
                    })
                    .catch((err) => {
                      MessagePlugin.error('翻译失败')
                    })
                }}
                className="relative flex h-full w-24 items-center justify-center rounded-md border bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-800 shadow-md hover:bg-white"
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
              <button className="relative flex h-full w-24 items-center justify-center rounded-md border bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-800 shadow-md hover:bg-white">
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
                value={newBComment}
                onChange={(e) => setNewBComment(e.target.value)}
              />
            </div>
            <div className="relative bottom-0 h-12">
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={(e) => setNewComment(e.target.value)}
                onSubmit={handleSubmitComment}
              />
            </div>
          </div>
        </div>
      </div>
    </BlurIn>
  )
}

export default ContentView
