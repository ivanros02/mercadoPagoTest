import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: 'APP_USR-8817196589918616-122312-aefa21c846328a454131c083f6de160b-635992527' });

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Soy el server :)");
});

app.post("/create_preference", async (req, res) => {
    try {

        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "ARS",
                },
            ],
            back_urls: {
                success: `https://www.youtube.com/watch?v=JUXxxjRECRg&ab_channel=LAMEDIAB%C3%81VARA`,
                failure: "https://www.youtube.com/watch?v=JUXxxjRECRg&ab_channel=LAMEDIAB%C3%81VARA",
                pending: "https://www.youtube.com/watch?v=JUXxxjRECRg&ab_channel=LAMEDIAB%C3%81VARA",
            },
            auto_return: "approved",
        };
        const preference =new Preference(client);
        const result = await preference.create({body});
        res.json({
            id : result.id,
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al crear la preferencia :("
        });
    }

});


app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto ${port}`);
});