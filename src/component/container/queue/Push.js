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
const Push = ({initiate=f=>f, object, params=[]}) => {
  const origin = object.queue;
  const queue = new Queue();
  queue._elements = [];
  origin._elements.map(n => queue._elements.push(n))
  queue._size = origin._size
  queue._maxSize = origin._maxSize
  queue._begin = origin._begin
  queue._end = origin._end

  const textSvg = [];
  const endSvg = [];
  const nodeSvg = [];
  const width = 65;
  const interval = 20;
  const shownodenum=6;
  let nodeSize = queue.size()
  let maxSize = queue._maxSize;

  // execute next code
  initiate(2000)

  // size svg
  textSvg.push(<text className='stackPushSizeDown' x={interval} y={20} width={30} height={15}>size: {nodeSize}</text>)
  textSvg.push(<text className='stackPushSizeUp' x={interval} y={20} width={30} height={15}>size: {nodeSize + 1}</text>)
  
  // max size svg
  if (nodeSize !== maxSize) {
    textSvg.push(<text x={interval + 50} y={20} width={30} height={15}>max size: {maxSize}</text>)
  } else {
    textSvg.push(<text className='stackPushSizeDown' x={interval + 50} y={20} width={30} height={15}>max size: {maxSize}</text>)
    textSvg.push(<text className='stackPushSizeUp' x={interval + 50} y={20} width={30} height={15}>max size: {maxSize * 2}</text>)
  }
  

  // end and node svg
  let showSize = (queue.size() && queue._end + 1>shownodenum) ? shownodenum : queue._end + 1;
  let lastpoint = (queue.size() && queue._end + 1>5) ? 5 : queue._end + 1;
  let showMax = 13;
  if(nodeSize === maxSize) {
    // full
    // erase node and end
    endSvg.push(<text className='queuePushDisappear' x={interval + width*(lastpoint - 1)} y={40} width={30} height={15}>Back</text>)
    let total = showMax;
    let idx = 0;
    // front nodes of base
    while(total > 0 && queue._end - idx >= 0 && showSize > idx) {
      const data = queue._elements[queue._end - idx]
      if (idx < queue.size()) {
        DataNode({"className":'queuePushDisappear', "data": data.toString(), x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      } else {
        DataNode({"className":'queuePushDisappear',"color": "gray", x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      }
      idx += 1;
      total -= 1;
    }
    // behind nodes of base
    idx = 1
    while(total > 0 && queue._end + idx < maxSize) {
      const data = queue._elements[queue._end + idx]
      if (queue._begin > queue._end && queue._begin <= queue._end + idx) {
        DataNode({"className":'queuePushDisappear', "data": data.toString(), x : interval + width*(lastpoint - 1 + idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      } else {
        DataNode({"className":'queuePushDisappear', "color": "gray", x : interval + width*(lastpoint - 1 + idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
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

    endSvg.push(<text className='queuePushAppearNext' x={interval + width*(lastpoint - 1)} y={40} width={30} height={15}>Back</text>)
    total = showMax;
    idx = 0;
    // front nodes of base
    while(total > 0 && queue._end - idx >= 0 && showSize > idx) {
      const data = queue._elements[queue._end - idx]
      if (idx < queue.size()) {
        DataNode({"className":'queuePushAppearNext', "data": data.toString(), x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      } else {
        DataNode({"className":'queuePushAppearNext',"color": "gray", x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      }
      idx += 1;
      total -= 1;
    }
    // behind nodes of base
    idx = 1
    while(total > 0 && queue._end + idx < maxSize) {
      const data = queue._elements[queue._end + idx]
      if (queue._begin > queue._end && queue._begin <= queue._end + idx) {
        DataNode({"className":'queuePushAppearNext', "data": data.toString(), x : interval + width*(lastpoint - 1 + idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      } else {
        DataNode({"className":'queuePushAppearNext', "color": "gray", x : interval + width*(lastpoint - 1 + idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      }
      idx += 1;
      total -= 1;
    }

  } else if (queue._end === maxSize - 1){
    // not full, last
    // back node and end
    endSvg.push(<text className='queuePushDisappear' x={interval + width*(lastpoint - 1)} y={40} width={30} height={15}>Back</text>)
    let total = showMax;
    let idx = 0;
    while(total > 0 && queue._end - idx >= 0 && showSize > idx) {
      const data = queue._elements[queue._end - idx]
      if (idx < queue.size()) {
        DataNode({"className": "queuePushDisappear", "data": data.toString(), x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      } else {
        DataNode({"className": "queuePushDisappear", "color": "gray", x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      }
      idx += 1;
      total -= 1;
    }

    // front node and end
    total = showMax;
    idx = 0;
    endSvg.push(<text className='queuePushAppearNext' x={interval} y={40} width={30} height={15}>Back</text>)
    while(total - idx > 0 && idx <= queue._end) {
      const data = queue._elements[idx]
      if (idx >= queue._begin) {
        DataNode({"className": "queuePushAppearNext", "data": data.toString(), x : interval + width*(idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      } else if(idx === 0) {
        DataNode({"className": "queuePushAppearNext", "data": params[0].toString(), x : interval + width*(idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      } else {
        DataNode({"className": "queuePushAppearNext", "color": "gray", x : interval + width*(idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      }
      idx += 1;
    }

  } else if (nodeSize === 0) {
    // empty
    DataNode({"color": "gray", x : interval, y: 50, "width": width}).map(n => nodeSvg.push(n))
    DataNode({"color": "gray", x : interval + width, y: 50, "width": width}).map(n => nodeSvg.push(n))
      
    endSvg.push(<text className='queuePushEmerge' x={interval} y={40} width={30} height={15}>Back</text>)
    DataNode({"className": 'queuePushEmerge',"data": params[0].toString(), x : interval, y: 50, "width": width}).map(n => nodeSvg.push(n))
  
  } else {
    // not full, not last
    // end
    endSvg.push(<text className='queuePushMove' x={interval + width*(lastpoint - 1)} y={40} width={30} height={15}>Back</text>)
    
    // node
    let total = showMax;
    let idx = 0;
    // front nodes of base
    while(total > 0 && queue._end - idx >= 0 && showSize > idx) {
      const data = queue._elements[queue._end - idx]
      if (idx < queue.size()) {
        DataNode({"data": data.toString(), x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      } else {
        DataNode({"color": "gray", x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      }
      idx += 1;
      total -= 1;
    }
    // behind nodes of base
    idx = 1
    while(total > 0 && queue._end + idx < maxSize) {
      const data = queue._elements[queue._end + idx]
      if (queue._begin > queue._end && queue._begin <= queue._end + idx) {
        DataNode({"data": data.toString(), x : interval + width*(lastpoint - 1 + idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      } else {
        DataNode({"color": "gray", x : interval + width*(lastpoint - 1 + idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      }
      idx += 1;
      total -= 1;
    }

    // new node
    DataNode({"className": "queuePushEmerge","data": params[0].toString(), x : interval + width*(lastpoint), y: 50, "width": width}).map(n => nodeSvg.push(n))
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