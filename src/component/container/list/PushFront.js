import React from 'react'
import DataNode from '../DataNode'
import Arrow from '../Arrow'
import '../../../stylesheet/container/list/PushFront.css'


const PushFront = ({initiate=f=>f, object, params=[]}) => {
  const list = object
  let itr = list.begin();
  const express = []
  const newNodeArrow = []
  const width = 65;
  const interval = 20;
  const shownodenum=7;

  // execute next code
  initiate(2000)

  let count = (list.size()>shownodenum)?shownodenum : list.size();
  if(count) {
    express.push(<text x={interval} y={40} width={30} height={15}>Front</text>)
  } else {
    express.push(<text className='pushFrontNew' x={interval} y={40} width={30} height={15}>Front</text>)
  }

  express.push(<text className='stackPushSizeDown' x={interval} y={20} width={30} height={15}>size: {list.size()}</text>)
  express.push(<text className='stackPushSizeUp' x={interval} y={20} width={30} height={15}>size: {list.size() + 1}</text>)

  
  // draw node
  let dataitr = 1;
  while (itr !== list.end() && count>=dataitr) {
    const data = itr.getData();
    DataNode({"className": "front_origin", "key": dataitr, "data": data.toString(), x : interval*(dataitr) + width*(dataitr-1), y: 50, "width": width}).map(n => express.push(n))
    dataitr += 1
    itr = itr.getNext();
  }

  // draw arrow
  count = (list.size()>shownodenum)?shownodenum : list.size();
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