import React, { useState, useEffect } from 'react'
import BlurIn from './Blur'

const messages = [
  {
    language: 'Chinese',
    title: '与世界上的每个人相互拥抱😉',
    description:
      '通过最先进的AI技术，你可以与世界上每个人进行交谈，并在其中轻松的学习语言 :)'
  },
  {
    language: 'English',
    title: 'Embrace everyone in the world 😉',
    description:
      'With advanced AI, you can talk to everyone and learn languages easily :)\n'
  },
  {
    language: 'Spanish',
    title: 'Abraza a todos en el mundo 😉',
    description:
      'Con IA avanzada, puedes hablar con todos y aprender idiomas fácilmente :)'
  }
  // 可以添加更多的语言版本
]

const BlurShow = () => {
  const [index, setIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % messages.length)
        setIsVisible(true)
      }, 500) // 这个时间应该与BlurIn组件中的动画持续时间一致
    }, 10000) // 每隔5秒钟切换一次

    return () => clearInterval(intervalId)
  }, [])

  const { title, description } = messages[index]

  return (
    <BlurIn mode={true} isVisible={isVisible}>
      <div className="relative bottom-0 z-30 mt-0.5 w-full overflow-visible">
        <h2 className="text-center text-xl font-bold text-black md:text-4xl dark:text-white">
          {title}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-center text-base font-normal text-neutral-700 md:text-lg dark:text-neutral-200">
          {description}
        </p>
      </div>
    </BlurIn>
  )
}

export default React.memo(BlurShow)
