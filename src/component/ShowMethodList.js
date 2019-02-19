import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/ShowMethodList.css'

class ShowMethodList extends React.Component {
  constructor(goMethod=f=>f, methodList=[], changeStop = f=>f, stopShow=false) {
    super()

    this.state = {
      showmethod: false,
    }
  }

  changeShowMethod = (did = true) => {
    if (did || !this.props.stopShow)
    this.props.changeStop()
    this.setState({showmethod: !this.state.showmethod})
  }

  gotoMethod = (idx) => {
    this.setState({showmethod: !this.state.showmethod})
    this.props.goMethod(idx)
  }

  methodScript = (method, idx) => {
    return (
      <div className='methodscript'>
        <div className='methodCommand'>{idx}: {method.executingCode.substring(0, 40)}</div>
        <button className='goMethod' onClick={()=>this.gotoMethod(idx)}>Go</button>
      </div>
    )
  }

  render() {
    return (
      <div className='showmethod'>
        <button className='showmethodbutton' onClick={() => this.changeShowMethod(false)}>Show Method</button>
        {(this.state.showmethod)?
        <div className='coverDom2'>
          <div className='methodContent'>
            {this.props.methodList.map((n, i) => this.methodScript(n, i))}
            <button className='closeshowdata' onClick={this.changeShowMethod}>close</button>
          </div>
        </div>
        :null}
      </div>
    )
  }
}

ShowMethodList.propTypes = {
  goMethod: PropTypes.func,
  methodList: PropTypes.array,
  changeStop: PropTypes.func
}

export default ShowMethodList;