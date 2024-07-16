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

const injectScript = (webview: HTMLWebViewElement) => {
  const script = `
    (function() {
      // 设置页面字符编码为 UTF-8
      const meta = document.createElement('meta');
      meta.setAttribute('charset', 'UTF-8');
      document.head.appendChild(meta);

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

  webview
    .executeJavaScript(script)
    .then((result) => console.log('Script injected', result))
    .catch((error) => console.error('Failed to inject script', error))
}

const TiebaView: React.FC = () => {
  const webviewContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const webview = webviewContainerRef.current?.querySelector(
      'webview'
    ) as HTMLWebViewElement
    console.log('webview element:', webview) // 输出 webview 元素，确保其存在

    if (webview) {
      const handleDidFinishLoad = () => {
        console.log('did-finish-load event')
        // 延迟注入脚本，确保页面加载更快
        setTimeout(() => injectScript(webview), 0)
      }

      webview.addEventListener('did-finish-load', handleDidFinishLoad)
      console.log('Event listeners added')

      return () => {
        webview.removeEventListener('did-finish-load', handleDidFinishLoad)
        console.log('Event listeners removed')
      }
    }
  }, [])

  return (
    <div ref={webviewContainerRef}>
      <webview
        className="h-screen w-full"
        src="https://www.zhihu.com/question/658876643"
      ></webview>
    </div>
  )
}

export default TiebaView
