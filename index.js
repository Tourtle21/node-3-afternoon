require('dotenv').config();
const express = require('express');
const massive = require('massive');
const productsCtrl = require('./controllers/products_controller')

const {SERVER_PORT, CONNECTION_STRING} = process.env;
console.log(process.env.SERVER_PORT)

const app = express();

app.use(express.json());

app.get('/api/products', productsCtrl.getAll);
app.get('/api/products/:id', productsCtrl.getOne);
app.put('/api/products/:id', productsCtrl.update);
app.post('/api/products', productsCtrl.create);
app.delete('/api/products', productsCtrl.delete);

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log("Database Connected!")
}).catch(err => console.log(err))

app.listen(SERVER_PORT, () => console.log(`Server is running on port ${SERVER_PORT}`));
