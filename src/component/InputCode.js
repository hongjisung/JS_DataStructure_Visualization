import React, {Component} from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/InputCode.css'

const dump =`
a.push();
a.push().push();
a.dfs()().bc().pushBack();
abc.def.cd()
abc.def().cde.pushBack();
abc[].push()
abc.push(dec.push())
if(ab.pop())
`

class InputCode extends Component {
  constructor() {
    super()
    this.code = `
let pq = new std.PriorityQueue();
[1,10,5,3,7,6,2,8].map(n=>pq.push(n));
pq.pop();
pq.pop();
pq.pop();
pq.pop();
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