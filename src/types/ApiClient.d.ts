// 定义 ApiClient 的类型接口
type MediaStream = {
  Id: string
  Codec: string
  IsExternal: boolean
  Language: string
  DisplayTitle: string
  Path: string
}

type MediaSource = {
  Id: string
  Path: string
  MediaStreams: MediaStream[]
  Container: string
}

type UserData = {
  PlaybackPositionTicks: number
}

type ItemInfo = {
  Id: string
  Type: string
  MediaSources: MediaSource[]
  UserData: UserData
}

type ApiClientType = {
  _serverInfo: { UserId: string }
  _serverAddress: string
  accessToken: () => string
  getPublicSystemInfo: () => Promise<object>
  getItem: (userId: string, itemId: string) => Promise<ItemInfo>
  getNextUpEpisodes: (params: { SeriesId: string, UserId: string }) => Promise<{ Items: ItemInfo[] }>
  getItems: (userId: string, params: { parentId: string }) => Promise<{ Items: ItemInfo[] }>
}

// 声明 ApiClient 为全局常量
declare const ApiClient: ApiClientType

// 使用 ApiClient
if (ApiClient) {
  ApiClient.getPublicSystemInfo().then((info) => {
    console.log('服务器信息:', info)
  })
    .catch((error) => {
      console.error('获取服务器信息失败:', error)
    })
}
else {
  console.error('ApiClient 未加载，请确保在 Emby 网页中运行此脚本。')
}
