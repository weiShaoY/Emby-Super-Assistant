// ==UserScript==
// @name          Emby-调用带第三方播放器
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  emby launch extetnal player
// @description:zh-cn Emby调用外部播放器
// @license      MIT
// @author       少爷
// @github       https://github.com/bpking1/embyExternalUrl
// @include      */web/index.html
// @downloadURL https://update.greasyfork.org/scripts/459297/embyLaunchPotplayer.user.js
// @updateURL https://update.greasyfork.org/scripts/459297/embyLaunchPotplayer.meta.js
// @grant        GM_setValue
// @grant        GM_getValue

// ==/UserScript==

;(function () {
  'use strict'

  // const videoExtensionArray =[]

  /**
   *  视频标签
   */
  const videoTagArray = ['-c', '-破解', '-破解-c', '-4k', '-4K-破解']

  /**
   *  视频标签正则
   */
  const videoTagRegex = new RegExp(videoTagArray.join('|'), 'gi')

  /**
   * 初始化外部播放器按钮
   */
  function init() {
    /**
     * 创建按钮元素
     * @param {string} id - 按钮的ID
     * @param {string} title - 按钮的标题
     * @param {string} iconClass - 按钮图标的类名
     * @param {string} buttonText - 按钮的文本
     * @param {Function} onClick - 按钮的点击事件处理函数
     * @param {string} iconUrl - 按钮图标的URL
     * @returns {HTMLElement} 创建的按钮元素
     */
    function createButton({
      id,
      title,
      iconClass,
      buttonText,
      onClick,
      iconUrl,
    }) {
      const divContent = document.createElement('div')

      divContent.className = 'detailButton-content'

      const icon = document.createElement('i')

      icon.className = `md-icon detailButton-icon button-icon button-icon-left ${iconClass}`

      // 临时添加背景图样式，检查是否正确显示图标
      icon.style.backgroundImage = `url(${iconUrl})`
      icon.style.backgroundRepeat = 'no-repeat'
      icon.style.backgroundSize = '100% 100%'

      // icon.style.fontSize = '1.4em'
      icon.style.height = '1.4em'

      icon.style.width = '1.4em'

      const span = document.createElement('span')

      span.className = 'button-text'
      span.textContent = buttonText

      divContent.appendChild(icon)
      divContent.appendChild(span)

      const button = document.createElement('button')

      button.appendChild(divContent)

      button.id = id
      button.type = 'button'
      button.className
        = 'detailButton emby-button emby-button-backdropfilter raised-backdropfilter detailButton-primary'
      button.title = title
      button.onclick = onClick

      return button
    }

    // 获取外部播放器按钮的元素
    const playBtns = document.getElementById('ExternalPlayersBtns')

    // 如果按钮存在，先移除
    if (playBtns) {
      playBtns.remove()
    }

    // 创建按钮容器
    const container = document.createElement('div')

    container.id = 'ExternalPlayersBtns'
    container.className
      = 'detailButtons flex align-items-flex-start flex-wrap-wrap'

    // 按钮数据
    const buttonData = [
      {
        id: 'embyPot',
        title: 'PotPlayer',
        iconClass: 'icon-PotPlayer',
        buttonText: 'PotPlayer',
        onClick: embyOpenPotPlayer,
        iconUrl:
          'https://fastly.jsdelivr.net/gh/bpking1/embyExternalUrl@0.0.5/embyWebAddExternalUrl/icons/icon-PotPlayer.webp',
      },
      {
        id: 'embyCopyUrl',
        title: '复制串流地址',
        iconClass: 'icon-Copy',
        buttonText: '复制链接',
        onClick: embyCopyUrl,
        iconUrl:
          'https://fastly.jsdelivr.net/gh/bpking1/embyExternalUrl@0.0.5/embyWebAddExternalUrl/icons/icon-Copy.webp',
      },
      {
        id: 'embyOpenJavdb',
        title: '打开Javdb搜索',
        iconClass: 'icon-Javdb',
        buttonText: 'Javdb',
        onClick: embyOpenJavdb,
        iconUrl: 'https://www.javdb.com/favicon.ico',
      },
    ]

    // 创建并添加按钮
    buttonData.forEach((data) => {
      const button = createButton(data)

      container.appendChild(button)
    })

    // 将按钮容器插入到指定位置
    const mainDetailButtons = document.querySelector(
      'div[is=\'emby-scroller\']:not(.hide) .mainDetailButtons',
    )

    mainDetailButtons.insertAdjacentElement('afterend', container)
  }

  /**
   * 检查是否显示外部播放器按钮的条件。
   * @returns {boolean} 如果主详细按钮存在且视频或音频容器不隐藏，则返回true，否则返回false。
   */
  function showFlag() {
    const mainDetailButtons = document.querySelector(
      'div[is=\'emby-scroller\']:not(.hide) .mainDetailButtons',
    )

    if (!mainDetailButtons) {
      return false
    }

    const videoElement = document.querySelector(
      'div[is=\'emby-scroller\']:not(.hide) .selectVideoContainer',
    )

    if (videoElement && videoElement.classList.contains('hide')) {
      return false
    }

    const audioElement = document.querySelector(
      'div[is=\'emby-scroller\']:not(.hide) .selectAudioContainer',
    )

    return !(audioElement && audioElement.classList.contains('hide'))
  }

  /**
   * 获取电影或剧集的详细信息。
   * @returns {Promise<object>} 返回包含电影或剧集信息的对象。
   */
  async function getItemInfo() {
    const userId = ApiClient._serverInfo.UserId

    const itemId = /\?id=(\d*)/.exec(window.location.hash)[1]

    const response = await ApiClient.getItem(userId, itemId)

    // 继续播放当前剧集的下一集
    if (response.Type == 'Series') {
      const seriesNextUpItems = await ApiClient.getNextUpEpisodes({
        SeriesId: itemId,
        UserId: userId,
      })

      return await ApiClient.getItem(userId, seriesNextUpItems.Items[0].Id)
    }

    // 播放当前季season的第一集
    if (response.Type == 'Season') {
      const seasonItems = await ApiClient.getItems(userId, { parentId: itemId })

      return await ApiClient.getItem(userId, seasonItems.Items[0].Id)
    }

    // 播放当前集或电影

    return response
  }

  /**
   * 将播放位置转换为时分秒格式的字符串。
   * @param {number} position - 播放位置的ticks值。
   * @returns {string} 格式为"hh:mm:ss"的时间字符串。
   */
  function getSeek(position) {
    let ticks = position * 10000

    const parts = []

    let hours = ticks / 36e9

    ;(hours = Math.floor(hours)) && parts.push(hours)
    let minutes = (ticks -= 36e9 * hours) / 6e8

    ;(ticks -= 6e8 * (minutes = Math.floor(minutes))),
    minutes < 10 && hours && (minutes = `0${minutes}`),
    parts.push(minutes)
    let seconds = ticks / 1e7

    return (
      (seconds = Math.floor(seconds)) < 10 && (seconds = `0${seconds}`),
      parts.push(seconds),
      parts.join(':')
    )
  }

  /**
   * 获取字幕的路径。
   * @param {object} mediaSource - 媒体源对象，包含字幕信息。
   * @returns {string} 字幕路径。
   */
  function getSubPath(mediaSource) {
    const selectSubtitles = document.querySelector(
      'div[is=\'emby-scroller\']:not(.hide) select.selectSubtitles',
    )

    let subTitlePath = ''

    // 返回选中的外挂字幕
    if (selectSubtitles && selectSubtitles.value > 0) {
      const SubIndex = mediaSource.MediaStreams.findIndex(
        m => m.Index == selectSubtitles.value && m.IsExternal,
      )

      if (SubIndex > -1) {
        const subtitleCodec = mediaSource.MediaStreams[SubIndex].Codec

        subTitlePath = `/${mediaSource.Id}/Subtitles/${selectSubtitles.value}/Stream.${subtitleCodec}`
      }
    }
    else {
      // 默认尝试返回第一个外挂中文字幕
      const chiSubIndex = mediaSource.MediaStreams.findIndex(
        m => m.Language == 'chi' && m.IsExternal,
      )

      if (chiSubIndex > -1) {
        const subtitleCodec = mediaSource.MediaStreams[chiSubIndex].Codec

        subTitlePath = `/${mediaSource.Id}/Subtitles/${chiSubIndex}/Stream.${subtitleCodec}`
      }
      else {
        // 尝试返回第一个外挂字幕
        const externalSubIndex = mediaSource.MediaStreams.findIndex(
          m => m.IsExternal,
        )

        if (externalSubIndex > -1) {
          const subtitleCodec = mediaSource.MediaStreams[externalSubIndex].Codec

          subTitlePath = `/${mediaSource.Id}/Subtitles/${externalSubIndex}/Stream.${subtitleCodec}`
        }
      }
    }

    return subTitlePath
  }

  /**
   * 获取Emby媒体的详细信息，包括流媒体URL和字幕URL。
   * @returns {Promise<object>} 返回包含流媒体URL、字幕URL和意图的对象。
   */
  async function getEmbyMediaInfo() {
    const itemInfo = await getItemInfo()

    let mediaSourceId = itemInfo.MediaSources[0].Id

    const selectSource = document.querySelector(
      'div[is=\'emby-scroller\']:not(.hide) select.selectSource',
    )

    if (selectSource && selectSource.value.length > 0) {
      mediaSourceId = selectSource.value
    }

    // let selectAudio = document.querySelector("div[is='emby-scroller']:not(.hide) select.selectAudio");
    const mediaSource = itemInfo.MediaSources.find(m => m.Id == mediaSourceId)

    const domain = `${ApiClient._serverAddress}/emby/videos/${itemInfo.Id}`

    const subPath = getSubPath(mediaSource)

    const subUrl
      = subPath.length > 0
        ? `${domain}${subPath}?api_key=${ApiClient.accessToken()}`
        : ''

    const streamUrl = `${domain}/stream.${
      mediaSource.Container
    }?api_key=${ApiClient.accessToken()}&Static=true&MediaSourceId=${mediaSourceId}`

    const position = Number.parseInt(
      itemInfo.UserData.PlaybackPositionTicks / 10000,
    )

    const intent = await getIntent(mediaSource, position)

    return {
      streamUrl,
      subUrl,
      intent,
    }
  }

  /**
   * 获取播放意图，包括标题、位置和字幕信息。
   * @param {object} mediaSource - 媒体源对象。
   * @param {number} position - 播放位置的ticks值。
   * @returns {Promise<object>} 返回包含标题、位置和字幕信息的对象。
   */
  async function getIntent(mediaSource, position) {
    const title = mediaSource.Path.split('/').pop()

    const externalSubs = mediaSource.MediaStreams.filter(
      m => m.IsExternal == true,
    )

    const subs = '' // 要求是android.net.uri[] ?

    let subs_name = ''

    let subs_filename = ''

    const subs_enable = ''

    if (externalSubs) {
      subs_name = externalSubs.map(s => s.DisplayTitle)
      subs_filename = externalSubs.map(s => s.Path.split('/').pop())
    }

    return {
      title,
      position,
      subs,
      subs_name,
      subs_filename,
      subs_enable,
    }
  }

  /**
   *  Emby调用PotPlayer
   */
  async function embyOpenPotPlayer() {
    const mediaInfo = await getEmbyMediaInfo()

    const intent = mediaInfo.intent

    const poturl = `potplayer://${encodeURI(
      mediaInfo.streamUrl,
    )} /sub=${encodeURI(mediaInfo.subUrl)} /current /title="${
      intent.title
    }" /seek=${getSeek(intent.position)}`

    window.open(poturl, '_blank')
  }

  /**
   *  在Javdb搜索当前影片
   */
  async function embyOpenJavdb() {
    const mediaInfo = await getEmbyMediaInfo()

    const videoTitle = mediaInfo.intent.title

    // 提取最后一个反斜杠之后到第一个点之间的部分
    const result = videoTitle
      .substring(
        videoTitle.lastIndexOf('\\') + 1,
        videoTitle.indexOf('.', videoTitle.lastIndexOf('\\')),
      )
      .toLowerCase()
      .replace(videoTagRegex, '')

    result
    window.open(`https://javdb.com/search?q=${result}&f=all`, '_blank')
  }

  /**
   *  复制链接到剪贴板
   */
  async function embyCopyUrl() {
    const mediaInfo = await getEmbyMediaInfo()

    const textarea = document.createElement('textarea')

    document.body.appendChild(textarea)
    textarea.style.position = 'absolute'
    textarea.style.clip = 'rect(0 0 0 0)'
    textarea.value = mediaInfo.streamUrl
    textarea.select()
    if (document.execCommand('copy', true)) {
      this.innerText = '复制成功'
    }
  }

  /**
   *  判断是否为Javdb跳转过来
   */
  // function checkIfReferredFromJavdb() {
  //   const aaa = GM_getValue('emby-btn')

  //   console.log('%c Line:387 🍔 aaa', 'color:#93c0a4', aaa)
  // }

  /**
   * 监控DOM变化，显示外部播放器按钮。
   */
  document.addEventListener('viewbeforeshow', (e) => {
    if (e.detail.contextPath.startsWith('/item?id=')) {
      const mutation = new MutationObserver(() => {
        if (showFlag()) {
          init()
          mutation.disconnect()
        }
      })

      mutation.observe(document.body, {
        childList: true,
        characterData: true,
        subtree: true,
      })
    }
  })
})()
