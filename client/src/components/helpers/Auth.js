export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('token')
}

export const getPayload = () => {
  //extract from local storage
  const token = getTokenFromLocalStorage()
  if (!token) return
  //split the token into three parts
  const splitToken = token.split('.')
  if (splitToken.length < 3) return
  
  //get the payload from the first index
  return JSON.parse(atob(splitToken[1]))
}

export const userIsAuthenticated = ()=>{
  const payload = getPayload()
  if (!payload) return
  const currentTime = Math.round(Date.now() / 1000)
  return currentTime < payload.exp
}

// export const userIsCurrentUser = () =>{
  
// }

// export const lessonIsOwnedByCurrentUser = ()=>{

// }