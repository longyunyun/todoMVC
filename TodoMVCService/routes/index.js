// routes/index.js
var express = require('express');
var router = express.Router();
var Todo = require('../models/todos');
 
// /* /根路径 跳转至login.html */
// router.get('/', function(req, res, next) {
//   res.sendfile('./views/login.html'); 
// });
// /* /a 跳转至register.html */
// router.get('/a', function(req, res, next) {
//   res.sendfile('./views/register.html'); 
// });
 
 
router.get('/login', function (req, res) {
    res.render('login');
});
router.get('/register', function (req, res) {
    res.render('register');
});
 
// 新建任务 
router.post('/create', function (req, res) {
	var postData = {
        userid: req.body.userid,
        todoname: req.body.todoname,
        status:req.body.status
    };
    new Todo({ //实例化对象，新建数据
        userid: req.body.userid,
     
        todoname: req.body.todoname,
        status:req.body.status
    }).save(function(err, todoname, status) { //保存数据
        console.log('内容', todoname, '状态', status); //打印保存的数据
        if(err) {throw err}
        else{
            var response = {
                code: 200,
                message: "添加待办成功"
              }
             res.json(response);
        }
      
    });
   
});
 // 删除任务
 router.get('/del', (req, res, next) => {
    let response = res
    Todo.find({}, (err, result, res) => {
        if(err) return console.log(err)
        response.render('del', { result })
    })
})
router.post('/del', (req, res, next) => {
    Todo.remove({_id: req.body._id}, (err, result) => {
        if(err) return console.log(err)
        console.log(result.result)
        var response = {
            code: 200,
            message: "删除成功"
          }
         res.json(response);
        // res.send("<a href='/'>删除成功，点击返回首页</a>")
    })
})
 // 修改任务
 router.get('/update', (req, res, next) => {
    let response = res
    classModel.find({}, (err, result, res) => {
        if(err) return console.log(err)
        response.render('update', { result })
    })
})
router.post('/update', (req, res, next) => {
    console.log(req.body)
    let num = req.body.num,
        condiction = {_id: req.body._id[num]},
        query = {$set: {name: req.body.name[num], studentId: req.body.student_id[num]}}
    classModel.update(condiction, query, (err, result) => {
        if(err) {
            console.log(err)
            res.send('<script>alert("请勾选待修改的学生")</script>')
        }
        res.send("<a href='/'>修改成功，点击返回首页</a>")
    })
})

router.get('/del.html', function(req, res, next) {
    var id=req.query.id;  //获取url后的?id的值。get提交，就用query获取参数
    console.log('id='+id);
    if(id&&''!=id){  
        member_integrals.findByIdAndRemove(id,function(err,docs){  //删除执行函数
             console.log('delete-----'+docs);
             res.render('index', { title: 'Express Demo Example' });
        });
    }
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
    Todo.findOne({username: postData.username}, function (err, data) {
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
 
// 获取所有用户列表
router.get('/todoList', function (req, res) {
    var todoList = Todo.find({}, function (err, data) {
        if (err) throw  err;
        res.send(data)
    });
});
 
module.exports = router;
