import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import headerTable from '../helpers/headerTable';
import { expenseRemove, expenseEdit } from '../actions/index';
import saveUserLocalStorage, { loadUserExpenses } from '../helpers/handleLocalStorage';

class ExpenseTable extends React.Component {
  componentDidMount() {
    loadUserExpenses();
  }

  renderEditAndTrashBtn(id) {
    const { deleteExpense, editExpense, edit } = this.props;
    return (
      <td
        data-title="Editar/Excluir:
      "
      >
        <button
          className="edit-expense"
          data-testid="edit-btn"
          type="button"
          onClick={ () => { editExpense(id); } }
          disabled={ edit }
        >
          <i className="bi bi-pencil-square" />
        </button>
        <button
          className="delete-expense"
          data-testid="delete-btn"
          type="button"
          onClick={ () => {
            deleteExpense(id);
            saveUserLocalStorage();
          } }
          disabled={ edit }
        >
          <i className="bi bi-trash" />
        </button>
      </td>
    );
  }

  render() {
    const { expenses, darkmode } = this.props;
    return (
      <table className={ `expense-table ${darkmode ? 'expense-table-darkmode' : ''}` }>
        <thead>
          <tr className="table-title">
            {
              headerTable
                .map((item) => <th key={ item }>{item}</th>)
            }
          </tr>
        </thead>
        <tbody>
          { expenses
            .map(({ id, description, tag, method, currency, value, exchangeRates }) => (
              <tr key={ id }>
                <td data-title="Descrição:">{description}</td>
                <td data-title="Tag:">{tag}</td>
                <td data-title="Método de pagamento:">{method}</td>
                <td data-title="Valor:">
                  { Math
                    .round(
                      (Number(value.replace(',', '.')) + Number.EPSILON) * 100,
                    ) / 100 }
                </td>
                <td data-title="Moeda:">{ exchangeRates[currency].name }</td>
                <td data-title="Câmbio utilizado:">
                  {Number(exchangeRates[currency].ask).toFixed(2) }
                </td>
                <td data-title="Valor convertido:">
                  {Math
                    .round((Number((value).replace(',', '.')) * Number(
                      exchangeRates[currency].ask,
                    ) + Number.EPSILON) * 100) / 100 }
                </td>
                <td data-title="Moeda de conversão:">Real</td>
                {this.renderEditAndTrashBtn(id)}
              </tr>
            )) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  edit: state.wallet.edit,
  darkmode: state.user.darkmode,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(expenseRemove(id)),
  editExpense: (id) => dispatch(expenseEdit(id)),
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  darkmode: PropTypes.bool,
};

ExpenseTable.defaultProps = {
  edit: false,
  darkmode: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
