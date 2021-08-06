import store from '../store';
import { loadExpenses } from '../actions';

const saveUserLocalStorage = () => {
  const { user, wallet } = store.getState();
  const infoUser = {
    email: user.email,
    expenses: wallet.expenses,
  };

  localStorage.setItem('user', JSON.stringify(infoUser));
  console.log(infoUser);
};

export default saveUserLocalStorage;

export const loadUserExpenses = () => {
  const { user } = store.getState();
  const { dispatch } = store;
  const storage = JSON.parse(localStorage.getItem('user'));
  if (storage && storage.email === user.email) {
    dispatch(loadExpenses(storage.expenses));
  }
};
