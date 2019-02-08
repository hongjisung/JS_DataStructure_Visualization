import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/ShowSection.css'
import ShowDatas from './ShowDatas'
import ShowContainer from './ShowContainer'

const ShowSection = ({ nextStep= f=>f, dataStates=[], executingCode="", containerState={} }) =>
  <section className='show-section'>
  <div className='text-show1'>데이터 상태</div>
    <ShowDatas dataStates={dataStates} />
    <ShowContainer nextStep = {nextStep} containerState={containerState} executingCode={executingCode}/>
  </section>

ShowSection.propTypes = {
  dataStates: PropTypes.array,
  executingCode: PropTypes.string,
  containerState: PropTypes.object
}

export default ShowSection