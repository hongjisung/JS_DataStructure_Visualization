import React from 'react'
import PropTypes from 'prop-types'
import GithubPage from './GithubPage'
import DocPage from './DocPage'
import OperationState from './OperationState'
import '../stylesheet/TopBar.css'

const TopBar = ({github='', docLink='', operationCount}) =>
  <div className='top-bar'>
    <GithubPage github={github} />
    <DocPage docLink={docLink} />
    <OperationState operationCount={operationCount} />
  </div>

TopBar.proptypes = {
  github: PropTypes.string,
  docLink: PropTypes.string,
  operationCount: PropTypes.object
}

export default TopBar
