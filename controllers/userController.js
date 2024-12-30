const User = require('../models/userModel')
const {v4 : uuidv4} = require('uuid');
const {setUser} = require('../service/auth')
async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
    const user = await User.findOne({email, password});
    if(!user) 
        return res.render('login' , 
    {
        error : "Invalid username or password"
    });
    //statefull
    //  const sessionId = uuidv4()
    //  setUser(sessionId, user);
    //  res.cookie("uid" , sessionId);

    //stateless
    
    const token = setUser(user)
    res.cookie("token" , token);
  return res.redirect("/");

    //token
    //res.cookie("uid" , token);
    //return res.redirect({token});
}
module.exports = {
  handleUserSignup,
    handleUserLogin
    
}