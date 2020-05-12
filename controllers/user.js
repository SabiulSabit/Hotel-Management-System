
// show the home page
exports.getHome = (req,res,next)=>{ 
   res.render('user/home');
}

//show the login page
exports.getLogin = (req,res,next)=>{
   res.render('user/loginAccount');
}


// show create account page
exports.getCreateAccount = (req,res,next)=>{
   res.render('user/createAccount')
}