//DOMがロードされた後に実行するもの
$(function(){
  //ストレージから各種情報を取得
  chrome.storage.local.get(["latest", "lastCheck", "releaseURL"], function (data) {
    //アップデートがある場合
    if(data.releaseURL){
      //アップデートの情報を表示
      $("#updateStatus").html('<a href="'+ data.releaseURL +'" id="updateAvailable" target="_blank" rel="noopener noreferrer">アップデートがあります！ Version:' + data.latest + '</a>');
    }
    //最終確認を更新(確認をしたことがある場合)
    if(data.lastCheck){
      $("#lastUpdateCheck").html(data.lastCheck);  
    }    
  });

  //バージョンを表示
  const manifest = chrome.runtime.getManifest();
  const clientVer = Number(manifest.version);
  $("#version").html(clientVer);
});

/* アップデートを確認ボタンが押された時の動作 (Chrome拡張ではonclickが使えないのでjQuery経由で実行) */
$("#checkUpdateButton").on("click", function () {
  $("#updateStatus").html("確認中です...");

  const updaterResult = hasUpdate();
  const updateInt = updaterResult[0];
  const updateURL = updaterResult[1];
  const confirmationDate = updaterResult[2];
  if (updateInt) {
    alert("アップデートがあります！ Version:" + updateInt);
    //Releaseページへのリンク
    $("#updateStatus").html('<a href="'+ updateURL +'" id="updateAvailable" target="_blank" rel="noopener noreferrer">アップデートがあります！ Version:' + updateInt + '</a>');
    //最終更新を現在時刻へ更新
    $("#lastUpdateCheck").html(confirmationDate);
    //ストレージに最終更新時刻を更新/追加
    chrome.storage.local.set({'lastCheck': date.toLocaleString()});
  } else if(updateInt == null){
    alert("エラーが発生しました。\nインターネットに接続されているか確認してください。\nまたは、しばらくたってから、もう一度お試しください。");
    $("#updateStatus").html("アップデートはありません。");
  } else {
    alert("アップデートはありません。");
    $("#updateStatus").html("アップデートはありません。");
    //最終更新を現在時刻へ更新
    $("#lastUpdateCheck").html(confirmationDate);
  }
});

/**
 * アップデートがあるかを確認し値を返す関数。
 * 
 *     戻り値:
 *     アップデートがある場合:[バージョン番号, ReleaseページのURL,確認時刻]
 *     アップデートが無い場合:[0, null,確認時刻]
 *     アップデートの確認に失敗した場合:[null, null, null]
 */
function hasUpdate() {
  let latest = null;
  let releaseURL = null;
  let nowTime = null;
  //現在のバージョンを取得
  const manifest = chrome.runtime.getManifest();
  const clientVer = Number(manifest.version);
  //最新バージョンが書かれているjsonを取得
  $.ajaxSetup({ async: false });
  //GithubのApiから最新バージョンを取得
  $.getJSON("https://api.github.com/repos/CoreNion/Ny0bi_Tool/releases/latest")
    .done(function (json) {
      //tag_nameからタグの名前を取得し、数字のみにする
      latest = json["tag_name"].replace(/[^0-9.]/g, '');
      chrome.storage.local.set({'latest': latest});
      //最新バージョンと比較し最新バージョンだったら0、そうじゃなかったらreleaseURLにURLを入れる
      if (clientVer >= latest) {
        latest = 0;
        //ストレージのreleaseURLを削除
        chrome.storage.local.remove('releaseURL', function (data) {});
      } else {
        releaseURL = json["html_url"];
        //ストレージにreleaseURLを追加/更新
        chrome.storage.local.set({'releaseURL': releaseURL});
      }
      //現在時刻を取得
      const date = new Date();
      nowTime = date.toLocaleString()
      //確認時刻をストレージに入れる
      chrome.storage.local.set({'lastCheck': nowTime});
      //現在時刻をnowTimeに入れる
    })
    .fail(function (err) {
      //エラー処理
      latest = null;
    });
  $.ajaxSetup({ async: true });
  return [latest, releaseURL, nowTime];
}