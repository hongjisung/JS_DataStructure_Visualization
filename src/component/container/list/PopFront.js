import React from 'react'
import DataNode from '../DataNode'
import Arrow from '../Arrow'
import '../../../stylesheet/container/list/PopFront.css'


const PopFront = ({initiate=f=>f, object, params=[], duration = 1, stop = false}) => {
  const list = object
  let itr = list.begin();
  const express = []
  const width = 65;
  const interval = 20;
  const shownodenum = 9;
  let keyid = 1;

  // execute next code
  if (!stop) {
    initiate(duration * 2 * 1000)
  }

  let count = (list.size()>shownodenum)?shownodenum : list.size();
  if(count>1) {
    express.push(<text key={keyid} x={interval} y={40} width={30} height={15}>Front</text>)
    keyid += 1;
    express.push(<text key={keyid} x={interval} y={130} width={30} height={15}>Return: true</text>)
    keyid += 1;
    express.push(<text key={keyid} className='pqPopSizeErase' style={{animationDuration: (duration*2).toString() +'s'}}  x={interval} y={20} width={30} height={15}>size: {list.size()}</text>)
    keyid += 1;
    express.push(<text key={keyid} className='pqPopSizeEmerge' style={{animationDuration: (duration*2).toString() +'s'}} x={interval} y={20} width={30} height={15}>size: {list.size() - 1}</text>) 
    keyid += 1;
  } else if (count === 1){
    express.push(<text key={keyid} className='disappear' style={{animationDuration: (duration).toString() +'s'}} x={interval} y={40} width={30} height={15}>Front</text>)
    keyid += 1;
    express.push(<text key={keyid} x={interval} y={130} width={30} height={15}>Return: true</text>)
    keyid += 1;
    express.push(<text key={keyid} className='pqPopSizeErase' style={{animationDuration: (duration*2).toString() +'s'}} x={interval} y={20} width={30} height={15}>size: {list.size()}</text>)
    keyid += 1;
    express.push(<text key={keyid} className='pqPopSizeEmerge' style={{animationDuration: (duration*2).toString() +'s'}} x={interval} y={20} width={30} height={15}>size: {list.size() - 1}</text>)
    keyid += 1;
  } else {
    express.push(<text key={keyid} x={interval} y={40} width={30} height={15}>Error: No Data to eliminate</text>)
    keyid += 1;
    express.push(<text key={keyid} x={interval} y={130} width={30} height={15}>Return: false</text>)
    keyid += 1;
    express.push(<text key={keyid} x={interval} y={20} width={30} height={15}>size: {list.size()}</text>)
    keyid += 1;
  }
  
  // draw node
  let dataitr = 1;
  while (itr !== list.end() && count>=dataitr) {
    const data = itr.getData();
    if (dataitr === 1) {
      DataNode({key: keyid, ani_delay: '0s', ani_dur:duration.toString()+'s', "className": "disappear", "data": data.toString(), x : interval*(dataitr) + width*(dataitr-1), y: 50, "width": width}).map(n => express.push(n))
      keyid += 1;
    } else {
      DataNode({key: keyid, ani_delay: duration.toString()+'s', ani_dur:duration.toString()+'s', "className": "listPopFrontOrigin", "data": data.toString(), x : interval*(dataitr) + width*(dataitr-1), y: 50, "width": width}).map(n => express.push(n))
      keyid += 1;
    }
    dataitr+=1
    itr = itr.getNext();
  }

  // draw arrow
  count = (list.size()>shownodenum)?shownodenum : list.size();
  for (let i=1; i<count; i += 1) {
    if (i === 1 ) {
      Arrow(interval * i + width * i, 70, interval * (i+1) + width * i, 70, "disappear", keyid, '0s', duration.toString()+'s').map(n => express.push(n))
      keyid += 1;
      Arrow(interval * (i+1) + width * i, 80, interval * i + width * i, 80, "disappear", keyid, '0s', duration.toString()+'s').map(n => express.push(n))
      keyid += 1;
    } else {
      Arrow(interval * i + width * i, 70, interval * (i+1) + width * i, 70, "listPopFrontOrigin", keyid,duration.toString()+'s',duration.toString()+'s').map(n => express.push(n))
      keyid += 1;
      Arrow(interval * (i+1) + width * i, 80, interval * i + width * i, 80, "listPopFrontOrigin", keyid, duration.toString()+'s', duration.toString()+'s').map(n => express.push(n))
      keyid += 1;
    }
  }


  return (
    <svg style={{width:"100%", height: "100%"}}>
      {express}
    </svg>
  )
}

export default PopFront