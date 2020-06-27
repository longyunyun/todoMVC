import React, { Component } from 'react'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../redux/actions/login'
 
 class Login extends Component {
                 constructor(props) {
                   super(props)
                   this.handleAccount = this.handleAccount.bind(this)
                   this.handlePW = this.handlePW.bind(this)
                   this.handleSubmit = this.handleSubmit.bind(this)
                 }
                 handleAccount(e) {
                   this.props.actions.updateAccount(e.target.value )
                 }
                handlePW(e) {
                  this.props.actions.updatePsW(e.target.value)
                 }
                handleSubmit() { 
                    alert('提交表单')
                }
                 render() {
                   return (
                       <div>
                         <div className="title">
                         <h1>React</h1>
                         </div>
                         <div className="content">
                           <div>
                             <label htmlFor="">账号：</label>
                             <input
                               type="text"
                               value={this.props.state.account}
                               placeholder="请输入账号"
                               onChange={this.handleAccount}
                             />
                           </div>
                           <div>
                             <label htmlFor="">密码：</label>
                             <input
                               type="passwork"
                               value={this.props.state.passWork}
                               placeholder="请输入密码"
                               onChange={this.handlePW}
                             />
                           </div>
                           <div>
                             <button
                                 type="button"
                                 onClick={this.handleSubmit}
                               >
                                 登录
                               </button>
                           </div>
                         </div>
                       </div>
                   )
                 }
               }
//需要渲染什么数据
function mapStateToProps(state) {
  console.log(state,'====Login-dtate')
  return { state:state.login}
}
//1、不使用bindActionCreators时候：
// function mapDispatchToProps(dispatch) {
//   console.log(dispatch, '====Login-Dispatch000000')
//   return {
//     updateAccount: (value) => dispatch({ type: 'UPDATE_ACCOUNT', value}),
//     updatePW: (value) => dispatch({ type: 'UPDATE_PASSWORK', value }),
//   } 
// }
// 2、通过把aciont和dispatch链接起来
function mapDispatchToProps(dispatch) {
  console.log(dispatch, '====Login-Dispatch000000')
  return {
    actions: bindActionCreators(loginActions,dispatch)
  }
}
export default connect(mapStateToProps , mapDispatchToProps)(Login);
