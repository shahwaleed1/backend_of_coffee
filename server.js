const express = require("express");
const app = express();
const { ObjectId } = require('mongodb');
const cors = require('cors');




const { dbsetup } = require('./connection');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());



const Port = 3000;

// const db = dbsetup()

// const imageSchema = new db.Schema({
//     name: String,
//     img:{
//         data: Buffer,
//         contectType: String,
//     },
// });

// const Image = db.model('Image', ImageSchema);

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'Uploads/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, data.now() + path.extname(file.originalname));
//     },
// });

// const Upload = multer({ storage });


// if(!fs.existsSync('uploads')){
//     fs.mkdirSync('uploads')
// }



app.get('/',(req, res) =>{
    return res.json({ 'message': 'welcome' })
});

app.get('/products', async(req,res) => {
    const db = await dbsetup();

    const productsFetch = db.collection('products_hotel');
    const productData = await productsFetch.find({}).toArray();

    return res.json({message :'Food Products', data: productData, status:'OK'}).status(200)
})

app.delete('/product/delete/:id', async (req,res)=>{
    try{
        const db = await dbsetup();
        const productId = req.params.id;

        const productCollecion = db.collection('products_hotel')
        const deleteResult = await productCollecion.deleteOne({ _id: new ObjectId(productId) });

        if(deleteResult.deletedCount === 1){
            return res.status(200).json({
                message:`Record with ID ${productId} delete successfully.`,
                data: productId,
                status: "OK"
            });
        }
        else{
            return res.status(404).json({message:`No record found with ID ${productId}.`, data: productId, status:"NOT FOUND"})
        }
    } catch (err){
        console.error("Error delete record:", err);
        return res.status(500).json({
            message: "Error delete record",
            error: err.message,
            status: "Error"
        })
    }
})

app.post('/product/add', async (req , res) => {
    const db = await dbsetup();

    let name = req.body.name;
    let description = req.body.description ? req.body.description: "Coffee";
    let price = req.body.price;
    let image = req.body.image;

    const productCollecion = await db.collection('products_hotel');
    const newproduct = await productCollecion.insertOne({
        name: name,
        description: description,
        price: price,
        image: image
    });

    return res.json({message:'Added a product', status:"OK"}).status(200)
});



app.listen(Port, ()=> console.log(`Server started on: ${Port}`))