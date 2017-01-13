


##[wechat-react-master](https://github.com/flyjennyetn/wechat-react)
微信小程序开发框架，集成了```Labrador```,在使用该框架之前，请了解[Labrador](https://github.com/maichong/labrador)，[微信小程序](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html?t=2017112)。

##安装
* npm install

* labrador watch

* labrador build

##项目目录结构
```wechat-react-master```               &nbsp; &nbsp; # 项目根目录
```sh
├─ src                 # 项目配置文件
    ├── components    # 组件库
    ├── images        # 图片库
    ├── pages         # 容器/页
    ├── reducers      # 负责处理action的state更新。
    ├── sagas         # 负责协调那些复杂或异步的操作。
    ├── style
    ├── utils         # 工具库
    ├── app.js 
    ├── app.json      #全局配置文件
    ├── app.less      #全局样式文件
├─ .babelrc        [#babel配置文件](https://inv-veri.chinatax.gov.cn/)
├── .editorconfig  
├── .eslintignore 
├── .eslintrc  
├── .flowconfig  
├── .gitignore  
├── .labrador  
├── package.json     # 包配置
├── README.md   
```

##开发流程
#### ```src/app.js```  
 
```js
import { setStore } from 'labrador-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import ReducersManager from './reducers/';
import SagaManager from './sagas/';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  ReducersManager,
  compose(applyMiddleware(sagaMiddleware))
);

store.runSaga = sagaMiddleware.run;
store.close = () => store.dispatch(END);
store.runSaga(SagaManager);
setStore(store);

export default class {
  async onLaunch() {
    //生命周期函数--监听小程序初始化
  }
  onShow() {
    // console.log("当小程序启动，或从后台进入前台显示，会触发 onShow")
  }
  onHide() {
    // console.log("当小程序从前台进入后台，会触发 onHide")
  }
  onError() {
    // console.log("当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息")
  }

}

```

项目入口配置文件 等于 微信小程序的 app.js 文件  上面的4个方法和 微信小程序一样

#### ```src/sagas/index.js```   
#### ```src/reducers/index.js``` 
...除视图外，页面雷同于web端react
 
#### ```src/pages/index/index.js```   
```js
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


```
微信小程序组件和react不同之处 在于状态方法名不一样，都是微信小程序的方法，之外新增一个onUpdate 就是组件状体发送变化之后会触发这个方法


 ```注意``` 开发流程请先了解[web端react](https://github.com/flyjennyetn/react)
