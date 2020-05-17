var mysql = require('mysql');

// login get request
exports.getLogin = (req,res,next)=>{

    res.render('admin/login',{msg:"", err: ""});
}

//login post request
exports.postLogin = (req,res,next)=>{

    var connectDB = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "hotel"
     });

     data = "SELECT * "+
            "FROM admin "+
            "WHERE name = "+mysql.escape(req.body.name) +
            "AND pass = "+ mysql.escape(req.body.pass);

     connectDB.query(data,(err,result)=>{
         if(err) throw err;
         else{
             if(result.length){
                 req.session.admin =  result[0].name;
                return res.render('admin/index',{msg:"", err: ""});
             }
             else{
                return res.render('admin/login',{msg:"", err: "Please Check Your Information Again"});
             }
         }
     })       
}

