import React, { Component } from 'react'
// 实现ui组件和数据连接
import {connect } from 'react-redux'
// 引入redux中的authAtcion.js/loginUser定义的方法
import {loginUser} from '../../actions/authAchtions'

class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      password:'',
      email:'',
      errors:{}
    }
  }
 onSubmit(e){
    e.preventDefault()
    const newUser ={
      password:this.state.password,
      email:this.state.email
    }
    // 点击登录的时候把数据存入redux的authActions.js中
    this.props.loginUser(newUser)
  }
}
// 将返回的状态转换成属性
const mapStateToProps = (state) =>({
  // auth 在reducers下定义的一大的reducers
  // auth :state.auth,
  errors:state.errors
})
export default connect(mapStateToProps,{loginUser})(Login) ;