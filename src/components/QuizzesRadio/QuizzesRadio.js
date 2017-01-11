/**
 * Created by flyjennyetn on 2016-11-02.
 */
import { Component} from 'labrador-immutable';

class QuizzesRadio extends Component {

  handleSelected(event) {
    this.props.selected(event.target.dataset.examId,event.target.dataset.value);
  }

}

export default QuizzesRadio;

