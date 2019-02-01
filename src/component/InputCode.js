import React, {Component} from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/InputCode.css'

class InputCode extends Component {
  constructor() {
    super()
    this.code = `import std from './js_dsal'
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