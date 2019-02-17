import React, {Component} from 'react'
import DataNode from '../DataNode'
import PropTypes from 'prop-types'
import '../../../stylesheet/container/priorityQueue/Push.css'
import {PriorityQueue} from 'js_dsal'

/*
애니메이션 과정
0. origin 상태 보여줌
1. 삽입위치에(i번째) 삽입
2. i -> (i-1)/2 번째로 이동
3. (i-1)/2번째와 compareFunction에 따라 비교
4. 비교해서 true면 값을 바꾸고 1부터 다시 시작
5. false 거나 (i-1)/2가 0이면 종료

size, maxsize보여줌
i -> i/2 표시
중간에 stop

full size일 때는 appear로 sizeup후 삽입
*/

class Push extends Component {
  // constructor
  constructor({stop, initiate, object, params, duration}) {
    super()
    
    this.origin = new PriorityQueue('', object.pq);
    this.maxSize = this.origin._maxSize;
    this.size = this.origin.size();
    this.cmpfunc = this.origin.compareFunction();
    
    this.width = 65;
    this.interval = 20;
    this.sto = null;
    this.id = 1;

    this.duration = duration;
    
    this.topSvg = [
      // size svg
      <text key={this.id} className='pqPopSizeErase' style={{animationDuration: this.duration.toString()+'s'}} x={this.interval} y={20} width={30} height={15}>size: {this.size}</text>,
      <text key={this.id+1} className='pqPopSizeEmerge' style={{animationDuration: this.duration.toString()+'s'}} x={this.interval} y={20} width={30} height={15}>size: {this.size + 1}</text>,
    ]
    this.id += 2;

    // max size svg
    if (this.size !== this.maxSize) {
      this.topSvg.push(<text key={this.id} x={this.interval + 70} y={20} width={30} height={15}>max size: {this.maxSize}</text>)
      this.id += 1;
    } else {
      this.topSvg.push(<text key={this.id} className='pqPopSizeErase' style={{animationDuration: this.duration.toString()+'s'}} x={this.interval + 70} y={20} width={30} height={15}>max size: {this.maxSize}</text>)
      this.id += 1;
      this.topSvg.push(<text key={this.id} className='pqPopSizeEmerge' style={{animationDuration: this.duration.toString()+'s'}} x={this.interval + 70} y={20} width={30} height={15}>max size: {this.maxSize * 2 + 1}</text>)
      this.id += 1;
    }


    this.state = {
      index: this.size,
      indexSvg: [],
      nodeSvg: [],
      step: 0,
    }
  }

  // LifeCycle
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.stop) {
      clearTimeout(this.sto)
      return false
    }

    this.duration = nextProps.duration;
    return true
  }

  componentDidMount() {
    this.firstProcess(this.props.params);
    if (this.state.index === 0) {
      this.props.initiate((this.duration * 3 / 2)* 1000);
    } else {
      this.sto = setTimeout(() => this.compareNextIndex(),(this.duration * 3 / 2) * 1000 );
    }
  }

  // class methods

  // first show origin and push data to last.
  firstProcess(params) {
    const lastpoint = (this.size - 1 > 4) ? 4 : this.size - 1;
    const indexSvg = [
      <text key={this.id} style={{animationDuration: this.duration.toString()+'s', animationDelay: (this.duration/2).toString()+'s'}} className='appear' x={this.interval + this.width*(lastpoint + 1)} y={40} width={30} height={15}>index: {this.size}</text>
    ]
    this.id += 1;
    const nodeSvg = this.addNodes(this.size - 1);

    // add data to end
    indexSvg.push(<text key={this.id} x={this.interval} y={130} width={30} height={20}>Add data to end: index[{this.size}]</text>)
    this.id += 1;

    
    // appear one node.
    DataNode({ani_delay:(this.duration/2).toString()+'s', ani_dur: this.duration.toString() + 's', key: this.id, border: 'yellow', className:"appear", data: params[0].toString(), x: this.interval + this.width*(lastpoint + 1), y: 50, "width": this.width}).map(n => nodeSvg.push(n))
    this.id += 1;
    if (this.size === this.maxSize) {
      // add gray node
      for (let i=2; i < 10; i += 1) {
        if (this.size + i > this.maxSize * 2 + 1) {
          break;
        }
        DataNode({ani_delay:(this.duration/2).toString()+'s', ani_dur: this.duration.toString() + 's', key: this.id, className:"appear", color: "gray", x: this.interval + this.width*(lastpoint + i), y: 50, "width": this.width}).map(n => nodeSvg.push(n))
        this.id +=1;
      }
    }

    // update
    if (this.size === this.maxSize) {
      this.origin._sizeup()
    }
    this.maxSize = this.origin._maxSize;
    this.origin._elements[this.size] = params[0]
    this.size += 1;

    this.setState({indexSvg, nodeSvg, step: this.state.step + 1})
  }

  // compare next index
  compareNextIndex() {
    this.compareProcess()
  }

  // compare next index and decide to change or not
  compareProcess() {
    // variables
    const index = this.state.index
    const nextindex = Math.floor((this.state.index-1) / 2)
    const lastpoint = (nextindex > 4) ? 4 : nextindex;
    
    // compare animation
    const indexSvg = [
      <text key={this.id} x={this.interval + this.width*(lastpoint)} y={40} width={30} height={15}>index: {nextindex}</text>
    ]
    this.id += 1;

    const nodeSvg = this.addNodes(nextindex)
    DataNode({key: this.id, border: 'yellow', data: this.origin._elements[nextindex].toString(), x: this.interval + this.width*(lastpoint), y: 50, "width": this.width}).map(n => nodeSvg.push(n))
    this.id += 1;

    // 원래 index가 svg에 표현되어 있으면 걔도 색칠함 totalShow가 14임
    if (index <= nextindex + 14 - ((nextindex > 5) ? 7 : nextindex + 1)) {
      indexSvg.push(<text key={this.id}x={this.interval + this.width*(index - nextindex + lastpoint)} y={40} width={30} height={15}>index: {index}</text>)
      this.id += 1;
      DataNode({key: this.id, border: 'yellow', data: this.origin._elements[index].toString(), x: this.interval + this.width*(index - nextindex + lastpoint), y: 50, "width": this.width}).map(n => nodeSvg.push(n))
      this.id += 1;
    }

    // 비교해서 교환해야 한다면 교환
    const change = this.cmpfunc(this.origin._elements[nextindex], this.origin._elements[index]);
    if (change) {
      const temp = this.origin._elements[nextindex]
      this.origin._elements[nextindex] = this.origin._elements[index]
      this.origin._elements[index] = temp

      DataNode({ani_delay:(this.duration*9/20).toString()+'s', ani_dur: (this.duration/20).toString()+'s', key: this.id, className: "pqPushErase", border: 'yellow', x: this.interval + this.width*(lastpoint), y: 50, "width": this.width}).map(n => nodeSvg.push(n))  
      this.id += 1;
      DataNode({ani_delay:(this.duration/2).toString()+'s', ani_dur: this.duration.toString()+'s', key: this.id, className: "appear" ,border: 'yellow', data: this.origin._elements[nextindex].toString(), x: this.interval + this.width*(lastpoint), y: 50, "width": this.width}).map(n => nodeSvg.push(n))  
      this.id += 1;
      if (index <= nextindex + 14 - ((nextindex > 5) ? 7 : nextindex + 1)) {
        DataNode({ani_delay:(this.duration*9/20).toString()+'s', ani_dur: (this.duration/20).toString()+'s',key: this.id, className: "pqPushErase", border: 'yellow', x: this.interval + this.width*(index - nextindex + lastpoint), y: 50, "width": this.width}).map(n => nodeSvg.push(n))
        this.id += 1;
        DataNode({ani_delay:(this.duration/2).toString()+'s', ani_dur: this.duration.toString()+'s', key: this.id, className: "appear",border: 'yellow', data: this.origin._elements[index].toString(), x: this.interval + this.width*(index - nextindex + lastpoint), y: 50, "width": this.width}).map(n => nodeSvg.push(n))
        this.id += 1;
      }
    }
    
    // show compare index txt
    indexSvg.push(<text key={this.id} x={this.interval} y={130} width={30} height={20}>Compare with index[{Math.floor((this.state.index-1)/2)}] and index[{this.state.index}] : {(change)? 'true': 'false'}</text>)
    this.id += 1;

    this.setState({index: nextindex, indexSvg, nodeSvg, step: this.state.step + 1})

    // 다음이 0이거나 비교로 교환안됫으면 끝
    if (!nextindex || !change) {
      this.props.initiate((this.duration * 3 / 2)* 1000)
    } else {
      this.sto = setTimeout(() => this.compareNextIndex(), (this.duration * 3 / 2)* 1000 );
    }
  }

  // add node to svg
  addNodes(index = 0) {
    const nodeSvg = [];
    const lastpoint = (index > 4) ? 4 : index;
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

Push.propTypes = {
  stop: PropTypes.bool,
  initiate: PropTypes.func,
  object: PropTypes.object,
  params: PropTypes.array,
  duration: PropTypes.number,
}

Push.defaultProps = {
  stop: false,
  initiate: f=>f,
  object: {},
  params: [],
  duration: 1,
}

export default Push