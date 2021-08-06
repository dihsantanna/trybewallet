import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import HeaderWallet from '../components/HeaderWallet';
import NewExpenses from '../components/NewExpense';
import ExpenseTable from '../components/ExpenseTable';
import EditExpense from '../components/EditExpense';
import WalletContainer from '../components/styledComponents/WalletContainer';
import saveUserLocalStorage, { loadUserExpenses } from '../helpers/handleLocalStorage';
import './wallet.css';

class Wallet extends React.Component {
  componentDidMount() {
    saveUserLocalStorage();
    loadUserExpenses();
  }

  render() {
    const { edit, darkmode, email } = this.props;
    if (!email) return <Redirect to="/" />;
    return (
      <WalletContainer darkmode={ darkmode }>
        <HeaderWallet />
        { edit ? <EditExpense /> : <NewExpenses /> }
        <main className="main-wallet">
          <ExpenseTable />
        </main>
      </WalletContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  edit: state.wallet.edit,
  darkmode: state.user.darkmode,
  email: state.user.email,
});

Wallet.propTypes = {
  edit: PropTypes.bool,
  darkmode: PropTypes.bool,
  email: PropTypes.string,
};

Wallet.defaultProps = {
  edit: false,
  darkmode: false,
  email: '',
};

export default connect(mapStateToProps)(Wallet);
