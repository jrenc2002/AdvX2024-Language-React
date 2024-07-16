// src/pages/TiebaView.tsx
import React, { useEffect, useRef } from 'react'

// 扩展 HTMLWebViewElement 的类型
interface HTMLWebViewElement extends HTMLElement {
  loadURL(url: string): void
  reload(): void
  stop(): void
  goBack(): void
  goForward(): void
  openDevTools(): void
  closeDevTools(): void
  executeJavaScript(
    code: string,
    userGesture?: boolean,
    callback?: (result: any) => void
  ): Promise<any>
}

const ZhihuView: React.FC = () => {
  const webviewContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const webview = webviewContainerRef.current?.querySelector(
      'webview'
    ) as HTMLWebViewElement
    console.log('webview element:', webview) // 输出 webview 元素，确保其存在

    if (webview) {
      const handleDidFinishLoad = () => {
        console.log('did-finish-load event')
        // 注入脚本以拦截所有创建新页面的 JavaScript 方法
        webview
          .executeJavaScript(
            `
          (function() {
            const originalWindowOpen = window.open;
            window.open = function(url, name, specs) {
              window.location.href = url;
              return null;
            };

            document.addEventListener('click', (event) => {
              let target = event.target;
              while (target && target !== document) {
                if (target.tagName === 'A' && target.target === '_blank') {
                  event.preventDefault();
                  window.location.href = target.href;
                  break;
                }
                target = target.parentElement;
              }
            });

            document.addEventListener('submit', (event) => {
              const target = event.target;
              if (target.target === '_blank') {
                event.preventDefault();
                window.location.href = target.action;
              }
            });
          })();
        `
          )
          .then((result) => {
            console.log('Script injected', result)
          })
          .catch((error) => {
            console.error('Failed to inject script', error)
          })
      }

      webview.addEventListener('did-finish-load', handleDidFinishLoad)

      // 确认事件监听器已附加
      console.log('Event listeners added')

      return () => {
        webview.removeEventListener('did-finish-load', handleDidFinishLoad)
        console.log('Event listeners removed')
      }
    }
  }, [])

  return (
    <div
      ref={webviewContainerRef}
      dangerouslySetInnerHTML={{
        __html: `
          <webview
            class="w-full h-screen"
            src="https://tieba.baidu.com/"
          ></webview>
        `
      }}
    />
  )
}

export default ZhihuView
