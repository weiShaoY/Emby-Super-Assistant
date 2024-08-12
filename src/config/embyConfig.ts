/**
 *  Emby 配置
 */
export const embyConfig = {
  /**
   * Emby 服务器的 URL。
   */
  url: 'http://192.168.0.4:8096',

  /**
   * Emby 服务器用户 ID。
   */
  userId: 'bd743a8bac9247fb9f5cad8b08945906',

  /**
   * 发起请求的设备名称。
   */
  deviceName: 'Chrome Windows',

  /**
   * 发起请求设备的 ID。
   */
  deviceId: 'aa94db6f-fb2d-48d8-a6e1-6b67b3d90036',

  /**
   * Emby 客户端的版本号。
   */
  clientVersion: '4.8.8.0',

  /**
   * Emby 服务器使用的语言代码。
   */
  language: 'zh-cn',

  /**
   * 用户的认证令牌。
   */
  token: 'abcc5517089e4e28bf46d4cd3e3a74b9',

  /**
   * 发送到 Emby 服务器的查询字符串参数。
   */
  queryParams: {
    /**
     * 搜索词。
     */
    SearchTerm: '',

    /**
     * 指定返回的字段列表。
     */
    Fields:
      'BasicSyncInfo,CanDelete,PrimaryImageAspectRatio,ProductionYear,Status,EndDate',

    /**
     * 查询结果的起始索引。
     */
    StartIndex: 0,

    /**
     * 指定排序的字段。
     */
    SortBy: 'SortName',

    /**
     * 排序的顺序（升序或降序）。
     */
    SortOrder: 'Ascending',

    /**
     * 启用的图像类型。
     */
    EnableImageTypes: 'Primary,Backdrop,Thumb',

    /**
     * 每种类型的图像数量限制。
     */
    ImageTypeLimit: 1,

    /**
     * 是否递归查询子项。
     */
    Recursive: true,

    /**
     * 是否按系列分组节目。
     */
    GroupProgramsBySeries: true,

    /**
     * 返回结果的最大数量。
     */
    Limit: 50,
  },
}

export default embyConfig
