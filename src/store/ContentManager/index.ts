// src/atoms.ts
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// 使用 atomWithStorage 创建一个与 localStorage 同步的 atom
export const showContentAtom = atomWithStorage('showContent', {
  question: '美国波音的星际客机回不来的原因到底是什么？',
  reply: '这里是关于美国波音的星际客机回不来的原因的详细内容。',
  questionID: 23,
  replyID: 10,
  id: undefined
})
