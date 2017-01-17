


##[wechat-react-master](https://github.com/flyjennyetn/wechat-react)
微信小程序开发框架，集成了```Labrador```,在使用该框架之前，请了解[Labrador](https://github.com/maichong/labrador)，[微信小程序](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html?t=2017112)。

本框架是为了解决了多平台开发（[web](https://github.com/flyjennyetn/react)，[原生](https://github.com/flyjennyetn/react-native)，[微信小程序](https://github.com/flyjennyetn/wechat-react)）使用一套标准架构，节约开发成本。组件化开发复用之高能快速搭建一个项目。加入了号称渲染速度最快的虚拟DOM，使用redux数据流控制，让项目逻辑清晰可维护。用webpack构建强力压缩代码，尽可能减小程序体积，让你在1M的限制内做更多的事。


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

####```src/js/utils/xFetch.js``` 
 
```js
//ajax请求方法==xFetch
export function xFetch(options) {

  return new Promise((resolve, reject) => {
     wx.request({
        url: IPLOCATION + options.requestUrl,
        data: options
    })
    .then((response) => {
      if(response.statusCode === 200){
          if(response.data.result === false){
              toastShort(response.data.msg.toString(),1);
          }else{
              resolve(response.data.t);
          }
      }
    })
    .catch((error) => {
        reject(error);
    });
  })
}
```
微信小程序的ajax方法，公共方法的详细解释请看[web端react](https://github.com/flyjennyetn/react#src/js/utils/xFetch.js)。

####```src/js/sagas/courses.js``` 
 
```js
function* isLearning({
  token,
  grade,
  lessonId
}) {
  const study = yield call(xFetch, {
    requestUrl: 'interface/queryIfExam.json',
    token,
    lessonId
  });
  if (study.isPassStudy == 1) {
      wx.navigateTo({
        url: '/pages/index/quizzes/quizzes?lessonId='+lessonId+'&lessonScore='+study.lessonScore+'&isPassExam='+study.isPassExam
      })
  } else {
    toastShort("请先学习课程！")
  }
}

```

####```src/js/pages/quizzes/quizzes.js``` 
 
```js
...
//引入组件
import QuizzesRadio from '../../../components/QuizzesRadio/QuizzesRadio';
...
//把组件当成一个子集，进行传参使用
children (){
    const {examList,examSelect,lessonScore,exam} = this.props.quizzes;
    if(examList != null)
      return {
        QuizzesRadio:{
        //component对应组件名字
          component: QuizzesRadio,
          //props传参
          props: { 
            examList: examList,
            exam:exam,
            selected:this.selected,
            lessonScore:lessonScore
          }
        },
        QuizzesSelect: examSelect.map((items) => ({
          component: QuizzesSelect,
          key: items.examId,
          exam:exam,
          props: {
            ...items,
            selected:this.selected,
            lessonScore:lessonScore
          }
        }))
      }
  }
```
组件的使用在```xml```页面


####```src/js/pages/quizzes/quizzes.xml``` 
 
```js
//组件的使用
<view class="page">
    <view class="page__bd" wx:if="{{examList !== null}}">
    
//component标签的作用是导入一个自定义子组件的布局文件，标签有两个属性，分别为 key (必选)和 name (可选，默认为key的值)。
        <component key="QuizzesRadio" name="QuizzesRadio"/>
        
        <view class="weui-panel" >
        
        // <list/> 标签即可自动渲染子组件列表。和 <component/> 标签类似，<list/> 同样也有两个属性，key 和 name。Labrador编译后，会自动将 <list/> 标签编译成 wx:for 循环。
            <list key="QuizzesSelect" name="QuizzesSelect"/>
        </view>

        <view class="weui-btn-area">
            <button class="weui-btn" type="primary" bindtap="subAnswer">
                    {{props.quizzes.lessonScore == 'no' ? '确认提交' : '答题分数:'+props.quizzes.lessonScore+' 分'}}
            </button>
        </view>

    </view>
</view>
```
微信小程序的组件使用方法与web端不同，web端的组件使用方法为，把组件名字作为标签。而微信小程序把组件当成一个子集，进行传参使用，并且在```xml```页面使用。具体解释请看[Labrador的页面解析](https://github.com/maichong/labrador#页面) 


##贡献者

[北京天融互联科技有限公司](http://www.e-tianrong.com/)

[flyjennyetn](https://github.com/flyjennyetn)

[荣倩倩](rongqianqian@e-tianrong.com)



##开源协议

本项目依据MIT开源协议发布，允许任何组织和个人免费使用。
