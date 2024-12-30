//stateful

// const sessionIdUserMap = new Map() 
// function setUser(id, user){
//     sessionIdUserMap.set(id, user)
// }

// function getUser(id){
//     return sessionIdUserMap.get(id)
// }

// module.exports = {
//     setUser,
//     getUser,
//   };

//stateless
const jwt = require('jsonwebtoken')
const secret = 'mansha@123';
function setUser(user){ // this function make tokens
    return jwt.sign({
        _id : user._id,
        email : user.email,
        role : user.role
    }, secret) // this will mark or sign user with secret id
}

function getUser(token){
    if(!token) return null
    try{
        return jwt.verify(token, secret) // verify user with secret key
    }
    catch(error){
        return null
    }
}

module.exports = {
    setUser,
    getUser
}