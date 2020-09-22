const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const authenticator = require('./routes/auth/authenticator');
const loginRoute = require('./routes/auth/login');
const logoutRoute = require('./routes/auth/logout');
const lockerRoute = require('./routes/locker');
const userRoute = require('./routes/user');
const workdoneRoute = require('./routes/workdone');

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../webapp/build'));
}

app.use(cors());
app.use(bodyParser.json());

app.use('/register', userRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute); 

app.use(async(req, res, next) => {
	//console.log(req.headers);
	let authenticated = false;
	authenticated = await authenticator(
		req.headers.user,
		req.headers.authorization
		);
	//console.log({auth: authenticated});
	
	if (!authenticated) {
		res.status(401);
		res.json({data: 'Unauthorized to use resource'});
		return;
	}

	next();
});

app.use('/locker', lockerRoute);
app.use('/user', userRoute);
app.use('/workdone', workdoneRoute);
app.use('/workdone/date', workdoneRoute);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
	console.log('Server running on port ' + port);
});
