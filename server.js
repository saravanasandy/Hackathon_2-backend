const express = require("express");
const cors = require("cors");
const  app = express();
const mongodb = require("mongodb");
const dotenv = require("dotenv").config()
const mongoClient = mongodb.MongoClient;
const {ObjectId} = require("mongodb");

const DB ="Money_Management";
// const URL = "mongodb://localhost:27017";
const URL = process.env.DB;
// Middleware 
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));


 //  API

    // Income Get method
    app.get("/items", async function(req,res){
        try {
            const connection = await mongoClient.connect(URL);
                const db = connection.db(DB);
                let items = await db.collection("Income_data").find().toArray();
                    await connection.close();
                    res.json(items);
        } catch (error) {
            console.log(error);
            res.status(500).json({message : "Something went Wrong"});
        }
    });

            // Income Post method

            app.post("/item", async function(req,res){
                try {
                    const connection = await mongoClient.connect(URL);
                        const db = connection.db(DB);
                                await db.collection("Income_data").insertOne(req.body);
                                let items = await db.collection("Income_data").find().toArray();
                                await connection.close();
                                res.json({message : "Data inserted",items});
        
                } catch (error) {
                    console.log(error);
                    res.status(500).json({message : "Something went wrong"});
                }
            });

       
             // Income Put method

    app.put("/item/:id", async function(req,res){
        try {
            const connection = await mongoClient.connect(URL);
                const db = connection.db(DB);
                  let items =  await db.collection("Income_data").findOneAndUpdate({_id: new mongodb.ObjectId(req.params.id)},{$set:req.body});
                        await connection.close();
                        res.json(items);
        } catch (error) {
            console.log(error);
            res.status(500).json({message : "Something went wrong"});
        }
    });

        // Income delete method

    app.delete("/item/:id", async function(req,res){
        try {
            const connection = await mongoClient.connect(URL);
                const db = connection.db(DB);
                let items = await db.collection("Income_data").findOneAndDelete({_id: new mongodb.ObjectId(req.params.id)});
                 await connection.close();
                 res.json(items);

        } catch (error) {
            console.log(error);
            res.status(500).json({message : "Something went wrong"});
        }
    });
//  *******************************************************************************************************
      // Expense Get method :- 

      app.get("/expenseItems", async function(req,res){
        try {
            const connection = await mongoClient.connect(URL);
                const db = connection.db(DB);
                let items = await db.collection("Expense_data").find().toArray();
                    await connection.close();
                    res.json(items);
        } catch (error) {
            console.log(error);
            res.status(500).json({message : "Something went Wrong"});
        }
    });
    


        // Expense Post method :- 

  app.post("/expenseItem", async function(req,res){
    try {
        const connection = await mongoClient.connect(URL);
            const db = connection.db(DB);
                    await db.collection("Expense_data").insertOne(req.body);
                    let items = await db.collection("Expense_data").find().toArray();
                    await connection.close();
                    res.json({message : "Data inserted",items});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
});

            // Expense Put method :- 

            app.put("/expenseItem/:id", async function(req,res){
                try {
                    const connection = await mongoClient.connect(URL);
                        const db = connection.db(DB);
                          let items =  await db.collection("Expense_data").findOneAndUpdate({_id: new mongodb.ObjectId(req.params.id)},{$set:req.body});
                                await connection.close();
                                res.json(items);
                } catch (error) {
                    console.log(error);
                    res.status(500).json({message : "Something went wrong"});
                }
            });
        
                // Expense delete method :- 
                
            app.delete("/expenseItem/:id", async function(req,res){
                try {
                    const connection = await mongoClient.connect(URL);
                        const db = connection.db(DB);
                        let items = await db.collection("Expense_data").findOneAndDelete({_id: new mongodb.ObjectId(req.params.id)});
                         await connection.close();
                         res.json(items);
        
                } catch (error) {
                    console.log(error);
                    res.status(500).json({message : "Something went wrong"});
                }
            });

    app.listen(process.env.PORT ||3005);