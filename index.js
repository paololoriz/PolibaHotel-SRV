const
    port = 8080,
    mongodbUrl = "mongodb+srv://poliba:poliba@cluster0.omrthnp.mongodb.net/PolibaHotel?retryWrites=true&w=majority",
    express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    multer = require('multer'),
    bodyParser = require('body-parser')
    userController = require('./controllers/userController'),
    reservationController = require('./controllers/reservationController'),
    roomController = require("./controllers/roomController"),
cookieParser = require('cookie-parser')
;
const expressSession = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require("./models/user").User;
const flash = require('connect-flash');
const imageUploadPath = 'C:/Users/ricca/WebstormProjects/hotel-poliba-front-end/public'

mongoose.connect(mongodbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.once("open", () => console.log("Connessione al database riuscita"));

require("./strategies/JwtStrategy")
require("./strategies/LocalStrategy")
require("./authenticate")

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser("jhdshhds884hfhhs-ew6dhjd"))

app.use(flash());
app.use(expressSession({ secret: 'super secret' , resave: true, saveUninitialized: true}));
app.use(passport.initialize());

const {verifyUser} = require ("./authenticate");

const whitelist = 'http://localhost:3000'
    ? 'http://localhost:3000'.split(",")
    : []

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    httpOnly: true,
    credentials: true,
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,imageUploadPath)
    },
    filename: (req,file,cb) => {
        cb(null, `${file.fieldname}_${file.originalname}`)
    },
})
const imageUpload = multer({storage: storage});


app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.set("view engine", "ejs");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Room
app.get("/getRooms", roomController.getRooms)
app.post("/addRoom", roomController.addRoom)
app.delete("/deleteRoom", roomController.deleteRoom)
app.put("/updateRoom", roomController.updateRoom)
app.post('/image-upload',imageUpload.array("camera"),(req,res) => {
    res.send('Post request received to /image-upload');
})

//User
app.post("/signUp", userController.create)
app.post("/signUpAdmin", userController.createAdmin)
app.post("/signUpAdmin", userController.createReceptionist)
app.post("/login", passport.authenticate("local") ,userController.authenticate)
app.post("/refreshToken", userController.refreshToken)
app.get("/logout",verifyUser, userController.logout)
app.get("/me", verifyUser, userController.me)

//Reservation
app.post("/createReservation", reservationController.createReservation)
app.get("/reservations", reservationController.getAllReservations)
app.get("/reservations/:email", reservationController.getMyReservations)
app.get("/getAllReservations", reservationController.getAllReservations)

app.listen(port, () => console.log("Applicazione in ascolto"));