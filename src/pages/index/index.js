import wx, { Component, PropTypes } from 'labrador';
// import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect, getStore} from 'labrador-redux';
import {isNotNullObj,Storage }from '../../utils/common';
class Index extends Component {
  //propTypes 、 defaultProps 选项都可以省略
  // static propTypes = {//静态属性是对当前组件的props参数数据类型的定义
  // };
  // static defaultProps = { //选项代表的是当前组件默认的各项参数值
  //   text: ''
  // };
  state = {
      tabs: ["下学期", "上学期"],
      activeIndex: "0",
      sliderOffset: 0,
      sliderLeft: 0,
      userData:null
  };
  tabClick(e) {
      this.setState({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
      });
  }

  learningLesson(e){
    const {lessonId} = e.target.dataset;
    const {token,grade} = this.state.userData;
    getStore().dispatch({
      type:'courses/learning',
      token,
      grade,
      lessonId
    })
  }

  onLoad() {
    const userData = Storage.get('userData');
    if (userData.token) {
      this.setState({userData:userData})
      const {token} = userData;
      getStore().dispatch({
        type:'courses/query',
        token
      })
    }else{
      wx.redirectTo({
        url: '../login/login'
      })
    }

    wx.getSystemInfo({
        success: (res)=>{
            this.setState({
                sliderLeft: (res.windowWidth / this.state.tabs.length - 144) / 2
            })
        } 
    });
  }

  onUpdate(props){
    // console.log("生命周期函数是当组件的 props 发生变化后被调用");
  }

  // onReady() {
  //   console.log("生命周期函数--监听页面初次渲染完成");
  // }

  // onShow() {
  //   console.log("生命周期函数--监听页面显示");
  // }

  // onHide() {
  //   console.log("生命周期函数--监听页面隐藏");
  // }

  // onUnload() {
  //   console.log("生命周期函数--监听页面卸载");
  // }

  // onPullDownRefresh() {
  //   console.log("页面相关事件处理函数--监听用户下拉动作");
  // }

  // onReachBottom() {
  //   console.log("页面上拉触底事件的处理函数");
  // }
  // onShareAppMessage() {
  //   console.log("用户点击右上角分享");
  // }




}


function mapStateToProps({courses}) {
    return {courses}
}
export default connect(mapStateToProps)(Index)

