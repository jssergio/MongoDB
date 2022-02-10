const mongoose = require("mongoose")
const Schema = mongoose.Schema

//model- Schema Postagens
const Postagem = new Schema({
    titulo: {
        type: String,
        require: true
        },
    descricao: {
        type: String,
        require: true
    },
    conteudo: {
        type: String,
        require: true
    },
    //Id Usuario
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "cadastros",
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})
//Criando a Tabela usuarios(Collection)
mongoose.model("postagens", Postagem)