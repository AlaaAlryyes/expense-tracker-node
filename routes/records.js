const checkAuth = require('../middleware/checkAuth');
const db = require('../database/db');
const { json } = require('body-parser');
const router = require('express').Router();

router.get('/records', checkAuth,(req, res) => {

})


router.get('/all/:userid', checkAuth,(req, res) => {
    db.getTransactions(req.params.userid, (result) => {
        res.send(result)
    })
})

router.get('/balance/:userid', checkAuth,(req, res) => {
    db.getBalance(req.params.userid, (result) => {
        res.send(json({'balance':result[0]['SUM(value)']}))
    })
})


router.post('/',checkAuth,(req, res) => {
    console.log('request received')
    const { userId, name, value } = req.body
    db.insertTransaction({
        'userId': userId,
        'value': value,
        'name': name
    }, () => {
        res.send("A new Record is inserted")
    })
})

router.delete('/', (req, res) => {
    var { recordId } = req.body

})


module.exports = router;