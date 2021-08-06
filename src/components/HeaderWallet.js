import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import trybeWalletLogo from '../images/trybe-wallet.gif';
import trybeWalletLogoBlank from '../images/trybe-wallet_blank.gif';
import DarkmodeButton from './DarkmodeButton';
import HeaderWalletStyled from './styledComponents/HeaderWalletStyled';

class HeaderWallet extends React.Component {
  render() {
    const { email, expenses, darkmode } = this.props;
    const totalExpenses = expenses
      .reduce((total, expense) => {
        const { currency } = expense;
        const converter = +((expense.value)
          .replace(',', '.')) * +(expense
          .exchangeRates[currency].ask);
        total += converter;
        return total;
      }, 0);
    return (
      <HeaderWalletStyled darkmode={ darkmode }>
        <img
          className="logo-wallet"
          src={ darkmode ? trybeWalletLogoBlank : trybeWalletLogo }
          alt="trybe-wallet-logo"
        />

        <div className={ darkmode ? 'info-wallet-darkmode' : 'info-wallet' }>
          <div className="email-wallet">
            Email:
            {' '}
            <span className="email" data-testid="email-field">{email}</span>
          </div>

          <div className="expenses-wallet">
            Despesa Total:
            {' '}
            <span>
              <span
                className="total"
                data-testid="total-field"
              >
                {`R$ ${Math.round((totalExpenses + Number.EPSILON) * 100) / 100}`}
              </span>
              {' '}
              <span data-testid="header-currency-field">BRL</span>
            </span>
          </div>
        </div>
        <DarkmodeButton className="darkmode-wallet" />
      </HeaderWalletStyled>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  darkmode: state.user.darkmode,
});

HeaderWallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  darkmode: PropTypes.bool,
};

HeaderWallet.defaultProps = {
  darkmode: false,
};

export default connect(mapStateToProps)(HeaderWallet);