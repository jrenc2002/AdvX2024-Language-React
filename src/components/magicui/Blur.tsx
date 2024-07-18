import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import React, { useState, useEffect, useRef } from 'react'

interface BlurIntProps {
  children?: React.ReactNode
  className?: string
  variant?: {
    hidden: { filter: string; opacity: number }
    visible: { filter: string; opacity: number }
  }
  duration?: number
  mode?: boolean
  isVisible?: boolean // 添加 isVisible 属性
}

const BlurIn = ({
  children,
  className,
  variant,
  duration = 0.5,
  mode = true,
  isVisible = true // 添加默认值
}: BlurIntProps) => {
  const timeoutId = useRef<NodeJS.Timeout | null>(null)

  const defaultVariants = {
    hidden: { filter: 'blur(10px)', opacity: 0 },
    visible: { filter: 'blur(0px)', opacity: 1 }
  }

  const combinedVariants = variant || defaultVariants

  const handleMouseEnter = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }
  }

  const handleMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      // Do nothing
    }, 3000)
  }

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
    }
  }, [])

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      transition={{ duration }}
      variants={combinedVariants}
      className={cn(className, '')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

export default BlurIn
