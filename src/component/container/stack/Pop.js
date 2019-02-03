import React from 'react'
import DataNode from '../DataNode'
import '../../../stylesheet/container/stack/Pop.css'


const Pop = ({initiate=f=>f, object, params=[]}) => {
  const stack = object
  const express = []
  const width = 65;
  const interval = 20;
  const shownodenum=6;
  const showSize = stack.size();

  // execute next code
  initiate(2000)
  
  let size = (stack.size()>shownodenum)?shownodenum : stack.size();
  const lastpoint = (size>5)?5:size;
  if(size) {
    express.push(<text className='stackPopMove' x={interval + width*(lastpoint - 1)} y={40} width={30} height={15}>Top</text>)
    express.push(<text x={interval} y={130} width={30} height={15}>Return: true</text>)
    express.push(<text className='stackPopSizeDown' x={interval} y={20} width={30} height={15}>size: {showSize}</text>)
    express.push(<text className='stackPopSizeUp' x={interval} y={20} width={30} height={15}>size: {showSize - 1}</text>)
  } else {
    express.push(<text x={interval} y={50} width={30} height={15}>Error: no data but pop</text>)
    express.push(<text x={interval} y={130} width={30} height={15}>Return: false</text>)
    express.push(<text x={interval} y={20} width={30} height={15}>size: {showSize}</text>)
  }
  
  // draw node
  let idx = 0;
  while (size > idx) {
    const data = stack._elements[stack.size() - idx - 1]
    if (idx === 0) {
      DataNode({"className":'stackPopDisappear', "key": idx, "data": data.toString(), x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => express.push(n))
    } else {
      DataNode({"key": idx, "data": data.toString(), x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => express.push(n))
    }
    idx += 1;
  }

  return (
    <svg style={{width:"100%", height: "100%"}}>
      {express}
    </svg>
  )
}

export default Pop