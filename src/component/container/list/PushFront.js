import React from 'react'
import DataNode from '../DataNode'
import Arrow from '../Arrow'
import '../../../stylesheet/container/list/PushFront.css'


const PushFront = ({initiate=f=>f, object, params=[], duration = 1, stop = false}) => {
  const list = object
  let itr = list.begin();
  const express = []
  const newNodeArrow = []
  const width = 65;
  const interval = 20;
  const shownodenum=7;
  let keyid = 1;

  // execute next code
  if (!stop) {
    initiate(duration * 2 * 1000)
  }

  let count = (list.size()>shownodenum)?shownodenum : list.size();
  if(count) {
    express.push(<text key={keyid} x={interval} y={40} width={30} height={15}>Front</text>)
    keyid += 1;
  } else {
    express.push(<text key={keyid} className='appear' style={{animationDelay:duration.toString()+'s', animationDuration:duration.toString()+'s'}} x={interval} y={40} width={30} height={15}>Front</text>)
    keyid += 1;
  }

  express.push(<text key={keyid} className='pqPopSizeErase' style={{animationDuration: (duration*2).toString() +'s'}} x={interval} y={20} width={30} height={15}>size: {list.size()}</text>)
  keyid += 1;
  express.push(<text key={keyid} className='pqPopSizeEmerge' style={{animationDuration: (duration*2).toString() +'s'}}  x={interval} y={20} width={30} height={15}>size: {list.size() + 1}</text>)
  keyid += 1;
  
  // draw node
  let dataitr = 1;
  while (itr !== list.end() && count>=dataitr) {
    const data = itr.getData();
    DataNode({key: keyid, ani_delay:'0s', ani_dur: duration.toString()+'s', "className": "front_origin", "data": data.toString(), x : interval*(dataitr) + width*(dataitr-1), y: 50, "width": width}).map(n => express.push(n))
    keyid += 1;
    dataitr += 1
    itr = itr.getNext();
  }

  // draw arrow
  count = (list.size()>shownodenum)?shownodenum : list.size();
  for (let i=1; i<count; i += 1) {
    Arrow(interval * i + width * i, 70, interval * (i+1) + width * i, 70, "front_origin", keyid, '0s', duration.toString()+'s').map(n => express.push(n))
    keyid += 1;
    Arrow(interval * (i+1) + width * i, 80, interval * i + width * i, 80, "front_origin", keyid, '0s', duration.toString()+'s').map(n => express.push(n))
    keyid += 1;
  }

  // New Node and Arrow
  count = (list.size()>0)?1 : 0;
  DataNode({key: keyid, ani_delay: duration.toString()+'s', ani_dur: duration.toString()+'s',"className": "appear","data": params[0].toString(),  x : interval, y: 50, "width": width}).map(n => newNodeArrow.push(n))
  keyid += 1;
  if (count) {
    Arrow(interval * count + width * count, 70, interval * (count+1) + width * count, 70, "appear", keyid, duration.toString()+'s', duration.toString()+'s').map(n => newNodeArrow.push(n))
    keyid += 1;
    Arrow(interval * (count+1) + width * count, 80, interval * count + width * count, 80, "appear", keyid, duration.toString()+'s', duration.toString()+'s').map(n => newNodeArrow.push(n))
    keyid += 1;
  }

  return (
    <svg style={{width:"100%", height: "100%"}}>
      {express}
      {newNodeArrow}
    </svg>
  )
}

export default PushFront