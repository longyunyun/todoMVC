
var express = require('express')
var router = express.Router()
var Todo = require('../models/todos')
// 新建任务 
router.post('/create', function (req, res) {
    new Todo({ //实例化对象，新建数据
        username: req.user.name,
        todoname: req.body.todoname,
        status: req.body.status
    }).save(function (err, todoname, status) { //保存数据

        if (err) { throw err }
        else {
            var response = {
                code: 200,
                message: "添加待办成功"
            }
            res.json(response)
        }
    })
})

router.post('/del', (req, res, next) => {
    Todo.remove({ _id: req.body._id }, (err, result) => {
        if (err) return console.log(err)
    
        var response = {
            code: 200,
            message: "删除成功"
        }
        res.json(response)
    })
})
//删除用户所有已完成任务
router.post('/delteCompleted', (req, res, next) => {
    Todo.find({ username: req.user.name, status: false }, function (err, data) {
        if (data) {
        
            data.forEach((element) => {
                Todo.remove({ _id: element._id }, (err, result) => {
                    if (err) return console.log(err)
                })
            })
            var response = {
                code: 200,
                message: "批量删除已完成任务成功"
            }
            res.json(response)
        }
    })

})
//改任务状态
router.post('/changeStatus', (req, res, next) => {
    Todo.findOne({ _id: req.body._id }, function (err, data) {
        if (data) {
         
            var newtask = {
                username: data.username,
                todoname: data.todoname,
                status: !data.status
            }
            Todo.update({ _id: req.body._id }, newtask, (err, result) => {
                if (err) return console.log(err)
             
                var response = {
                    code: 200,
                    message: "修改成功"
                }
                res.json(response)
            })
        }
    })
})

// 获取用户任务列表
router.post('/todoList', function (req, res) {
    Todo.find({ username: req.user.name }, function (err, data) {
        if (err) throw err
        res.send(data)
    })
})
module.exports = router



