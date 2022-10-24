const checkAuth = require('../middleware/checkAuth');
const db = require('../database/db')
const router = require('express').Router();

router.get('/:username', checkAuth, (req, res) => {
    db.getUserId(req.params.username, (result) => {
        if (result) {
           db.getTransactionsCount(result,(r)=>{
            res.json(r)
           })
        } else {
            res.status(400)
        }
    })
})
