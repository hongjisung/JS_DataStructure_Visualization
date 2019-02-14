import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/ShowSection.css'
import ShowDatas from './ShowDatas'
import ShowDataList from './ShowDataList'
import ShowContainer from './ShowContainer'

const ShowSection = ({duration = 1, changeDuration = f=>f, changeStop=f=>f, stopShow=false,step=0,submitStack=0, nextStep= f=>f, dataStates=[], executingCode="", containerState={} }) =>
  <section className='show-section'>
    <div className='text-show1'>Variables</div>
    <ShowDataList dataStates={dataStates} changeStop={changeStop}/>
    <button className='stopping' onClick={changeStop}>{(stopShow)?'Restart':'Stop'}</button>
    <ShowDatas dataStates={dataStates} />
    <ShowContainer duration={duration} changeDuration={changeDuration} stopShow={stopShow} step={step} submitStack={submitStack} nextStep = {nextStep} containerState={containerState} executingCode={executingCode}/>
  </section>

ShowSection.propTypes = {
  duration: PropTypes.number,
  changeDuration: PropTypes.func,
  changeStop: PropTypes.func,
  stopShow: PropTypes.bool,
  submitStack: PropTypes.number,
  nextStep: PropTypes.func,
  dataStates: PropTypes.array,
  executingCode: PropTypes.string,
  containerState: PropTypes.object
}

export default ShowSection