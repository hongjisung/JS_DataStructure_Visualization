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
let li = new std.List([1,2,3]);
let li2 = new std.List([2,4]);
let st = new std.Stack([10,9,8]);
let getSize;
let qu = new std.Queue(['a', 'b', 'c']);

qu.push('d');
qu.pop();
qu.pop();
qu.pop();
qu.push('e');
qu.pop();
li.pushBack(4);
li.popFront();
li2.pushBack(10);
st.pop();
st.push('ststst');

for(let i=data.a; i<data.b; i+=1) {
  li.pushBack(i);
}

getSize = (li) => {
  return li.size();
  }

li2.pushBack(getSize(li));

li.pushBack('((((((');    
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