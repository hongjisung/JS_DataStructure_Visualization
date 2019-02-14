import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/ShowDataList.css'

class ShowDataList extends React.Component {
  constructor({dataStates=[], changeStop= f=>f}) {
    super()
    this.state = {
      showdata: false,
    }
  }

  changeShowdata = () => {
    this.props.changeStop();
    this.setState({showdata:!this.state.showdata});
  }

  consolelog = (value) => {
    console.log(value)
  }

  dataScript = (data) => {
    return (
      <div className='datascript'>
        <div className='dataname'>Name: {data.name.substring(0,20)}</div>
        <button className='consolelog' onClick={() => console.log(data.value)}>Console.log</button>        
      </div>
    )
  }

  render() {
    return (
      <div className='showdata'>
        <button className='showdatabutton' onClick={this.changeShowdata}>show data</button>
        {(this.state.showdata)?
        <div className='coverDom2'>
          <div className='dataContent'>
            {this.props.dataStates.map(data=>this.dataScript(data))}
            <button className='closeshowdata' onClick={this.changeShowdata}>close</button>
          </div>
        </div>
        :null}
      </div>
    )
  }
}

ShowDataList.propTypes = {
  dataStates: PropTypes.array,
  changeStop: PropTypes.func,
}

export default ShowDataList;