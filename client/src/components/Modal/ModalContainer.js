import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import { hideModal } from '../../actions/modal';
import style from './ModalContainer.scss';

class ModalContainer extends React.Component {
  closeModal = () => {
    const { hideModal, onClose = () => {} } = this.props;
    hideModal();
    onClose();
  };

  render() {
    const { modalType } = this.props;
    const Modal = modalType;

    return (
      <div>
        {modalType && (
          <div>
            <div className={style.background} onClick={this.closeModal}/>
            <Modal className={style.container} />
          </div>
        )}
      </div>
    );
  }
}

ModalContainer.whyDidYouRender = true;

const mapStateToProps = state => ({ ...state.modal });
const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(hideModal()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(style)(React.memo(ModalContainer)));
