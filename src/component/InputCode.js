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
let qu = new std.Queue();
let st = new std.Stack();

[1,6,3,10,9,2,5,4].map(n=>pq.push(n));
[1,1,1,1,].map(n=>pq.pop());

[1,2,3,4].map(n=>qu.push(n));
qu.pop();
qu.pop();
qu.pop();
[1,2,3].map(n=>qu.push(n));
qu.push(4);

st.push(3);
st.push(qu.size());
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
        <div className = 'fixedCode'>import std from 'js_dsal'</div>
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