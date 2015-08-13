/**
 * Created by admin on 2015-08-13.
 */

    function sendData(key){
        //RSA Library를 이용해서 객체를 생성
        var key = new JSEncrypt();
        //서버가 보내준 공개키를 가져와야함
        var pkey = $("#pkey").val();
        //위에서 만든 key 객체에 공개키(pkey)를 셋팅
        key.setPublicKey(pkey);

        //사용자가 입력한 ID, PW를 jQuery 이용해서 획득
        var id = $("#uID").val();
        var pw = $("#uPW").val();

        //암호화를 진행
        var encrptID = key.encrypt(id);
        var encrptPW = key.encrypt(pw);

        console.log("암호화된 ID : " + encrptID);
        console.log("암호화된 PW : " + encrptPW);

        $("#uID").val(encrptID);
        $("#uPW").val(encrptPW);

        //서버로 암호화된 데이터를 전송
        $("form").submit();
}