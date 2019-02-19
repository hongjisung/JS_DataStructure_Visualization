import React from 'react'
import PropTypes from 'prop-types'

const TreeNode = ({data='', cx=10, cy=20, r= 30, textcolor='white', color='lightcyan', key = 1, className="DataNode", border="black", ani_dur="2s", ani_delay='1s', strokewidth= '5px'}) => {
  return (
    [<circle className={className} key={key} cx={cx} cy={cy} r={r} style={{ animationDuration: ani_dur, animationDelay: ani_delay, "fill": color, "stroke":border, "strokeWidth": strokewidth}}>
      <title>{data}</title>
    </circle>,
    <text className={className} key={-1*key} x={cx} y={cy + r/4} width={r * 3 / 2} height={20} style={{fill: textcolor,textAnchor:'middle',animationDuration: ani_dur, animationDelay: ani_delay}}>
      {data.substring(0,4)}
      <title>{data}</title>
    </text>]
  )
}

TreeNode.propTypes = {
  data : PropTypes.string
}

export default TreeNode