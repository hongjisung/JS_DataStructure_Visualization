import React, {Component} from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/ShowContainer.css'
import std from './container'

class ShowContainer extends Component{
  constructor() {
    super()
    this.state = {
      Visualize: 'div'
    }
  }

  setVisualize = (props) => {
    const objectName = props.containerState.object.constructor.name
    const method = props.containerState.method
    this.params = props.containerState.params
    
    if (objectName === 'List') {
      switch(method){
        case 'pushBack': 
          this.setState({Visualize: std.List.PushBack});
          break;
        case 'popBack':
          this.setState({Visualize: std.List.PopBack});
          break;
        case 'pushFront':
          this.setState({Visualize: std.List.PushFront});
          break;
        case 'popFront':
          this.setState({Visualize: std.List.PopFront});
          break;
        default:
          this.setState({Visualize: 'div'});
      }
    } else if (objectName === 'Stack') {
      switch(method) {
        case 'push':
          this.setState({Visualize: std.Stack.Push});
          break;
        case 'pop':
          this.setState({Visualize: std.Stack.Pop});
          break;
        default:
          this.setState({Visualize: 'div'});
      } 
    } else if (objectName === 'Queue') {
      switch (method) {
        case 'push':
          this.setState({Visualize: std.Queue.Push});
          break;
        default:
          this.setState({Visualize: 'div'});
      }
    }
  }

  componentWillMount() {
    this.setVisualize(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.setVisualize(nextProps)
  }

  initiate = (time) => {
    setTimeout(() => {
      this.setState({Visualize: 'div'})
      this.props.nextStep()
    }, time)
  }

  render() {
    return (
      <div className='show-container'>
        <this.state.Visualize initiate={this.initiate} object={this.props.containerState.object} params = {this.params}/>
      </div>
    )
  }
}

ShowContainer.propTypes = {
  nextStep: PropTypes.func,
  containerState: PropTypes.object
}

ShowContainer.defaultProps = {
  nexStep: f=>f,
  containerState: {}
}

export default ShowContainer