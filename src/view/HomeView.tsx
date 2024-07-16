// src/pages/HomeView.tsx
import React, { useState } from 'react'
import TiebaView from '@/components/content/TiebaView'
// 你可以在这里导入其他页面组件

const HomeView: React.FC = () => {
  const [view, setView] = useState('tieba') // 这里可以使用不同的状态来切换不同的页面

  return (
    <div>
      <button onClick={() => setView('tieba')}>Baidu Tieba</button>
      <button onClick={() => setView('other')}>Other Page</button>
      {/* 其他按钮可以加载不同的页面 */}

      {view === 'tieba' && <TiebaView />}
      {view === 'other' && <div>其他页面内容</div>}
      {/* 根据view状态加载不同的组件 */}
    </div>
  )
}

export default HomeView
