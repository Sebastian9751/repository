const express =  require('express'); 
const morgan = require('morgan'); //Se encarga de mostrar datos de la visita por la consola.
const path = require('path');
const cors = require('cors');

//Initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 4000);

//Middleweres
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200
 }
// Global Variables
app.use((req, res, next) => {
    next();
});

//Routes
app.use('/tours', require('./routes/tours.routes'));
app.use('/reservas', require('./routes/reservas.routes'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Starting the Server
app.listen(app.get('port'), () => {
    console.log('Server on port ',  app.get('port'));
});