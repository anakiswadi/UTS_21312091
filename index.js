const express = require('express')
const app = express()
const port = 3002

// memanggil request body-parser
const bodyParser = require('body-parser')

// memanggil file request.js
const response = require('./request.js')

// memanggil file config.js
const db = require('./config.js')
const { error } = require('console')

//menggunakan body-parser
app.use(bodyParser.json())

// route get data
app.get('/peminjaman/:npm', (req,res)=>{
    const npm = req.params.npm
    const sql = `SELECT * FROM tb_peminjaman where npm = '${npm}'`
    db.query(sql,(err, result)=>{
        if(err) throw err
        response(200,result,'data peminjaman', res)
    })
})

// route post data
app.post('/mahasiswa', (req, res)=>{
    const {id, nama, npm, kelas}=req.body
    const sql = `INSERT INTO tb_peminjaman (id, nama, npm, kelas) values ('${id}','${nama}','${npm}','${kelas}');`

    db.query(sql,(error, fields)=>{
        if(error) response(500, 'invalid', `${id} dengan nama ${nama} sudah ditambahkan `, res )
        if(fields?.affectedRows){
            const data ={
                isSucces: fields.affectedRows,
                id:fields.insertId,
            }
            response(200,data,"Data berhasil di simpan", res)
        }
    })
})

app.listen(port, () => {
    console.log(`Runing in port ${port}`)
})