import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import '@/i18n'
import '@/assets/css/button.css'
import { BgKindAtom, languageAtom, themeAtom } from '@/store/AppSet'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { backend, language, OPTIONS } from '@/global.js'
import { MessagePlugin } from 'tdesign-react'
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
          `切换${type === 'firstLanguage' ? '母语' : '学习语言'}为${lang}成功`
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
              <span className="font-bold">英语：</span>
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
            <div className=" md-2 flex w-full ">
              {['zh', 'en'].map((lang) => (
                <div
                  key={lang}
                  className={`m-1 flex w-1/3  cursor-pointer items-center justify-center rounded p-4 ${
                    user.firstLanguage === lang
                      ? 'border-2 border-black'
                      : 'border border-gray-400'
                  }`}
                  onClick={() => changeLanguage('firstLanguage', lang)}
                >
                  {lang === 'zh' ? (
                    <svg
                      width="40"
                      height="20"
                      viewBox="0 0 24 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.21094 2.67969H2.50781C1.98438 3.65625 1.36328 4.47266 0.644531 5.12891L0.46875 5C0.828125 4.5 1.17969 3.88281 1.52344 3.14844C1.86719 2.40625 2.14844 1.64844 2.36719 0.875L3.52734 1.23828C3.44922 1.40234 3.30078 1.48047 3.08203 1.47266C3.06641 1.51953 2.9375 1.80469 2.69531 2.32812H4.80469L5.28516 1.70703C5.65234 1.99609 5.94922 2.25781 6.17578 2.49219C6.14453 2.61719 6.05078 2.67969 5.89453 2.67969H3.70312C4.21875 2.9375 4.48438 3.25391 4.5 3.62891C4.5 3.85547 4.41016 4 4.23047 4.0625C4.08984 4.11719 3.94922 4.07812 3.80859 3.94531C3.78516 3.53906 3.58594 3.11719 3.21094 2.67969ZM1.67578 11.9258V5.04688L2.87109 5.16406C2.84766 5.35156 2.70312 5.46484 2.4375 5.50391V11.6797C2.4375 11.7266 2.37109 11.7773 2.23828 11.832C2.10547 11.8945 1.97266 11.9258 1.83984 11.9258H1.67578ZM2.29688 3.82812L2.41406 3.72266C3.23438 3.93359 3.73828 4.27734 3.92578 4.75391C4.03516 5.04297 4.00391 5.26562 3.83203 5.42188C3.67578 5.57031 3.48828 5.56641 3.26953 5.41016C3.23047 5.15234 3.11328 4.875 2.91797 4.57812C2.73047 4.27344 2.52344 4.02344 2.29688 3.82812ZM4.71094 9.57031H7.18359V8.1875H4.71094V9.57031ZM7.18359 6.47656H4.71094V7.83594H7.18359V6.47656ZM7.92188 6.57031V10.2852C7.91406 10.332 7.83984 10.3906 7.69922 10.4609C7.55859 10.5234 7.42969 10.5547 7.3125 10.5547H7.18359V9.93359H4.71094V10.4961C4.71094 10.5117 4.6875 10.5391 4.64062 10.5781C4.59375 10.6094 4.51953 10.6445 4.41797 10.6836C4.32422 10.7148 4.22266 10.7305 4.11328 10.7305H3.99609V5.77344L4.83984 6.11328H7.08984L7.48828 5.70312L8.34375 6.37109C8.26562 6.46484 8.125 6.53125 7.92188 6.57031ZM9.35156 4.44922L9.76172 3.95703L10.7578 4.71875C10.6328 4.84375 10.457 4.92188 10.2305 4.95312V10.8242C10.2305 11.1758 10.1484 11.4336 9.98438 11.5977C9.82812 11.7695 9.49219 11.8789 8.97656 11.9258C8.95312 11.6758 8.86719 11.5 8.71875 11.3984C8.48438 11.2422 8.13672 11.1406 7.67578 11.0938V10.918C8.49609 10.9727 8.99609 11 9.17578 11C9.37109 11 9.46875 10.9102 9.46875 10.7305V4.80078H4.47656L4.37109 4.44922H9.35156ZM9.97266 2.31641L10.5234 1.63672C10.9297 1.95703 11.2656 2.23828 11.5312 2.48047C11.5 2.60547 11.3906 2.66797 11.2031 2.66797H8.57812C9.08594 2.91016 9.34375 3.21484 9.35156 3.58203C9.35938 3.80859 9.26562 3.95703 9.07031 4.02734C8.92188 4.08203 8.76953 4.04688 8.61328 3.92188C8.58984 3.51563 8.39844 3.09766 8.03906 2.66797H7.14844C6.71094 3.30078 6.26172 3.79297 5.80078 4.14453L5.61328 4.03906C6.24609 3.16406 6.74219 2.12109 7.10156 0.910156L8.27344 1.32031C8.21094 1.47656 8.0625 1.54297 7.82812 1.51953C7.74219 1.70703 7.59766 1.97266 7.39453 2.31641H9.97266ZM18.3633 6.98047H21.8555V3.81641H18.3633V6.98047ZM14.0625 6.98047H17.5547V3.81641H14.0625V6.98047ZM22.1836 2.96094L23.168 3.72266C23.082 3.83984 22.9141 3.92188 22.6641 3.96875V8.08203C22.6562 8.12109 22.5703 8.17578 22.4062 8.24609C22.25 8.30859 22.1094 8.33984 21.9844 8.33984H21.8555V7.34375H18.3633V11.6094C18.3633 11.6719 18.2891 11.7422 18.1406 11.8203C18 11.8984 17.8555 11.9375 17.707 11.9375H17.5547V7.34375H14.0625V8.19922C14.0625 8.24609 13.9922 8.30469 13.8516 8.375C13.7109 8.4375 13.5625 8.46875 13.4062 8.46875H13.2891V3.05469L14.1445 3.46484H17.5547V0.933594L18.7969 1.07422C18.7734 1.26172 18.6289 1.375 18.3633 1.41406V3.46484H21.7266L22.1836 2.96094Z"
                        fill="black"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="80"
                      viewBox="0 0 49 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.88 11.16C1.08 11.096 1.328 11.004 1.624 10.884C1.92 10.756 2.2 10.624 2.464 10.488C2.2 9.976 2.068 9.384 2.068 8.712C2.068 8.216 2.16 7.78 2.344 7.404C2.528 7.02 2.784 6.72 3.112 6.504C3.44 6.28 3.812 6.168 4.228 6.168C4.58 6.168 4.892 6.252 5.164 6.42C5.436 6.58 5.648 6.804 5.8 7.092C5.952 7.38 6.028 7.712 6.028 8.088C5.996 9.048 5.316 9.956 3.988 10.812C4.252 11.036 4.62 11.148 5.092 11.148C5.204 11.148 5.292 11.196 5.356 11.292C5.42 11.388 5.452 11.516 5.452 11.676C5.452 11.828 5.416 11.948 5.344 12.036C5.272 12.124 5.168 12.168 5.032 12.168C4.616 12.168 4.228 12.096 3.868 11.952C3.516 11.8 3.232 11.592 3.016 11.328C2.72 11.48 2.404 11.628 2.068 11.772C1.74 11.908 1.46 12.012 1.228 12.084C1.1 11.972 1.008 11.84 0.952 11.688C0.888 11.536 0.864 11.36 0.88 11.16ZM3.112 8.616C3.112 9.184 3.204 9.656 3.388 10.032C3.94 9.664 4.34 9.336 4.588 9.048C4.836 8.752 4.968 8.432 4.984 8.088C4.984 7.8 4.912 7.576 4.768 7.416C4.632 7.248 4.44 7.164 4.192 7.164C3.88 7.164 3.62 7.304 3.412 7.584C3.212 7.864 3.112 8.208 3.112 8.616ZM5.02459 12.168C4.92059 12.168 4.83659 12.12 4.77259 12.024C4.70859 11.928 4.67659 11.804 4.67659 11.652C4.67659 11.492 4.71659 11.368 4.79659 11.28C4.86859 11.192 4.96859 11.148 5.09659 11.148C5.58459 11.148 6.00059 11 6.34459 10.704C6.69659 10.408 7.05659 9.896 7.42459 9.168L8.09659 7.86C8.42459 7.22 8.73659 6.78 9.03259 6.54C9.32859 6.292 9.67259 6.168 10.0646 6.168C10.4246 6.168 10.7286 6.276 10.9766 6.492C11.2246 6.7 11.3966 6.984 11.4926 7.344C11.7166 6.968 12.0046 6.68 12.3566 6.48C12.7086 6.272 13.1006 6.168 13.5326 6.168C14.1566 6.168 14.6366 6.372 14.9726 6.78C15.3166 7.188 15.4886 7.76 15.4886 8.496V9.9C15.4886 10.34 15.5446 10.656 15.6566 10.848C15.7766 11.04 15.9646 11.136 16.2206 11.136C16.3326 11.136 16.4166 11.184 16.4726 11.28C16.5366 11.376 16.5686 11.504 16.5686 11.664C16.5686 11.792 16.5326 11.908 16.4606 12.012C16.3966 12.116 16.2886 12.168 16.1366 12.168C14.9766 12.168 14.3966 11.456 14.3966 10.032V8.496C14.3966 7.632 14.0566 7.2 13.3766 7.2C13.0246 7.2 12.7126 7.34 12.4406 7.62C12.1766 7.9 11.9686 8.288 11.8166 8.784C11.6726 9.28 11.6006 9.856 11.6006 10.512V12C11.5206 12.024 11.4326 12.044 11.3366 12.06C11.2406 12.076 11.1486 12.084 11.0606 12.084C10.8686 12.084 10.6886 12.056 10.5206 12V8.172C10.5206 7.86 10.4806 7.62 10.4006 7.452C10.3206 7.284 10.1766 7.2 9.96859 7.2C9.80859 7.2 9.65659 7.3 9.51259 7.5C9.37659 7.692 9.20459 7.992 8.99659 8.4L8.16859 9.996C7.78459 10.732 7.33659 11.28 6.82459 11.64C6.32059 11.992 5.72059 12.168 5.02459 12.168ZM16.2224 11.136C16.4944 11.136 16.7584 11.004 17.0144 10.74C17.2784 10.468 17.4984 10.104 17.6744 9.648C17.6664 9.536 17.6624 9.424 17.6624 9.312C17.6624 8.704 17.7824 8.164 18.0224 7.692C18.2624 7.22 18.5864 6.848 18.9944 6.576C19.4104 6.304 19.8824 6.168 20.4104 6.168C20.6904 6.168 20.9664 6.224 21.2384 6.336C21.5104 6.44 21.7384 6.584 21.9224 6.768V6.276C21.9944 6.252 22.0784 6.232 22.1744 6.216C22.2704 6.2 22.3704 6.192 22.4744 6.192C22.6664 6.192 22.8464 6.22 23.0144 6.276V15.36C23.0144 17.232 22.3304 18.168 20.9624 18.168C20.3304 18.168 19.8344 17.98 19.4744 17.604C19.1224 17.228 18.9464 16.712 18.9464 16.056C18.9464 14.592 19.9464 13.22 21.9464 11.94V11.436C21.7224 11.668 21.4624 11.848 21.1664 11.976C20.8704 12.104 20.5464 12.168 20.1944 12.168C19.7304 12.168 19.3184 12.068 18.9584 11.868C18.6064 11.66 18.3184 11.376 18.0944 11.016C17.5984 11.784 16.9464 12.168 16.1384 12.168C16.0344 12.168 15.9504 12.12 15.8864 12.024C15.8224 11.928 15.7904 11.804 15.7904 11.652C15.7904 11.308 15.9344 11.136 16.2224 11.136ZM18.7784 9.312C18.7784 9.88 18.9064 10.328 19.1624 10.656C19.4264 10.976 19.7864 11.136 20.2424 11.136C20.7464 11.136 21.1504 10.964 21.4544 10.62C21.7664 10.276 21.9224 9.824 21.9224 9.264V7.92C21.7624 7.704 21.5584 7.532 21.3104 7.404C21.0624 7.268 20.8064 7.2 20.5424 7.2C20.1984 7.2 19.8944 7.292 19.6304 7.476C19.3664 7.66 19.1584 7.912 19.0064 8.232C18.8544 8.544 18.7784 8.904 18.7784 9.312ZM20.0264 16.032C20.0264 16.376 20.1064 16.644 20.2664 16.836C20.4264 17.036 20.6464 17.136 20.9264 17.136C21.6064 17.136 21.9464 16.544 21.9464 15.36V13.212C20.6664 14.116 20.0264 15.056 20.0264 16.032ZM23.0427 12.624C22.9307 12.752 22.8347 12.816 22.7547 12.816C22.6187 12.816 22.4827 12.744 22.3467 12.6C22.2027 12.464 22.1307 12.34 22.1307 12.228C22.1307 12.076 22.2227 11.924 22.4067 11.772C22.6547 11.572 22.9027 11.368 23.1507 11.16C23.3907 10.952 23.6067 10.772 23.7987 10.62C24.0627 10.396 24.2947 10.196 24.4947 10.02C24.6867 9.844 24.8547 9.676 24.9987 9.516C24.9427 9.092 24.9027 8.564 24.8787 7.932C24.8547 7.3 24.8427 6.508 24.8427 5.556H24.8547L24.8427 5.544C24.8427 4.832 24.8507 4.228 24.8667 3.732C24.8827 3.236 24.9147 2.82 24.9627 2.484C25.0107 2.148 25.0707 1.864 25.1427 1.632C25.2227 1.392 25.3227 1.176 25.4427 0.983999C25.6187 0.695999 25.8347 0.487999 26.0907 0.36C26.3547 0.231999 26.6427 0.167999 26.9547 0.167999C27.5787 0.167999 28.0587 0.443999 28.3947 0.995999C28.7307 1.548 28.8987 2.304 28.8987 3.264V3.276C28.8987 4.58 28.6507 5.816 28.1547 6.984C27.6667 8.144 26.9947 9.156 26.1387 10.02C26.1707 10.14 26.2107 10.252 26.2587 10.356C26.3707 10.62 26.5347 10.82 26.7507 10.956C26.9667 11.084 27.2147 11.148 27.4947 11.148C27.6067 11.148 27.6947 11.196 27.7587 11.292C27.8307 11.38 27.8667 11.504 27.8667 11.664C27.8667 12 27.7187 12.168 27.4227 12.168C26.9507 12.168 26.5347 12.06 26.1747 11.844C25.8227 11.628 25.5667 11.356 25.4067 11.028C25.3587 10.924 25.3147 10.816 25.2747 10.704C24.9547 11.016 24.4787 11.424 23.8467 11.928C23.7187 12.024 23.5827 12.132 23.4387 12.252C23.2867 12.372 23.1547 12.496 23.0427 12.624ZM25.9107 5.616C25.9107 6.296 25.9147 6.876 25.9227 7.356C25.9307 7.836 25.9427 8.248 25.9587 8.592C26.5027 7.944 26.9507 7.164 27.3027 6.252C27.6547 5.34 27.8307 4.34 27.8307 3.252C27.8307 2.588 27.7507 2.08 27.5907 1.728C27.4387 1.376 27.2267 1.2 26.9547 1.2C26.6427 1.2 26.4067 1.384 26.2467 1.752C26.1667 1.944 26.0987 2.188 26.0427 2.484C25.9947 2.772 25.9587 3.164 25.9347 3.66C25.9187 4.156 25.9107 4.808 25.9107 5.616ZM27.4668 12.168C27.3468 12.168 27.2548 12.12 27.1908 12.024C27.1188 11.928 27.0828 11.804 27.0828 11.652C27.0828 11.492 27.1228 11.368 27.2028 11.28C27.2828 11.192 27.3868 11.148 27.5148 11.148C28.0828 11.148 28.5868 10.988 29.0268 10.668C29.4748 10.34 29.8268 9.892 30.0828 9.324C30.3388 8.756 30.4668 8.108 30.4668 7.38V6.336C30.5388 6.312 30.6228 6.292 30.7188 6.276C30.8148 6.26 30.9148 6.252 31.0188 6.252C31.2028 6.252 31.3828 6.28 31.5588 6.336V9.792C31.5588 10.216 31.6228 10.548 31.7508 10.788C31.8868 11.02 32.1108 11.136 32.4228 11.136C32.5588 11.136 32.6508 11.192 32.6988 11.304C32.7468 11.416 32.7708 11.536 32.7708 11.664C32.7708 11.792 32.7348 11.908 32.6628 12.012C32.5988 12.116 32.4908 12.168 32.3388 12.168C31.3468 12.168 30.7708 11.608 30.6108 10.488C30.2588 11.016 29.8108 11.428 29.2668 11.724C28.7308 12.02 28.1308 12.168 27.4668 12.168ZM31.0308 4.608C30.8068 4.608 30.6148 4.528 30.4548 4.368C30.2948 4.208 30.2148 4.016 30.2148 3.792C30.2148 3.552 30.2908 3.356 30.4428 3.204C30.6028 3.052 30.7988 2.976 31.0308 2.976C31.2708 2.976 31.4668 3.052 31.6188 3.204C31.7708 3.356 31.8468 3.552 31.8468 3.792C31.8468 4.024 31.7668 4.22 31.6068 4.38C31.4548 4.532 31.2628 4.608 31.0308 4.608ZM32.3337 12.168C32.2297 12.168 32.1457 12.12 32.0817 12.024C32.0177 11.928 31.9857 11.804 31.9857 11.652C31.9857 11.308 32.1297 11.136 32.4177 11.136C32.6737 11.136 32.9577 10.98 33.2697 10.668C33.5817 10.348 33.9457 9.836 34.3617 9.132L35.6457 6.96C35.6297 6.848 35.6217 6.728 35.6217 6.6C35.6217 6.2 35.6937 5.904 35.8377 5.712C35.9897 5.52 36.1137 5.404 36.2097 5.364C36.3457 5.332 36.4897 5.336 36.6417 5.376C36.8017 5.408 36.9457 5.464 37.0737 5.544C37.2017 5.624 37.2897 5.72 37.3377 5.832C37.3057 5.976 37.2457 6.148 37.1577 6.348C37.0697 6.548 36.9297 6.816 36.7377 7.152C36.7937 7.24 36.8657 7.328 36.9537 7.416C37.0417 7.504 37.1497 7.6 37.2777 7.704L38.1897 8.448C38.5177 8.712 38.7617 8.988 38.9217 9.276C39.0897 9.556 39.1737 9.872 39.1737 10.224C39.1737 10.648 39.0537 11.024 38.8137 11.352C38.8537 11.44 38.8737 11.544 38.8737 11.664C38.8737 11.816 38.8337 11.936 38.7537 12.024C38.6817 12.12 38.5777 12.168 38.4417 12.168C38.3137 12.168 38.1897 12.16 38.0697 12.144C37.9497 12.128 37.8177 12.108 37.6737 12.084C37.4577 12.14 37.2297 12.168 36.9897 12.168C36.7097 12.168 36.4297 12.124 36.1497 12.036C35.8697 11.956 35.5777 11.824 35.2737 11.64C35.2577 11.216 35.4177 10.904 35.7537 10.704C36.1937 10.992 36.6097 11.136 37.0017 11.136C37.3377 11.136 37.6057 11.048 37.8057 10.872C38.0057 10.688 38.1057 10.456 38.1057 10.176C38.1057 9.824 37.9137 9.496 37.5297 9.192L36.6177 8.472C36.4577 8.344 36.3137 8.212 36.1857 8.076L34.9857 10.104C34.5457 10.848 34.1217 11.38 33.7137 11.7C33.3137 12.012 32.8537 12.168 32.3337 12.168ZM38.4467 12.168C38.3427 12.168 38.2587 12.12 38.1947 12.024C38.1227 11.928 38.0867 11.804 38.0867 11.652C38.0867 11.316 38.2347 11.148 38.5307 11.148C39.1067 11.148 39.6347 10.948 40.1147 10.548C40.5948 10.14 41.0228 9.56 41.3988 8.808V2.652C41.3988 1.852 41.5668 1.236 41.9028 0.804C42.2468 0.372 42.7428 0.159999 43.3908 0.167999C43.9828 0.175999 44.4428 0.399999 44.7708 0.839999C45.1068 1.28 45.2748 1.852 45.2748 2.556C45.2748 3.724 44.9228 5.024 44.2188 6.456C44.2748 6.448 44.3308 6.444 44.3868 6.444C44.9868 6.444 45.4628 6.656 45.8148 7.08C46.1748 7.504 46.3548 8.072 46.3548 8.784V9.816C46.3548 10.28 46.4108 10.616 46.5228 10.824C46.6428 11.032 46.8388 11.136 47.1108 11.136C47.1988 11.136 47.2948 11.116 47.3988 11.076C47.5028 11.036 47.6108 10.976 47.7228 10.896C47.8588 10.96 47.9708 11.072 48.0588 11.232C48.1468 11.384 48.1868 11.536 48.1788 11.688C48.0508 11.832 47.8868 11.948 47.6868 12.036C47.4868 12.124 47.2708 12.168 47.0388 12.168C46.4628 12.168 46.0188 11.984 45.7068 11.616C45.4028 11.24 45.2508 10.712 45.2508 10.032V8.76C45.2508 8.352 45.1588 8.036 44.9748 7.812C44.7988 7.58 44.5468 7.464 44.2188 7.464C43.8988 7.464 43.6108 7.572 43.3548 7.788C43.0988 7.996 42.8948 8.284 42.7428 8.652C42.5908 9.02 42.5108 9.444 42.5028 9.924V12C42.4228 12.024 42.3348 12.044 42.2388 12.06C42.1428 12.076 42.0508 12.084 41.9628 12.084C41.7788 12.084 41.5908 12.056 41.3988 12V10.656C41.0068 11.168 40.5548 11.548 40.0428 11.796C39.5307 12.044 38.9987 12.168 38.4467 12.168ZM42.4668 2.64V7.368C43.0268 6.52 43.4548 5.68 43.7508 4.848C44.0548 4.016 44.2068 3.248 44.2068 2.544C44.2068 2.096 44.1308 1.756 43.9788 1.524C43.8348 1.284 43.6228 1.164 43.3428 1.164C42.7588 1.164 42.4668 1.656 42.4668 2.64Z"
                        fill="black"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
            <div className="text-MD mt-2 pl-2 font-light">学习语言</div>
            <div className=" flex w-full ">
              {['zh', 'en'].map((lang) => (
                <div
                  key={lang}
                  className={`m-1 flex w-1/3  cursor-pointer items-center justify-center rounded p-4 ${
                    user.learningLanguage === lang
                      ? 'border-2 border-black'
                      : 'border border-gray-400'
                  }`}
                  onClick={() => changeLanguage('learningLanguage', lang)}
                >
                  {lang === 'zh' ? (
                    <svg
                      width="40"
                      height="20"
                      viewBox="0 0 24 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.21094 2.67969H2.50781C1.98438 3.65625 1.36328 4.47266 0.644531 5.12891L0.46875 5C0.828125 4.5 1.17969 3.88281 1.52344 3.14844C1.86719 2.40625 2.14844 1.64844 2.36719 0.875L3.52734 1.23828C3.44922 1.40234 3.30078 1.48047 3.08203 1.47266C3.06641 1.51953 2.9375 1.80469 2.69531 2.32812H4.80469L5.28516 1.70703C5.65234 1.99609 5.94922 2.25781 6.17578 2.49219C6.14453 2.61719 6.05078 2.67969 5.89453 2.67969H3.70312C4.21875 2.9375 4.48438 3.25391 4.5 3.62891C4.5 3.85547 4.41016 4 4.23047 4.0625C4.08984 4.11719 3.94922 4.07812 3.80859 3.94531C3.78516 3.53906 3.58594 3.11719 3.21094 2.67969ZM1.67578 11.9258V5.04688L2.87109 5.16406C2.84766 5.35156 2.70312 5.46484 2.4375 5.50391V11.6797C2.4375 11.7266 2.37109 11.7773 2.23828 11.832C2.10547 11.8945 1.97266 11.9258 1.83984 11.9258H1.67578ZM2.29688 3.82812L2.41406 3.72266C3.23438 3.93359 3.73828 4.27734 3.92578 4.75391C4.03516 5.04297 4.00391 5.26562 3.83203 5.42188C3.67578 5.57031 3.48828 5.56641 3.26953 5.41016C3.23047 5.15234 3.11328 4.875 2.91797 4.57812C2.73047 4.27344 2.52344 4.02344 2.29688 3.82812ZM4.71094 9.57031H7.18359V8.1875H4.71094V9.57031ZM7.18359 6.47656H4.71094V7.83594H7.18359V6.47656ZM7.92188 6.57031V10.2852C7.91406 10.332 7.83984 10.3906 7.69922 10.4609C7.55859 10.5234 7.42969 10.5547 7.3125 10.5547H7.18359V9.93359H4.71094V10.4961C4.71094 10.5117 4.6875 10.5391 4.64062 10.5781C4.59375 10.6094 4.51953 10.6445 4.41797 10.6836C4.32422 10.7148 4.22266 10.7305 4.11328 10.7305H3.99609V5.77344L4.83984 6.11328H7.08984L7.48828 5.70312L8.34375 6.37109C8.26562 6.46484 8.125 6.53125 7.92188 6.57031ZM9.35156 4.44922L9.76172 3.95703L10.7578 4.71875C10.6328 4.84375 10.457 4.92188 10.2305 4.95312V10.8242C10.2305 11.1758 10.1484 11.4336 9.98438 11.5977C9.82812 11.7695 9.49219 11.8789 8.97656 11.9258C8.95312 11.6758 8.86719 11.5 8.71875 11.3984C8.48438 11.2422 8.13672 11.1406 7.67578 11.0938V10.918C8.49609 10.9727 8.99609 11 9.17578 11C9.37109 11 9.46875 10.9102 9.46875 10.7305V4.80078H4.47656L4.37109 4.44922H9.35156ZM9.97266 2.31641L10.5234 1.63672C10.9297 1.95703 11.2656 2.23828 11.5312 2.48047C11.5 2.60547 11.3906 2.66797 11.2031 2.66797H8.57812C9.08594 2.91016 9.34375 3.21484 9.35156 3.58203C9.35938 3.80859 9.26562 3.95703 9.07031 4.02734C8.92188 4.08203 8.76953 4.04688 8.61328 3.92188C8.58984 3.51563 8.39844 3.09766 8.03906 2.66797H7.14844C6.71094 3.30078 6.26172 3.79297 5.80078 4.14453L5.61328 4.03906C6.24609 3.16406 6.74219 2.12109 7.10156 0.910156L8.27344 1.32031C8.21094 1.47656 8.0625 1.54297 7.82812 1.51953C7.74219 1.70703 7.59766 1.97266 7.39453 2.31641H9.97266ZM18.3633 6.98047H21.8555V3.81641H18.3633V6.98047ZM14.0625 6.98047H17.5547V3.81641H14.0625V6.98047ZM22.1836 2.96094L23.168 3.72266C23.082 3.83984 22.9141 3.92188 22.6641 3.96875V8.08203C22.6562 8.12109 22.5703 8.17578 22.4062 8.24609C22.25 8.30859 22.1094 8.33984 21.9844 8.33984H21.8555V7.34375H18.3633V11.6094C18.3633 11.6719 18.2891 11.7422 18.1406 11.8203C18 11.8984 17.8555 11.9375 17.707 11.9375H17.5547V7.34375H14.0625V8.19922C14.0625 8.24609 13.9922 8.30469 13.8516 8.375C13.7109 8.4375 13.5625 8.46875 13.4062 8.46875H13.2891V3.05469L14.1445 3.46484H17.5547V0.933594L18.7969 1.07422C18.7734 1.26172 18.6289 1.375 18.3633 1.41406V3.46484H21.7266L22.1836 2.96094Z"
                        fill="black"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="80"
                      viewBox="0 0 49 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.88 11.16C1.08 11.096 1.328 11.004 1.624 10.884C1.92 10.756 2.2 10.624 2.464 10.488C2.2 9.976 2.068 9.384 2.068 8.712C2.068 8.216 2.16 7.78 2.344 7.404C2.528 7.02 2.784 6.72 3.112 6.504C3.44 6.28 3.812 6.168 4.228 6.168C4.58 6.168 4.892 6.252 5.164 6.42C5.436 6.58 5.648 6.804 5.8 7.092C5.952 7.38 6.028 7.712 6.028 8.088C5.996 9.048 5.316 9.956 3.988 10.812C4.252 11.036 4.62 11.148 5.092 11.148C5.204 11.148 5.292 11.196 5.356 11.292C5.42 11.388 5.452 11.516 5.452 11.676C5.452 11.828 5.416 11.948 5.344 12.036C5.272 12.124 5.168 12.168 5.032 12.168C4.616 12.168 4.228 12.096 3.868 11.952C3.516 11.8 3.232 11.592 3.016 11.328C2.72 11.48 2.404 11.628 2.068 11.772C1.74 11.908 1.46 12.012 1.228 12.084C1.1 11.972 1.008 11.84 0.952 11.688C0.888 11.536 0.864 11.36 0.88 11.16ZM3.112 8.616C3.112 9.184 3.204 9.656 3.388 10.032C3.94 9.664 4.34 9.336 4.588 9.048C4.836 8.752 4.968 8.432 4.984 8.088C4.984 7.8 4.912 7.576 4.768 7.416C4.632 7.248 4.44 7.164 4.192 7.164C3.88 7.164 3.62 7.304 3.412 7.584C3.212 7.864 3.112 8.208 3.112 8.616ZM5.02459 12.168C4.92059 12.168 4.83659 12.12 4.77259 12.024C4.70859 11.928 4.67659 11.804 4.67659 11.652C4.67659 11.492 4.71659 11.368 4.79659 11.28C4.86859 11.192 4.96859 11.148 5.09659 11.148C5.58459 11.148 6.00059 11 6.34459 10.704C6.69659 10.408 7.05659 9.896 7.42459 9.168L8.09659 7.86C8.42459 7.22 8.73659 6.78 9.03259 6.54C9.32859 6.292 9.67259 6.168 10.0646 6.168C10.4246 6.168 10.7286 6.276 10.9766 6.492C11.2246 6.7 11.3966 6.984 11.4926 7.344C11.7166 6.968 12.0046 6.68 12.3566 6.48C12.7086 6.272 13.1006 6.168 13.5326 6.168C14.1566 6.168 14.6366 6.372 14.9726 6.78C15.3166 7.188 15.4886 7.76 15.4886 8.496V9.9C15.4886 10.34 15.5446 10.656 15.6566 10.848C15.7766 11.04 15.9646 11.136 16.2206 11.136C16.3326 11.136 16.4166 11.184 16.4726 11.28C16.5366 11.376 16.5686 11.504 16.5686 11.664C16.5686 11.792 16.5326 11.908 16.4606 12.012C16.3966 12.116 16.2886 12.168 16.1366 12.168C14.9766 12.168 14.3966 11.456 14.3966 10.032V8.496C14.3966 7.632 14.0566 7.2 13.3766 7.2C13.0246 7.2 12.7126 7.34 12.4406 7.62C12.1766 7.9 11.9686 8.288 11.8166 8.784C11.6726 9.28 11.6006 9.856 11.6006 10.512V12C11.5206 12.024 11.4326 12.044 11.3366 12.06C11.2406 12.076 11.1486 12.084 11.0606 12.084C10.8686 12.084 10.6886 12.056 10.5206 12V8.172C10.5206 7.86 10.4806 7.62 10.4006 7.452C10.3206 7.284 10.1766 7.2 9.96859 7.2C9.80859 7.2 9.65659 7.3 9.51259 7.5C9.37659 7.692 9.20459 7.992 8.99659 8.4L8.16859 9.996C7.78459 10.732 7.33659 11.28 6.82459 11.64C6.32059 11.992 5.72059 12.168 5.02459 12.168ZM16.2224 11.136C16.4944 11.136 16.7584 11.004 17.0144 10.74C17.2784 10.468 17.4984 10.104 17.6744 9.648C17.6664 9.536 17.6624 9.424 17.6624 9.312C17.6624 8.704 17.7824 8.164 18.0224 7.692C18.2624 7.22 18.5864 6.848 18.9944 6.576C19.4104 6.304 19.8824 6.168 20.4104 6.168C20.6904 6.168 20.9664 6.224 21.2384 6.336C21.5104 6.44 21.7384 6.584 21.9224 6.768V6.276C21.9944 6.252 22.0784 6.232 22.1744 6.216C22.2704 6.2 22.3704 6.192 22.4744 6.192C22.6664 6.192 22.8464 6.22 23.0144 6.276V15.36C23.0144 17.232 22.3304 18.168 20.9624 18.168C20.3304 18.168 19.8344 17.98 19.4744 17.604C19.1224 17.228 18.9464 16.712 18.9464 16.056C18.9464 14.592 19.9464 13.22 21.9464 11.94V11.436C21.7224 11.668 21.4624 11.848 21.1664 11.976C20.8704 12.104 20.5464 12.168 20.1944 12.168C19.7304 12.168 19.3184 12.068 18.9584 11.868C18.6064 11.66 18.3184 11.376 18.0944 11.016C17.5984 11.784 16.9464 12.168 16.1384 12.168C16.0344 12.168 15.9504 12.12 15.8864 12.024C15.8224 11.928 15.7904 11.804 15.7904 11.652C15.7904 11.308 15.9344 11.136 16.2224 11.136ZM18.7784 9.312C18.7784 9.88 18.9064 10.328 19.1624 10.656C19.4264 10.976 19.7864 11.136 20.2424 11.136C20.7464 11.136 21.1504 10.964 21.4544 10.62C21.7664 10.276 21.9224 9.824 21.9224 9.264V7.92C21.7624 7.704 21.5584 7.532 21.3104 7.404C21.0624 7.268 20.8064 7.2 20.5424 7.2C20.1984 7.2 19.8944 7.292 19.6304 7.476C19.3664 7.66 19.1584 7.912 19.0064 8.232C18.8544 8.544 18.7784 8.904 18.7784 9.312ZM20.0264 16.032C20.0264 16.376 20.1064 16.644 20.2664 16.836C20.4264 17.036 20.6464 17.136 20.9264 17.136C21.6064 17.136 21.9464 16.544 21.9464 15.36V13.212C20.6664 14.116 20.0264 15.056 20.0264 16.032ZM23.0427 12.624C22.9307 12.752 22.8347 12.816 22.7547 12.816C22.6187 12.816 22.4827 12.744 22.3467 12.6C22.2027 12.464 22.1307 12.34 22.1307 12.228C22.1307 12.076 22.2227 11.924 22.4067 11.772C22.6547 11.572 22.9027 11.368 23.1507 11.16C23.3907 10.952 23.6067 10.772 23.7987 10.62C24.0627 10.396 24.2947 10.196 24.4947 10.02C24.6867 9.844 24.8547 9.676 24.9987 9.516C24.9427 9.092 24.9027 8.564 24.8787 7.932C24.8547 7.3 24.8427 6.508 24.8427 5.556H24.8547L24.8427 5.544C24.8427 4.832 24.8507 4.228 24.8667 3.732C24.8827 3.236 24.9147 2.82 24.9627 2.484C25.0107 2.148 25.0707 1.864 25.1427 1.632C25.2227 1.392 25.3227 1.176 25.4427 0.983999C25.6187 0.695999 25.8347 0.487999 26.0907 0.36C26.3547 0.231999 26.6427 0.167999 26.9547 0.167999C27.5787 0.167999 28.0587 0.443999 28.3947 0.995999C28.7307 1.548 28.8987 2.304 28.8987 3.264V3.276C28.8987 4.58 28.6507 5.816 28.1547 6.984C27.6667 8.144 26.9947 9.156 26.1387 10.02C26.1707 10.14 26.2107 10.252 26.2587 10.356C26.3707 10.62 26.5347 10.82 26.7507 10.956C26.9667 11.084 27.2147 11.148 27.4947 11.148C27.6067 11.148 27.6947 11.196 27.7587 11.292C27.8307 11.38 27.8667 11.504 27.8667 11.664C27.8667 12 27.7187 12.168 27.4227 12.168C26.9507 12.168 26.5347 12.06 26.1747 11.844C25.8227 11.628 25.5667 11.356 25.4067 11.028C25.3587 10.924 25.3147 10.816 25.2747 10.704C24.9547 11.016 24.4787 11.424 23.8467 11.928C23.7187 12.024 23.5827 12.132 23.4387 12.252C23.2867 12.372 23.1547 12.496 23.0427 12.624ZM25.9107 5.616C25.9107 6.296 25.9147 6.876 25.9227 7.356C25.9307 7.836 25.9427 8.248 25.9587 8.592C26.5027 7.944 26.9507 7.164 27.3027 6.252C27.6547 5.34 27.8307 4.34 27.8307 3.252C27.8307 2.588 27.7507 2.08 27.5907 1.728C27.4387 1.376 27.2267 1.2 26.9547 1.2C26.6427 1.2 26.4067 1.384 26.2467 1.752C26.1667 1.944 26.0987 2.188 26.0427 2.484C25.9947 2.772 25.9587 3.164 25.9347 3.66C25.9187 4.156 25.9107 4.808 25.9107 5.616ZM27.4668 12.168C27.3468 12.168 27.2548 12.12 27.1908 12.024C27.1188 11.928 27.0828 11.804 27.0828 11.652C27.0828 11.492 27.1228 11.368 27.2028 11.28C27.2828 11.192 27.3868 11.148 27.5148 11.148C28.0828 11.148 28.5868 10.988 29.0268 10.668C29.4748 10.34 29.8268 9.892 30.0828 9.324C30.3388 8.756 30.4668 8.108 30.4668 7.38V6.336C30.5388 6.312 30.6228 6.292 30.7188 6.276C30.8148 6.26 30.9148 6.252 31.0188 6.252C31.2028 6.252 31.3828 6.28 31.5588 6.336V9.792C31.5588 10.216 31.6228 10.548 31.7508 10.788C31.8868 11.02 32.1108 11.136 32.4228 11.136C32.5588 11.136 32.6508 11.192 32.6988 11.304C32.7468 11.416 32.7708 11.536 32.7708 11.664C32.7708 11.792 32.7348 11.908 32.6628 12.012C32.5988 12.116 32.4908 12.168 32.3388 12.168C31.3468 12.168 30.7708 11.608 30.6108 10.488C30.2588 11.016 29.8108 11.428 29.2668 11.724C28.7308 12.02 28.1308 12.168 27.4668 12.168ZM31.0308 4.608C30.8068 4.608 30.6148 4.528 30.4548 4.368C30.2948 4.208 30.2148 4.016 30.2148 3.792C30.2148 3.552 30.2908 3.356 30.4428 3.204C30.6028 3.052 30.7988 2.976 31.0308 2.976C31.2708 2.976 31.4668 3.052 31.6188 3.204C31.7708 3.356 31.8468 3.552 31.8468 3.792C31.8468 4.024 31.7668 4.22 31.6068 4.38C31.4548 4.532 31.2628 4.608 31.0308 4.608ZM32.3337 12.168C32.2297 12.168 32.1457 12.12 32.0817 12.024C32.0177 11.928 31.9857 11.804 31.9857 11.652C31.9857 11.308 32.1297 11.136 32.4177 11.136C32.6737 11.136 32.9577 10.98 33.2697 10.668C33.5817 10.348 33.9457 9.836 34.3617 9.132L35.6457 6.96C35.6297 6.848 35.6217 6.728 35.6217 6.6C35.6217 6.2 35.6937 5.904 35.8377 5.712C35.9897 5.52 36.1137 5.404 36.2097 5.364C36.3457 5.332 36.4897 5.336 36.6417 5.376C36.8017 5.408 36.9457 5.464 37.0737 5.544C37.2017 5.624 37.2897 5.72 37.3377 5.832C37.3057 5.976 37.2457 6.148 37.1577 6.348C37.0697 6.548 36.9297 6.816 36.7377 7.152C36.7937 7.24 36.8657 7.328 36.9537 7.416C37.0417 7.504 37.1497 7.6 37.2777 7.704L38.1897 8.448C38.5177 8.712 38.7617 8.988 38.9217 9.276C39.0897 9.556 39.1737 9.872 39.1737 10.224C39.1737 10.648 39.0537 11.024 38.8137 11.352C38.8537 11.44 38.8737 11.544 38.8737 11.664C38.8737 11.816 38.8337 11.936 38.7537 12.024C38.6817 12.12 38.5777 12.168 38.4417 12.168C38.3137 12.168 38.1897 12.16 38.0697 12.144C37.9497 12.128 37.8177 12.108 37.6737 12.084C37.4577 12.14 37.2297 12.168 36.9897 12.168C36.7097 12.168 36.4297 12.124 36.1497 12.036C35.8697 11.956 35.5777 11.824 35.2737 11.64C35.2577 11.216 35.4177 10.904 35.7537 10.704C36.1937 10.992 36.6097 11.136 37.0017 11.136C37.3377 11.136 37.6057 11.048 37.8057 10.872C38.0057 10.688 38.1057 10.456 38.1057 10.176C38.1057 9.824 37.9137 9.496 37.5297 9.192L36.6177 8.472C36.4577 8.344 36.3137 8.212 36.1857 8.076L34.9857 10.104C34.5457 10.848 34.1217 11.38 33.7137 11.7C33.3137 12.012 32.8537 12.168 32.3337 12.168ZM38.4467 12.168C38.3427 12.168 38.2587 12.12 38.1947 12.024C38.1227 11.928 38.0867 11.804 38.0867 11.652C38.0867 11.316 38.2347 11.148 38.5307 11.148C39.1067 11.148 39.6347 10.948 40.1147 10.548C40.5948 10.14 41.0228 9.56 41.3988 8.808V2.652C41.3988 1.852 41.5668 1.236 41.9028 0.804C42.2468 0.372 42.7428 0.159999 43.3908 0.167999C43.9828 0.175999 44.4428 0.399999 44.7708 0.839999C45.1068 1.28 45.2748 1.852 45.2748 2.556C45.2748 3.724 44.9228 5.024 44.2188 6.456C44.2748 6.448 44.3308 6.444 44.3868 6.444C44.9868 6.444 45.4628 6.656 45.8148 7.08C46.1748 7.504 46.3548 8.072 46.3548 8.784V9.816C46.3548 10.28 46.4108 10.616 46.5228 10.824C46.6428 11.032 46.8388 11.136 47.1108 11.136C47.1988 11.136 47.2948 11.116 47.3988 11.076C47.5028 11.036 47.6108 10.976 47.7228 10.896C47.8588 10.96 47.9708 11.072 48.0588 11.232C48.1468 11.384 48.1868 11.536 48.1788 11.688C48.0508 11.832 47.8868 11.948 47.6868 12.036C47.4868 12.124 47.2708 12.168 47.0388 12.168C46.4628 12.168 46.0188 11.984 45.7068 11.616C45.4028 11.24 45.2508 10.712 45.2508 10.032V8.76C45.2508 8.352 45.1588 8.036 44.9748 7.812C44.7988 7.58 44.5468 7.464 44.2188 7.464C43.8988 7.464 43.6108 7.572 43.3548 7.788C43.0988 7.996 42.8948 8.284 42.7428 8.652C42.5908 9.02 42.5108 9.444 42.5028 9.924V12C42.4228 12.024 42.3348 12.044 42.2388 12.06C42.1428 12.076 42.0508 12.084 41.9628 12.084C41.7788 12.084 41.5908 12.056 41.3988 12V10.656C41.0068 11.168 40.5548 11.548 40.0428 11.796C39.5307 12.044 38.9987 12.168 38.4467 12.168ZM42.4668 2.64V7.368C43.0268 6.52 43.4548 5.68 43.7508 4.848C44.0548 4.016 44.2068 3.248 44.2068 2.544C44.2068 2.096 44.1308 1.756 43.9788 1.524C43.8348 1.284 43.6228 1.164 43.3428 1.164C42.7588 1.164 42.4668 1.656 42.4668 2.64Z"
                        fill="black"
                      />
                    </svg>
                  )}
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
