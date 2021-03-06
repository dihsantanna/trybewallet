import {
  REQUEST_FETCH,
  LOAD_EXPENSES,
  GET_CURRENCIES,
  GET_QUOTATIONS,
  EXPENSE_REMOVE,
  EXPENSE_EDIT,
  SAVE_EDITED_EXPENSE,
} from '../actions/types';

import {
  addExpense,
  removeExpense,
  getExpenseEditable,
  saveEditedExpense,
} from '../helpers/handleExpense';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  failed: false,
  error: '',
  edit: false,
  expenseEdit: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_FETCH:
    return { ...state, isFetching: true };
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: [...action.currencies],
      isFetching: false,
      failed: false,
    };
  case LOAD_EXPENSES:
    return {
      ...state,
      expenses: [...action.expenses],
    };
  case GET_QUOTATIONS:
    return {
      ...state,
      isFetching: false,
      failed: false,
      expenses: [...addExpense(state.expenses, action.expense)],
    };
  case EXPENSE_REMOVE:
    return {
      ...state,
      expenses: [...removeExpense(state.expenses, action.id)],
    };
  case EXPENSE_EDIT:
    return {
      ...state,
      edit: true,
      expenseEdit: { ...getExpenseEditable(state.expenses, action.id) } };
  case SAVE_EDITED_EXPENSE:
    return {
      ...state,
      expenses: [...saveEditedExpense(state.expenses, action.expense)],
      edit: false,
      expenseEdit: {},
    };
  default:
    return state;
  }
};

export default wallet;
