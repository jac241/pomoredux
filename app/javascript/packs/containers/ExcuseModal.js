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
    const { excusable, excuseModal, openExcuseModal, closeExcuseModal } = this.props

    return (
      <Modal
        trigger={
          <ExcuseIcon
            excusable={excusable}
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
          <ExcuseForm excusable={excusable} />
        </Modal.Content>
      </Modal>
    )
  }

  componentWillUnmount() {
    this.props.closeExcuseModal()
  }
}

const ExcuseIcon = ({excusable, onClick}) => {
  const {excused_today} = excusable.attributes
  const iconName = excused_today ? 'file text outline' : 'file outline'

  return (
    <Icon
      onClick={onClick}
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

export default connect(
  mapStateToProps,
  { openExcuseModal, closeExcuseModal }
)(ExcuseModal)
