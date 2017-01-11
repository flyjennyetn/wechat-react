/**
 * Created by flyjennyetn on 2016-10-24.
 */
import wx from 'labrador';
import {toastShort} from './common';
import {IPLOCATION} from './config';

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

