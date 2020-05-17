var mysql = require('mysql');

// login get request
exports.getLogin = (req, res, next) => {
    if (req.session.admin == undefined) {
        res.render('admin/login', { msg: "", err: "" });
    }
    else {
        var connectDB = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "hotel"
        });
        data1 = "SELECT * " +
            "FROM  bookingstatus " +
            "WHERE status = 0 ";
        connectDB.query(data1, (err1, result1) => {
            if (err1) throw err1;
            else {
                for (i in result1) {
                    var a = result1[i].date;
                    result1[i].date = a.toString().slice(0, 15);
                }
                return res.render('admin/index', { msg: "", err: "", data: result1 });
            }
        })
    }

}

//login post request
exports.postLogin = (req, res, next) => {

    var connectDB = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "hotel"
    });

    data = "SELECT * " +
        "FROM admin " +
        "WHERE name = " + mysql.escape(req.body.name) +
        "AND pass = " + mysql.escape(req.body.pass);

    data1 = "SELECT * " +
        "FROM  bookingstatus " +
        "WHERE status = 0 ";

    connectDB.query(data, (err, result) => {
        if (err) throw err;
        else {
            if (result.length) {
                req.session.admin = result[0].name;
                connectDB.query(data1, (err1, result1) => {
                    if (err1) throw err1;
                    else {
                        for (i in result1) {
                            var a = result1[i].date;
                            result1[i].date = a.toString().slice(0, 15);
                        }
                        return res.render('admin/index', { msg: "", err: "", data: result1 });
                    }
                })

            }
            else {
                return res.render('admin/login', { msg: "", err: "Please Check Your Information Again" });
            }
        }
    })
}

//change booking status
exports.postChnageStatus = (req, res, next) => {
    //console.log(req.body);

    var connectDB = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "hotel"
    });

    var value = 0;

    if (req.body.click == "Approve") {
         value = 1;

    } else {
        value = -1;
    }
        data = "UPDATE bookingstatus " +
            " SET  status = " +mysql.escape(value)+
            " WHERE email = " + mysql.escape(req.body.mail) +
            " AND type = " + mysql.escape(req.body.type) +
            " AND category = " + mysql.escape(req.body.cat) +
            " AND roomWant = " + mysql.escape(req.body.want)
        data1 = "SELECT * " +
            "FROM  bookingstatus " +
            "WHERE status = 0 ";

        connectDB.query(data, (err, result) => {
            if (err) throw err;
            else {
                connectDB.query(data1, (err1, result1) => {
                    if (err1) throw err1;
                    else {
                        for (i in result1) {
                            var a = result1[i].date;
                            result1[i].date = a.toString().slice(0, 15);
                        }
                        return res.render('admin/index', { msg: "", err: "", data: result1 });
                    }
                })
            }
        })
    
}

//get add hotel page

exports.getAddHotel =(req,res,next)=>{
    res.render('admin/addhotel',{ msg: "", err: ""});
}


//get update page
exports.getSearch =(req,res,next)=>{
  res.render('admin/search',{msg: "", err: ""})
}

//post request
exports.postSearch = (req,res,next)=>{
    //console.log(req.body);

    var connectDB = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "hotel"
    });

    data = "SELECT * "+
           "FROM category "+
           "WHERE name = "+mysql.escape(req.body.cat);

    connectDB.query(data,(err,result)=>{
        if(err) throw err;
        else{
            return res.render('admin/update',{msg: "", err: "",data:result});
        }
    })       
    
 }

 //get update page 

 exports.getUpdate = (req,res,next)=>{
    // console.log(req.body);
     var connectDB = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "hotel"
    });
    
    data =  "SELECT * "+
             "FROM category "+
             "WHERE name = "+mysql.escape(req.body.cat)+
             " AND type = "+mysql.escape(req.body.type)+
             " AND cost = "+mysql.escape(req.body.cost);  

    connectDB.query(data,(err,result)=>{
        if(err) throw err;
        else{
            req.session.info= result[0];
            res.render('admin/updatePage',{data: result[0]});
        }
    })
 }

 //update previous data

 exports.updatePrevData =(req,res,next)=>{
     
    var connectDB = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "hotel"
    });
    
    data = "UPDATE category "+
           "SET type = "+mysql.escape(req.body.type)+
           ", cost = "+mysql.escape( parseInt(req.body.cost))+
           ", available = "+mysql.escape( parseInt(req.body.avlvl))+
           ", `dec` = "+mysql.escape(req.body.des) +
           " WHERE name = "+mysql.escape(req.session.info.name) +
           " AND type = "+mysql.escape(req.session.info.type) +
           " AND cost = "+mysql.escape(parseInt(req.session.info.cost))

    //  console.log(req.session.info);    
    //  console.log(req.body); 
    //  console.log(data);        

   connectDB.query(data,(err,result)=>{
       if(err) throw err;
       else{
        res.render('admin/search',{msg: "Update Done Successfuly", err: ""})
       }
   })

 }
 

//logout
exports.logout = (req, res, next) => {
    req.session.destroy();
    res.render('admin/login', { msg: "", err: "" });
}

