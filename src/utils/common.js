/**
 * Created by flyjennyetn on 2016-10-24.
 */
import wx from 'labrador';


export function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


export const gradeGather = (num)=>{
    let arr = [
        '小学一年级',
        '小学二年级',
        '小学三年级',
        '小学四年级',
        '小学五年级',
        '小学六年级',
        '初中一年级',
        '初中二年级',
        '初中三年级',
        '高中一年级',
        '高中二年级',
        '高中三年级'
      ]
    return arr[num-1]
}



export const isNot = (str)=>{
    if(str === ''){
      return false;
    }else if(str === null){
      return false;
    }else if(str === undefined){
      return false;
    }else{
      return true;
    }
}



// 缓存 封装
export class Storage {
  static get(key) {
    return wx.getStorageSync(key);
  }

  static save(key, value) {
    return wx.setStorage({key:key,data:value})
  }

  static delete(key) {
    return wx.removeStorage(key);
  }
}


// 轻提示 几秒消失 
// isAlert 为true 需要用户确认
export const toastShort = (content, isAlert) => {
  if (!isAlert) {
      wx.showToast({
        title: content.toString()
      })
  } else {
      wx.showModal({
          content: content.toString(),
          showCancel: false,
          success: function (res) {}
      });
  }
};

export function isNotNullObj(obj) {
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      return true;
    }
  }
  return false;
}
