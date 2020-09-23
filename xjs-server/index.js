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

app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute); 

app.use(async(req, res, next) => {
	//console.log(req.headers);
	let authenticated = false;
	authenticated = await authenticator(
		req.headers.user,
		req.headers.authorization
		);
	//console.log(req.method);
	//console.log({auth: authenticated});
	
	if (!authenticated) {
		/*
		const clientUrl = req.url.split('/')[1];
		console.log(clientUrl);

		if (clientUrl !== 'locker'
			&& clientUrl !== 'review'
			&& clientUrl !== 'user'
			&& clientUrl !== 'workdone'
			&& process.env.NODE_ENV === 'production') {
				app.get('*', (req, res) => {
					res.sendFile(path.join(__dirname, '../webapp/build/index.html'));
				});

			return;
		}
		*/
		res.status(401);
		res.json({data: 'Unauthorized to use resource'});
		return;
	}

	next();
});

app.use('/locker', lockerRoute);
app.use('/review', reviewRoute);
app.use('/user', userRoute);
app.use('/workdone', workdoneRoute);
app.use('/workdone/date', workdoneRoute);
/*
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../webapp/build/index.html'));
});
*/

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
	console.log('Server running on port ' + port);
});
