
var express = require('express');
var router = express.Router();
var Todo = require('../models/todos');
// 新建任务 
router.post('/create', function (req, res) {
    new Todo({ //实例化对象，新建数据
        username:req.user.name,
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
//改任务状态
router.post('/changeStatus', (req, res, next) => {

    Todo.findOne({_id: req.body._id},function (err, data) {
        if (data) {
            console.log(data)
            var newtask={
        
                username:data.username,
                todoname:data.todoname,
                status:!data.status
            }
            Todo.update({_id: req.body._id}, newtask,(err, result) => {
                if(err) return console.log(err)
                console.log(result.result)
                var response = {
                    code: 200,
                    message: "修改成功"
                  }
                 res.json(response); })
        }})
   
        // res.send("<a href='/'>删除成功，点击返回首页</a>")
   
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
// 获取用户任务列表
router.post('/todoList', function (req, res) {

    var todoList = Todo.find({username: req.user.name }, function (err, data) {
        if (err) throw  err;
        res.send(data)
    });
});
module.exports = router;








// router.get('/api/profile',auth,async(req,res) =>{
//     res.send(req.user)
// })
// router.post('/create', function(req, res) {
//     console.log('req.body', req.body);
//     new TodoModel({ //实例化对象，新建数据
//         content: req.body.content,
//         updated_at: Date.now()
//     }).save(function(err, todo, count) { //保存数据
//         console.log('内容', todo, '数量', count); //打印保存的数据
//         res.redirect('/'); //返回首页
//     });
//   });

// router.post('/submit',(req,res,next)=>{
//  var user = new User({
//      userName:'adfhmin',

//  });
//  user.save((err)=>{ //添加
//      console.log('save status:', err ? 'failed' : 'success');
//  });

//  user.find({ //查找
//      username:'admin',
//      password:'123'
//  },(err, docs)=>{
//      if(err){
//          res.send('server or db error');
//      }else{
//          console.log('登录成功用户：'+docs);
//          if(docs.length==0){
//              res.send('用户名或密码有误');
//          }else{
//              req.session.user = {
//                  _id:docs[0]._id,
//                  username:docs[0].username
//              };
//              res.send('login success');
//          }
//      }
//  });
//  user.find({ userName: 'Longyun' }).toArray((err, docs) => {
//     console.log('有如下数据：')
//     console.log(docs)
//   })
//   user.findOne({ //查找一条
//         username:'admin',
//         password:'123'
//     },(err, doc)=>{
//         if(err){
//             res.send('server or db error');
//         }else{
//             console.log('登录成功用户：'+doc);
//             if(doc==null){
//                 res.send('用户名或密码有误');
//             }else{
//                 req.session.user = {
//                     _id:doc._id,
//                     username:doc.username
//                 };
//                 res.send('login success');
//             }
//         }
//     })

// });

// // express.get("/addUser",function (request, response) {
// //     let data = {
// //       name: request.query.myinput
// //     }
// //     console.log(data)
// //     var addUser = new User(data)
// //     addUser.save()
// //     response.send(JSON.stringify(data))
// //   })
