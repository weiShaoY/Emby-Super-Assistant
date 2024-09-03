/**
 * 根据传入的时间戳生成格式化的日期字符串
 * @param {number | string | Date} timestamp - 传入的时间戳（毫秒），可以是数字类型、字符串类型或 Date 对象
 * @return {string} - 返回类似 "2024年01月01日22点33分44秒" 的日期字符串
 */
function getFormattedDateFromTimestamp(timestamp: number | string | Date) {
  let date

  // 如果传入的是数字或字符串类型的时间戳，转换为 Date 对象
  if (typeof timestamp === 'number' || typeof timestamp === 'string') {
    date = new Date(Number(timestamp))
  }
  else if (timestamp instanceof Date) {
    // 如果传入的是 Date 对象，直接使用
    date = timestamp
  }
  else {
    throw new TypeError('Invalid timestamp provided')
  }

  const year = date.getFullYear()

  const month = String(date.getMonth() + 1).padStart(2, '0')

  const day = String(date.getDate()).padStart(2, '0')

  const hours = String(date.getHours()).padStart(2, '0')

  const minutes = String(date.getMinutes()).padStart(2, '0')

  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}年${month}月${day}日${hours}点${minutes}分${seconds}秒`
}

export default getFormattedDateFromTimestamp
