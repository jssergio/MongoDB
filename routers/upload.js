const express = require("express")
const router = express.Router()
const{eAdmin} = require("../models/eAdmin")

// ROTAS DE CADASTRO
router.get('/upload',(req, res) =>{
    res.render('upload/upload')
})




module.exports= router


