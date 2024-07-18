import { backend, language } from '@/global'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MessagePlugin } from 'tdesign-react'

export default function PostView() {
  let { id } = useParams()
  const [post, setPost] = useState({
    title: null,
    content: [{ first: '', second: true }]
  })
  const [author, setAuthor] = useState({ username: null })
  const [loaded, setLoaded] = useState(false)
  const token = localStorage.getItem('token')
  useEffect(() => {
    if (!loaded)
      axios
        .get(backend + 'post/' + id, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        .then((res) => {
          setLoaded(true)
          setPost(res.data)
          axios.get(backend + 'user/info/' + res.data.author).then((res) => {
            setAuthor(res.data)
          })
        })
        .catch(console.log)
  })
  return (
    <>
      {/* {JSON.stringify(post)} */}
      ----------------------------------
      <br />
      标题：{post.title}
      <br />
      内容：
      {post.content.map((a) =>
        a.second ? (
          <span
            onClick={() => {
              MessagePlugin.info('待完成查词接口：查询词汇“' + a.first + '”')
            }}
          >
            {a.first}
          </span>
        ) : (
          a.first
        )
      )}
      <br />
      作者：{author.username}
      <br />
      发帖时间：{new Date(post.create).toLocaleString()}
      <br />
      最后更改：{new Date(post.lastModified).toLocaleString()}
      <br />
      浏览数：{post.view}
      <br />
      语言：{language[post.language]}
      <br />
      点赞数：{post.like}
      <br />
      点踩数：{post.dislike}
      <br />
      收藏数：{post.star}
      <img src={backend + 'user/avatar/' + post.author} />
    </>
  )
}
