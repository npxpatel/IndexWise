const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())


const path = "DummyPath"

app.get('/', (req, res) => {
    res.send('Alright!')
})

app.post("/api/v1/search", (req, res) => {
    const search = req.body.search
    
    const pythonProcess = require('child_process').spawn("python", [path, search])
    let data = ''

    pythonProcess.stdout.on('data', (d) => {
        data += d.toString()
    })

    pythonProcess.on('exit', (code) =>{
        if(code == 0){
            try {
                const result = JSON.parse(data)
                res.json(result);
            }
            catch (err){
                res.json({error: 'An error occured while parsing the data'})
            }
        }
        else{
            res.json({error: 'An error occured while fetching the data'})
        }
    })
})

app.listen(8000 || process.env.PORT, () => {
    console.log('Server is running on port 8000')
})