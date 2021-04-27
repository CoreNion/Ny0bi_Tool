'use strict';
/*
$(window).on("load", function () {
  chrome.storage.local.get("setDarkMode", function (data) {
    //ダークモードを有効にする設定がしてある場合のみ実行
    if (data.setDarkMode) {
      const path = location.pathname;
      const body = $("body");

      //動画の教材での設定
      if (path.match(/movies/)) {
        //理解度を設定ボタンが押された時に実行 
        $("#root > div > footer > div > button").on("click", function () {
          //理解度を設定するダイアログを黒くする
          let interval = setInterval(function () {
            if (body.find(".ReactModal__Content > div > div > div").length) {
              body.find(".ReactModal__Content > div > div > div").css("background-color", "#2c2c33");
              clearInterval(interval);
            }
          }, 3);
          //3秒たっても出ない場合はIntervalを止める
          setTimeout(function () {
            clearInterval(interval);
          }, 3000);
        })

        //動画の再生が終わったときに出る理解度のダイアログを黒くする
        let video = document.querySelector('video');
        if(!video.onended) {
          video.onended = (event) => {
            body.find(".ReactModal__Content > div > div > div").css("background-color", "#2c2c33");
          };
        }    
      }
    }
  });
});
*/
