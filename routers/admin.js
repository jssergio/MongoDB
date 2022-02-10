const express = require("express")
const { redirect } = require("express/lib/response")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Cadastro")
const Categoria = mongoose.model("cadastros")
require('../models/Postagem')
const Postagem = mongoose.model("postagens")
const{eAdmin} = require("../models/eAdmin")
 
// NOVO
//UPLOAD de ARQUIVOS para SERVIDOR
//const path = require("path")
const multer= require("multer")
const { request } = require("express")
//const uploads = multer({dest: "uploads/"})
const storage = multer.diskStorage({
   destination: function(req, file, cb){
       cb(null, "uploads/")
   },filename: function(req, file, cb) {
       //cb(null, file.originalname + Date.now() + path.extname(file.originalname))
       cb(null, Date.now() + "_" + file.originalname)
   } 
})
//const uploads = multer({storage})
const uploads = multer({storage: storage,
limits:{
    fieldSize: 1024 * 1024 *3}})

//router.post("/cadastro/novo", uploads.single("arquivo"), (req, res) => {




// ROTAS DE USUARIOS
router.get('/',(req, res) =>{
    res.render("perfil/login")
   // res.render("admin/index")
})
router.get('/index',(req, res) =>{
    //res.render("perfil/login")
    res.render("admin/index")
})

/*router.get('/categorias',eAdmin,(req, res) =>{    
    Categoria.find().sort({date: 'desc'}).then((cadastros) =>{
        res.render('admin/categorias', {cadastros: cadastros})
    }).catch((erro)=>{
        console.log("Erro no Cadastro!!!!!!"+ erro) 
    }) 
   
})*/

router.get('/categorias',(req, res) =>{    
    Categoria.find().sort({date: 'desc'}).then((cadastros) =>{
        res.render('admin/categorias', {cadastros: cadastros})
    }).catch((erro)=>{
        console.log("Erro no Cadastro!!!!!!"+ erro) 
    }) 
   
})

router.get('/categorias/add',eAdmin,(req, res) =>{
    res.render("admin/addcategorias")
})

router.post("/cadastro/novo", uploads.single("arquivo"), (req, res) => {
//router.post("/cadastro/novo", (req, res) => {
    const novoCadastro = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        arquivo: req.file.originalname
    }
    new Categoria(novoCadastro).save().then(() => {
        req.flash('success_msg', 'Cadastro Realizado com Sucesso')     
        res.redirect("/categorias") 
        console.log("Cadastro NOVO OK!!!!!!")   
    })
//var erros = []
 /*if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
     erros.push({texto:"Nome Invalido"})     
 }
 if(erros.length > 0){
     res.render("admin/addcategorias", {erros: erros})
 }else{
    const novoCadastro = {
        nome: req.body.nome,
        cpf: req.body.cpf
    }
    const novoCadastro = {
        nome: req.body.nome,
        cpf: req.body.cpf,
    new Categoria(novoCadastro).save().then(() => {
        req.flash('success_msg', 'Cadastro Realizado com Sucesso')     
        res.redirect("/categorias") 
        console.log("Cadastro NOVO OK!!!!!!")   
        
    }).catch((erro) => {
        console.log("Erro no Cadastro!!!!!!"+ erro)
        })
    }*/
 

})
router.get('/categorias/edit/:id',(req, res) =>{
    Categoria.findOne({_id:req.params.id}).then((cadastros) => {
        res.render("admin/editcategorias", {cadastros: cadastros})
    }).catch((erro)=>{
        console.log("Erro no Cadastro!!!!!!"+ erro) 
        res.redirect("/categorias")
    })   
})
router.post('/categorias/editar',(req, res) => {
    Categoria.findOne({_id:req.body.id}).then((cadastros) => {
    cadastros.nome = req.body.nome
    cadastros.cpf = req.body.cpf
    cadastros.save().then(() => {
        res.redirect("/categorias")
    })
    }).catch((erro)=>{
        console.log("Erro no Cadastro!!!!!!"+ erro) 
        res.redirect("/addcategorias")
    })   
})

router.post('/categorias/deletar',(req, res) => {
    Categoria.remove({_id:req.body.id}).then((cadastros) => {
        res.redirect("/categorias")
    
    }).catch((erro)=> {
        console.log("Erro no Cadastro!!!!!!"+ erro) 
        res.redirect("/categorias")
    })   
})
// ROTAS DE POSTAGENS!!!!!!!!!!!!!!!!!!!


router.get('/postagens',(req, res) =>{
    //Listagem das Postagens
    Postagem.find().populate("categoria").sort({date: 'desc'}).then((postagens) => {
        res.render("admin/postagens", {postagens: postagens})
    }).catch((erro)=>{
        console.log("Erro no Cadastro!!!!!!"+ erro) 
    })    
   
})
router.get('/postagens/add',(req, res) =>{
    Categoria.find().sort({date: 'desc'}).then((cadastros) =>{
        res.render('admin/addpostagens', {cadastros: cadastros})
    }).catch((erro)=>{
        console.log("Erro no Cadastro!!!!!!"+ erro) 
    })    
})
router.post("/postagens/novo", (req, res) => {
    var erros = []
     if(req.body.categoria == 0){
         erros.push({texto:"Usuario Invalido"})         
     }
     if(erros.length > 0){
         res.render("admin/addpostagens", {erros: erros})
     }else{
        const novoPostagem = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria

        }
        new Postagem(novoPostagem).save().then(() => {
            req.flash('success_msg', 'Cadastro Realizado com Sucesso')   
            res.redirect("/postagens")            
            console.log("!!!!!!!!!!!Cadastro OK!!!!!!") 
        }).catch((erro) => {
            console.log("Erro no Cadastro!!!!!!"+ erro)
            })
     }    
    })

    router.get('/postagens/edit/:id',(req, res) =>{
        Postagem.findOne({_id:req.params.id}).then((postagens) => {
         Categoria.find().then((cadastros) => {
            res.render("admin/editpostagens", {cadastros: cadastros, postagens: postagens})

         }).catch((erro)=>{
            console.log("Erro no Cadastro!!!!!!"+ erro) 
            res.redirect("/postagens")
         })
           
        }).catch((erro)=>{
            console.log("Erro no Cadastro!!!!!!"+ erro) 
            res.redirect("/postagens")
        })   
    })

    
    router.post('/postagens/editar',(req, res) => {
        Postagem.findOne({_id: req.body.id}).then((postagens) => {
            postagens.titulo = req.body.titulo,
            postagens.descricao = req.body.descricao,
            postagens.conteudo = req.body.conteudo,
            postagens.categoria = req.body.categoria        
        postagens.save().then(() => {
            res.redirect("/postagens")
        })
        }).catch((erro)=>{
            console.log("Erro no Cadastro!!!!!!"+ erro) 
            res.redirect("/postagens")
        })   
    })

    router.post('/postagens/deletar',(req, res) => {
        Postagem.remove({_id:req.body.id}).then((postagens) => {
            res.redirect("/postagens")
        
        }).catch((erro)=> {
            console.log("Erro no Cadastro!!!!!!"+ erro) 
            res.redirect("/admin/postagens")
        })   
    })


module.exports= router