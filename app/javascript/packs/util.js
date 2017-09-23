export const updateObject = (oldObject, newValues) => {
    return Object.assign({}, oldObject, newValues)
}

export const msTimeToString = (time_ms) => {
  let time_tmp = time_ms
  let ms = time_tmp % 1000
  time_tmp = (time_tmp - ms) / 1000
  var secs = time_tmp % 60
  time_tmp = (time_tmp - secs) / 60
  var mins = time_tmp % 60

  if (mins < 10) {
    mins = '0' + mins
  }

  if (secs < 10) {
    secs = '0' + secs
  }

  return mins + ':' + secs
}

export const msToMinsString = (time_ms) => {
  return Math.floor(time_ms / 60000).toString()
}
