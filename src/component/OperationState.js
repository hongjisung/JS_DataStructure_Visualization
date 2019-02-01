import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/OperationState.css'

const OperationState = ({ operationCount={count: 0} }) =>
  <div className='operation-state'>
    <b className='op-section'>연산 횟수: {`${operationCount['count']}`}</b>
  </div>

OperationState.propTypes = {
  operationCount: PropTypes.object
}

export default OperationState