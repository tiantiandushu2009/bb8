const TokenKey = 'authToken'

export function getToken(key = TokenKey) {
  try {
    return localStorage.getItem(key)
  } catch (error) {
    console.error(error)
    return null
  }
}

export function setToken(value, key = TokenKey) {
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    console.error(error)
  }
}

export function cleanToken() {
  try {
    localStorage.clear()
  } catch (error) {
    console.error(error)
  }
}
