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
import {IMGADDRESS} from '../utils/config';
import {xFetch} from '../utils/xFetch';
import {toastShort,gradeGather} from '../utils/common';
function* userQueryPci({
	userData
}) {
  const {token,name,grade} = userData;
	const userInfo = yield call(xFetch, {
		requestUrl: 'pci/getStuInfo',
		token
	})
  userInfo.patch = IMGADDRESS + userInfo.patch;
  userInfo.gendercode = userInfo.gendercode == 'M' ? '男' : '女';
  userInfo.name = name;
  userInfo.grade = gradeGather(grade);
  yield put({
    type: 'user/set/info',
    userInfo
  });
}


function* userPwdEdit({
	token,
	oldPwd,
	newPwd
}) {
	// const sta = yield call(xFetch, {
	// 	requestUrl: 'pci/changePwd',
	// 	token,
	// 	oldPwd,
	// 	newPwd
	// })
	// toastShort(sta,true);
}

function* userRecoveredPwd({classNum,gradeNum,name,sex,stuCode}) {
	// const sta = yield call(xFetch, {
	// 	requestUrl: 'pci/changePasswordBack',
	// 	classNum,
	// 	gradeNum,
	// 	name,
	// 	sex,
	// 	stuCode
	// })
	// toastShort("您的登陆密码，已经初始化为123456",true);
}

function* userAccountEdit({token,newUserName}) {
	// const loginName = yield call(xFetch, {
	// 	requestUrl: 'pci/changeUserName',
	// 	token,
	// 	newUserName
	// })
	// yield put({
	// 	type: 'user/set/name',
	// 	loginName
	// });
	// toastShort("您已经修改成功",true);
}

function* userMoileCode({token,mobile}) {
	// yield call(xFetch, {
	// 	requestUrl: 'pci/checkIsUnique',
	// 	token,
	// 	identity:mobile
	// })
	// yield put({
	// 	type: 'user/set/visible',
	// 	visible:false,
	// });
	// const data = yield call(xFetchCode, {
	// 	callback:'jQuery214004952765986122998_43434333',
	// 	requestUrl: 'smsAction_smsSend',
	// 	phone:mobile,
	// 	businessId:'BZ0003'
	// })
	// if(data.state == '0'){
	// 	toastShort(remark.remark,true);
	// 	yield put({
	// 		type: 'user/set/count',
	// 		count:true,
	// 	});
	// }
}

function* userMoileSet({token,newMobile,oldMobile,code}) {

	// const state = yield call(xFetchCode, {
	// 	callback:'jQuery214004952765986122998_43434333',
	// 	requestUrl: 'smsAction_querySms',
	// 	content:code,
	// 	phone:newMobile,
	// 	businessId:'BZ0003'
	// })
	
	// if(state){
	// 	yield call(xFetch, {
	// 		requestUrl: 'pci/changeMobile',
	// 		token,
	// 		state:1,
	// 		newMobile,
	// 		oldMobile,
	// 		code
	// 	})
	// }
}


function* watchUserMoileSet() {
	yield takeLatest('user/moile/set', userMoileSet);
}

function* watchUserMoile() {
	yield takeLatest('user/moile/code', userMoileCode);
}

function* watchUserAccount() {
	yield takeLatest('user/account/edit', userAccountEdit);
}

function* watchUserRecovered() {
	yield takeLatest('user/recovered/pwd', userRecoveredPwd);
}

function* watchUserPwd() {
	yield takeLatest('user/pwd/edit', userPwdEdit);
}

function* watchUser() {
	yield takeLatest('user/query/pci', userQueryPci);
}

export default function*() {
	yield fork(watchUser)
	yield fork(watchUserPwd)
	yield fork(watchUserRecovered)
	yield fork(watchUserAccount)
	yield fork(watchUserMoile)
	yield fork(watchUserMoileSet)
}
