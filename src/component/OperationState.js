import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/OperationState.css'

const OperationState = ({ operationCount={count: 0} }) =>
  <div className='operation-state'>
    <b className='op-section'>rhfktj@gmail.com</b>
  </div>

OperationState.propTypes = {
  operationCount: PropTypes.object
}

export default OperationState