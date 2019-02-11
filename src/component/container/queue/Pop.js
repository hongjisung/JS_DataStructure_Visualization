import React from 'react'
import DataNode from '../DataNode'
import '../../../stylesheet/container/queue/Pop.css'
import {Queue} from 'js_dsal'

/*
1) front is last node in array and queue.size() >=2
2) queue.size() == 1
3) empty queue
4) else
*/

const Pop = ({initiate=f=>f, object, params=[]}) => { 
  const origin = object.queue;
  const queue = new Queue();
  queue._elements = [];
  origin._elements.map(n => queue._elements.push(n))
  queue._size = origin._size
  queue._maxSize = origin._maxSize
  queue._begin = origin._begin
  queue._end = origin._end
  console.log(queue)

  const textSvg = [];
  const frontSvg = [];
  const nodeSvg = [];
  const width = 65;
  const interval = 20;
  const shownodenum=6;
  let nodeSize = queue.size()
  let maxSize = queue._maxSize;

  // execute next code
  initiate(2000)

  // size svg
  if (nodeSize) {
    textSvg.push(<text className='stackPushSizeDown' x={interval} y={20} width={30} height={15}>size: {nodeSize}</text>)
    textSvg.push(<text className='stackPushSizeUp' x={interval} y={20} width={30} height={15}>size: {nodeSize - 1}</text>)
    textSvg.push(<text x={interval} y={130} width={30} height={15}>Return: true</text>)
  } else {
    textSvg.push(<text x={interval} y={20} width={30} height={15}>size: {nodeSize}</text>)
    textSvg.push(<text x={interval} y={50} width={30} height={15}>Error: no data but pop</text>)
    textSvg.push(<text x={interval} y={130} width={30} height={15}>Return: false</text>)
  }

  // max size svg
  textSvg.push(<text x={interval + 50} y={20} width={30} height={15}>max size: {maxSize}</text>)

  // front and node svg
  let showSize = (queue.size() && queue._begin + 1>shownodenum) ? shownodenum : queue._begin + 1;
  let lastpoint = (queue.size() && queue._begin + 1>5) ? 5 : queue._begin + 1;
  let showMax = 13;

  if (queue._begin === maxSize - 1 && nodeSize >= 2) {
    // 1) front is last node in array and queue.size() >=2
    // erase node and front
    frontSvg.push(<text className='slowDisappear' x={interval + width*(lastpoint - 1)} y={40} width={30} height={15}>Front</text>)
    let total = showMax;
    let idx = 0;
    while(total > 0 && queue._begin - idx >= 0 && showSize > idx) {
      const data = queue._elements[queue._begin - idx]
      if (idx === 0 || idx > maxSize - nodeSize) {
        DataNode({"className": "queuePushDisappear", "data": data.toString(), x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      } else {
        DataNode({"className": "queuePushDisappear", "color": "gray", x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      }
      idx += 1;
      total -= 1;
    }

    // emerge node and end
    total = showMax;
    idx = 0;
    frontSvg.push(<text className='slowAppear' x={interval} y={40} width={30} height={15}>Front</text>)
    while(total - idx > 0 && idx <= queue._begin) {
      const data = queue._elements[idx]
      if (idx <= queue._end) {
        DataNode({"className": "queuePushAppearNext", "data": data.toString(), x : interval + width*(idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      } else {
        DataNode({"className": "queuePushAppearNext", "color": "gray", x : interval + width*(idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      }
      idx += 1;
    }
  } else if (nodeSize === 1) {
    // 2) queue.size() == 1
    // show node and front
    // front
    frontSvg.push(<text className='slowDelayDisappear' x={interval + width*(lastpoint - 1)} y={40} width={30} height={15}>Front</text>)

    // node
    let total = showMax;
    let idx = 0;
    // front nodes of base
    while(total > 0 && queue._begin - idx >= 0 && showSize > idx) {
      const data = queue._elements[queue._begin - idx]
      if (!idx) {
        DataNode({"className": "queuePushDisappear", "data": data.toString(), x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        DataNode({"className": "queuePushAppearNext", "color": "gray", x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      } else {
        DataNode({"color": "gray", x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      }
      idx += 1;
      total -= 1;
    }
    // behind nodes of base
    idx = 1
    while(total > 0 && queue._begin + idx < maxSize) {
      DataNode({"color": "gray", x : interval + width*(lastpoint - 1 + idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      idx += 1;
      total -= 1;
    }
  } else if (!nodeSize) {
    // 3) empty queue
    // None
  } else {
    // 4) else
    // front
    frontSvg.push(<text className='queuePushMove' x={interval + width*(lastpoint - 1)} y={40} width={30} height={15}>Front</text>)
    
    // node
    let total = showMax;
    let idx = 0;
    // front nodes of base
    while(total > 0 && queue._begin - idx >= 0 && showSize > idx) {
      const data = queue._elements[queue._begin - idx]
      if (!idx) {
        DataNode({"className": "queuePushDisappear", "data": data.toString(), x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        DataNode({"className": "queuePushAppearNext", "color":"gray", x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      } else if (queue._end < queue._begin && queue._begin - idx <= queue._end){
        DataNode({"data": data.toString(), x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))  
      } else {
        DataNode({"color": "gray", x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      }
      idx += 1;
      total -= 1;
    }
    // behind nodes of base
    idx = 1
    while(total > 0 && queue._begin + idx < maxSize) {
      const data = queue._elements[queue._begin + idx]
      if (queue._end < queue._begin || queue._begin + idx <= queue._end) {
        DataNode({"data": data.toString(), x : interval + width*(lastpoint - 1 + idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      } else {
        DataNode({"color": "gray", x : interval + width*(lastpoint - 1 + idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      }
      idx += 1;
      total -= 1;
    }
  }

  return (
    <svg style={{width:"100%", height: "100%"}}>
      {textSvg}
      {frontSvg}
      {nodeSvg}
    </svg>
  )
}

export default Pop