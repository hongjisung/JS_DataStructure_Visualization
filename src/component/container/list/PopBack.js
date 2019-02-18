import React from 'react'
import DataNode from '../DataNode'
import Arrow from '../Arrow'
import '../../../stylesheet/container/list/PopBack.css'

const PopBack = ({initiate=f=>f,object, params=[], duration = 1, stop = false}) => {
  const list = object
  let itr = list.rbegin();
  const express = []
  const width = 65;
  const interval = 20;
  let keyid = 1;

  // execute next code
  if (!stop) {
    initiate(duration * 2 * 1000)
  }

  // draw node
  let count = (list.size()>5)?5 : list.size();
  if(count) {
    express.push(<text key={keyid} id='back-text' className="popBackMoving" style={{animationDelay:duration.toString()+'s', animationDuration:duration.toString()+'s'}} x={interval*count + width*(count-1)} y={40} width={30} height={15}>Back</text>)
    keyid += 1;
    express.push(<text key={keyid} x={interval} y={130} width={30} height={15}>Return: true</text>)
    keyid += 1;
    express.push(<text key={keyid} className='pqPopSizeErase' style={{animationDuration: (duration*2).toString() +'s'}} x={interval} y={20} width={30} height={15}>size: {list.size()}</text>)
    keyid += 1;
    express.push(<text key={keyid} className='pqPopSizeEmerge' style={{animationDuration: (duration*2).toString() +'s'}} x={interval} y={20} width={30} height={15}>size: {list.size() - 1}</text>)
    keyid += 1;
  } else {
    express.push(<text key={keyid} x={interval} y={60} width={30} height={15}>error: no element but pop</text>)
    keyid += 1;
    express.push(<text key={keyid} x={interval} y={130} width={30} height={15}>Return: false</text>)
    keyid += 1;
    express.push(<text key={keyid} x={interval} y={20} width={30} height={15}>size: {list.size()}</text>)
    keyid += 1;
  }
  

  while (itr !== list.rend() && count>0) {
    const data = itr.getData();
    if (count === ((list.size()>5)?5 : list.size())){
      DataNode({key: keyid,ani_delay: '0s', ani_dur:duration.toString()+'s', "className": "removing", "data": data.toString(), x : interval*(count) + width*(count-1), y: 50, "width": width}).map(n => express.push(n))
      keyid += 1;
    } else {
      DataNode({"key": keyid, "data": data.toString(), x : interval*(count) + width*(count-1), y: 50, "width": width}).map(n => express.push(n))
      keyid += 1;
    }
    count -= 1
    itr = itr.getPrev();
  }

  // draw arrow
  count = (list.size()>5)?6 : list.size();
  for (let i=1; i<count; i += 1) {
    if (i===5) {
      Arrow(0, 70, interval, 70, 'Arrow', keyid).map(n => express.push(n))
      keyid += 1;
      Arrow(interval, 80, 0, 80, 'Arrow', keyid).map(n => express.push(n))
      keyid += 1;
    } else {
      if (count-1 === i || i===4) {
        Arrow(interval * i + width * i, 70, interval * (i+1) + width * i, 70, "removing", keyid, '0s', duration.toString()+'s').map(n => express.push(n))
        keyid += 1;
        Arrow(interval * (i+1) + width * i, 80, interval * i + width * i, 80, "removing", keyid, '0s', duration.toString()+'s').map(n => express.push(n))
        keyid += 1;
      } else {
        Arrow(interval * i + width * i, 70, interval * (i+1) + width * i, 70, 'Arrow', keyid).map(n => express.push(n))
        keyid += 1;
        Arrow(interval * (i+1) + width * i, 80, interval * i + width * i, 80, 'Arrow', keyid).map(n => express.push(n))
        keyid += 1;
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