/**
 * 如果元素中不存在指定的类名，则添加类名并将视频名称推送到按钮列表中
 * @param {Element | null} element - HTML元素
 * @param {string} className - 需要添加的类名
 * @param {{ value: string[] }} list - 按钮列表对象，包含 `value` 属性
 * @param {string} videoName - 视频名称
 */
function addClassIfNotExists(element: Element | null, className: string, list: { value: string[] }, videoName: string) {
  if (!element?.classList.contains(className)) {
    element?.classList.add(className)
    list.value.push(videoName)
  }
}

export default addClassIfNotExists
