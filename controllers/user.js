//moduler 
var mysql = require('mysql');



//authentication check
exports.authentication =(req,res,next)=>{
    
   if(req.session.mail != undefined){
      next();
   }
   else{
      res.render('user/home',{user: ""});
   }
}

// show the home page
exports.getHome = (req, res, next) => {
    
   if(req.session.mail != undefined){
    return  res.render('user/home',{user: req.session.mail}); 
   }
   else{
      return  res.render('user/home',{user: ""});
   }
}

//show the login page
exports.getLogin = (req, res, next) => {
   res.render('user/loginAccount', {user: "" ,msg: [], err: [] });
}

//post page of login
exports.postLogin = (req,res,next)=>{

   var connectDB = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "hotel"
   });

   data =  "SELECT * "+
            "FROM  user "+
            "WHERE email = "+mysql.escape(req.body.mail)+
            " AND password = "+mysql.escape(req.body.pass);

   connectDB.query(data,(err,result)=>{
      if(err) throw err; // show if any error have
      else{
         if(result.length){
             req.session.mail =  result[0].email;
             res.render('user/home',{user: result[0].email});
         }
         else{
            res.render('user/loginAccount', {user: "", msg: [], err: ["Please Check Your information again"] });
         }
         
      }
   })         

}


// show create account page
exports.getCreateAccount = (req, res, next) => {
   res.render('user/createAccount', {user: "", msg: [], err: [] })
}

//get data from user for create account
exports.postCreateAccount = (req, res, next) => {

   var connectDB = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "hotel"
   });

   var p1 = req.body.pass;
   var p2 = req.body.con_pass;

   if (p1 != p2) { // if password doesn't match 
      return res.render("user//createAccount", {user: "", msg: [], err: ["Password Doesn't Match"] })
   }

   var data = "INSERT INTO user " +
      " VALUES ( '" + req.body.name + "' ,'" + req.body.mail + "','" + req.body.phone + "','" + p1 + "')";

   connectDB.query(data, (err, result) => { 
      if (err) throw err;// if db has error, show that 
      else {
         res.render('user/loginAccount', {user: "", msg: ["Account Create Successfuly"], err: [] }); //show login page
      }
   })
}

//get request for category
exports.getCategory = (req,res,next)=>{
  
   res.render('user/category',{user: req.session.mail });
}

//post request of category
exports.postCategory = (req,res,next)=>{
   //console.log(req.body);
   var connectDB = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "hotel"
   });

   data = "SELECT * "+
          " FROM  category "+
          " WHERE name = "+mysql.escape(req.body.cat)+
          " AND type = "+mysql.escape(req.body.type) + 
          " AND available > 0";
   
   connectDB.query(data,(err,result)=>{
      if(err) throw err; //show if error found
      else { 
         //console.log(result);
         return res.render('user/showCategory',{user: req.session.mail,rooms: result })
      }
   }) 

}

// get booking data 
exports.postBooking = (req,res,next)=>{
  console.log(req.body);

  res.render('user/bookingConfirm.ejs',{user: req.session.mail});
}

//logout
exports.logout = (req,res,next)=>{
   req.session.destroy();
   res.render('user/home',{user: ""});
  
}