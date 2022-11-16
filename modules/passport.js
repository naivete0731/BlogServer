const jwt = require('jsonwebtoken')
const config = require('config')

const getToken = (data) => {
  const token = jwt.sign({
    data,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60)
  },config.get('secretKey')
  )
  return token
}

const verifyToken = (token) => {
  
  // console.log(decoded);
  token = token.split(' ')[1]
  try {
    const decoded = jwt.verify(token, config.get('secretKey'))
    return decoded
  } catch (err) {
    return 'UnauthorizedError'
  }
 
}

module.exports = {
  getToken,
  verifyToken
}