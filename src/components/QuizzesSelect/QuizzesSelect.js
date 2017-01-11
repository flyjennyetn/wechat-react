/**
 * Created by flyjennyetn on 2016-11-02.
 */
import { Component} from 'labrador-immutable';
class QuizzesSelect extends Component {

  constructor(props) {
    super(props);
    console.log(props);
  }

  handleSelected(event) {
    this.props.selected(event.target.dataset.examId,event.target.dataset.value);
  }
  
}

export default QuizzesSelect;
