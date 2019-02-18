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

const Pop = ({initiate=f=>f, object, params=[], duration = 1, stop = false}) => { 
  const origin = object.queue;
  if (origin === undefined) {
    return (<div />)
  }
  const queue = new Queue();
  queue._elements = [];
  origin._elements.map(n => queue._elements.push(n))
  queue._size = origin._size
  queue._maxSize = origin._maxSize
  queue._begin = origin._begin
  queue._end = origin._end
  console.log(queue)

  let keyid = 1;
  const textSvg = [];
  const frontSvg = [];
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
  if (nodeSize) {
    textSvg.push(<text key={keyid} className='pqPopSizeErase' style={{animationDuration: (duration*2).toString()+'s'}} x={interval} y={20} width={30} height={15}>size: {nodeSize}</text>)
    keyid += 1;
    textSvg.push(<text key={keyid} className='pqPopSizeEmerge' style={{animationDuration: (duration*2).toString()+'s'}} x={interval} y={20} width={30} height={15}>size: {nodeSize - 1}</text>)
    keyid += 1;
    textSvg.push(<text key={keyid} x={interval} y={130} width={30} height={15}>Return: true</text>)
    keyid += 1;
  } else {
    textSvg.push(<text key={keyid} x={interval} y={20} width={30} height={15}>size: {nodeSize}</text>)
    keyid += 1;
    textSvg.push(<text key={keyid} x={interval} y={50} width={30} height={15}>Error: no data but pop</text>)
    keyid += 1;
    textSvg.push(<text key={keyid} x={interval} y={130} width={30} height={15}>Return: false</text>)
    keyid += 1;
  }

  // max size svg
  textSvg.push(<text key={keyid} x={interval + 50} y={20} width={30} height={15}>max size: {maxSize}</text>)
  keyid += 1;
    
  // front and node svg
  let showSize = (queue.size() && queue._begin + 1>shownodenum) ? shownodenum : queue._begin + 1;
  let lastpoint = (queue.size() && queue._begin + 1>5) ? 5 : queue._begin + 1;
  let showMax = 13;

  if (queue._begin === maxSize - 1 && nodeSize >= 2) {
    // 1) front is last node in array and queue.size() >=2
    // erase node and front
    frontSvg.push(<text key={keyid} className='disappear' style={{animationDuration: (duration).toString()+'s'}} x={interval + width*(lastpoint - 1)} y={40} width={30} height={15}>Front</text>)
    keyid += 1;
    let total = showMax;
    let idx = 0;
    while(total > 0 && queue._begin - idx >= 0 && showSize > idx) {
      const data = queue._elements[queue._begin - idx]
      if (idx === 0 || idx > maxSize - nodeSize) {
        DataNode({key: keyid, ani_delay:'0s', ani_dur: (duration).toString()+'s', "className": "queuePushDisappear", "data": data.toString(), x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      } else {
        DataNode({key: keyid, ani_delay:'0s', ani_dur: (duration).toString()+'s',  "className": "queuePushDisappear", "color": "gray", x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      }
      idx += 1;
      total -= 1;
    }

    // emerge node and end
    total = showMax;
    idx = 0;
    frontSvg.push(<text key={keyid} className='appear' style={{animationDuration: (duration).toString() + 's', animationDelay: (duration).toString() + 's'}} x={interval} y={40} width={30} height={15}>Front</text>)
    keyid += 1;
    while(total - idx > 0 && idx <= queue._begin) {
      const data = queue._elements[idx]
      if (idx <= queue._end) {
        DataNode({key: keyid, ani_delay: (duration).toString()+'s', ani_dur: (duration).toString()+'s', "className": "queuePushAppearNext", "data": data.toString(), x : interval + width*(idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      } else {
        DataNode({key: keyid, ani_delay: (duration).toString()+'s', ani_dur: (duration).toString()+'s', "className": "queuePushAppearNext", "color": "gray", x : interval + width*(idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      }
      idx += 1;
    }
  } else if (nodeSize === 1) {
    // 2) queue.size() == 1
    // show node and front
    // front
    frontSvg.push(<text key={keyid} className='disappear' style={{animationDuration: (duration*0.5).toString() + 's', animationDelay: (duration).toString() + 's'}} x={interval + width*(lastpoint - 1)} y={40} width={30} height={15}>Front</text>)
    keyid += 1;
    
    // node
    let total = showMax;
    let idx = 0;
    // front nodes of base
    while(total > 0 && queue._begin - idx >= 0 && showSize > idx) {
      const data = queue._elements[queue._begin - idx]
      if (!idx) {
        DataNode({key: keyid, ani_delay:'0s', ani_dur: (duration).toString()+'s', "className": "queuePushDisappear", "data": data.toString(), x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
        DataNode({key: keyid, ani_delay: (duration).toString()+'s', ani_dur: (duration).toString()+'s', "className": "queuePushAppearNext", "color": "gray", x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
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
    while(total > 0 && queue._begin + idx < maxSize) {
      DataNode({key: keyid, "color": "gray", x : interval + width*(lastpoint - 1 + idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
      keyid += 1;
      idx += 1;
      total -= 1;
    }
  } else if (!nodeSize) {
    // 3) empty queue
    // None
  } else {
    // 4) else
    // front
    frontSvg.push(<text key={keyid} className='queuePushMove' style={{animationDelay: (duration).toString()+'s',  animationDuration: (duration).toString()+'s'}} x={interval + width*(lastpoint - 1)} y={40} width={30} height={15}>Front</text>)
    keyid += 1;
    
    // node
    let total = showMax;
    let idx = 0;
    // front nodes of base
    while(total > 0 && queue._begin - idx >= 0 && showSize > idx) {
      const data = queue._elements[queue._begin - idx]
      if (!idx) {
        DataNode({key: keyid, ani_delay:'0s', ani_dur: (duration).toString()+'s', "className": "queuePushDisappear", "data": data.toString(), x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
        DataNode({key: keyid, ani_delay: (duration).toString()+'s', ani_dur: (duration).toString()+'s', "className": "queuePushAppearNext", "color":"gray", x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      } else if (queue._end < queue._begin && queue._begin - idx <= queue._end){
        DataNode({key: keyid, "data": data.toString(), x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => nodeSvg.push(n))  
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
    while(total > 0 && queue._begin + idx < maxSize) {
      const data = queue._elements[queue._begin + idx]
      if (queue._end < queue._begin || queue._begin + idx <= queue._end) {
        DataNode({key: keyid, "data": data.toString(), x : interval + width*(lastpoint - 1 + idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
      } else {
        DataNode({key: keyid, "color": "gray", x : interval + width*(lastpoint - 1 + idx), y: 50, "width": width}).map(n => nodeSvg.push(n))
        keyid += 1;
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