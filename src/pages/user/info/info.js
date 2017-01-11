import wx, { Component} from 'labrador';
import { connect, getStore} from 'labrador-redux';
class Info extends Component {


  onLoad() {
    // getStore().dispatch({
    //   type:'user/query/pci',
    //   userData:this.props.user.userData
    // })
   
  }

  chooseImage(e) {
    wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success:  (res)=> {
            getStore().dispatch({
              type:'user/set/files',
              patch: res.tempFilePaths[0]
            })
        }
    })
  }

}


function mapStateToProps({user}) {
    return {user}
}
export default connect(mapStateToProps)(Info)

