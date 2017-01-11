import wx, { Component, PropTypes } from 'labrador';
import { connect, getStore} from 'labrador-redux';
class Subject extends Component {

  onLoad() {
    getStore().dispatch({
      type:'subject/query'
    })
     
  }
}


function mapStateToProps({subject}) {
    return {subject}
}
export default connect(mapStateToProps)(Subject)

