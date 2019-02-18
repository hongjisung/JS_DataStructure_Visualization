import React from 'react'
import DataNode from '../DataNode'
import '../../../stylesheet/container/queue/Push.css'
import {Queue} from 'js_dsal'

/*
If nodeSize === maxSize : make new array of double size
the base structure is circular array, so data can be last element of array or some are in front and others are in back
ex) 1,2,3,empty,empty,empty,10,6 

1) not full, not last
2) not full, last
3) full
4) empty
*/
const Push = ({initiate=f=>f, object, params=[], duration=1, stop = false}) => {
  const origin = object.queue;
  if (origin === undefined) {
    return (<div/>)
  }
  const queue = new Queue();
  queue._elements = [];
  origin._elements.map(n => queue._elements.push(n))
  queue._size = origin._size
  queue._maxSize = origin._maxSize
  queue._begin = origin._begin
  queue._end = origin._end
  
  let keyid = 1;
  const textSvg = [];
  const endSvg = [];
  const nodeSvg = [];
  const width = 65;
  const interval = 20;
  const shownodenum=6;
  let nodeSize = queue.size()
  let maxSize = queue._maxSize;

  // execute next code
  if (!stop) {
    initiate(duration * 2 * 1000)
  }

  // size svg
  textSvg.push(<text key={keyid} className='pqPopSizeErase' style={{animationDuration: (duration*2).toString()+'s'}} x={interval} y={20} width={30} height={15}>size: {nodeSize}</text>)
  keyid += 1;
  textSvg.push(<text key={keyid} className='pqPopSizeEmerge' style={{animationDuration: (duration*2).toString()+'s'}} x={interval} y={20} width={30} height={15}>size: {nodeSize + 1}</text>)
  keyid += 1;
  
  // max size svg
  if (nodeSize !== maxSize) {
    textSvg.push(<text key={keyid} x={interval + 50} y={20} width={30} height={15}>max size: {maxSize}</text>)
    keyid += 1;
  } else {
    textSvg.push(<text key={keyid} className='pqPopSizeErase' style={{animationDuration: (duration*2).toString()+'s'}} x={interval + 50} y={20} width={30} height={15}>max size: {maxSize}</text>)
    keyid += 1;
    textSvg.push(<text key={keyid} className='pqPopSizeEmerge' style={{animationDuration: (duration*2).toString()+'s'}} x={interval + 50} y={20} width={30} height={15}>max size: {maxSize * 2}</text>)
    keyid += 1;
  }
  

  // end and node svg
  let showSize = (queue.size() && queue._end + 1>shownodenum) ? shownodenum : queue._end + 1;
  let lastpoint = (queue.size() && queue._end + 1>5) ? 5 : queue._end + 1;
  let showMax = 13;
  if(nodeSize === maxSize) {
    // full
    // erase node and end
    endSvg.push(<text key={keyid} className='queuePushDisappear' style={{animationDuration: (duration).toString()+'s'}} x={interval + width*(lastpoint - 1)} y={40} width={30} height={15}>Back</text>)
    keyid += 1;
    let total = showMax;
    let idx = 0;
    // front nodes of base
    while(total > 0 && queue._end - idx >= 0 && showSize > idx) {
      const data = queue._elements[queue._end - idx]
      if (idx < queue.size()) {
        DataNode({key: keyid, ani_delay:'0s', ani_dur: (duration).toString()+'s', "className":'queuePushDisappear', "data": data.toString(), x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      } else {
        DataNode({key: keyid, ani_delay:'0s', ani_dur: (duration).toString()+'s', "className":'queuePushDisappear',"color": "gray", x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      }
      idx += 1;
      total -= 1;
    }
    // behind nodes of base
    idx = 1
    while(total > 0 && queue._end + idx < maxSize) {
      const data = queue._elements[queue._end + idx]
      if (queue._begin > queue._end && queue._begin <= queue._end + idx) {
        DataNode({key: keyid, ani_delay:'0s', ani_dur: (duration).toString()+'s', "className":'queuePushDisappear', "data": data.toString(), x : interval + width*(lastpoint - 1 + idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      } else {
        DataNode({key: keyid, ani_delay:'0s', ani_dur: (duration).toString()+'s', "className":'queuePushDisappear', "color": "gray", x : interval + width*(lastpoint - 1 + idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      }
      idx += 1;
      total -= 1;
    }

    //emerge node and end
    queue.push(params[0])
    showSize = (queue.size() && queue._end + 1>shownodenum) ? shownodenum : queue._end + 1;
    lastpoint = (queue.size() && queue._end + 1>5) ? 5 : queue._end + 1;
    nodeSize = queue.size()
    maxSize = queue._maxSize;

    endSvg.push(<text key={keyid} className='queuePushAppearNext' style={{animationDelay: (duration).toString()+'s',  animationDuration: (duration).toString()+'s'}} x={interval + width*(lastpoint - 1)} y={40} width={30} height={15}>Back</text>)
    keyid += 1;
    total = showMax;
    idx = 0;
    // front nodes of base
    while(total > 0 && queue._end - idx >= 0 && showSize > idx) {
      const data = queue._elements[queue._end - idx]
      if (idx < queue.size()) {
        DataNode({key:keyid, ani_delay: (duration).toString()+'s', ani_dur: (duration).toString()+'s', "className":'queuePushAppearNext', "data": data.toString(), x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      } else {
        DataNode({key: keyid, ani_delay: (duration).toString()+'s', ani_dur: (duration).toString()+'s', "className":'queuePushAppearNext',"color": "gray", x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      }
      idx += 1;
      total -= 1;
    }
    // behind nodes of base
    idx = 1
    while(total > 0 && queue._end + idx < maxSize) {
      const data = queue._elements[queue._end + idx]
      if (queue._begin > queue._end && queue._begin <= queue._end + idx) {
        DataNode({key:keyid, ani_delay: (duration).toString()+'s', ani_dur: (duration).toString()+'s', "className":'queuePushAppearNext', "data": data.toString(), x : interval + width*(lastpoint - 1 + idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      } else {
        DataNode({key: keyid, ani_delay: (duration).toString()+'s', ani_dur: (duration).toString()+'s', "className":'queuePushAppearNext', "color": "gray", x : interval + width*(lastpoint - 1 + idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      }
      idx += 1;
      total -= 1;
    }

  } else if (queue._end === maxSize - 1){
    // not full, last
    // back node and end
    endSvg.push(<text key={keyid} className='queuePushDisappear' style={{animationDuration: (duration).toString()+'s'}} x={interval + width*(lastpoint - 1)} y={40} width={30} height={15}>Back</text>)
    keyid += 1;
    let total = showMax;
    let idx = 0;
    while(total > 0 && queue._end - idx >= 0 && showSize > idx) {
      const data = queue._elements[queue._end - idx]
      if (idx < queue.size()) {
        DataNode({key: keyid, ani_delay:'0s', ani_dur: (duration).toString()+'s', "className": "queuePushDisappear", "data": data.toString(), x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      } else {
        DataNode({key: keyid, ani_delay:'0s', ani_dur: (duration).toString()+'s', "className": "queuePushDisappear", "color": "gray", x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      }
      idx += 1;
      total -= 1;
    }

    // front node and end
    total = showMax;
    idx = 0;
    endSvg.push(<text key={keyid} className='queuePushAppearNext' style={{animationDelay: (duration).toString()+'s',  animationDuration: (duration).toString()+'s'}} x={interval} y={40} width={30} height={15}>Back</text>)
    keyid += 1;
    while(total - idx > 0 && idx <= queue._end) {
      const data = queue._elements[idx]
      if (idx >= queue._begin) {
        DataNode({key:keyid, ani_delay: (duration).toString()+'s', ani_dur: (duration).toString()+'s', "className": "queuePushAppearNext", "data": data.toString(), x : interval + width*(idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      } else if(idx === 0) {
        DataNode({key: keyid, ani_delay: (duration).toString()+'s', ani_dur: (duration).toString()+'s', "className": "queuePushAppearNext", "data": params[0].toString(), x : interval + width*(idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      } else {
        DataNode({key: keyid, ani_delay: (duration).toString()+'s', ani_dur: (duration).toString()+'s', "className": "queuePushAppearNext", "color": "gray", x : interval + width*(idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      }
      idx += 1;
    }

  } else if (nodeSize === 0) {
    // empty
    DataNode({key: keyid, "color": "gray", x : interval, y: 50, "width": width}).map(n => nodeSvg.push(n))
    keyid += 1;
    DataNode({key: keyid, "color": "gray", x : interval + width, y: 50, "width": width}).map(n => nodeSvg.push(n))
    keyid += 1;
      
    endSvg.push(<text key={keyid} className='queuePushEmerge' style={{animationDuration: (duration).toString()+'s'}} x={interval} y={40} width={30} height={15}>Back</text>)
    keyid += 1;
    DataNode({key: keyid, ani_delay:'0s', ani_dur: (duration).toString()+'s', "className": 'queuePushEmerge',"data": params[0].toString(), x : interval, y: 50, "width": width}).map(n => nodeSvg.push(n))
    keyid += 1;
  } else {
    // not full, not last
    // end
    endSvg.push(<text key={keyid} className='queuePushMove' style={{animationDelay: (duration).toString()+'s',  animationDuration: (duration).toString()+'s'}} x={interval + width*(lastpoint - 1)} y={40} width={30} height={15}>Back</text>)
    keyid += 1;
    
    // node
    let total = showMax;
    let idx = 0;
    // front nodes of base
    while(total > 0 && queue._end - idx >= 0 && showSize > idx) {
      const data = queue._elements[queue._end - idx]
      if (idx < queue.size()) {
        DataNode({key:keyid, "data": data.toString(), x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      } else {
        DataNode({key: keyid, "color": "gray", x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      }
      idx += 1;
      total -= 1;
    }
    // behind nodes of base
    idx = 1
    while(total > 0 && queue._end + idx < maxSize) {
      const data = queue._elements[queue._end + idx]
      if (queue._begin > queue._end && queue._begin <= queue._end + idx) {
        DataNode({key: keyid, "data": data.toString(), x : interval + width*(lastpoint - 1 + idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      } else {
        DataNode({key: keyid, "color": "gray", x : interval + width*(lastpoint - 1 + idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      }
      idx += 1;
      total -= 1;
    }

    // new node
    DataNode({key: keyid, ani_delay:'0s', ani_dur: (duration).toString()+'s', "className": "queuePushEmerge","data": params[0].toString(), x : interval + width*(lastpoint), y: 50, "width": width}).map(n => nodeSvg.push(n))
    keyid += 1;
  }

  return (
    <svg style={{width:"100%", height: "100%"}}>
      {textSvg}
      {endSvg}
      {nodeSvg}
    </svg>
  )
}

export default Push