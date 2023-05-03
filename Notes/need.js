// 消息移动到最低端

// x.scrollTop = main.scrollHeight

// 清除某个ID的内容并聚焦
// e.target.elements.xxId.value = ""
// e.target.focus()

// import moment from 'moment'

// export function formatMessage(username, text, type) {
//     return {
//         username,
//         text,
//         type,
//         time: moment().format('h:mm')
//     }
// }

var fruits = ['Banana', 'Orange', 'Apple', 'Mango']
var out = fruits.splice(2, 1, 'Lemon', 'Kiwi')
console.log(out)
