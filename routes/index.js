/**
 * Created by admin on 2015-08-13.
 */

       var express = require("express");
            router = express.Router();

        router.get("/", function(req,res){
            res.render("login",{
                key : global.pkey
            })
        });

        router.post("/loginProcess", function(req,res){
            var key  = global.myKey;
            var encryptID = req.body.uID;
            var encryptPW = req.body.uPW;
            //원래상태로 복구
            var id = key.decrypt(encryptID,"utf8");
            var pw = key.decrypt(encryptPW,"utf8");

            if(id=="test" && pw=="1234"){
                res.render("loginSuccess");
            }else{
                res.render("loginFail");
            }
        });

        module.exports = router;

