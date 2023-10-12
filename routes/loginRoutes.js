const express =  require('express')
const router = express.Router()
const path = require('path')
const CyclicDb = require("@cyclic.sh/dynamodb")
const { v4: uuidv4 } = require('uuid');
const db = CyclicDb("dark-gold-leopard-slipCyclicDB")


router.get('/',(req,res)=>{
    res.redirect('/admin/login')
})
// Merchant Admin Login Portal
router.get('/admin/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public' + '/login.html'));
});

// // Confirm the Login and password
router.post('/admin/login', async (req, res) => {
    let user = db.collection('User')
    let key = uuidv4();
    // create an item in collection with key "leo"
    let userString = await user.set(key, {
        email: req.body.email,
        password: req.body.password
    })

    // get an item at key "leo" from collection animals
    let item = await user.get(key)
    console.log(item)

    try {
        res.redirect( req.originalUrl + '/' + key + '/verificatoin_code')
        console.log(key)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

router.get('/admin/login/:id/verificatoin_code', async (req, res) => {
    let existingUser = req.params.id
    let user = db.collection('User')
    let item = await user.get(existingUser)
    console.log(item)
    
    try{
        res.sendFile(path.join(__dirname + '/../public' + '/confirmation.html'));
    } catch (error) {
        res.json({ message: "error" })
    }
});

// router.put('/admin/login/:id/verificatoin_code', async (req, res) => {
//     let existingUser = req.params.id
//     let user = db.collection('User')
//     let userString = await user.set(existingUser, {
//         otp: req.body.text
//     })
//     let item = await user.get(existingUser)
//     console.log(item)

//     try{
//         res.sendFile(path.join(__dirname + '/../public' + '/index2.html'));
//     } catch (error) {
//         res.json({ message: "error" })
//     }
// });

module.exports = router