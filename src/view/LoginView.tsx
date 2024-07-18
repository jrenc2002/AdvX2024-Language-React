import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessagePlugin } from 'tdesign-react'
import { backend } from '../global'

export default function LoginView() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const onSubmit = (form: any) => {
    const isEmail = /^\w+(-+\.\w+)*@\w+(-.\w+)*\.\w+(-\.\w+)*$/.test(
      form.fields.account
    )
    const loginData = isEmail
      ? { email: form.fields.account, password: form.fields.password }
      : { id: form.fields.account, password: form.fields.password }

    axios
      .post(backend + 'auth/login', loginData)
      .then((res) => {
        MessagePlugin.success('登录成功')
        localStorage.setItem('token', res.data.token)
        navigate('/home')
      })
      .catch((err) => {
        MessagePlugin.error('登录失败')
      })
  }

  const navigateToRegister = () => {
    navigate('/register')
  }

  useEffect(() => {
    if (token) {
      navigate('/home')
    }
  }, [token, navigate])

  return (
    <>
      <div className="flex h-[calc(100%)] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            哈喽，好久不见🫰
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              const form = new FormData(e.target as HTMLFormElement)
              onSubmit({ fields: Object.fromEntries(form) })
            }}
          >
            <div>
              <label
                htmlFor="account"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ID / 邮箱
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="account"
                  name="account"
                  required
                  className="ring-1 focus:ring-2 focus:ring-indigo-600 block w-full rounded-md border py-1.5 pl-2 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  密码
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="ring-1 focus:ring-2 focus:ring-indigo-600 block w-full rounded-md border py-1.5 pl-2 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                登录
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            还没有账户?{' '}
            <a
              onClick={navigateToRegister}
              className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              免费注册 :)
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
