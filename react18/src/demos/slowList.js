// 重い処理をわざと作るためのヘルパー
export function slowFilter(query) {
  const items = []
  for (let i = 0; i < 20000; i++) {
    const text = `Item ${i}`
    if (text.includes(query)) items.push(text)
  }
  const start = performance.now()
  while (performance.now() - start < 30) {
    // 30ms ブロック
  }
  return items.slice(0, 300)
}
