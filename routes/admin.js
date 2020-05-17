const express = require('express');
const path = require('path');


const router = express.Router();

const adminControler = require('../controllers/admin');


router.route('/')
   .get(adminControler.getLogin) //get request
   .post(adminControler.postLogin) // post request

router.get('/logout',adminControler.logout) //get request   

router.post('/chnagestatus',adminControler.postChnageStatus)// post change status

router.route('/addhotel')
      .get(adminControler.getAddHotel)
 

module.exports = router;