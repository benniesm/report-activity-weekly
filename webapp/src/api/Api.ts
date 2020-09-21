const api = '/';

const user = api + 'user';
const locker = api + 'locker';
const workdone = api + 'workdone';
const login = api + 'login';
const logout = api + 'logout';
const register = api + 'register';

/*
interface Url  {
  user: string,
  locker: string,
  workdone: string,
  login: string,
  register: string
};
*/

const url =  {
  user: user,
  locker: locker,
  workdone: workdone,
  login: login,
  logout: logout,
  register: register
};

export default url;
