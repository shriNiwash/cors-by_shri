const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const port = 3002;
const cors = require('cors');



app.use(cors({
    origin:"http://127.0.0.1:5500"
}))

//body parser middleware
app.use(bodyparser.json());
app.use(express.urlencoded({extended:false}));


//database connectivity

const conn = "mongodb://127.0.0.1/books";
mongoose.connect(conn,{useUnifiedTopology:true,useNewUrlParser:true}).
then(()=>console.log("The data base is connected")).catch(()=>console.log("error occured"));

//schema
const bookSchema = mongoose.Schema({
    id : {
        type: Number
    },
    name : {
        type: String,
        unique: [true,'The book is already in the list'],
        require:[true,'The filed is required'],
        uppercase:true
    },
    sold : {
        type: Number

    }
});

const BookModel = mongoose.model('BookModel',bookSchema);
// app.options('/data', cors());
app.get('/data',async(req,res)=>{
    try{
        const data = await BookModel.find();
        res.json(data);
        console.log("response is being made");
    }
    catch(err){
        console.log(err);
    }
})

app.listen(port,()=>console.log(`The server is running on the port ${port}`));





