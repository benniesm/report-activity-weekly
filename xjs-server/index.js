const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const authenticator = require('./routes/auth/authenticator');
const loginRoute = require('./routes/auth/login');
const lockerRoute = require('./routes/locker');
const userRoute = require('./routes/user');
const workdoneRoute = require('./routes/workdone');

const app = express();
const port = process.env.PORT;

/*
app.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', '*');
	res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
	res.append('Access-Control-Allow-Headers','Origin,X-Requested-With,Accept,Content-Type,Authorization,User');
	next();
});
*/

app.use(cors());
app.use(bodyParser.json());

app.use('/login', loginRoute);

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

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
	console.log('Server running on port ' + port);
});
