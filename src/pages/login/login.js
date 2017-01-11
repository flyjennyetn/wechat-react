import wx, { Component, PropTypes } from 'labrador';
import { connect, getStore} from 'labrador-redux';
import {isNot,isNotNullObj} from '../../utils/common';

class Login extends Component {

  state = {
    userInfo:{},
    title: '青少年第一人',
    showTopTips:false,
    msg:''
  };

  bindKeyName(e){
      this.state.userInfo.name = e.detail.value;
  }
  bindKeyPpassword(e){
      this.state.userInfo.password = e.detail.value;
  }
  closeTips(){
      setTimeout(()=>{
          this.setState({
              showTopTips: false
          });
      }, 3000);
  }

  userVerify(){
      const {name,password} = this.state.userInfo
      if(!isNot(name)){
           this.setState({
              showTopTips: true,
              msg:"用户名不能为空"
          });
          this.closeTips();
          return false;
      }
      if(!isNot(password)){
          this.setState({
              showTopTips: true,
              msg:"密码不能为空"
          });
          this.closeTips();
          return false;
      }
      getStore().dispatch({
          type:'login/query',
          userInfo:this.state.userInfo
      })
  }

  onUpdate(props){
    // console.log(props);
    if(props.user.userData !== null){
        wx.switchTab({
            url: '../index/index'
        })
    }
  }

}


function mapStateToProps({user}) {
    return {user}
}
export default connect(mapStateToProps)(Login)

