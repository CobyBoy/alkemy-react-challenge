const LOGIN_TOKEN: string = 'loginToken';

export const saveUserToken = (token: string): void => {
  localStorage.setItem(LOGIN_TOKEN, token);
};

export const getUserToken = (): void => {
  localStorage.getItem(LOGIN_TOKEN);
};

export const clearCache = (): void => {
  localStorage.clear();
};