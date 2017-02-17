const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 2587

app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	extname: '.hbs',
	layoutsDir: path.join(__dirname, 'views/layouts')
}))

app.set('view engine','.hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (request, response) => {  
  response.render('index')
})

app.listen(port, (err) => {
	if (err) {
		return console.log('something bad happened', err)
	}

	console.log('server is listening on ',port)
})