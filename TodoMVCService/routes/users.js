var express = require('express')
var router = express.Router()
var User = require('../models/users')
var bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

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
    })
        .then(user => {
            if (!user) {
                return res.status(404).json("用户不存在")
            }
            if (req.body.password == user.password) {
                //验证通过 token
                const rule = {

                    username: user.username,
                }
                jwt.sign(rule, config.secrete, {
                    expiresIn: 3600
                }, (err, token) => {
                    if (err) throw err
                    res.json({
                        code: 200,
                        success: true,
                        token: "Bearer " + token
                    })
                })
            } 
            else 
            {
                return res.status(400).json("密码错误")
            }
        }
        )
}
)

router.post('/register', function (req, res) {
    // 获取用户提交的信息
    var postData = {
        username: req.body.username,
        password: req.body.password,
    }
    // 查询是否被注册
    User.findOne({ username: postData.username }, function (err, data) {
        if (data) {
            res.send('用户名已被注册')
        } else {
            // 保存到数据库
            User.create(postData, function (err, data) {
                if (err) { throw err }
                else {
                    //token
                    const rule = {
                        username: postData.username,
                    }
                    jwt.sign(rule, config.secrete, {
                        expiresIn: 3600
                    }, (err, token) => {
                        if (err) throw err
                        res.json({
                            code: 200,
                            success: true,
                            token: "Bearer " + token
                        })
                    })
                }
            })
        }
    })
})
module.exports = router
