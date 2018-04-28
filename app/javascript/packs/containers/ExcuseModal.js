import React from 'react'
import {connect} from 'react-redux'
import {
  Modal,
  Icon
} from 'semantic-ui-react'

import {domId} from '../util'
import ExcuseForm from '../containers/ExcuseForm'
import {openExcuseModal, closeExcuseModal} from '../ducks/excuseModal.js'

class ExcuseModal extends React.Component {
  render() {
    const { dispatch, excusable, excuseModal } = this.props

    const excuseIcon = (
      <ExcuseIcon
        excusable={excusable}
        onClick={() => {dispatch(openExcuseModal())}}
      />
    )

    return (
      <Modal
        trigger={excuseIcon}
        open={excuseModal.open}
        onClose={() => {dispatch(closeExcuseModal())}}
        closeIcon
      >
        <Modal.Header>
          {`Excuse for not doing ${excusable.attributes.title}`}
        </Modal.Header>
        <Modal.Content>
          <ExcuseForm excusable={excusable} />
        </Modal.Content>
      </Modal>
    )
  }
}

const ExcuseIcon = ({excusable, ...other}) => {
  const {excused_today} = excusable.attributes
  const iconName = excused_today ? 'file outline text' : 'file outline'

  return (
    <Icon
      { ...other }
      name={iconName}
      id={`${domId(excusable)}_excuse`}
      style={{ marginLeft: '.5em'}}
      title='Add an excuse...'
      color='grey'
      link
      data-excused={excused_today}
    />
  )
}

const mapStateToProps = (state, ownProps) => (
  { excuseModal: state.excuseModal, ...ownProps }
)

export default connect(mapStateToProps)(ExcuseModal)
