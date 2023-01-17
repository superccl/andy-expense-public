export function getCurrentDatetime():string {
  const date = new Date()
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  const dateString = date.toISOString().slice(0, -7) + '00'
  return dateString
}

export function getDateAndTime(dateTimeString:string) {
  return {date: dateTimeString.slice(0, 10), time: dateTimeString.slice(11)}
}

export function combineDateAndTime(date:string, time:string):string {
  return date + 'T' + time
}