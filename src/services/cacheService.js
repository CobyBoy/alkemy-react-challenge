const LOGIN_TOKEN = 'loginToken';

export const saveUserToken = (data) => {
  localStorage.setItem(LOGIN_TOKEN, data);
};

export const getUserToken = () => {
  localStorage.getItem(LOGIN_TOKEN);
};

export const clearCache = () => {
  localStorage.clear();
};