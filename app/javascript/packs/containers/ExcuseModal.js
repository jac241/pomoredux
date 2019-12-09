import React from 'react'
import {connect} from 'react-redux'
import {
  Modal,
  Icon
} from 'semantic-ui-react'

import {domId} from '../util'
import ExcuseForm from '../containers/ExcuseForm'
import {openExcuseModal, closeExcuseModal} from '../ducks/excuseModal.js'
import {excuseForExcusable} from '../ducks/excuses.js'

class ExcuseModal extends React.Component {
  render() {
    const {
      excuse,
      excusable,
      excuseModal,
      openExcuseModal,
      closeExcuseModal,
    } = this.props

    return (
      <Modal
        id={'excuse_modal'}
        trigger={
          <ExcuseIcon
            excusable={excusable}
            excuse={excuse}
            onClick={() => openExcuseModal(excusable)}
          />
        }
        open={excuseModal.open && excuseModal.excusable == excusable}
        onClose={closeExcuseModal}
        closeIcon
      >
        <Modal.Header>
          {`Excuse for not doing ${excusable.attributes.title}`}
        </Modal.Header>
        <Modal.Content>
          <ExcuseForm excuse={excuse} excusable={excusable} />
        </Modal.Content>
      </Modal>
    )
  }

  componentWillUnmount() {
    this.props.closeExcuseModal()
  }
}

const ExcuseIcon = ({excusable, excuse, onClick}) => {
  const iconName = excuse ? 'file alternate outline' : 'file outline'
  const title = excuse ? 'Edit excuse' : 'Add an excuse...'

  return (
    <Icon
      onClick={onClick}
      name={iconName}
      id={`${domId(excusable)}_excuse`}
      style={{ marginLeft: '.5em'}}
      title={title}
      color='grey'
      link
      data-excused={!!excuse}
    />
  )
}

const mapStateToProps = (state, ownProps) => (
  {
    ...ownProps,
    excuseModal: state.excuseModal,
    excuse: excuseForExcusable(state, ownProps.excusable),
  }
)

export default connect(
  mapStateToProps,
  { openExcuseModal, closeExcuseModal }
)(ExcuseModal)
