import React, {Component} from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/SampleCode.css'

class SampleCode extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
    }
  }

  settreedata = `{
  keys: [100, 90, 80, 85, 83, 103, 110, 120, 130]
}`
  settreecode = `let tree = new std.SetTree();
data.keys.map(n => tree.insert(n));
`
  
  maptreedata = `{
  keys: [100, 90, 80, 85, 83, 103, 110, 120, 130]
}`
  maptreecode = `let tree = new std.MapTree();
data.keys.map(
  n=>tree.insert(n, 'number' + n.toString())
);
`

  listdata = `{
  push: [6, 3, 2, 1, 5]
}`
  listcode = `let li = new std.List();
data.push.map(d => li.pushBack(d));
[1,1,1].map(x => li.popFront());
data.push.map(n => li.pushFront(n));
[1,1,1].map(x => li.popBack());
`
  
  queuedata = `{
  base: [1,2,3,4],
  push: [5,6,7,8]
}`
  queuecode = `let qu = new std.Queue(data.base);
[1,1,1].map(n=>qu.pop());
data.push.map(d => qu.push(d));
`
  
  pqdata = `{
  push: [1,5,3,4,7,2,9,15,6,8]
}`
  pqcode = `let pq = new std.PriorityQueue();
data.push.map(d => pq.push(d));
[1,1,1,1,1].map(k => pq.pop());
`

  closeButton = () => {
    this.setState({open: !this.state.open})
  }
  clickButton = (code, data) => {
    this.props.changeSample(code, data);
    this.closeButton();
  }

  render() {
    return (
      <div className='samplecode'>
        <button className='samplecodebutton' onClick={this.closeButton}>Examples</button>
        {(this.state.open)?
          <div className='coverDom2'>
            <div className='changecodecontent'>
              <button className='gosample' onClick={() => this.clickButton(this.settreecode, this.settreedata)}>SetTree Example</button>
              <button className='gosample' onClick={() => this.clickButton(this.maptreecode, this.maptreedata)}>MapTree Example</button>
              <button className='gosample' onClick={() => this.clickButton(this.listcode, this.listdata)}>List Example</button>
              <button className='gosample' onClick={() => this.clickButton(this.queuecode, this.queuedata)}>Queue Example</button>
              <button className='gosample' onClick={() => this.clickButton(this.pqcode, this.pqdata)}>Priority Queue Example</button>
              <button className='closeshowdata' onClick={this.closeButton}>close</button>
            </div>
          </div>
        : null}
      </div>
    )
  }
}

SampleCode.propTypes = {
  changeSample : PropTypes.func
}

SampleCode.defaultProps = {
  changeSample: f=>f
}

export default SampleCode;