import { backend } from '@/global'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, MessagePlugin } from 'tdesign-react'

export default function StudyView() {
  const [loaded, setLoaded] = useState(false)
  const [list, setList] = useState([])
  useEffect(() => {
    if (!loaded)
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
  })
  return (
    <>
      {list.map((word) => (
        <>
          生词：{word.first}
          <br />
          添加时间：{new Date(word.second).toLocaleString()}
          <br />
          <Button
            onClick={() => {
              axios
                .delete(backend + 'lang/lean/' + word.first, {
                  headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                  }
                })
                .then((res) => {
                  MessagePlugin.success('删除生词成功')
                  location.reload()
                })
                .catch((err) => {
                  MessagePlugin.error('删除生词失败')
                })
            }}
          >
            删除生词
          </Button>
          <br />
        </>
      ))}
    </>
  )
}
