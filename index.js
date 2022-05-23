const express = require('express');
const app = express();
const {run}= require('./db/database.js');
const root = require('./path.js');
const taskRouter = require('./routes/taskRoute.js');
const cors = require('cors');


//app.use(cors);
app.use(express.static(root));
app.use(express.json())
app.use('/tasks', taskRouter);

app.get('/', (req,res,next)=> {
		res.sendFile('index.html', {root: root}, (err)=> {
			if(err) {
				next()
			}
		})
});

app.use((req,res,next)=> {
	res.status(404).send('File not found!');
	console.log('404')
});

app.use((req,res,next)=> {
	console.log(505)
	res.status(505).send('Server error!');
});


run((err)=> {
	if(err) {
		console.log('Server cannot start')
		process.exit();
	}else {
		app.listen(5000, ()=> {
			console.log(' --|+|-- connected')
			console.log('Server is running...')
		});
	}
})


