import React from 'react'
import DataNode from '../DataNode'
import Arrow from '../Arrow'
import '../../../stylesheet/container/list/PopFront.css'


const PopFront = ({object, params=[]}) => {
  const list = object
  let itr = list.begin();
  const express = []
  const width = 65;
  const interval = 20;
  const shownodenum = 9;

  let count = (list.size()>shownodenum)?shownodenum : list.size();
  if(count>1) {
    express.push(<text x={interval} y={40} width={30} height={15}>Front</text>)
  } else if (count === 1){
    express.push(<text className='listPopFront' x={interval} y={40} width={30} height={15}>Front</text>)
  } else {
    express.push(<text x={interval} y={40} width={30} height={15}>Error: No Data to eliminate</text>)
  }
  
  // draw node
  let dataitr = 1;
  while (itr !== list.end() && count>=dataitr) {
    const data = itr.getData();
    console.log(data);
    if (dataitr === 1) {
      DataNode({"className": "listPopFront", "key": dataitr, "data": data.toString(), x : interval*(dataitr) + width*(dataitr-1), y: 50, "width": width}).map(n => express.push(n))
    } else {
      DataNode({"className": "listPopFrontOrigin", "key": dataitr, "data": data.toString(), x : interval*(dataitr) + width*(dataitr-1), y: 50, "width": width}).map(n => express.push(n))
    }
    dataitr+=1
    itr = itr.getNext();
  }

  // draw arrow
  count = (list.size()>shownodenum)?shownodenum : list.size();
  for (let i=1; i<count; i += 1) {
    if (i === 1 ) {
      Arrow(interval * i + width * i, 70, interval * (i+1) + width * i, 70, "listPopFront").map(n => express.push(n))
      Arrow(interval * (i+1) + width * i, 80, interval * i + width * i, 80, "listPopFront").map(n => express.push(n))
    } else {
      Arrow(interval * i + width * i, 70, interval * (i+1) + width * i, 70, "listPopFrontOrigin").map(n => express.push(n))
      Arrow(interval * (i+1) + width * i, 80, interval * i + width * i, 80, "listPopFrontOrigin").map(n => express.push(n))
    }
  }


  return (
    <svg style={{width:"100%", height: "100%"}}>
      {express}
    </svg>
  )
}

export default PopFront