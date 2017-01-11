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
