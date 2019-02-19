import React from 'react'

const TreeArrow = (startx, starty, endx, endy, className="Arrow", key=0, ani_delay='0s', ani_dur='0s', dasharray = '') => {
  // const midx = startx/6 + endx*5/6
  // const midy = starty/6 + endy*5/6
  // const diffx = (endy-starty)/12
  // const diffy = (endx-startx)/12
  return (
    [
      <line key={key} className={className} x1={startx} y1={starty} x2={endx} y2={endy} style={{stroke: "black", strokeWidth:2, animationDelay: ani_delay, animationDuration: ani_dur, strokeDasharray: dasharray}}/>,
    ]
  )
}

export default TreeArrow