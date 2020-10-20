const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const authenticator = require('./routes/auth/authenticator');
const loginRoute = require('./routes/auth/login');
const logoutRoute = require('./routes/auth/logout');
const lockerRoute = require('./routes/locker');
const registerRoute = require('./routes/auth/register');
const reviewRoute = require('./routes/review');
const userRoute = require('./routes/user');
const workdoneRoute = require('./routes/workdone');

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../webapp/build'));
}

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
	const reqUrl = req.url.split('/')[1];
	//console.log(reqUrl);

	if (reqUrl === 'register'
		||reqUrl === 'login'
		||reqUrl === 'app'
		||reqUrl === 'create-report'
		||reqUrl === 'view-users'
		||reqUrl === 'view-user-activity') {
			res.sendFile(path.join(__dirname, '../webapp/build/index.html'));
			return;
	}

	next();
});

app.use('/account-create', registerRoute);
app.use('/account-login', loginRoute);
app.use('/account-logout', logoutRoute); 

const authUser = async(req) => {
	//console.log(req.headers);
	const authenticated = await authenticator(
		req.headers.user,
		req.headers.authorization
		).catch(e => {
			console.log('authentication api failure');
			return false;
		});

		return authenticated;
	//console.log(req.method);
	//console.log({auth: authenticated});
}

const exitRequest = (res) => {
	//console.log('exiting...');
	res.status(401);
	res.json({data: 'Unauthorized to use resource'});
	return;
}

app.use(async(req, res, next) => {
	if (!await authUser(req)) return exitRequest(res);
	//console.log('executing...');
	app.use('/locker', lockerRoute);
	app.use('/review', reviewRoute);
	app.use('/user', userRoute);
	app.use('/workdone', workdoneRoute);
	app.use('/workdone/date', workdoneRoute);
	next();
});

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
	console.log('Server running on port ' + port);
});
