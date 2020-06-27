var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
// 声明一个数据集 对象
var todoSchema = new Schema({
    userid:{
        type: String,
    },
    todoname: {
        type: String,
       
    },
    status: {
        type: Boolean
    },
 
    createAt: {
        type: Date,
        default : Date.now()
    }
});
// 将数据模型暴露出去
module.exports = mongoose.model('todos', todoSchema);
