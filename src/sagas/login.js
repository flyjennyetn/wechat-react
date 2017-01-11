/**
 * Created by flyjennyetn on 2016-10-26.
 */
import {
	takeLatest
} from 'redux-saga';
import {
	take,
	put,
	call,
	fork,
	select
} from 'redux-saga/effects';
import {xFetch} from '../utils/xFetch';
import {Storage,toastShort} from '../utils/common';
function* loginQuery({
	userInfo
}) {
	try {
		const data = yield call(xFetch, {
			requestUrl: 'loginInterface/login.json',
			...userInfo
		});
    let obj = [];
    let operate = data.replace('{','').replace('}','').split(',');
    operate.forEach((el)=>
      obj.push(el.split(':')[1].replace('"','').replace('"',''))
    )
    const userData = {
      name:obj[0],
      grade:obj[1],
      token:obj[2]
    }
		yield call(Storage.save,'userData',userData);
    yield put({
      type: 'user/set/data',
      userData
    });

	} catch (error) {
	    yield toastShort(error);
	}
}

function* loginQueryAppid({code}){
	try {
		// console.log(1)
		// const data = yield call(xFetch, {
		// 	requestUrl: 'wx/getOpenId.json',
		// 	code
		// });
		// console.log(data)
		// let obj = eval('(' + data + ')');
		// console.log(obj);
		// const items = yield call(xFetch, {
		// 	requestUrl: 'checkOpenId/login',
		// 	openId: obj.openid
		// });
		// console.log(items);
		// yield call(Storage.save,'userData',eval('(' + items + ')'));
  //       navigator.resetTo({
  //           component: Main,
  //           name: 'Main'
  //       });
	} catch (error) {
	    // yield toastShort(error);
	}
}


function* watchLogin() {
	yield takeLatest('login/query', loginQuery);
}

function* watchLoginWeixin() {
	yield takeLatest('login/query/appid', loginQueryAppid);
}

export default function*() {
	yield fork(watchLogin)
	yield fork(watchLoginWeixin)
}
