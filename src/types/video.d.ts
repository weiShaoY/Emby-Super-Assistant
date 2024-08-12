/**
 *  视频类型
 */
 type VideoType = {

   /**
    * 视频名称 (去除扩展名)
    */
   videoName: string

   /**
    * 视频完整名称 (包含扩展名)
    */
   videoFullName: string

   /**
    * 视频处理后的名称 (去除扩展名，去除视频标签，转换为小写)
    */
   videoProcessedName: string

   /**
    * 视频文件标签名
    */
   videoTagName: string []

   /**
    * 视频扩展名
    */
   videoExtensionName: string

   /**
    * 目录结构
    */
   directoryStructure: string[]

   /**
    * 是否为中文字幕
    */
   isChineseSubtitle: boolean
 }
