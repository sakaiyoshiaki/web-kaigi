  // Initialize Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyCNqgkhEoZEYF6gDAqs7y6g7HzX5qrGkto",
    authDomain: "chatapp-5cea4.firebaseapp.com",
    projectId: "chatapp-5cea4",
    storageBucket: "chatapp-5cea4.appspot.com",
    messagingSenderId: "976431224505",
    appId: "1:976431224505:web:606d4c4cc3b591d2066d68",
    measurementId: "G-ZEHLN13FK9"
    };
firebase.initializeApp(firebaseConfig);

  //Msg送信準備
  const newPostRef = firebase.database();
  let room = "room1";

  // const send = document.getElementById("send");
  const username = document.getElementById("username");
  // const text = document.getElementById("text");
  const output = document.getElementById("output")

//---------------削除 入力欄によるMsg送信を削除---------------//
  // //Msg送信処理
  // send.addEventListener('click', function(){
  // //書き込み処理
  //   newPostRef.ref(room).push({
  //       username: username.value,
  //       text: text.value,
  //       //追記
  //       time: time()
  //   });
  //   text.value = "";
  // });

//Msg受信処理
//--------------- 変更 Msg受信処理を関数化---------------//
function text(){
  newPostRef.ref(room).on("child_added",function(data){
    const v = data.val();  //データ取得
    const k = data.key;  　//ユニークkey取得
    let str ="";

    //追記
    str += '<div id="' + k + '" class="msg_main">'
    str += '<div class="msg_left">';
    str += '<div class=""><img src="img/icon_person.png" alt="" class="icon ' + v.username +
    '" width="30"></div>';
    str += '<div class="msg">';
    str += '<div class="name">' + v.username + '</div>';
    str += '<div class="text">' + v.text + '</div>';
    str += '</div>';
    str += '</div>';
    str += '<div class="msg_right">';
    str += '<div class="time">' + v.time + '</div>';
    str += '</div>';
    str += '</div>';

    output.innerHTML += str;

    //--------------- 追加 自動スクロール機能を追加 ---------------//
    $("#output").scrollTop( $("#output")[0].scrollHeight );

  });

}

//時間を取得する関数
function time() {
    var date = new Date();
    var hh = ("0" + date.getHours()).slice(-2);
    var min = ("0" + date.getMinutes()).slice(-2);
    var sec = ("0" + date.getSeconds()).slice(-2);

    var time = hh + ":" + min + ":" + sec;
    return time;
}

//音声認識の準備
const speech = new webkitSpeechRecognition();
speech.lang = 'ja-JP';

//使用する変数を用意
//--------------- 追加 join ---------------//
const join = document.getElementById('join');
// const btn = document.getElementById('btn');
const content = document.getElementById('content');

//--------------- 変更 join. ---------------//
join.addEventListener('click', function () {

    //--------------- 追加 join. ---------------//
    room = document.getElementById('join-room').value;

    // 音声認識をスタート
    speech.start();

    //--------------- 追加 text() ---------------//
    text();
});

//--------------- 追加 endcall ---------------//
const endcall = document.getElementById('end-call')
endcall.addEventListener('click', function(){
  location.reload();
})

//音声自動文字起こし機能
    speech.onresult = function (e) {
    // 音声認識をストップした後に、content要素内にdivタグとautotextを追加
        speech.stop();
        if (e.results[0].isFinal) {
          var autotext = e.results[0][0].transcript
          console.log(e);
          console.log(autotext);
          //追記
          newPostRef.ref(room).push({
            username: username.value,
            //autotextに変更
            text: autotext,
            time: time()
          });
        }
      }

    speech.onend = () => {
          speech.start()
      };