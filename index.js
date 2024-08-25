import express from "express"
import { PORT } from "./config.js"
// import { company_model } from "./models/company_model.js"
// import mongoose from "mongoose"
import cors from "cors"
import fetch from "node-fetch"
import path from "path"

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express()

app.use(express.json())

app.use(cors())

app.get('/', (req,res) => {
    console.log(req)
    return res.status(200).send("Deploy Landing Page Content Here")
    // app.use(express.static(path.join(__dirname, 'Infinite-Loopers/Infinite-Loopers-')))
    // res.sendFile(path.join(__dirname, 'Infinite-Loopers/Infinite-Loopers-', 'index.html'))
})

app.get('/companyData/:name',async(req,res) => {
    try{
        const { name } = req.params
        // console.log("Name", name);
        const fetch_response = await fetch(`http://localhost:5100/database/${name}`)
        // console.log(await fetch_response.text())
        if(!fetch_response.ok)
            throw new error('Failed to fetch data from database')
        res.status(200).send(await fetch_response.json())
    }
    catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

app.get('/companyData/:category/:name',async(req,res) => {
    try{
        const { name,category } = req.params
        const fetch_response = await fetch(`http://127.0.0.1:5000/database/${category}/${name}`)
        // const data = await fetch_response.json()
        if(!fetch_response.ok)
                throw new error('Failed to fetch data from database')
        res.status(200).send(await fetch_response.json())
    }
    catch(error){
        console.log(error)
        res.status(500).send({message: error.message})
    }
})

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})

// mongoose.connect(mongoDB_url)
//     .then(() => {
//         console.log('App connected to Database')
//         app.listen(PORT, () => {
//             console.log(`App is listening on PORT ${PORT}`)
//         })
//     })
//     .catch((error) => {
//         console.log(error)
//     })