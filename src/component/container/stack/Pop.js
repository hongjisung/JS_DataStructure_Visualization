import React from 'react'
import DataNode from '../DataNode'
import '../../../stylesheet/container/stack/Pop.css'
import {Stack} from 'js_dsal'


const Pop = ({initiate=f=>f, object, params=[], duration = 1, stop = false}) => {
  const stack = new Stack(object.stack)
  const express = []
  const width = 65;
  const interval = 20;
  const shownodenum=6;
  const showSize = stack.size();
  let keyid = 1;

  // execute next code
  if (!stop) {
    initiate(duration * 2 * 1000)
  }
  
  let size = (stack.size()>shownodenum)?shownodenum : stack.size();
  const lastpoint = (size>5)?5:size;
  if(size) {
    express.push(<text key={keyid} className='stackPopMove' style={{animationDuration: (duration).toString() + 's', animationDelay: (duration).toString() + 's'}} x={interval + width*(lastpoint - 1)} y={40} width={30} height={15}>Top</text>)
    keyid+=1;
    express.push(<text key={keyid} x={interval} y={130} width={30} height={15}>Return: true</text>)
    keyid+=1;
    express.push(<text key={keyid} className='pqPopSizeErase' style={{animationDuration: (duration*2).toString()+'s'}} x={interval} y={20} width={30} height={15}>size: {showSize}</text>)
    keyid+=1;
    express.push(<text key={keyid} className='pqPopSizeEmerge' style={{animationDuration: (duration*2).toString()+'s'}} x={interval} y={20} width={30} height={15}>size: {showSize - 1}</text>)
    keyid+=1;
  } else {
    express.push(<text key={keyid} x={interval} y={50} width={30} height={15}>Error: no data but pop</text>)
    keyid+=1;
    express.push(<text key={keyid} x={interval} y={130} width={30} height={15}>Return: false</text>)
    keyid+=1;
    express.push(<text key={keyid} x={interval} y={20} width={30} height={15}>size: {showSize}</text>)
    keyid+=1;
  }
  
  // draw node
  let idx = 0;
  while (size > idx) {
    const data = stack._elements[stack.size() - idx - 1]
    if (idx === 0) {
      DataNode({key: keyid, ani_delay:'0s', ani_dur: duration.toString()+'s', "className":'stackPopDisappear', "data": data.toString(), x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => express.push(n))
      keyid+=1;
    } else {
      DataNode({key: keyid, "data": data.toString(), x : interval + width*(lastpoint - 1 - idx), y: 50, "width": width}).map(n => express.push(n))
      keyid+=1;
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