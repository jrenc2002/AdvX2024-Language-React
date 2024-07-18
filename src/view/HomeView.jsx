// src/view/HomeView.tsx
import { backend } from '@/global';
import { showContentAtom } from '@/store/ContentManager';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessagePlugin } from 'tdesign-react';

const HomeView = () => {
<<<<<<< Updated upstream
  const navigate = useNavigate()
  const [_, setContentData] = useAtom(showContentAtom)
  const [loaded, setLoaded] = useState(false)
  const [recommend, setRecommend] = useState({ list: [] })
=======
  const navigate = useNavigate();
  const [_, setContentData] = useAtom(showContentAtom);
  const [loaded,setLoaded]= useState(false);
  const [recommend,setRecommend] = useState({list: []});
>>>>>>> Stashed changes

  useEffect(() => {
    if (!loaded)
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
          console.log(err)
        })
  })

  const handleTitleClick = (content) => {
    setContentData(content)
    navigate(`/content/${content.questionID}`)
  };

  return (
    <div className="flex h-screen w-full items-start justify-center overflow-x-scroll bg-white bg-dot-black/[0.4] dark:bg-black dark:bg-dot-white/[0.2]">
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="z-10 grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
        {/* <div className="w-80 rounded-lg border border-gray-300 bg-white p-6 shadow-md dark:bg-gray-800">
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
        </div> */}
        <div className="w-80 rounded-lg border border-gray-300 bg-white p-6 shadow-md dark:bg-gray-800">
          <h3 className="mb-2 pl-2 text-xl font-bold">帖子热榜</h3>
<<<<<<< Updated upstream
          {recommend.list.map((i) => (
            <a href={'/post/' + i.id}>
              标题：{i.title}
              <em />
              内容：{i.content}
              <em />
            </a>
          ))}
=======
          {recommend.list.map(i => <a href={'/post/' + i.id}>
            标题：{i.title}
            <br />
            内容：{i.content}
            <br />
          </a>)}
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  )
};

export default HomeView
