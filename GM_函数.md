# Tampermonkey API 使用指南

## API 列表

| API                                                                                      | 作用                                                                                  | 使用技巧                                           |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `unsafeWindow`                                                                           | 访问页面的 Window 对象                                                                | -                                                  |
| `GM_addStyle(css)`                                                                       | 创建全局样式的快捷方式，向页面插入 `style` 元素                                       | 也可以用 DOM 操作手动创建                          |
| `GM_addElement(tag_name, attributes)` `GM_addElement(parent_node, tag_name, attributes)` | 向 DOM 新建元素的快捷方式                                                             | 也可以用 DOM 操作手动创建                          |
| `GM_log(message)`                                                                        | 在 console 中打印信息                                                                 | `console.log` 的快捷方式                           |
| `GM_setValue(name, value)`                                                               | 持续化存储数据                                                                        | -                                                  |
| `GM_getValue(name, defaultValue)`                                                        | 从存储体中获取数据                                                                    | -                                                  |
| `GM_deleteValue(name)`                                                                   | 从存储体中删除数据                                                                    | -                                                  |
| `GM_listValues()`                                                                        | 列举存储体中所有数据项                                                                | -                                                  |
| `GM_addValueChangeListener`                                                              | 监听数据更新                                                                          | 例如要使 Tab 间数据同步，可以用监听 value 达成同步 |
| `GM_removeValueChangeListener`                                                           | 移除监听                                                                              | -                                                  |
| `GM_getResourceText(name)`                                                               | 获取 `@resource` 中已声明的资源                                                       | -                                                  |
| `GM_getResourceURL(name)`                                                                | 获取 `@resource` 中已声明的资源（base64 URI 形式）                                    | -                                                  |
| `GM_registerMenuCommand(name, fn, accessKey)`                                            | 在 Tampermonkey 的 popup 中增加选项                                                   | -                                                  |
| `GM_unregisterMenuCommand(menuCmdId)`                                                    | 移除选项                                                                              | -                                                  |
| `GM_openInTab(url, options)`                                                             | 新开一个 tab 页                                                                       | -                                                  |
| `GM_xmlhttpRequest(details)`                                                             | 使用后台脚本进行请求，自动带上 cookie，无跨域问题，目标域需要在 `@connect` 中提前声明 | -                                                  |
| `GM_download(details)`                                                                   | 下载资源到本地                                                                        | -                                                  |
| `GM_getTab(callback)`                                                                    | 获取当前 tab 的 object 对象                                                           | -                                                  |
| `GM_saveTab(tab)`                                                                        | 通过 tab 的 object 对象重新打开一个 tab                                               | -                                                  |
| `GM_getTabs(callback)`                                                                   | 获取当前存活的所有 tab 的对象，以便和其他脚本实例通信                                 | -                                                  |
| `GM_notification`                                                                        | 使用插件 notification API 弹出桌面通知                                                | -                                                  |
| `GM_setClipboard`                                                                        | 复制内容到剪贴板                                                                      | -                                                  |
| `GM_info`                                                                                | 获取脚本的油猴插件的信息                                                              | -                                                  |
