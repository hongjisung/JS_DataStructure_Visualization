import React from 'react'
import PropTypes from 'prop-types'
import DataNode from '../container/DataNode'
import Arrow from '../container/Arrow'

class StaticList extends React.Component {
  constructor({data={}}) {
    super();
    this.keyid = 1;
    this.width = 65;
    this.interval = 20;
    this.object = data.value;
    this.sizeSvg = [<text key={this.keyid} x={this.interval} y={20} width={30} height={15}>size: {this.object.size()}</text>]
    this.keyid += 1;
    this.click = false;
    this.clickX = 0;

    this.state = {
      objectSvg: [],
      xmove: 0,
    }
  }

  componentDidMount() {
    this.setState({objectSvg: this.makeObjects(this.state)})
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.xmove !== nextState.xmove) {
      this.setState({objectSvg: this.makeObjects(nextState)});
      return false;
    }
    return true;
  }

  makeObjects = (state) => {
    const objectSvg = [];
    const x = state.xmove;

    // add nodes
    const data = [...this.object];
    for (let i = 0; i < data.length; i += 1) {
      DataNode({key: this.keyid, "data": data[i].toString(), x : x + this.interval*(i+1) + this.width*(i), y: 50, width: this.width}).map(n => objectSvg.push(n))
      this.keyid += 1;
    }
    // add arrows
    for (let i = 1; i < data.length; i += 1) {
      Arrow(x + this.interval * i + this.width * i, 70, x + this.interval * (i+1) + this.width * i, 70, 'Arrow', this.keyid).map(n => objectSvg.push(n))
      this.keyid += 1;
      Arrow(x + this.interval * (i+1) + this.width * i, 80, x + this.interval * i + this.width * i, 80, 'Arrow', this.keyid).map(n => objectSvg.push(n))
      this.keyid += 1;
    }

    return objectSvg;
  }

  mouseDownEvent = (e) => {
    e.preventDefault();
    console.log('down', e.clientX);
    this.click= true//!this.click;
    this.clickX = e.clientX;
  }

  mouseUpEvent = (e) => {
    e.preventDefault();
    console.log('up', e.clientX);
    this.click= false;
  }

  mouseMoveEvent = (e) => {
    e.preventDefault();
    if(this.click) {
      console.log('move', e.clientX);
      this.setState({xmove: this.state.xmove + (e.clientX - this.clickX)})
      this.clickX = e.clientX 
    }
  }

  mouseOutEvent = (e) => {
    this.click=false;
  }

  render() {
    return (
      <svg style={{width:"100%", height: "100%", cursor:'pointer'}} onMouseUp={this.mouseUpEvent} onMouseDown={this.mouseDownEvent} onMouseMove={this.mouseMoveEvent} onMouseOut={this.mouseOutEvent}>
        {this.sizeSvg}
        {this.state.objectSvg}
      </svg>
    )
  }
}

StaticList.propTypes = {
  data: PropTypes.object
}

export default StaticList;