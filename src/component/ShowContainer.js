import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/ShowContainer.css'
import * as List from './container/List'

const ShowContainer = ({containerState= {}}) => {
  const objectName = containerState.object.constructor.name
  const method = containerState.method
  const params = containerState.params
  
  let Visualize;
  if (objectName === 'List') {
    if (method === 'pushBack') {
      Visualize = List.default.PushBack;
    }
  }

  return (
    <div className='show-container'>
      <Visualize object={containerState.object} params = {params}/>
    </div>
  )
}

ShowContainer.propTypes = {
  containerState: PropTypes.object
}

export default ShowContainer