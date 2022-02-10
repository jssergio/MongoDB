const mongoose = require("mongoose")
const Schema = mongoose.Schema

//model- Schema Perfil
const Perfil = new Schema({
    nome: {
        type: String,
        require: true
        },
    email: {
        type: String,
        require: true
        },  
    senha: {
        type: String,
        require: true
        },      
    perfil: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    }
})
//Criando a Tabela usuarios(Collection)
mongoose.model("perfils", Perfil)