import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import serverRoutes from './routes/index.js'
import mercadopago from "mercadopago";
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = 3000

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
});

app.use('/uploads', express.static('uploads'));


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors({
    origin: "http://localhost:8080",
}))

app.post("/create_preference", (req, res) => {
    let preference = {
      items: [
        {
          title: req.body.title,
          unit_price: req.body.unit_price,
          quantity: 1
        },
      ],
      back_urls: {
        success: "http://localhost:8080/#/mis-solicitudes",
        failure: "http://localhost:8080/#/mis-solicitudes",
        pending: "",
      },
      auto_return: "approved",
    };
  
    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        res.json({
          id: response.body.id,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  });

serverRoutes(app);

app.listen(PORT, () => {
    console.log('Server listeting on port ', PORT)
})