const router = require('express').Router();
const database = require('../database/db')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')

router.post('/signup',
    [
        check("email", "Please provide a valid email").isEmail(),
        check("password").isLength({
            min: 8
        })
    ]
    , async (req, res) => {
        const { password, email, name } = req.body;
        console.log(req.body)
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
        }

        let hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)

        database.findUser(email, () => {
            res.status(400).json({
                'erorrs': [
                    { "msg": "The user already exists" }
                ]
            })
        })

        database.insertNewUser({ 'name': name, 'email': email, 'password': hashedPassword, 'createdAt': '2008-11-11' })

        const token = jwt.sign({
            email
        }, "lcalscmzxc993nasmllKHIZ**(ASnlkn...jsllk",
            {
                expiresIn: 360000
            })
        res.json({ token })
    })


router.post('/login', [
    check("email").isEmail(),
    check("password").isLength({
        min: 8
    })
], (req, res) => {
    const { password, email } = req.body;

    if (password == undefined || email == undefined) {
        res.status(400).json({
            'erorrs': [
                { "msg": "email or password is undefined!!" }
            ]
        })
    }
    database.findUser(email, async (result) => {
        console.log(result)
        console.log(result['_password'])
        let isMatched = await bcrypt.compare(password, result['_password'])
        if (isMatched) {
            const token = jwt.sign({
                email
            }, "lcalscmzxc993nasmllKHIZ**(ASnlkn...jsllk",
                {
                    expiresIn: 360000
                })
            console.log('logged')
            console.log(`token:${token}`)
            res.json({ token })
        } else {
            res.status(400).json({
                'erorrs': [
                    { "msg": "The user does not  exists" }
                ]
            })
        }

    })


})


router.get('/', (req, res) => {
    console.log(req.body)
    res.send('Hi')
})

module.exports = router
