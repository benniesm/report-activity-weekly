const api = 'http://localhost:5000/';

const user = api + 'user';
const locker = api + 'locker';
const workdone = api + 'workdone';
const login = api + 'login';
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
  register: register
};

export default url;
