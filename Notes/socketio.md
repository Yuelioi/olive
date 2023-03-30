## 疑问

io.of ?

io.engine?

## 服务器实例 IO

https://socket.io/zh-CN/docs/v4/server-instance/

- socketsJoin: 使匹配的 sockets 加入指定的房间
- socketsLeave: 离开房间
- disconnectSockets: 断开连接
- fetchSockets: 查询
- serverSideEmit: 集群发消息

emit
on
once

broadcast(除发送者以外的emit):https://socket.io/zh-CN/docs/v4/broadcasting-events/

use

### Socket实例

https://socket.io/zh-CN/docs/v4/server-socket-instance/

@event

- emit: 发
- on: 接
- once: 一发

@property

- id
- rooms: 加入的房间

@data

_.data.username = xx

@example

私发消息
socket.on("private message", (anotherSocketId, msg) => {
    socket.to(anotherSocketId).emit("private message", socket.id, msg);
  });

@other

conn

disconnect

### Room

join: 加入房间 => socket.join("some room");
to : io.to("some room").emit("some event");  类似房管查房
in: io.in... 类似上面,但返回room对象
except
of

## Client

query

命名空间

### Socket

很多与服务器端Socket一致

@event

- emit: 发
- on: 接
- once: 一发

onAny / prependAny 屌屌
