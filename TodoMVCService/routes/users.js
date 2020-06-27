var express = require('express')
var router = express.Router()
var User = require('../models/users')
const jwt = require('jsonwebtoken')
var settoken = require('../public/javascripts/token_vertify.js')
// 登录并生成token 
router.post(('/login'), (req, res) => {
    //接收post数据
    var postuser = {
        username: req.body.username,
        password: req.body.password
    }
    //查询数据库
    User.findOne({
        username: postuser.username,
    }).then(user => {
        if (!user) {
            return res.status(404).json("用户不存在")
        }
        if (req.body.password == user.password) {
            settoken.setToken(user.username).then((data) => {
                return res.json({
                    code: 200,
                    success: true,
                    token: data
                })
            })
        }
        else {
            return res.status(400).json("密码错误")
        }
    })
})

router.post('/register', function (req, res) {
    // 获取用户提交的信息
    var postData = {
        username: req.body.username,
        password: req.body.password,
    }
    User.findOne({ username: postData.username }, function (err, data) {
        if (data) {
            res.send('用户名已被注册')
        } else {
            // 保存到数据库
            User.create(postData, function (err, data) {
                if (err) { throw err }
                else {
                    //token
                    settoken.setToken(postData.username).then((data) => {
                        return res.json({
                            code: 200,
                            success: true,
                            token: data
                        })
                    })
                }
            })
        }
    })

})
module.exports = router
