// 擬似 API
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

export async function updateName(name) {
  await sleep(800)
  if (!name.trim()) throw new Error('名前を入力してください')
  if (name === 'error') throw new Error('サーバーエラー (わざと)')
  return name
}
