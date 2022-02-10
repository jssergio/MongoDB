const mongoose = require("mongoose")
const Schema = mongoose.Schema

//model- Schema Usuarios
const Usuario = new Schema({
    nome: {
        type: String,
        require: true
        },
    cpf: {
        type: Number,
        require: true
    },
    arquivo: {
        type: Object,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})
//Criando a Tabela usuarios(Collection)
mongoose.model("cadastros", Usuario)
