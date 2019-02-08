import React, {Component} from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/InputCode.css'

class InputCode extends Component {
  constructor() {
    super()
    this.code = `let li = new std.List([1,2,3]);
li.pushBack(4);
let li2 = new std.List([2,4]);
li.popFront();
li2.pushBack(10);
`
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.submit) {
      this.props.getCode(this.txtarea.value)
    }
  }

  render() {
    return (
      <div className = 'code-write'>
        <div className = 'fixedCode'>import std from 'js_dsal</div>
        <div className = 'fixedCode'>const data = inputDataObject</div>
        <textarea ref={input=>this.txtarea=input} className='code-write' spellCheck='false' wrap='off' defaultValue={this.code}>
        </textarea>
      </div>
    )
  }
}

InputCode.propTypes = {
  submit: PropTypes.bool,
  getCode: PropTypes.func
}

InputCode.defaultProps ={
  submit: false,
  getCode: f=>f
}

export default InputCode