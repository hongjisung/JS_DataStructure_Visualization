import React from 'react'
import DataNode from '../DataNode'
import Arrow from '../Arrow'
import '../../../stylesheet/container/list/PushBack.css'


const PushBack = ({object, params=[]}) => {
  const list = object
  let itr = list.rbegin();
  const express = []
  const newNodeArrow = []
  const width = 65;
  const interval = 20;

  // draw node
  let count = (list.size()>5)?5 : list.size();
  express.push(<text id='back-text' className="pushBackMoving" x={interval*count + width*(count-1)} y={40} width={30} height={15}>Back</text>)

  while (itr !== list.rend() && count>0) {
    const data = itr.getData();
    DataNode({"key": count, "data": data.toString(), x : interval*(count) + width*(count-1), y: 50, "width": width}).map(n => express.push(n))
    count -= 1
    itr = itr.getPrev();
    console.log(count)
  }

  // draw arrow
  count = (list.size()>5)?6 : list.size();
  for (let i=1; i<count; i += 1) {
    if (i===5) {
      Arrow(0, 70, interval, 70).map(n => express.push(n))
      Arrow(interval, 80, 0, 80).map(n => express.push(n))
    } else {
      Arrow(interval * i + width * i, 70, interval * (i+1) + width * i, 70).map(n => express.push(n))
      Arrow(interval * (i+1) + width * i, 80, interval * i + width * i, 80).map(n => express.push(n))
    }
  }

  // New Node and Arrow
  count = (list.size()>5)?6 : list.size()+1;
  DataNode({"className": "newAnimation", "key": count+1,"data": params[0].toString(),  x : interval*(count) + width*(count-1), y: 50, "width": width}).map(n => newNodeArrow.push(n))
  count -= 1;
  if (count) {
    Arrow(interval * count + width * count, 70, interval * (count+1) + width * count, 70, "newAnimation").map(n => newNodeArrow.push(n))
    Arrow(interval * (count+1) + width * count, 80, interval * count + width * count, 80, "newAnimation").map(n => newNodeArrow.push(n))
  }

  return (
    <svg style={{width:"100%", height: "100%"}}>
      {express}
      {newNodeArrow}
    </svg>
  )
}

export default PushBack