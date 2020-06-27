var express = require('express');
var router = express.Router();
var User = require('../models/users');
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   // res.send('respond with a resource');
//   res.json([{
//     id: 1,
//     username: "samsepi0l"
// }, {
//     id: 2,
//     username: "D0loresH4ze"
// }]);

// });
// 这里的业务逻辑将写在 两个post 路由里 
router.post('/login', function (req, res) {
	var postData = {
        username: req.body.username,
        password: req.body.password
    };
    User.findOne({
        username: postData.username,
        password: postData.password
    }, function (err, data) {
        if(err) {throw err};
  
        if(data){
            var response = {
                code: 200,
                message: "登录成功"
              }
             res.json(response);
            // res.send('登录成功');
        }else{
            var response = {
                code: 404,
                message: "账号或密码错误"
              }
             res.json(response);
            // res.send('账号或密码错误')
        }
    } )
});
router.post('/register', function (req, res) {
        // 获取用户提交的信息
    var postData = {
        username: req.body.username,
        password: req.body.password,
        age: req.body.age,
        address: req.body.address
    };
    // 查询是否被注册
    User.findOne({username: postData.username}, function (err, data) {
        if (data) {
            res.send('用户名已被注册');
        } else {
            // 保存到数据库
            User.create(postData, function (err, data) {
                if (err){throw err} 
                else {
                    　               var response = {
                                         code: 200,
                                         message: "用户注册成功！"
                                       }
                                      res.json(response);
                    
                                }
                            
            })
        }
    });
});
module.exports = router;
