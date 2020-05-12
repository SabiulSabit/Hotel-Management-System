//moduler 
var mysql = require('mysql');



// show the home page
exports.getHome = (req, res, next) => {
   res.render('user/home');
}

//show the login page
exports.getLogin = (req, res, next) => {
   res.render('user/loginAccount', { msg: [], err: [] });
}


// show create account page
exports.getCreateAccount = (req, res, next) => {

   res.render('user/createAccount', { msg: [], err: [] })
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
      return res.render("user//createAccount", { msg: [], err: ["Password Doesn't Match"] })
   }

   var data = "INSERT INTO user " +
      " VALUES ( '" + req.body.name + "' ,'" + req.body.mail + "','" + req.body.phone + "','" + p1 + "')";

   connectDB.query(data, (err, result) => { 
      if (err) throw err;// if db has error, show that 
      else {
         res.render('user/loginAccount', { msg: ["Account Create Successfuly"], err: [] }); //show login page
      }
   })

}