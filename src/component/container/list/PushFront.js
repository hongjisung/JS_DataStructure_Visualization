import React from 'react'
import DataNode from '../DataNode'
import Arrow from '../Arrow'
import '../../../stylesheet/container/list/PushFront.css'


const PushFront = ({object, params=[]}) => {
  const list = object
  let itr = list.begin();
  const express = []
  const newNodeArrow = []
  const width = 65;
  const interval = 20;

  // draw node
  let count = (list.size()>7)?7 : list.size();
  if(count) {
    express.push(<text x={interval} y={40} width={30} height={15}>Front</text>)
  } else {
    express.push(<text className='pushFrontNew' x={interval} y={40} width={30} height={15}>Front</text>)
  }

  while (itr !== list.end() && count>0) {
    const data = itr.getData();
    DataNode({"className": "front_origin", "key": count, "data": data.toString(), x : interval*(count) + width*(count-1), y: 50, "width": width}).map(n => express.push(n))
    count -= 1
    itr = itr.getNext();
  }

  // draw arrow
  count = (list.size()>7)?7 : list.size();
  for (let i=1; i<count; i += 1) {
    Arrow(interval * i + width * i, 70, interval * (i+1) + width * i, 70, "front_origin").map(n => express.push(n))
    Arrow(interval * (i+1) + width * i, 80, interval * i + width * i, 80, "front_origin").map(n => express.push(n))
  }

  // New Node and Arrow
  count = (list.size()>0)?1 : 0;
  DataNode({"className": "pushFrontNew", "key": count+1,"data": params[0].toString(),  x : interval, y: 50, "width": width}).map(n => newNodeArrow.push(n))
  if (count) {
    Arrow(interval * count + width * count, 70, interval * (count+1) + width * count, 70, "pushFrontNew").map(n => newNodeArrow.push(n))
    Arrow(interval * (count+1) + width * count, 80, interval * count + width * count, 80, "pushFrontNew").map(n => newNodeArrow.push(n))
  }

  return (
    <svg style={{width:"100%", height: "100%"}}>
      {express}
      {newNodeArrow}
    </svg>
  )
}

export default PushFront