import React from 'react'
import DataNode from '../DataNode'
import Arrow from '../Arrow'
import '../../../stylesheet/container/list/PopBack.css'

const PopBack = ({nextStep=f=>f,object, params=[]}) => {
  const list = object
  let itr = list.rbegin();
  const express = []
  const width = 65;
  const interval = 20;

  // execute next code
  setTimeout(nextStep, 2000)

  // draw node
  let count = (list.size()>5)?5 : list.size();
  if(count) {
    express.push(<text id='back-text' className="popBackMoving" x={interval*count + width*(count-1)} y={40} width={30} height={15}>Back</text>)
  } else {
    express.push(<text x={10} y={40} width={30} height={15}>error: no element but pop</text>)
  }
  

  while (itr !== list.rend() && count>0) {
    const data = itr.getData();
    if (count === ((list.size()>5)?5 : list.size())){
      DataNode({"className": "removing", "key": count, "data": data.toString(), x : interval*(count) + width*(count-1), y: 50, "width": width}).map(n => express.push(n))
    } else {
      DataNode({"key": count, "data": data.toString(), x : interval*(count) + width*(count-1), y: 50, "width": width}).map(n => express.push(n))
    }
    count -= 1
    itr = itr.getPrev();
  }

  // draw arrow
  count = (list.size()>5)?6 : list.size();
  for (let i=1; i<count; i += 1) {
    if (i===5) {
      Arrow(0, 70, interval, 70).map(n => express.push(n))
      Arrow(interval, 80, 0, 80).map(n => express.push(n))
    } else {
      if (count-1 === i || i===4) {
        Arrow(interval * i + width * i, 70, interval * (i+1) + width * i, 70, "removing").map(n => express.push(n))
        Arrow(interval * (i+1) + width * i, 80, interval * i + width * i, 80, "removing").map(n => express.push(n))
      } else {
        Arrow(interval * i + width * i, 70, interval * (i+1) + width * i, 70).map(n => express.push(n))
        Arrow(interval * (i+1) + width * i, 80, interval * i + width * i, 80).map(n => express.push(n))
      }
    }
  }

  return (
    <svg style={{width:"100%", height: "100%"}}>
      {express}
    </svg>
  )
}

export default PopBack