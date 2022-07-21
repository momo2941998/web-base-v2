export const vietnameDatetime = (dateString: string) => {
  try {
    let date = new Date(dateString)
    return date.toLocaleString("vi")
  } catch (error) {
    return dateString
  }
}

export const  momentGetDate =(data: any) => {
  return data.format("YYYY-MM-DD") as string
}

export const momentVietnamFormat = "HH:mm:ss DD/MM/YYYY"