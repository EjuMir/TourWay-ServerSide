const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000

app.use(express.json());
app.use(cors());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cckizs6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    const tourSpots = client.db("TourDB").collection("TourSpots");;

    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    app.post('/allTouristSpot', async (req, res) => {
      const tourCard = req.body;
      // console.log(tourCard);
      const result = await tourSpots.insertOne(tourCard);
      res.send(result);
    })

    app.get('/allTouristSpot', async (req, res) => {
      const findAll = tourSpots.find();
      const result = await findAll.toArray();
      res.send(result);
    })

    app.get('/viewDetails', async (req, res) => {
      const findAll = tourSpots.find();
      const result = await findAll.toArray();
      res.send(result);
    })
    app.get('/viewDetails/:id', async(req, res)=>{
      const id = req.params.id;
      const findId = {_id : new ObjectId(id)};
      const find = await tourSpots.findOne(findId);
      res.send(find);
    })
    app.delete('/allTouristSpot/:id', async(req, res)=>{
      const id = req.params.id;
      const findId = {_id : new ObjectId(id)};
      const find = await tourSpots.deleteOne(findId);
      res.send(find);

    })



  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('server is running')
})

app.listen(port, () => {
  console.log(`server running on port ${port}`);
})