import React from 'react'
import DataNode from '../DataNode'
import '../../../stylesheet/container/stack/Push.css'


const Push = ({object, params=[]}) => {
  const stack = object
  const express = []
  const width = 65;
  const interval = 20;
  const shownodenum=6;
  const showSize = stack.size();
  express.push(<text className='stackPushSizeDown' x={interval} y={20} width={30} height={15}>size: {showSize}</text>)
  express.push(<text className='stackPushSizeUp' x={interval} y={20} width={30} height={15}>size: {showSize + 1}</text>)

  let size = (stack.size()>shownodenum)?shownodenum : stack.size();
  const lastpoint = (size>5)?5:size;
  if(size) {
    express.push(<text className='stackPushMove' x={interval + width*(lastpoint - 1)} y={40} width={30} height={15}>Top</text>)
  } else {
    express.push(<text className='stackPushNew' x={interval} y={40} width={30} height={15}>Top</text>)
  }
  
  // draw node
  let idx = 0;
  while (size > idx) {
    const data = stack._elements[stack.size() - idx - 1]
    DataNode({"key": idx, "data": data.toString(), x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => express.push(n))
    idx += 1;
  }

  // New Node
  DataNode({"className": 'stackPushNew',"data": params[0].toString(), x : interval + width*(lastpoint), y: 50, "width": width}).map(n => express.push(n))

  return (
    <svg style={{width:"100%", height: "100%"}}>
      {express}
    </svg>
  )
}

export default Push