export function getTime() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDay()
    let hour = date.getHours()
    let min = date.getMinutes()
    let sec = date.getSeconds()
    let time = {
        date1: `${year}年${month}月${day}日`,
        date2: `${year}/${month}/${day}`,
        date3: `${year}年${month}月${day}日/${hour}:${min}:${sec}`,
        date4: `${hour}:${min}:${sec}`
    }
    return time
}