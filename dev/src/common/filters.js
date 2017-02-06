export const formatMs = value => {
  const date = new Date(value)
  let hours = '00'
  let minute = '00'
  if (date.getMinutes() < 10) {
    minute = `0${date.getMinutes()}`
  } else {
    minute = date.getMinutes()
  }
  if (date.getHours() < 10) {
    hours = `0${date.getHours()}`
  } else {
    hours = date.getHours()
  }
  return `${hours}:${minute}`
}
