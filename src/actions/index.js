import {
  GET_CURRENCIES,
  LOGIN,
  REQUEST_FETCH,
  LOAD_EXPENSES,
  GET_QUOTATIONS,
  EXPENSE_REMOVE,
  EXPENSE_EDIT,
  SAVE_EDITED_EXPENSE,
  DARK_MODE_ON,
  DARK_MODE_OFF,
} from './types';

const CURRENCIES_URL = 'https://economia.awesomeapi.com.br/json/all';

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

const requestFetch = () => ({ type: REQUEST_FETCH });

const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

const getQuotations = (expense) => ({
  type: GET_QUOTATIONS,
  expense,
});

export const expenseRemove = (id) => ({
  type: EXPENSE_REMOVE,
  id,
});

export const expenseEdit = (id) => ({
  type: EXPENSE_EDIT,
  id,
});

export const saveEditedExpense = ((expense) => ({
  type: SAVE_EDITED_EXPENSE,
  expense,
}));

export const loadExpenses = (expenses) => ({
  type: LOAD_EXPENSES,
  expenses,
});

export const fetchCurrencies = () => (async (dispatch) => {
  try {
    dispatch(requestFetch());
    const response = await fetch(CURRENCIES_URL);
    const json = await response.json();
    const currencies = Object.keys(json).filter((currency) => currency !== 'USDT');
    dispatch(getCurrencies(currencies));
  } catch (error) {
    console.log(error);
  }
});

export const saveExpense = (expense) => (async (dispatch) => {
  try {
    dispatch(requestFetch());
    const response = await fetch(CURRENCIES_URL);
    const quotations = await response.json();
    const newExpense = { ...expense, exchangeRates: quotations };
    dispatch(getQuotations(newExpense));
  } catch (error) {
    console.log(error);
  }
});

export const darkmodeOn = () => ({ type: DARK_MODE_ON });

export const darkmodeOff = () => ({ type: DARK_MODE_OFF });
