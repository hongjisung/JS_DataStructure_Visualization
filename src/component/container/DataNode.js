import React from 'react'
import PropTypes from 'prop-types'

const DataNode = ({data='', x=10, y=20, width=60, height=50, color='lightcyan', key = 1, className="DataNode"}) => {
  return (
    [<rect className={className} key={key} x={x} y={y} width={width} height={height} style={{"fill": color, "stroke":"black"}}></rect>,
    <text className={className} key={-1*key} x={x+2} y={y+height/2+5} width={width} height={20} >{data.substring(0,6)}</text>]
  )
}

DataNode.propTypes = {
  data : PropTypes.string
}

export default DataNode