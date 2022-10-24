const checkAuth = require('../middleware/checkAuth');
const db = require('../database/db')
const router = require('express').Router();

router.get('/:username', checkAuth, (req, res) => {
    db.findUser(req.params.username, (result) => {
        if (result) {
            res.json(result)
        } else {
            res.status(400)
        }
    })
})
