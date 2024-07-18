import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EnvelopeIcon
} from '@heroicons/react/20/solid'
import axios from 'axios'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { backend } from '../global'

export default function RegisterView() {
  const [step, setStep] = useState<number>(1)
  const list: Array<{ close: () => void }> = []
  const [mail, setMail] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    code: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    axios
      .post(backend + 'auth/register', formData)
      .then((res) => {
        setMessage('注册成功')
        localStorage.setItem('token', res.data.token)
        navigate('/')
      })
      .catch((err) => {
        setMessage('注册失败')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleSendEmail = () => {
    setLoading(true)
    setMessage('正在发送邮件，请稍候')
    axios
      .post(backend + 'auth/sendEmailCode', {
        email: mail,
        usage: 'REGISTER'
      })
      .then((res) => {
        setMessage('发送成功，请检查收件箱')
      })
      .catch((err) => {
        setMessage('发送失败，请重试')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleNextStep = () => {
    setStep((prevStep) => (prevStep < 2 ? prevStep + 1 : prevStep))
  }

  const handlePrevStep = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep))
  }

  return (
    <div className="flex h-[calc(100%)] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="dark:bg-gray-800 w-full space-y-8 bg-white p-8">
        <div className="text-gray-900">
          <button
            className="flex items-center justify-center rounded-md border bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-800 shadow-sm hover:bg-white"
            onClick={() => navigate('/login')}
          >
            <ArrowLeftIcon className="mr-1 h-5 w-5" />
            返回登录
          </button>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="block text-sm font-medium leading-6 text-gray-900">
              <span className="text-xl font-bold text-indigo-600">01</span>{' '}
              <span className="text-xl font-light text-indigo-600">
                发送验证邮件
              </span>
            </h2>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                邮箱
              </label>
              <div className="relative mt-2 rounded-md border border-gray-300 shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <EnvelopeIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-inset placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="you@example.com"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                />
              </div>
            </div>
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSendEmail}
              disabled={loading}
            >
              {loading ? '发送中...' : '发送验证邮箱'}
            </button>
            <div className="ring-1 ring-gray-500 focus-within:ring-2 focus-within:ring-indigo-600 rounded-md border border-gray-300 px-3 pb-1.5 pt-2.5 shadow-sm ring-inset">
              <label
                htmlFor="code"
                className="block text-xs font-medium text-gray-900"
              >
                验证码
              </label>
              <input
                type="text"
                name="code"
                id="code"
                className="  block w-full   border-0 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder="请输入验证码"
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="block text-sm font-medium leading-6 text-gray-900">
              <span className="text-xl font-bold text-indigo-600">02</span>{' '}
              <span className="text-xl font-light text-indigo-600">
                填写注册信息
              </span>
            </h2>
            <div className="isolate -space-y-px rounded-md border shadow-sm">
              <div className="ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 relative rounded-md rounded-b-none border-[0.5px] px-3 pb-1.5 pt-2.5 ring-inset focus-within:z-10">
                <label
                  htmlFor="username"
                  className="block text-xs font-medium text-gray-900"
                >
                  用户名
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="m-1 ml-0 block w-full rounded border-0 p-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="请输入用户名"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 relative rounded-md rounded-t-none border px-3 pb-1.5 pt-2.5 ring-inset focus-within:z-10">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-gray-900"
                >
                  密码
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="focus:ring-0 m-1 ml-0 block w-full rounded border-0 p-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="请输入密码"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              提交注册信息
            </button>
          </div>
        )}

        <div className="mt-4 flex justify-between">
          {step > 1 && (
            <button
              className="flex items-center justify-center rounded-md border bg-gray-100 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-800 shadow-sm hover:bg-gray-50"
              onClick={handlePrevStep}
            >
              <ArrowLeftIcon className="mr-1 h-5 w-5" />
              上一步
            </button>
          )}
          {step < 2 && (
            <button
              className="ml-auto flex items-center justify-center rounded-md border bg-gray-100 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-800 shadow-sm hover:bg-gray-50"
              onClick={handleNextStep}
            >
              下一步
              <ArrowRightIcon className="ml-1 h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
