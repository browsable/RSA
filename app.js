/**
 * Created by admin on 2015-08-13.
 */
    var http = require("http"),
        express= require("express"),
        app = express(),
        path = require("path"),
        bodyParser = require("body-parser"),
        nodeRSA = require("node-rsa");


    //RSA 보안 ( 공개키 - public key 개인키 - private key )
    //1. 서버프로그램에서 공개키, 개인키 생성, 공개키를 클라이언트에게 보내줌
    //2. 공개키를 클라이언트에게 보내줌
    //3. 클라이언트는 공개키를 가지고 데이터를 암호화해서 서버에 전송
    //4. 서버는 암호화된 데이터를 받아서 개인키를 이용해서 원래 데이터로 복호화
        var option = {
            encryptionScheme :{
                scheme : "pkcs1",
                hash : "sha256"
            }
        }

        //첫 인자 b: 키 길이
        var key = new nodeRSA({b:1024},option);
        //공개키(public key)를 추출 - 나중에 클라이언트에게 이 키를 전달
        var publicKey = key.exportKey("pkcs8-public-pem");
        //클라이언트에게 전달하기 위해서 global 전역 객체 이용
        global.pkey = publicKey;
        global.myKey = key;


        var routes= require("./routes");

        app.set("views", path.join(__dirname,"views"));
        app.set("view engine", "ejs");

        app.use(express.static(path.join(__dirname,"public")));
        app.use(bodyParser());
        app.use("/", routes);

        http.createServer(app).listen(5000, "localhost");
        console.log("서버기동 - 5000");