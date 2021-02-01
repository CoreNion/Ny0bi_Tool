//Chrome拡張ではonclickが使えないのでjQuery経由で実行
$("#checkUpdateButton").on("click", function () {
  $("#updateStatus").html("確認中です...");

  const updaterResult = hasUpdate();
  const updateInt = updaterResult[0];
  const updateURL = updaterResult[1];
  const date = new Date();
  if (updateInt) {
    alert("アップデートがあります！ Version:" + updateInt);
    //Releaseページへのリンク
    $("#updateStatus").html('<a href="'+ updateURL +'" id="updateAvailable" target="_blank" rel="noopener noreferrer">アップデートがあります！ Version:' + updateInt + '</a>');
    $("#lastUpdateCheck").html(date.toLocaleString());
  } else if(updateInt == null){
    alert("エラーが発生しました。\nインターネットに接続されているか確認してください。\nまたは、しばらくたってから、もう一度お試しください。");
    $("#updateStatus").html("アップデートはありません。");
  } else {
    alert("アップデートはありません。");
    $("#updateStatus").html("アップデートはありません。");
    $("#lastUpdateCheck").html(date.toLocaleString());
  }
});

/**
 * アップデートがあるかを確認し値を返す関数。
 * 
 * アップデートがある場合:[バージョン番号, ReleaseページのURL]
 * アップデートが無い場合:0
 * アップデートの確認に失敗した場合:null
 */
function hasUpdate() {
  let latest = null;
  let releaseURL = null;
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
      //最新バージョンと比較し最新バージョンだったら0、そうじゃなかったらreleaseURLにURLを入れる
      if (clientVer >= latest) {
        latest = 0;
      } else {
        releaseURL = json["html_url"];
      }
    })
    .fail(function (err) {
      //エラー処理
      latest = null;
    });
  $.ajaxSetup({ async: true });
  return [latest, releaseURL];
}