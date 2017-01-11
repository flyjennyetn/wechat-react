import wx, { Component, PropTypes } from 'labrador';
import { connect, getStore} from 'labrador-redux';

import QuizzesRadio from '../../../components/QuizzesRadio/QuizzesRadio';
import QuizzesSelect from '../../../components/QuizzesSelect/QuizzesSelect';
import {isNotNullObj,Storage }from '../../../utils/common';
class Quizzes extends Component {

  state = {
    stuCode:null,
    lessonId:null,
    exam: []
  }

  subAnswer(){
      const {lessonId,stuCode,exam} = this.state;
      const {lessonScore} = this.props.quizzes;
      if(lessonScore == 'no'){
          let results = '{"results":[';
          let key=1;
          var examState = true;
          exam.map((el,i)=>{
              if(el == ''){
                  wx.showToast({title: '第 '+key+' 题没有作答!'});
                  examState = false;
                  return false;
              }
              results+= '{"subId":"' + i + '","subAns":"' + el + '"},';
              key++;
          })
          results += ']}';
          if(!examState)
              return false;
 
          getStore().dispatch({
              type:'quizzes/query/Score',
              results,
              lessonId,
              stuCode
          })
      }
  }

  selected =(examId,value)=>{
      const {lessonScore} = this.props.quizzes;
      if(lessonScore == 'no'){
          getStore().dispatch({
              type:'quizzes/set/exam',
              examId,
              value
          })
      }
  }

  children (){
    const {examList,examSelect,lessonScore,exam} = this.props.quizzes;
    if(examList != null)
      return {
        QuizzesRadio:{
          component: QuizzesRadio,
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

  onLoad(option) { // 生命周期函数--监听页面加载
      const {token} = Storage.get('userData');
      this.setState({stuCode:token,lessonId:option.lessonId});

      getStore().dispatch({
        type:'quizzes/query/questions',
        token,
        ...option
      })
  }

  onUpdate(props){
    if(props.quizzes.examList !== null){
        this.setState({
          exam:props.quizzes.exam
        });
    }
  }

}


function mapStateToProps({quizzes}) {
    return {quizzes}
}
export default connect(mapStateToProps)(Quizzes)

