import React from 'react'

const Arrow = (startx, starty, endx, endy, className="Arrow") => {
  const midx = startx/6 + endx*5/6
  const midy = starty/6 + endy*5/6
  const diffx = (endy-starty)/12
  const diffy = (endx-startx)/12
  return (
    [
      <line className={className} x1={startx} y1={starty} x2={endx} y2={endy} style={{stroke: "black", strokeWidth:1}}/>,
      <line className={className} x1={midx+diffx} y1={midy-diffy} x2={endx} y2={endy} style={{stroke: "black", strokeWidth:1}}/>,
      <line className={className} x1={midx-diffx} y1={midy+diffy} x2={endx} y2={endy} style={{stroke: "black", strokeWidth:1}}/>
    ]
  )
}

export default Arrow