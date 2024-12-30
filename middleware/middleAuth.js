const {getUser} = require('../service/auth')

function checkforAuthentication(req,res,next){
   
   //const autherisationheadervalue = req.header['authorization'];
  
   const tokencookie = req.cookies?.token;
   req.user = null
   
  //  if(!autherisationheadervalue ||
  //    !autherisationheadervalue.startsValue('bearer')
  //  ) return next();

  if (!tokencookie) {
      console.log('No token found, proceeding without authentication.');
      return next();
    }
  
    // Add a log to check if token is being passed correctly
    console.log('Processing token:', tokencookie);
  
    const token = tokencookie
   const user = getUser(token)
    req.user = user;
   return  next();
}
  
  
function restrictTo(roles = []){
    return function(req,res,next){
      if(!req.user) return res.redirect('/login')
      if(!roles.includes(req.user.role)) return res.end('unauthorised')

        return next()
    }
  
}
async function restrictTologgedinUseOnly(req,res,next){
        //const userUid = req.cookies?.uid;
        const userUid = req.header['authorization'] // req is giving a header name authorization
        
         
         if(!userUid) return res.redirect('/login');

         const token = userUid.split('Bearer')[0] // to get token we use split func
          //const user = getUser(userUid);
          const user = getUser(token);

        if(!user) return res.redirect('/login') // not verified

        req.user = user; // add to user object of request
        next();
}

async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;
  
    const user = getUser(userUid);
  
    req.user = user;
    next();
  }
module.exports = {
    checkforAuthentication,
    restrictTo,
    restrictTologgedinUseOnly,
    checkAuth
}  