const mongoose = require("mongoose")
//Configurando mongoose
mongoose.Promise= global.Promise;
mongoose.connect("mongodb://localhost/pss2022", {
    //useMongoClient: true    
}).then(() => {
    console.log("Conexão OK!!!!!!")
}).catch((erro) => {
console.log("Erro Conexão!!!!!!"+ erro)
})
//model- Usuarios
const UsuariosSchema= mongoose.Schema({
    nome: {
        type: String,
        require: true
        },
    cpf: {
        type: Number,
        require: true
    }
})
//Criando a Tabela usuarios(Collection)
mongoose.model('usuarios', UsuariosSchema)
//Inserindo Dados
const user =mongoose.model('usuarios')
new user({
    nome: "sergio",
    cpf: 432
}).save().then(() => {
    console.log("!!!!!!!!!!!Cadastro OK!!!!!!") 
}).catch((erro) => {
    console.log("Erro no Cadastro!!!!!!"+ erro)
    })