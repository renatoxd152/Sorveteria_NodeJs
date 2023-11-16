
import app from './src/index.js';
import sorvete from './src/rotas/sorvete.js';
import cliente from './src/rotas/cliente.js';
import vendedor from './src/rotas/vendedor.js';
import compras from './src/rotas/compras.js';
import itens from './src/rotas/itensCompras.js';
const port = 3000;

app.listen(port,()=>
{
    console.log(`Servidor rodando no endereço http://localhost:${port}`);
})

app.use(sorvete);
app.use(cliente);
app.use(vendedor);
app.use(compras);
app.use(itens);

app.get('/',(req,res)=>
{
    res.status(200).send("Sistema de sorveteria em node js");
})
