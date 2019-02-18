import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/ShowDatas.css'

const ShowDatas = ({dataStates = []}) => {
  const width = 63
  return (
    <div className='show-datas'>
      <svg className='data-svg'>
        {dataStates.map((data,i) => {
          return (
            <rect key={i} x={10*(i+1) + width*i} y="10" width={width} height="20" style={{fill:"aliceblue", stroke:"black"}} />
          )
        })}
        {dataStates.map((data,i) => {
          return (
            <text key={i} x={12*(i+1) + width*i} y="25" width={width} height="20" filled="red">{data.name.substring(0, 6)}</text>
          )
        })}
        {dataStates.map((data,i) => {
          return (
            <rect key={i} x={10*(i+1) + width*i} y="30" width={width} height="30" style={{cursor: 'pointer',fill:"lightgray", stroke: "black"}}>
              <title>{data.value.toString()}</title>
            </rect>
          )
        })}
        {dataStates.map((data,i) => {
          return (
            <text key={i} x={12*(i+1) + width*i} y="50" width={width} height="20">
              {(typeof data.value === 'object' ? ((data.value.classname !== undefined) ? data.value.classname.substring(0,6) : data.value.constructor.name.substring(0, 6)) : (typeof data.value).substring(0, 6))}
              <title>{data.value.toString()}</title>
            </text>
          )
        })}
      </svg>
    </div>
  )
}

ShowDatas.propTypes = {
  dataStates: PropTypes.array
}

export default ShowDatas