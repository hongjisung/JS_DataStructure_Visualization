import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/ShowContainer.css'
import std from './container'

const ShowContainer = ({nextStep = f=>f, containerState= {}}) => {
  const objectName = containerState.object.constructor.name
  const method = containerState.method
  const params = containerState.params
  
  let Visualize;
  if (objectName === 'List') {
    switch(method){
      case 'pushBack': 
        Visualize = std.List.PushBack;
        break;
      case 'popBack':
        Visualize = std.List.PopBack;
        break;
      case 'pushFront':
        Visualize = std.List.PushFront;
        break;
      case 'popFront':
        Visualize = std.List.PopFront;
        break;
      default:
        Visualize = 'div';
    }
  } else if (objectName === 'Stack') {
    switch(method) {
      case 'push':
        Visualize = std.Stack.Push;
        break;
      case 'pop':
        Visualize = std.Stack.Pop;
        break;
      default:
        Visualize = 'div';
    }
  }

  return (
    <div className='show-container'>
      <Visualize nextStep={nextStep} object={containerState.object} params = {params}/>
    </div>
  )
}

ShowContainer.propTypes = {
  containerState: PropTypes.object
}

export default ShowContainer