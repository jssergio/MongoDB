//Carregando os Modulos
const express= require('express')
//const handlebars = require('express-handlebars')
const { engine } = require('express-handlebars');
const bodyParser = require("body-parser")
const app = express()
const admin = require("./routers/admin")
const perfil = require("./routers/perfil")
const path = require("path")
const mongoose = require("mongoose");
const req = require('express/lib/request');
const session = require("express-session")
const flash = require("connect-flash")
//const flash = require('express-flash')
const passport = require("passport")
require("./models/Passport")(passport)
const db = require("./models/db")

// ATUALIZAÇÃO
const upload = require("./routers/upload")
//const multer= require("multer")
//const uploads = multer({dest: "uploads/"})

//**************************************************************************** */
// Configurações
//Criando Sessão
app.use(session({
    secret: "cursomongoDb",
    resave: true,
    saveUninitialized: true
}))

//Criando PASSPORT
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Criando Middleware
app.use((req, res, next) => {
    //Variavel Global
    res.locals.success_msg = req.flash('success_msg')   
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
   
    next()
})

 // BodyParser
 app.use(bodyParser.urlencoded({extended: false}))
 app.use(bodyParser.json())
 // Handlebars // Config Template Engine
app.engine('handlebars', engine({defaultLayout: "main", runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
}, 
}));
app.set('view engine', 'handlebars');
app.set("views", "./views");

// Mongoose
//Configurando mongoose

/*const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://root:root@cluster0.im7c5.mongodb.net/ps2022?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("pss2022").collection("mongo2022");
  // perform actions on the collection object
  client.close();
});*/

mongoose.Promise= global.Promise
//mongoose.connect("mongodb+srv://root:root@cluster0.im7c5.mongodb.net/ps2022?retryWrites=true&w=majority")
mongoose.connect(db.mongoURI).then(() => {
    console.log("Conexão MONGO OK!!!!!!")
}).catch((erro) => {
    console.log("Erro Conexão???MONGO DB!!!!!!"+ erro)
})

// Mapear Pasta Public Static
app.use(express.static(path.join(__dirname,"public")))

//Rota
//app.use('/home',admin)
//app.use('/admin',admin)
app.use('/',admin)
app.use('/',perfil)
app.use('/',upload)

// Outros
//const PORT = 3030
// Porta Padrao do HEROKU
const PORT = process.env.PORT || 8089
app.listen(PORT,() => {
    console.log("Servidor OK!!!!")
})