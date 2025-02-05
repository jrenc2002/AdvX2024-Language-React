import { backend, language } from '@/global'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Form, Input, MessagePlugin } from 'tdesign-react'
import FormItem from 'tdesign-react/es/form/FormItem'

export default function PostTranslateView() {
  let { id } = useParams()
  const [post, setPost] = useState({
    title: null,
    content: [{ first: '', second: true }]
  })
  const [comments, setComments] = useState([])
  const [author, setAuthor] = useState({ username: null })
  const [loaded, setLoaded] = useState(false)
  const token = localStorage.getItem('token')
  const [commentsLoaded, setCommentsLoaded] = useState(false)
  const [translation, setTranslation] = useState('')
  const [likeStatus, setLikeStatus] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    if (!likeStatus)
      axios
        .get(backend + 'post/' + id + '/like', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
        .then((res) => {
          setLikeStatus(res.data.type)
        })
        .catch((err) => {
          MessagePlugin.error('获取点赞信息失败')
          setLikeStatus(true)
        })
    if (!loaded)
      axios
        .get(backend + 'post/' + id, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        .then((res) => {
          axios
            .post(
              backend + 'lang/translate1',
              {
                lang: res.data.language,
                word: res.data.content.map((e) => e.first).join('')
              },
              {
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token')
                }
              }
            )
            .then((res) => {
              setTranslation(res.data)
              setLoaded(true)
            })
            .catch((err) => {
              MessagePlugin.error('翻译全文失败')
              navigate('/')
            })
          setPost(res.data)
          axios.get(backend + 'user/info/' + res.data.author).then((res) => {
            setAuthor(res.data)
          })
          axios.post(
            backend + 'post/view',
            { post: id },
            {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
              }
            }
          )
        })
        .catch((err) => {
          MessagePlugin.error('获取帖子失败')
          navigate('/')
        })
    if (loaded && !commentsLoaded) {
      setCommentsLoaded(true)
      axios
        .get(backend + 'comment/post/' + id, {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
        .then((res) => {
          setComments(res.data)
        })
        .catch((err) => {
          MessagePlugin.error('获取评论失败')
        })
    }
  })
  return (
    <>
      标题：{post.title}
      <br />
      翻译结果：
      {translation}
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
      <br />
      用户点赞信息：
      {likeStatus == 'UNLIKE'
        ? '无操作'
        : likeStatus == 'LIKE'
          ? '已点赞'
          : likeStatus == 'DISLIKE'
            ? '已点踩'
            : '无法获取点赞信息'}
      <h1 style={{ fontSize: 99 }}>评论</h1>
      {comments.map((comment) => (
        <>
          <img
            src={backend + '/user/avatar/' + comment.author}
            style={{ width: 100 }}
          />
          {comment.content.map((a) =>
            a.second ? (
              <span
                onClick={() => {
                  axios
                    .post(
                      backend + 'lang/translate',
                      {
                        lang: post.language,
                        word: a.first
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
              >
                {a.first}
              </span>
            ) : (
              a.first
            )
          )}
          <br />
          评论时间：{new Date(comment.create).toLocaleString()}
        </>
      ))}
      <Form
        onSubmit={(e) => {
          axios
            .post(backend + 'comment/post/' + id, e.fields, {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
              }
            })
            .then((res) => {
              MessagePlugin.success('发送成功')
              location.reload()
            })
            .catch((err) => {
              MessagePlugin.error('发送失败')
            })
        }}
      >
        <FormItem name="content">
          <Input placeholder="评论内容" />
        </FormItem>
        <FormItem>
          <Button type="submit">发送评论</Button>
        </FormItem>
      </Form>
      <img src={backend + 'user/avatar/' + post.author} />
    </>
  )
}
