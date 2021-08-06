import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { payMethods, tags } from '../helpers/optionsSelects';
import { saveEditedExpense } from '../actions';
import Input from './Input';
import Select from './Select';
import saveUserLocalStorage from '../helpers/handleLocalStorage';

const REGEX_VALUE = /^(\d*(,?|\.?)?\d{0,2})/;

class EditExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.expenseEdit,
      hiddenEditMenu: false,
      isMobile: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isMobile = this.isMobile.bind(this);
  }

  componentDidMount() {
    this.isMobile();
  }

  isMobile() {
    const resolution = 768;
    const screen = window.screen.width;
    if (screen <= resolution && screen !== 0) {
      this.setState({ isMobile: true });
    }
    window.onresize = () => {
      if (screen <= resolution) {
        this.setState({ isMobile: true });
      }
    };
  }

  handleChange({ target }) {
    const value = target.name === 'value'
      ? (target.value).match(REGEX_VALUE)[0]
      : target.value;
    this.setState({ [target.name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { editExpense } = this.props;
    const { isMobile } = this.state;
    const expense = this.state;
    const editedExpense = expense;
    delete editedExpense.hiddenEditMenu;
    delete editedExpense.isMobile;
    const delay = 1000;
    this.setState({
      hiddenEditMenu: true,
    }, () => (
      !isMobile
        ? editExpense(editedExpense)
        : setTimeout(() => { editExpense(editedExpense); }, delay)));
  }

  renderButton() {
    return (
      <button
        className="btn-editExpense"
        type="submit"
        onClick={ this.handleSubmit }
      >
        Editar despesa
      </button>
    );
  }

  renderValorInput(value) {
    return (
      <Input
        dataTestId="value-input"
        textLabel="Valor"
        id="value"
        name="value"
        onChange={ this.handleChange }
        value={ value }
      />
    );
  }

  renderDescriptionInput(description) {
    return (
      <Input
        dataTestId="description-input"
        textLabel="Descrição"
        id="description"
        name="description"
        onChange={ this.handleChange }
        value={ description }
      />);
  }

  renderSelectCurrencies(currency, currencies) {
    return (
      <Select
        dataTestId="currency-input"
        textLabel="Moeda"
        id="currency"
        name="currency"
        onChange={ this.handleChange }
        value={ currency }
        options={ currencies }
      />
    );
  }

  renderSelectMethods(method) {
    return (
      <Select
        dataTestId="method-input"
        textLabel="Método de pagamento"
        id="method"
        name="method"
        onChange={ this.handleChange }
        value={ method }
        options={ payMethods }
      />
    );
  }

  renderSelectTags(tag) {
    return (
      <Select
        dataTestId="tag-input"
        textLabel="Tag"
        id="tag"
        name="tag"
        onChange={ this.handleChange }
        value={ tag }
        options={ tags }
      />
    );
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag, hiddenEditMenu } = this.state;
    return (
      <section className="form-contain">
        <form
          style={ { marginTop: `${hiddenEditMenu ? '-81vh' : 0}` } }
          className="form-editExpense"
          method="get"
        >
          {this.renderValorInput(value)}
          {this.renderDescriptionInput(description)}
          {this.renderSelectCurrencies(currency, currencies)}
          {this.renderSelectMethods(method)}
          {this.renderSelectTags(tag)}
          {this.renderButton()}
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenseEdit: state.wallet.expenseEdit,
});

const mapDispatchToProps = (dispatch) => ({
  editExpense: (expense) => {
    dispatch(saveEditedExpense(expense));
    saveUserLocalStorage();
  },
});

EditExpense.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editExpense: PropTypes.func.isRequired,
  expenseEdit: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.object),
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);
