/**
 * 为指定元素添加类名并更新列表
 * @param {Element | null} element - HTML 元素
 * @param {string} className - HTML 元素需要添加的类名
 * @param {{ value: any[] }} [list] - 按钮列表对象，包含 `value` 属性，可选
 * @param {any} [item] - 需要添加到按钮列表中的项，可选
 */
function addClassAndUpdateList(
  element: Element | null,
  className: string,
  list?: { value: any[] },
  item?: any,
) {
  element?.classList.add(className)

  if (list && item !== undefined) {
    list.value.push(item)
  }
}

export default addClassAndUpdateList
