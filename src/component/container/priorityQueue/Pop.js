import React, {Component} from 'react'
import DataNode from '../DataNode'
import PropTypes from 'prop-types'
import '../../../stylesheet/container/priorityQueue/Pop.css'
import {PriorityQueue} from 'js_dsal'

/*
애니메이션 과정
1. index 0과 index size-1 을 바꿈
2. index i에 대해 i*2+1, i*2+2를 순차대로비교하여 작은것과 바꿈
3. 2를 바꿀게없을때 혹은 size보다 큰값이 나올때까지반복
*/

class Pop extends Component {
  // constructor
  constructor({stop, initiate, object, params, duration}) {
    super()
    
    console.log(object)
    this.origin = new PriorityQueue('', object.pq);
    this.maxSize = this.origin._maxSize;
    this.size = this.origin.size();
    this.cmpfunc = this.origin.compareFunction();
    
    this.width = 65;
    this.interval = 20;
    this.id = 1;

    this.duration = duration;
    
    this.topSvg = [
      <text key={this.id} x={this.interval + 70} y={20} width={30} height={15}>max size: {this.maxSize}</text>
    ]
    this.id += 1;
    
    // size svg
    if (this.size) {
      this.topSvg.push(<text key={this.id} className='pqPopSizeErase' style={{animationDuration: this.duration.toString()+'s'}} x={this.interval} y={20} width={30} height={15}>size: {this.size}</text>)
      this.topSvg.push(<text key={this.id+1} className='pqPopSizeEmerge' style={{animationDuration: this.duration.toString()+'s'}} x={this.interval} y={20} width={30} height={15}>size: {this.size - 1}</text>)
      this.id += 2;
    } else {
      this.topSvg.push(<text key={this.id} x={this.interval} y={20} width={30} height={15}>size: {this.size}</text>)
      this.id += 1;
    }

    this.state = {
      index: 0,
      indexSvg: [],
      nodeSvg: [],
      step: 0,
    }
  }

  // LifeCycle
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.stop) {
      clearTimeout(this.sto)
      clearTimeout(this.sto2)
      clearTimeout(this.sto3)
      clearTimeout(this.sto4)
      return false
    }

    
    this.duration = nextProps.duration;

    return true
  }

  componentDidMount() {
    if (this.size ===0) {
      const indexSvg = [<text key={this.id} x={this.interval} y={60} width={30} height={20}>Error: No data but pop</text>]
      this.id += 1;
      this.setState({indexSvg, nodeSvg:[]});
      this.props.initiate(this.duration* 1000);
    } else {
      this.firstProcess(this.props.params)
    }
  }

  // class methods

  // first show origin and push data to last.
  firstProcess(params) {
    const lastpoint = 0;
    let isSecondExpress = false;
    if (this.size - 1 < 14) {
      isSecondExpress = true
    }
    const indexSvg = [
      <text key={this.id} x={this.interval + this.width*(lastpoint)} y={40} width={30} height={15}>index: 0</text>
    ]
    this.id += 1;

    // explanation
    indexSvg.push(<text key={this.id} x={this.interval} y={130} width={30} height={20}>First, change first and last, then, remove last</text>)
    this.id += 1;

    if (isSecondExpress) {
      indexSvg.push(<text className='disappear' style={{animationDuration: (this.duration).toString() + 's', animationDelay: (this.duration*3/2).toString() + 's'}} key={this.id} x={this.interval + this.width*(this.size - 1)} y={40} width={30} height={15}>index: {this.size - 1}</text>)
      this.id += 1;
    }
    let nodeSvg = this.addNodes(lastpoint);

    // exchange with last node.
    let change = true;
    if (this.size === 1) {
      change = false;
    }
    nodeSvg = nodeSvg.concat(this.compareTwoIndex(lastpoint, this.size - 1, 0, this.size - 1, isSecondExpress, change))
    DataNode({ani_delay: (this.duration*3/2).toString() + 's', ani_dur: (this.duration).toString() + 's', key: this.id, className: "appear", color:'gray', x: this.interval + this.width*(this.size - 1), y: 50, "width": this.width}).map(n => nodeSvg.push(n))
    this.id += 1;
    
    // update
    this.origin._elements[this.size - 1] = undefined
    this.size -= 1;

    this.setState({indexSvg, nodeSvg, step: this.state.step + 1})
    
    // if size is 0, stop else do next compare
    if (!this.size) {
      this.props.initiate((this.duration * 5 / 2)*1000);
    } else {
      this.sto = setTimeout(()=> this.compareNextIndex(), (this.duration * 5 / 2)*1000);
    }
  }

  // compare next index
  compareNextIndex() {
    // first left compare then right compare
    const left = this.state.index * 2 + 1;
    const right = left + 1;
    console.log('left, right, this.size: ', left, right, this.size)
    // no left data
    if (left >= this.size) {
      this.setState({indexSvg: [<text key={this.id} x={this.interval} y={60} width={30} height={20}>No more compare data</text>], nodeSvg: [], step: this.state.step + 1})
      this.id += 1;
      this.props.initiate(this.duration * 1000)
      return;
    }

    // show left compare text
    // let indexSvg = [<text key={this.id} x={this.interval} y={60} width={30} height={20}>Compare with index[{this.state.index}] and index[{left}]</text>]
    // this.id += 1;
    // this.setState({indexSvg, nodeSvg: [], step: this.state.step + 1})

    // do left compare
    let leftresult = this.compareAndShow(this.state.index, left)

    this.sto2 = setTimeout(()=> {
      if (!leftresult) {
        // no right data
        if (right >= this.size) {
          this.setState({indexSvg: [<text key={this.id} x={this.interval} y={60} width={30} height={20}>No more compare data</text>], nodeSvg: [], step: this.state.step + 1})
          this.id += 1;
          this.props.initiate(this.duration * 1000)
          return;
        }
  
        // do right compare
        let rightresult = this.compareAndShow(this.state.index, right)
          
        if (rightresult) {
          this.sto4 = setTimeout(() => {
            this.setState({index: right, indevSvg: [], nodeSvg: [], step: this.state.step + 1})
            this.compareNextIndex()
          }, (this.duration * 3 / 2) * 1000)
        } else {
          this.props.initiate((this.duration * 3 / 2) * 1000);
        }
      } else {
        this.setState({index: left, indevSvg: [], nodeSvg: [], step: this.state.step + 1})
        this.compareNextIndex()
      }
    }, (this.duration * 3 / 2) * 1000);

  }

  // compare two index and decide change
  compareAndShow(idx1, idx2) {
    const change = this.cmpfunc(this.origin._elements[idx1], this.origin._elements[idx2]);
    const lastpoint = (idx2 > 5) ? 5: idx2;
    const indexSvg = [
      <text key={this.id} x={this.interval + this.width*(lastpoint - idx2 + idx1)} y={40} width={30} height={15}>index: {idx1}</text>,
      <text key={this.id + 1} x={this.interval + this.width*(lastpoint)} y={40} width={30} height={15}>index: {idx2}</text>
    ]
    this.id += 2;

    // compare text
    indexSvg.push(<text key={this.id} x={this.interval} y={130} width={30} height={20}>Compare with index[{idx1}] and index[{idx2}] : {(change)?'true':'false'}</text>)
    this.id += 1;
    
    let nodeSvg = this.addNodes(idx2);
    let isSecondExpress = false;
    if (idx2 - idx1 <= 5) {
      isSecondExpress = true;
    }

    nodeSvg = nodeSvg.concat(this.compareTwoIndex(idx2, idx1, lastpoint, lastpoint - idx2 + idx1, isSecondExpress, change))

    console.log(indexSvg, nodeSvg)
    this.setState({indexSvg, nodeSvg, step: this.state.step + 1})
    return change;
  }

  // compare next index and decide to change or not
  /**
   * 
   * @param {number} idx1 - base index, must show this data 
   * @param {number} idx2 - other compare data
   * @param {number} idx1pos - drawing index
   * @param {number} idx2pos - drawing index
   * @param {bool} isSecondExpress - check idx2 is over the svg area
   * @param {bool} change - does change two data?
   * @returns {array} - node svg array
   */
  compareTwoIndex(idx1, idx2, idx1pos, idx2pos, isSecondExpress, change) {
    // compare animation
    const nodeSvg = []

    DataNode({key: this.id, border: 'yellow', data: this.origin._elements[idx1].toString(), x: this.interval + this.width*(idx1pos), y: 50, "width": this.width}).map(n => nodeSvg.push(n))
    this.id += 1;

    // 원래 index가 svg에 표현되어 있으면 걔도 색칠함 totalShow가 14임
    if (isSecondExpress) {
      DataNode({key: this.id, border: 'yellow', data: this.origin._elements[idx2].toString(), x: this.interval + this.width*(idx2pos), y: 50, "width": this.width}).map(n => nodeSvg.push(n))
      this.id += 1;
    }

    // 비교해서 교환해야 한다면 교환
    if (change) {
      const temp = this.origin._elements[idx1]
      this.origin._elements[idx1] = this.origin._elements[idx2]
      this.origin._elements[idx2] = temp

      DataNode({ani_delay:(this.duration*9/20).toString()+'s', ani_dur: (this.duration/20).toString()+'s', key: this.id, className: "pqPushErase", border: 'yellow', x: this.interval + this.width*(idx1pos), y: 50, "width": this.width}).map(n => nodeSvg.push(n))  
      this.id += 1;
      DataNode({ani_delay:(this.duration/2).toString()+'s', ani_dur: this.duration.toString() + 's', key: this.id, className: "appear" ,border: 'yellow', data: this.origin._elements[idx1].toString(), x: this.interval + this.width*(idx1pos), y: 50, "width": this.width}).map(n => nodeSvg.push(n))  
      this.id += 1;
      if (isSecondExpress) {
        DataNode({ani_delay:(this.duration*9/20).toString()+'s', ani_dur: (this.duration/20).toString()+'s', key: this.id, className: "pqPushErase", border: 'yellow', x: this.interval + this.width*(idx2pos), y: 50, "width": this.width}).map(n => nodeSvg.push(n))
        this.id += 1;
        DataNode({ani_delay:(this.duration/2).toString()+'s', ani_dur: this.duration.toString() + 's', key: this.id, className: "appear",border: 'yellow', data: this.origin._elements[idx2].toString(), x: this.interval + this.width*(idx2pos), y: 50, "width": this.width}).map(n => nodeSvg.push(n))
        this.id += 1;
      }
    }

    return nodeSvg;
  }

  // add node to svg
  addNodes(index = 0) {
    const nodeSvg = [];
    const lastpoint = (index > 5) ? 5 : index;
    let totalShow = 14;
    
    let i = 0;
    while (i < 7 && index - i >= 0) {
      const data = this.origin._elements[index - i];
      DataNode({key: this.id, "data":data.toString(), x: this.interval + this.width*(lastpoint - i), y: 50, "width": this.width}).map(n => nodeSvg.push(n))
      this.id += 1;
      i += 1;
      totalShow -= 1;
    }

    i = 1;
    while (0 < totalShow && index + i < this.maxSize) {
      const data = this.origin._elements[index + i];
      if (index + i < this.size) {
        DataNode({key: this.id, "data":data.toString(), x: this.interval + this.width*(lastpoint + i), y: 50, "width": this.width}).map(n => nodeSvg.push(n))
        this.id += 1;
      } else {
        DataNode({key: this.id, "color": "gray", x: this.interval + this.width*(lastpoint + i), y: 50, "width": this.width}).map(n => nodeSvg.push(n))
        this.id += 1;
      } 
      i += 1;
      totalShow -=1;
    }

    return nodeSvg;
  }

  render() {
    return (
      <svg style={{width: "100%", hegith: "100%"}}>
        {this.topSvg}
        {this.state.indexSvg}
        {this.state.nodeSvg}
      </svg>
    )
  }
}

Pop.propTypes = {
  stop: PropTypes.bool,
  initiate: PropTypes.func,
  object: PropTypes.object,
  params: PropTypes.array,
  duration: PropTypes.number,
}

Pop.defaultProps = {
  stop: false,
  initiate: f=>f,
  object: {},
  params: [],
  duration: 1,
}

export default Pop