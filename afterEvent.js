'use strict';
const path = location.pathname;
const body = $("body");

//動画の教材での設定
if (path.match(/movies/)) {
  //理解度を設定ボタンを押したときに出るダイアログを黒くする
  $("#root > div > footer > div > button").on("click", function () {
    let interval = setInterval(function () {
      if (body.find(".ReactModalPortal > div > div > div").length) {
        body.find(".ReactModalPortal > div > div > div").eq(1).css("background-color", "#2c2c33");
        clearInterval(interval);
      }
    }, 3);
    //3秒たっても出ない場合はIntervalを止める
    setTimeout(function () {
      clearInterval(interval);
    }, 3000);
  })
  //動画の再生が終わったときに出る理解度のダイアログを黒くする
  const video = document.querySelector('video');
  video.onended = (event) => {
    body.find(".ReactModalPortal > div > div > div").eq(1).css("background-color", "#2c2c33");
  };
}
