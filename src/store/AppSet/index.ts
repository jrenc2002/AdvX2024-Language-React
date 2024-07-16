// atoms.ts
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// 定义主题类型
type Theme = 'light' | 'dark'
// 定义语言类型
type Language = 'en' | 'es' | 'zh'
// 定义背景种类
type BgKind = 'grid' | 'mini-grid' | 'dot'

// 使用本地存储来持久化原子
export const themeAtom = atomWithStorage<Theme>('theme', 'light')
export const languageAtom = atomWithStorage<Language>('language', 'en')

export const BgKindAtom = atomWithStorage<BgKind>('bg-kind', 'mini-grid')
