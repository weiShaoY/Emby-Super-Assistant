/**
 * Emby 类型定义命名空间。
 */
namespace EmbyType {

  /**
   * 表示媒体流信息的类型。
   */
  export type MediaStream = {

    /**
     * 媒体流的唯一标识符。
     * @type {string}
     */
    Id: string

    /**
     * 媒体流使用的编码格式。
     * @type {string}
     */
    Codec: string

    /**
     * 指示媒体流是否为外部字幕或音轨。
     * @type {boolean}
     */
    IsExternal: boolean

    /**
     * 媒体流的语言。
     * @type {string}
     */
    Language: string

    /**
     * 媒体流的显示标题。
     * @type {string}
     */
    DisplayTitle: string

    /**
     * 媒体流的文件路径。
     * @type {string}
     */
    Path: string

    /**
     * 媒体流在媒体源中的索引。
     * @type {number}
     */
    Index: number
  }

  /**
   * 表示媒体源信息的类型。
   */
  export type MediaSource = {

    /**
     * 媒体源的唯一标识符。
     * @type {string}
     */
    Id: string

    /**
     * 媒体源的文件路径。
     * @type {string}
     */
    Path: string

    /**
     * 媒体源中的媒体流列表。
     * @type {MediaStream[]}
     */
    MediaStreams: MediaStream[]

    /**
     * 媒体源使用的容器格式。
     * @type {string}
     */
    Container: string
  }

  /**
   * 表示用户数据的类型。
   */
  export type UserData = {

    /**
     * 播放位置的 ticks 值。
     * @type {number}
     */
    PlaybackPositionTicks: number
  }

  /**
   * 表示媒体项信息的类型。
   */
  export type ItemInfo = {

    /**
     * 媒体项的唯一标识符。
     * @type {string}
     */
    Id: string

    /**
     * 媒体项的类型，如 "Series" 或 "Season"。
     * @type {string}
     */
    Type: string

    /**
     * 媒体项的媒体源列表。
     * @type {MediaSource[]}
     */
    MediaSources: MediaSource[]

    /**
     * 媒体项的用户数据。
     * @type {UserData}
     */
    UserData: UserData
  }

  /**
   * 表示 Emby 的 ApiClient 的类型接口。
   */
  export type ApiClientType = {

    /**
     * 服务器信息，包括用户 ID。
     * @type {{ UserId: string }}
     */
    _serverInfo: { UserId: string }

    /**
     * 服务器地址。
     * @type {string}
     */
    _serverAddress: string

    /**
     * 获取访问令牌的方法。
     * @type {() => string}
     */
    accessToken: () => string

    /**
     * 获取媒体项信息的方法。
     * @type {(userId: string, itemId: string) => Promise<ItemInfo>}
     */
    getItem: (userId: string, itemId: string) => Promise<ItemInfo>

    /**
     * 获取下一集信息的方法。
     * @type {(params: { SeriesId: string, UserId: string }) => Promise<{ Items: ItemInfo[] }>}
     */
    getNextUpEpisodes: (params: {
      SeriesId: string
      UserId: string
    }) => Promise<{ Items: ItemInfo[] }>

    /**
     * 获取媒体项列表的方法。
     * @type {(userId: string, params: { parentId: string }) => Promise<{ Items: ItemInfo[] }>}
     */
    getItems: (
      userId: string,
      params: { parentId: string }
    ) => Promise<{ Items: ItemInfo[] }>
  }

}

// 假设 ApiClient 是全局对象
declare const ApiClient: ApiClientType
