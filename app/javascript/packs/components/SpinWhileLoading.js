import React from 'react'
import {Loader} from 'semantic-ui-react'

const SpinWhileLoading = ({ loading, children }) => (
  <React.Fragment>
    {
      loading ? (
        <Loader active/>
      ) : (
        children
      )
    }
  </React.Fragment>
)

export default SpinWhileLoading
