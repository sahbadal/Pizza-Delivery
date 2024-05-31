const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000;
const app = express()

app.use(express.json())

const pizzaFile = require('./pizza.json');

app.get('/api/pizza',(req,res)=>{

    try {
        
        res.send(pizzaFile)

    } catch (error) {

        console.log(`Error: ${error.message}`);
        res.status(500).send('Internal server Error');
    }
});

app.get('/api/pizza/:id',(req,res)=>{

    try {

        const pizzaId = req.params.id;
        const findId = pizzaFile.find(pizza=>pizza.id === pizzaId)
        if(!findId){
            return res.status(404).json({Error:'Pizza not found'})
        }

        res.send(findId)
        
    } catch (error) {

        console.log(`Error: ${error.message}`);
        res.status(500).send('Internal server Error')
        
    }

})

app.post('/api/product/cart', (req, res) => {
    const { ids } = req.body; 

    if (!ids || ids.length === 0) {
        return res.status(400).json({ error: 'No pizza IDs provided' });
    }


    const pizzasToAdd = pizzaFile.filter(pizza => ids.includes(pizza.id));

    if (pizzasToAdd.length === 0) {
        return res.status(404).json({ error: 'No pizzas found for the provided IDs' });
    }

    res.status(201).json({
        message: "Pizzas added to cart successfully",
        pizzas: pizzasToAdd
    });
});




// app.get('/api/pizza',(req,res)=>{

//     res.sendFile(path.resolve(__dirname + '/pizza.json') , err=>{
//         if(err) res.status(500).send('Something went wrong');
//     })
// })

app.listen(PORT,() =>{
    console.log(`server running on port http://localhost:${PORT}`);
})