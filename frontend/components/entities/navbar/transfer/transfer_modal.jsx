import React from 'react';
import Modal from 'react-modal';
import DrizzleConsumer from '../../../drizzle/drizzleConsumer';

import Transfer from './transfer';
import ModalStyle from './modal_style';

class TransferModal extends React.Component {
  constructor(props) {

    super(props);

    this.state = { openModal: false };

    window.SessionOpenModal = () => {
      this.setState({openModal: true});
    };

    window.SessionOpenModal = window.SessionOpenModal.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({openModal: true});
  }

  closeModal() {
    this.setState({openModal: false});
  }

  render() {
    debugger

    return (
      <div className="modal-button-cont">
        <div className="modal-button" onClick={this.openModal}>Transfer</div>

        <Modal
          isOpen={this.state.openModal}
          onRequestClose={this.closeModal}
          style={ModalStyle}
          contentLabel="Transfer Modal"
          className="modal-container">
          <DrizzleConsumer props={{closeModal: this.closeModal}} component={Transfer}/>
        </Modal>
      </div>
    );
  }
}
// account={this.props.account}
// contract={this.props.contract}

export default TransferModal;
