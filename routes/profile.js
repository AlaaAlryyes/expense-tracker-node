const checkAuth = require('../middleware/checkAuth');
const db = require('../database/db')
const router = require('express').Router();

router.get('/:username', checkAuth, (req, res) => {
    db.getUserId(req.params.username, (result) => {
        if (result) {
            res.json({
                'username':result['name'],
                'income':0,
                'outcome':0
            })
        } else {
            res.status(400)
        }
    })
})
