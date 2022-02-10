const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("../models/Usuario")
const Perfil = mongoose.model("perfils")

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) => {
        Perfil.findOne({email: email}).then((perfils) => {
            if(!perfils){
              return done(null, false, {message: "Esta conta não Existe!!!!"})  
            }
            bcrypt.compare(senha, perfils.senha, (erro, batem) => {
                if(batem){
                    return done(null, perfils)
                }else{
                    return done(null, false, {message: "Senha Incorreta!!!!"})
                }
            }) 
        })
    }))
passport.serializeUser((perfils, done) => {
    done(null, perfils.id)
})
passport.deserializeUser((id, done) => {
    Perfil.findById(id, (err, perfils) =>{
        done(err, perfils)
    })
    
})

}