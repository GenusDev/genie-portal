import React from 'react';
import './transfer.scss';

class BuyForm extends React.Component {
  constructor() {
    super();

    this.state = {
      shares: 0,
      price: 78,
      value: 0,
      bylaw_agreement: false,
    };
    
    this.toggleBylawAgreement = this.toggleBylawAgreement.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  toggleBylawAgreement() {
    this.setState({bylaw_agreement: !this.state.bylaw_agreement});
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { shares, price, value, bylaw_agreement } = this.state;

    return (
      <form className="form-box">
        <div className="price-breakdown">
          <div className="transfer-input-cont">
            <input
              type="text"
              placeholder="#| of shares"
              value={shares}
              className="transfer-input"
              onChange={this.update('shares')}
            />
          </div>
          <div className="transfer-price">$|{price}</div>
          <div className="transfer-value">$|{value}</div>
        </div>
        <div className="price-breakdown-labels">
          <div className="t-filler"></div>
          <div className="t-price-label">price</div>
          <div className="t-value-label">value</div>
        </div>
        <div className="t-checkbox-cont">
          <input
            className="t-checkbox"
            type="checkbox"
            checked={bylaw_agreement}
            onChange={this.toggleBylawAgreement} />
          <p className="t-checkbox-text">I certify that I have read and agreed to <a href="#" className="link">the bylaws</a>.</p>
        </div>
        <div className="transfer-button-cont">
          <input
            type="submit"
            value="buy"
            className="transfer-button"
            onClick={this.handleSubmit} />
        </div>
        <div className="blue-close-modal-button close-modal-button"
          onClick={this.props.closeModal}>&times;</div>
      </form>
    );
  }
}

export default BuyForm;