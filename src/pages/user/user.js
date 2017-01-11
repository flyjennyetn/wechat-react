import wx, { Component, PropTypes } from 'labrador';
import { connect, getStore} from 'labrador-redux';
import {Storage} from '../../utils/common';
class User extends Component {

  state ={
    urls:[]
  }

  onLoad() {
    const userData = Storage.get('userData');
    if (userData.token) {
        getStore().dispatch({
          type:'user/query/pci',
          userData:userData
        })
    }else{
      wx.redirectTo({
        url: '../login/login'
      })
    }

    

   
  }

  previewImage(e){
      wx.previewImage({
          current: this.props.user.userInfo.patch, // 当前显示图片的http链接
          urls: this.state.urls // 需要预览的图片http链接列表
      })
  }

  onUpdate(props){
    if(props.user.userInfo !== null){
        this.state.urls.push(props.user.userInfo.patch) 
    }
  }

}


function mapStateToProps({user}) {
    return {user}
}
export default connect(mapStateToProps)(User)

