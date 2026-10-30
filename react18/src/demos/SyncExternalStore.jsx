import { useSyncExternalStore } from 'react'

// 外部ストア (ここでは window のオンライン状態とウィンドウ幅) を tearing なく購読する
function subscribe(callback) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  window.addEventListener('resize', callback)
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
    window.removeEventListener('resize', callback)
  }
}

export default function SyncExternalStore() {
  const online = useSyncExternalStore(subscribe, () => navigator.onLine)
  const width = useSyncExternalStore(subscribe, () => window.innerWidth)

  return (
    <section>
      <h2>useSyncExternalStore</h2>
      <p>オンライン: {online ? '✅' : '❌'}</p>
      <p>ウィンドウ幅: {width}px</p>
      <p className="note">DevTools の Network で Offline にしたり、ウィンドウをリサイズして確認。</p>
    </section>
  )
}
