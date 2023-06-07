let express = require('express');
let app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 8090;
const mongoLiveurl = "mongodb+srv://Vignesh:simple@cluster0.bpunt.mongodb.net/?retryWrites=true&w=majority";
const bodyParser = require(`body-parser`);
const cors = require(`cors`);

//middleware

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())


//all student details
app.get('/allstudents',(req,res) => {
    db.collection('allstudents').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//get students based on admission Number

app.get('/allstudents/:admission_no',(req,res) => {
   
    let admission_no = Number(req.params.admission_no)
    const query ={
        "Admission_Number": admission_no
    }
    db.collection('allstudents').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//get students based on academic

app.get('/students/:joiningyear',(req,res) => {
   
    let joiningyear = Number(req.params.joiningyear)
    const query ={
        "joining_year": joiningyear
    }
    db.collection('allstudents').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

// post request to new admission
app.post('/newadmission',(req,res) => {
    db.collection('allstudents').insert(req.body,(err,result) => {
        if(err) throw err;
        res.send('Student Registered')
    })
})

// post request to Bill Creation
app.post('/createBill',(req,res) => {
    db.collection('bills').insert(req.body,(err,result) => {
        if(err) throw err;
        res.send('Bill Generated')
    })
})
//get Bill
app.get('/getBill',(req,res) => {
    db.collection('bills').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


app.get('/getBill/:id',(req,res) => {
   
    let id = Number(req.params.id)
    const query ={
        "Admission_Number": id
    }
    db.collection('bills').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

// update fees 

app.put('/updateQone/:id',(req,res) => {
    console.log(">>>id",req.params.id)
    console.log(">>>id",req.body)
    let id = Number(req.params.id)
    db.collection('allstudents').updateOne(
        {Admission_Number:id},
        {$set:{
            "q_one_fees.payment_date":req.body.date_of_payment,
            "q_one_fees.payment_mode":req.body.mode_of_payment,
            "q_one_fees.transaction_Id": req.body.transaction_Id,
            "q_one_fees.payment_status": req.body.payment_status,
        }},(err,result) => {
            if(err) throw err
            res.send(`Status Updated to ${req.body.status}`)
        }
    )
})

app.put('/updateQtwo/:id',(req,res) => {
    console.log(">>>id",req.params.id)
    console.log(">>>id",req.body)
    let id = Number(req.params.id)
    db.collection('allstudents').updateOne(
        {Admission_Number:id},
        {$set:{
            "q_two_fees.payment_date":req.body.date_of_payment,
            "q_two_fees.payment_mode":req.body.mode_of_payment,
            "q_two_fees.transaction_Id": req.body.transaction_Id,
            "q_two_fees.payment_status": req.body.payment_status,
        }},(err,result) => {
            if(err) throw err
            res.send(`Status Updated to ${req.body.status}`)
        }
    )
})

app.put('/updateQthree/:id',(req,res) => {
    console.log(">>>id",req.params.id)
    console.log(">>>id",req.body)
    let id = Number(req.params.id)
    db.collection('allstudents').updateOne(
        {Admission_Number:id},
        {$set:{
            "q_three_fees.payment_date":req.body.date_of_payment,
            "q_three_fees.payment_mode":req.body.mode_of_payment,
            "q_three_fees.transaction_Id": req.body.transaction_Id,
            "q_three_fees.payment_status": req.body.payment_status,
        }},(err,result) => {
            if(err) throw err
            res.send(`Status Updated to ${req.body.status}`)
        }
    )
})

app.put('/updateQfour/:id',(req,res) => {
    console.log(">>>id",req.params.id)
    console.log(">>>id",req.body)
    let id = Number(req.params.id)
    db.collection('allstudents').updateOne(
        {Admission_Number:id},
        {$set:{
            "q_four_fees.payment_date":req.body.date_of_payment,
            "q_four_fees.payment_mode":req.body.mode_of_payment,
            "q_four_fees.transaction_Id": req.body.transaction_Id,
            "q_four_fees.payment_status": req.body.payment_status,
        }},(err,result) => {
            if(err) throw err
            res.send(`Status Updated to ${req.body.status}`)
        }
    )
})


// delete discontinued students

app.delete('/deleteStudent/:id',(req,res) => {
   
    let id = Number(req.params.id)
    const query ={
        "Admission_Number": id
    }
    db.collection('allstudents').deleteOne(query),(err,result) => {
        if(err) throw err;
        res.send(result)
    }
})


//DB connection

MongoClient.connect(mongoLiveurl, (err,client) => {
    if(err) console.log(`Error while connecting`);
    db = client.db('foodyapp');
    app.listen(port,() => {
        console.log(`Server is running on port ${port}`)
    })
})