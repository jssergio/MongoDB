const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require('../models/Usuario')
const Perfil = mongoose.model("perfils")
const bcrypt = require("bcryptjs")
const passport =require("passport")

// ROTAS DE PERFIL
router.get('/registro',(req, res) =>{
    res.render("perfil/registro")
})

router.get('/login',(req, res) =>{
   // res.render("admin/index")
    //res.render("perfil/login")
})

router.post('/loginAuth',(req, res, next) =>{
    passport.authenticate("local", {
        successRedirect:"/index",
        failureRedirect: "/login",
        failureFlash: true    
})(req, res, next)
})

router.get('/logout',(req, res) =>{
    req.logOut()
    req.flash('success_msg', 'Logout Realizado com Sucesso')
    res.redirect('/login')
})

router.post("/registro/novo", (req, res) => {  
    var erros = []
    if(req.body.senha != req.body.senha2){
        erros.push({texto: "!!!!!!!!!!!Confirme a Senha Invalido!!!!!!"})
        //console.log("!!!!!!!!!!!Confirme a Senha Invalido!!!!!!")    
    }
    if(erros.length > 0){
        res.render("perfil/registro", {erros: erros})
    }else{       

        Perfil.findOne({email: req.body.email}).then((perfils) =>{
            if(perfils){
                erros.push({texto: "!!!!!!!!!!!Usuario ja Cadastrado!!!!!!"})
                    //console.log("!!!!!!!!!!!Confirme a Senha Invalido!!!!!!")    
                
              console.log("!!!!!!!!!!!Email Invalido!!!!!!")  
             } if(erros.length > 0){
                res.render("perfil/registro", {erros: erros})
               
            }else{
                const novoPerfil = new Perfil( {
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                })
                //Gerar o Hash p/ a Senha
                bcrypt.genSalt(10, (erro, salt) =>{                
                    bcrypt.hash(novoPerfil.senha, salt, (erro, hash) =>{
                        if(erro){
                            console.log("!!!!!!!!!!! Senha Invalida!!!!!!")   
                          //  res.redirect("/")       
                        }
                     novoPerfil.senha= hash   
                     novoPerfil.save().then(() => {
                        // res.locals.success_msg = req.flash('info', 'OKKKK Flash is back!')   
                        console.log("!!!!!!!!!!! Usuario Cadastrado com Sucesso!!!!!!!!")                                    
                        if(erros.length == 0){   
                            erros.push({texto: "!!!!!!!!!!!Usuario Cadastrado Com Sucesso!!!!!!"})                         
                            res.render("perfil/registro", {erros: erros})
                        }  
                     }).catch((erro) => {
                         console.log("Erro no Cadastro!!!!!!"+ erro)
                         })     
                    })
    
                })
                
             }  
            })
    }  
        
    
    })











module.exports= router