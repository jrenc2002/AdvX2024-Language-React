import '@/assets/css/button.css'
import { backend, language } from '@/global.js'
import '@/i18n'
import { BgKindAtom, languageAtom, themeAtom } from '@/store/AppSet'
import axios from 'axios'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { MessagePlugin } from 'tdesign-react'
import { OPTIONS } from '@/global'
const SetView = () => {
  const [loaded, setLoaded] = useState(false)
  const [user, setUser] = useState({})
  const [bgKind, setBgKind] = useAtom(BgKindAtom)
  const [theme, setTheme] = useAtom(themeAtom)
  const [localLanguage, setLocalLanguage] = useAtom(languageAtom)
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loaded)
      axios
        .get(backend + 'user/info/0', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
        .then((res) => {
          setUser(res.data)
          setLoaded(true)
        })
        .catch((err) => {
          alert('获取用户数据失败')
        })
  }, [loaded])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const handleBgChange = (newBgKind) => {
    setBgKind(newBgKind)
  }

  const changeLanguage = (type, lang) => {
    if (type === 'firstLanguage') {
      setLocalLanguage(lang)
      i18n.changeLanguage(lang)
    }
    axios
      .post(
        backend + `user/${type}?language=${lang}`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
      )
      .then((res) => {
        MessagePlugin.success(
          `切换${type === 'firstLanguage' ? '母语' : '学习语言'}为${
            language[lang]
          }成功`
        )
        setLoaded(false)
      })
      .catch((err) => {
        MessagePlugin.error(
          `切换${type === 'firstLanguage' ? '母语' : '学习语言'}失败`
        )
      })
  }

  return (
    <div
      className={`dark:bg-black dark:bg-dot-white/[0.2] flex min-h-screen w-full flex-col items-start justify-center overflow-x-auto bg-white bg-dot-black/[0.4] sm:flex-row ${
        bgKind === 'grid'
          ? 'dark:bg-grid-white/[0.2] bg-grid-black/[0.2]'
          : bgKind === 'mini-grid'
            ? 'dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.3]'
            : ''
      }`}
    >
      <div className="dark:bg-black pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
        <div className="z-10 flex flex-col  gap-4 p-4 ">
          {/* User Info Card */}
          <div className="dark:bg-gray-800  w-80 rounded-lg border border-gray-300 bg-white p-6 shadow-md">
            <h3 className="mb-1 pl-2 text-xl font-bold">{user.username}</h3>
            <div className="mb-1 pl-2 text-xl font-light">
              <span className="font-bold">母语：</span>
              <span className="border-b-2 border-amber-500  text-xl">
                {language[user.firstLanguage]}
              </span>
            </div>
            <div className="mb-1 pl-2 text-xl font-light">
              <span className="font-bold">正在学习：</span>
              <span className="border-b-2 border-amber-500  text-xl">
                {language[user.learningLanguage]}
              </span>
            </div>
            <div className="mb-1 pl-2 text-xl font-light">
              <span className="font-bold">介绍：</span>
              <span className="border-b-2 border-amber-500  text-xl">
                {user.introduction === ''
                  ? '此用户比较高冷，也可能是机器人。'
                  : user.introduction}
              </span>
            </div>
            <div className="mb-1 pl-2 text-xl font-light">
              <span className="font-bold">邮箱：</span>
              <span className="border-b-2 border-amber-500  text-xl">
                {user.email}
              </span>
            </div>
            <div className="mb-1 pl-2 text-xl font-light">
              <span className="font-bold">注册时间：</span>
              <span className="border-b-2 border-amber-500  text-xl">
                {new Date(user.registrationTime).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="dark:bg-gray-800 relative flex w-80 rounded-lg border border-gray-300 bg-white p-6 shadow-md ">
            <h3 className="flex h-full justify-center pl-2  text-xl font-bold ">
              昼夜交替
            </h3>
            <div className="absolute right-5  h-full ">
              <div className="toggle-wrapper">
                <input
                  type="checkbox"
                  className="toggle-checkbox"
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                />
                <div className="toggle-container">
                  <div className="toggle-button">
                    <div className="toggle-button-circles-container">
                      {[...Array(12)].map((_, index) => (
                        <div key={index} className="toggle-button-circle"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Selection */}
        <div className="z-10 flex flex-col  gap-4 p-4 ">
          <div className="dark:bg-gray-800 flex w-80 flex-col rounded-lg border border-gray-300 bg-white p-6 shadow-md">
            <h3 className="mb-2 pl-2 text-xl font-bold">背景选择</h3>
            <div className=" flex h-14 w-full ">
              {['grid', 'mini-grid', 'dot'].map((kind) => (
                <div
                  key={kind}
                  className={`m-1 w-1/3 cursor-pointer  rounded p-4 ${
                    kind === 'grid'
                      ? 'dark:bg-grid-white/[0.2] bg-grid-black/[0.2]'
                      : kind === 'mini-grid'
                        ? 'dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.3]'
                        : 'dark:bg-dot-white/[0.2] bg-dot-black/[0.4]'
                  } ${
                    bgKind === kind
                      ? 'border-2 border-black'
                      : 'border border-gray-400'
                  }`}
                  onClick={() => handleBgChange(kind)}
                ></div>
              ))}
            </div>
          </div>

          {/* Learning Language Selection */}
          <div className="dark:bg-gray-800 w-80 rounded-lg border border-gray-300 bg-white p-6 shadow-md">
            <h3 className="mb-2 pl-2 text-xl font-bold">学习选择</h3>
            <div className="text-MD  pl-2 font-light">对照语言</div>

            <div className="flex  overflow-x-auto">
              {OPTIONS.map((lang) => (
                <div
                  key={lang.value}
                  className={`m-1 flex h-12 min-w-[100px] cursor-pointer items-center justify-center rounded p-4 ${
                    user.firstLanguage === lang.value
                      ? 'border-2 border-black'
                      : 'border border-gray-400'
                  }`}
                  onClick={() => changeLanguage('firstLanguage', lang.value)}
                >
                  {lang.label}
                </div>
              ))}
            </div>
            <div className="text-MD mt-2 pl-2 font-light">学习语言</div>
            <div className="flex w-full overflow-x-auto">
              {OPTIONS.map((lang) => (
                <div
                  key={lang.value}
                  className={`m-1 flex h-12 min-w-[100px] cursor-pointer items-center justify-center rounded p-4 ${
                    user.learningLanguage === lang.value
                      ? 'border-2 border-black'
                      : 'border border-gray-400'
                  }`}
                  onClick={() => changeLanguage('learningLanguage', lang.value)}
                >
                  {lang.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetView
