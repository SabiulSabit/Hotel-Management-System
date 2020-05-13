const express = require('express');
const path = require('path');


const router = express.Router();

const userControler = require('../controllers/user');

router.get('/',userControler.getHome); //home page 
router.route('/login')
       .get(userControler.getLogin) // get request for login
       .post(userControler.postLogin)// post request for login

router.route('/createaccount') 
       .get(userControler.getCreateAccount)   //get request for create account   
       .post(userControler.postCreateAccount); //post request for create account   

router.route('/category')
       .get(userControler.authentication,userControler.getCategory) //get request for Category  
       .post(userControler.postCategory) //post request form the category
router.route('/boooking')
       .post(userControler.postBooking) //post booking data       

router.get('/logout',userControler.logout); //logout       

module.exports = router;