var mysql = require('mysql');

// login get request
exports.getLogin = (req,res,next)=>{
    if(req.session.admin == undefined){
        res.render('admin/login',{msg:"", err: ""});
    }
    else{
        var connectDB = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "hotel"
         });
         data1 = "SELECT * "+
            "FROM  bookingstatus "+
            "WHERE status = 0 "; 
        connectDB.query(data1,(err1,result1)=>{
                if(err1) throw err1;
                else{
                    return res.render('admin/index',{msg:"", err: "",data: result1});
                }
         })
    }
   
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

    data1 = "SELECT * "+
            "FROM  bookingstatus "+
            "WHERE status = 0 ";       

     connectDB.query(data,(err,result)=>{
         if(err) throw err;
         else{
             if(result.length){
                 req.session.admin =  result[0].name;
                 connectDB.query(data1,(err1,result1)=>{
                        if(err1) throw err1;
                        else{
                            return res.render('admin/index',{msg:"", err: "",data: result1});
                        }
                 })
                
             }
             else{
                return res.render('admin/login',{msg:"", err: "Please Check Your Information Again"});
             }
         }
     })       
}


exports.logout = (req,res,next)=>{
    req.session.destroy();
    res.render('admin/login',{msg:"", err: ""});
}

