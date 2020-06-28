import { httpPost } from '../components/Fetch'

export function createtodoService (todoname, status) {
    httpPost('http://localhost:3001/todos/create', {
        todoname: todoname,
        status: status
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
        if (data.code === 200) {
            //   alert("新建任务成功")
        }
    }).catch(function (error) {
        console.log(error)
    })
}

export function deleteService (_id) {
    httpPost('http://localhost:3001/todos/del', {
        _id: _id,

    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
        if (data.code === 200) {
            // alert("删除任务成功")
        }
    }).catch(function (error) {
        console.log(error)
    })
}

export function deleteCompletedService () {
    httpPost('http://localhost:3001/todos/delteCompleted').then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
        if (data.code === 200) {

            // alert("删除已完成任务成功")
        }
    }).catch(function (error) {
        console.log(error)
    })
}

//完成任务，即切换任务状态
export function completeService (_id) {
    httpPost('http://localhost:3001/todos/changeStatus', {
        _id: _id,
    }).then((response) => {
        return response.json()
    })
}