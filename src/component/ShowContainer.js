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

const CodeComp = ({executing, step}) => {
  return (
    <div className='codeText'>{(step >= 0) ? step.toString()+'. ': null} {executing}</div>
  )
}

const EmptyComp = () => {
  return (
    <div />
  )
}

let complexCollections = ['PriorityQueue', 'SetTree', 'MapTree', 'MultiSetTree', 'MultiMapTree'];

class ShowContainer extends Component{
  constructor() {
    super()
    this.state = {
      Visualize: EmptyComp,
      Executing: CodeComp,
      Stop: false,
    }
    this.showstep = 0;
  }

  setVisualize = (props) => {
    const objectName = props.containerState.object.classname
    const method = props.containerState.method
    this.params = props.containerState.params
  
    this.setState({Visualize: EmptyComp, Executing: EmptyComp, Stop: false})    
    setTimeout(()=>{
    if (objectName === 'List') {
      switch(method){
        case 'pushBack': 
          this.setState({Visualize: std.List.PushBack, Executing: CodeComp,Stop: false});
          break;
        case 'popBack':
          this.setState({Visualize: std.List.PopBack, Executing: CodeComp,Stop: false});
          break;
        case 'pushFront':
          this.setState({Visualize: std.List.PushFront, Executing: CodeComp,Stop: false});
          break;
        case 'popFront':
          this.setState({Visualize: std.List.PopFront, Executing: CodeComp,Stop: false});
          break;
        default:
          this.setState({Visualize: EmptyComp, Executing: CodeComp,Stop: false});
      }
    } else if (objectName === 'Stack') {
      switch(method) {
        case 'push':
          this.setState({Visualize: std.Stack.Push, Executing: CodeComp,Stop: false});
          break;
        case 'pop':
          this.setState({Visualize: std.Stack.Pop, Executing: CodeComp,Stop: false});
          break;
        default:
          this.setState({Visualize: EmptyComp, Executing: CodeComp,Stop: false});
      } 
    } else if (objectName === 'Queue') {
      switch (method) {
        case 'push':
          this.setState({Visualize: std.Queue.Push, Executing: CodeComp,Stop: false});
          break;
        case 'pop':
          this.setState({Visualize: std.Queue.Pop, Executing: CodeComp,Stop: false});
          break;
        default:
          this.setState({Visualize: EmptyComp, Executing: CodeComp,Stop: false});
      }
    } else if (objectName === 'PriorityQueue') {
      switch (method) {
        case 'push':
          this.setState({Visualize: std.PriorityQueue.Push, Executing: CodeComp,Stop: false});
          break;
        case 'pop':
          this.setState({Visualize: std.PriorityQueue.Pop, Executing: CodeComp, Stop: false});
          break;
        default:
          this.setState({Visualize: EmptyComp, Executing: CodeComp,Stop: false});
      }
    } else if (objectName === 'SetTree') {
      switch (method) {
        case 'insert':
          this.setState({Visualize: std.RedBlackTree.Insert, Executing: CodeComp,Stop: false});
          break;
        default:
          this.setState({Visualize: EmptyComp, Executing: CodeComp,Stop: false});
      }
    } else if (objectName === 'MapTree') {
      switch (method) {
        case 'insert':
          this.setState({Visualize: std.RedBlackTree.Insert, Executing: CodeComp,Stop: false});
          break;
        default:
          this.setState({Visualize: EmptyComp, Executing: CodeComp,Stop: false});
      }
    } else if (objectName === 'MultiSetTree') {
      switch (method) {
        case 'insert':
          this.setState({Visualize: std.RedBlackTree.Insert, Executing: CodeComp,Stop: false});
          break;
        default:
          this.setState({Visualize: EmptyComp, Executing: CodeComp,Stop: false});
      }
    } else if (objectName === 'MultiMapTree') {
      switch (method) {
        case 'insert':
          this.setState({Visualize: std.RedBlackTree.Insert, Executing: CodeComp,Stop: false});
          break;
        default:
          this.setState({Visualize: EmptyComp, Executing: CodeComp,Stop: false});
      }
    } 
    }, 10)
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, this.props)
    
    // duration change, clear initiate call
    if (this.props.duration !== nextProps && complexCollections.indexOf(nextProps.containerState.object.classname) === -1) {
      console.log('call duration change')
      clearTimeout(this.sto1)
      clearTimeout(this.sto2)
    }


    // if state change, return true;
    if (this.state !== nextState) {
      return true;
    }

    // stopShow: true->false, do rendering
    if (this.props.stopShow && !nextProps.stopShow) {
      console.log('true -> false')
      clearTimeout(this.sto1);
      clearTimeout(this.sto2);
      this.setVisualize(nextProps)
      return false;
    }

    // if next stopShow is true, clear timeout and change Visualize to NextComp
    if (!this.props.stopShow && nextProps.stopShow) {
      clearTimeout(this.sto1);
      clearTimeout(this.sto2);
      console.log('clear timeout, stopShow true');
      this.setState({Stop: true})
      // this.sto1 = setTimeout(() => this.setState({Visualize: NextComp, Stop: false}), 50);
      return false;
    }

    // if submitTimeout is different and not first method, clear timeout 
    if (this.props.submitStack !== nextProps.submitStack) {
      if (!this.props.submitStack) {
        clearTimeout(this.sto1);
        clearTimeout(this.sto2);
        this.setVisualize(nextProps)
        return false;
      }

      clearTimeout(this.sto1);
      clearTimeout(this.sto2);
      this.setState({Stop: true});
      this.sto2 = setTimeout(() => {
        clearTimeout(this.sto1);
        clearTimeout(this.sto2);
        this.setState({Visualize: EmptyComp, Executing: EmptyComp, Stop: false})
      }, 10);

      if (!nextProps.step) {
        clearTimeout(this.stoNewSubmit)
        this.stoNewSubmit = setTimeout(() => {
          clearTimeout(this.sto1);
          clearTimeout(this.sto2);
          console.log('here');
          this.setVisualize(nextProps)
        },500)
      }
      return false;
    }

    // show animation sequentially
    if (this.props.step + 1 === nextProps.step) {
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
      // this.setState({Visualize: NextComp, Executing: EmptyComp, Stop: false})
      this.setState({Visualize: EmptyComp, Executing: EmptyComp, Stop: false})
      this.sto2 = setTimeout(() => this.props.nextStep(submitStack), 10)
    }, time)
  }

  render() {
    return (
      <div className='show-container'>
        <div className='text-show2'>DataStructure</div>
        <div className='slidercontainer'> 
          <div className='slidername'>speed bar</div>
          <input type='range' min={20} max={250} value={this.props.duration} onChange={e => this.props.changeDuration(e.target.value)} className='slider' />
        </div>
        <div className='text-show3'>Executing: </div>
        <this.state.Executing executing = {this.props.executingCode} step={this.props.step}/>
        <div className='drawing'>
        {console.log('out: ', this.state.Visualize, this.props.containerState.object, this.props.stopShow)}
        <this.state.Visualize duration={Number(this.props.duration)/100} stop={this.state.Stop} initiate={this.initiate} object={this.props.containerState.object} params = {this.params}/>
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
  executingCode: PropTypes.string,
  duration: PropTypes.string,
  changeDuration: PropTypes.func,
}

ShowContainer.defaultProps = {
  stopShow: false,
  step: 0,
  submitStack: 0,
  nextStep: f=>f,
  containerState: {},
  executingCode: '',
  duration: 1,
  changeDuration: f=>f,
}

export default ShowContainer