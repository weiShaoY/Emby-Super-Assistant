import { config } from '@/config'

/**
 * 获取视频标签数组
 * @param {string} fullName - 视频完整名称（包含扩展名）
 * @returns {Array<{ name: string[], url: string }>} 标签对象数组，如果未找到匹配的标签，则返回空数组
 */
function getTagArray(fullName: string): Array<{ name: string[], url: string }> {
  // 使用正则表达式 config.video.tagRegex 在 fullName 中查找所有匹配项
  const foundTags = [...fullName.matchAll(config.video.tagRegex)]

  if (foundTags.length > 0) {
    // 从 tagArray 中找到匹配的标签对象
    const matchingTags = config.video.tagArray
      .filter(tag =>

        // 检查 tag.name 数组中的任何一个项是否存在于 foundTags 中
        tag.name.some(n =>
          foundTags.some(match => match[0].toLowerCase().includes(n.toLowerCase())),
        ),
      )

    // 返回去重后的匹配标签对象数组
    return matchingTags
  }
  else {
    // 如果没有找到匹配的标签，则返回空数组
    return []
  }
}

export default getTagArray
