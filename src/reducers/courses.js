/**
 * Created by flyjennyetn on 2016-10-26.
 */
import {
  handleActions
} from 'redux-actions';
import {
  combineReducer
} from 'redux';

const courses = handleActions({
  ['courses/qurery/success'](state, action) {
    return {
      ...state,
      items: action.coursesUp,
      coursesUp: action.coursesUp,
      coursesDown: action.coursesDown
    };
  },
  ['courses/set/videoId'](state, action) {
    return {
      ...state,
      videoId: action.videoId,
    };
  },
  ['courses/set/state'](state, action) {
    return {
      ...state,
      items: action.coursesState == 1 ? state.coursesUp : state.coursesDown,
      coursesState: action.coursesState
    };
  },
  ['courses/visible'](state, action) {
    return {
      ...state,
      visible: action.visible
    };
  }
}, {
  visible:false,
  coursesState: 1,
  items: {},
  coursesUp: null,
  coursesDown: null,
  videoId: null
});

export default courses;
