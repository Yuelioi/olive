# OLive

This is a project to watch video with your friends

## TODO

F5 刷新会重新创建房间!!!

F5创建房间, 没有获取房间人数

进入直播间时,先同步一下(可以基于用户类型 发送sync) 由于浏览器限制, 建议先播放再同步

需要加个映射(私聊)

△ 一般功能

目前是给所有客户端, 应该基于roomId发送

加入房间失败,记得加个跳转

播放列表

△ UI相关

ui, 播放列表放右边 添加视频加个标题 增删 删除全部 置顶 上下移位
播放完事件切p, 聊天放下面

同步按钮

检查是否有房间 追加创建房间按钮

## 杀程序

Stop-Process-Id (Get-NetTCPConnection-LocalPort 8081).OwningProcess
