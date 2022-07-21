import axios from "axios"

export async function getToken (username: string, password: string) {
  let url = process.env.REACT_APP_BACKEND + '/login'
  return "abc"
  let response = await axios({
    method: 'POST',
    url,
    headers: {
      'Content-type': 'application/json'
    },
    data: JSON.stringify({
      user: username,
      password: password
    })
  })
  if (response.data.status !== 200) throw new Error(`Lỗi đăng nhập`)
  let jwt = response.data.token as string
  return jwt
}


