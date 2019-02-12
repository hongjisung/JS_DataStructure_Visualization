import React, {Component} from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/ShowContainer.css'
import std from './container'

const NextComp = () => {
  return (
    <svg style={{width:"100%", height: "100%"}}>
      <text x={20} y={50} width={200} height={40}>End this Method</text>
    </svg>
  )
}

const CodeComp = ({executing}) => {
  return (
    <div className='codeText'>{executing}</div>
  )
}

class ShowContainer extends Component{
  constructor() {
    super()
    this.state = {
      Visualize: 'div',
      Executing: CodeComp,
    }
    this.showstep = 0;
  }

  setVisualize = (props) => {
    const objectName = props.containerState.object.classname
    const method = props.containerState.method
    this.params = props.containerState.params
    
    if (objectName === 'List') {
      switch(method){
        case 'pushBack': 
          this.setState({Visualize: std.List.PushBack, Executing: CodeComp});
          break;
        case 'popBack':
          this.setState({Visualize: std.List.PopBack, Executing: CodeComp});
          break;
        case 'pushFront':
          this.setState({Visualize: std.List.PushFront, Executing: CodeComp});
          break;
        case 'popFront':
          this.setState({Visualize: std.List.PopFront, Executing: CodeComp});
          break;
        default:
          this.setState({Visualize: 'div', Executing: CodeComp});
      }
    } else if (objectName === 'Stack') {
      switch(method) {
        case 'push':
          this.setState({Visualize: std.Stack.Push, Executing: CodeComp});
          break;
        case 'pop':
          this.setState({Visualize: std.Stack.Pop, Executing: CodeComp});
          break;
        default:
          this.setState({Visualize: 'div', Executing: CodeComp});
      } 
    } else if (objectName === 'Queue') {
      switch (method) {
        case 'push':
          this.setState({Visualize: std.Queue.Push, Executing: CodeComp});
          break;
        case 'pop':
          this.setState({Visualize: std.Queue.Pop, Executing: CodeComp});
          break;
        default:
          this.setState({Visualize: 'div', Executing: CodeComp});
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // if state change, return true;
    if (this.state !== nextState) {
      console.log(this.state)
      console.log(nextState)
      return true;
    }

    // stopShow: true->false, do rendering
    if (this.props.stopShow && !nextProps.stopShow) {
      console.log('true -> false')
      this.setVisualize(nextProps)
      return false;
    }

    // if next stopShow is true, clear timeout and change Visualize to NextComp
    if (!this.props.stopShow && nextProps.stopShow) {
      clearTimeout(this.sto1);
      clearTimeout(this.sto2);
      console.log('clear timeout, stopShow true');
      // if (this.setState.Visualize === NextComp) {
      //   return true;
      // }
      this.setState({Visualize: NextComp});
      return false;
    }

    // if submitTimeout is different and not first method, clear timeout 
    if (this.props.submitStack !== nextProps.submitStack) {
      clearTimeout(this.sto1);
      clearTimeout(this.sto2);
      if (nextProps.step) {
        this.setState({Visualize: NextComp});
        return false;
      }
    }

    // show animation sequentially
    if (!nextProps.step || this.props.step + 1 === nextProps.step) {
      console.log('step serial')      
      this.setVisualize(nextProps)
      return false;
    }

    return true;
  }

  componentDidUpdate() {
    this.showstep += 1;
  }

  // 마지막 선택에서는 svg를 초기화 하지않도록 한다.
  initiate = (time) => {
    const submitStack = this.props.submitStack;
    console.log('call initiate')
    console.log(this.props.containerState.object)
    this.sto1 = setTimeout(() => {
      console.log('change to div, ', this.props.stopShow)
      this.setState({Visualize: NextComp, Executing: 'div'})
      this.sto2 = setTimeout(() => this.props.nextStep(submitStack), 1000)
    }, time)
  }

  render() {
    return (
      <div className='show-container'>
        <div className='text-show2'>컨테이너 상태</div>
        <div className='text-show3'>실행코드: </div>
        <this.state.Executing executing = {this.props.executingCode} />
        <div className='drawing'>
        {console.log('out: ', this.props.containerState.object, this.props.stopShow)}
        <this.state.Visualize initiate={this.initiate} object={this.props.containerState.object} params = {this.params}/>
        </div>
      </div>
    )
  }
}

ShowContainer.propTypes = {
  stopShow: PropTypes.bool,
  step: PropTypes.number,
  submitStack: PropTypes.number,
  nextStep: PropTypes.func,
  containerState: PropTypes.object,
  executingCode: PropTypes.string
}

ShowContainer.defaultProps = {
  stopShow: false,
  step: 0,
  submitStack: 0,
  nexStep: f=>f,
  containerState: {},
  executingCode: ''
}

export default ShowContainer