import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/ShowContainer.css'
import * as List from './container/list'

const ShowContainer = ({containerState= {}}) => {
  const objectName = containerState.object.constructor.name
  const method = containerState.method
  const params = containerState.params
  
  let Visualize;
  if (objectName === 'List') {
    switch(method){
      case 'pushBack': 
        Visualize = List.default.PushBack;
        break;
      case 'popBack':
        Visualize = List.default.PopBack;
        break;
      case 'pushFront':
        Visualize = List.default.PushFront;
        break;
      case 'popFront':
        Visualize = List.default.PopFront;
        break;
      default:
        Visualize = 'div';
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