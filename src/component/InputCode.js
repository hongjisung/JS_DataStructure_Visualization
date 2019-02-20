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
let tree = new std.SetTree();
let li = new std.List([1,3,5,6,8,9,4,10,15,20,-10,'sss','abc','d','z','cd'])
let pq = new std.PriorityQueue();
let qu = new std.Queue();
let st = new std.Stack();

for(let i=0; i<20; i+=1) {
  const n = Math.floor(Math.random()*1000);
  tree.insert(n);
}

[1,6,3,10,9,2,5,4].map(n=>pq.push(n));
[1,1,1,1,].map(k=>pq.pop());

[1,2,3,4].map(m=>qu.push(m));
qu.pop();
qu.pop();
qu.pop();
[1,2,3].map(i=>qu.push(i));
qu.push(4);

['queue', 'stack', 'list', 'tree', 'priority queue'].map(n=>st.push(n))
`
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.submit) {
      this.props.getCode(this.txtarea.value)
    }

    if(nextProps.sampleCode !== ``) {
      this.txtarea.value = nextProps.sampleCode;
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
  getCode: PropTypes.func,
  sampleCode: PropTypes.string
}

InputCode.defaultProps ={
  submit: false,
  getCode: f=>f,
  sampleCode: ``,
}

export default InputCode