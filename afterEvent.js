'use strict';

/**
 * ホーム系のページにて、スクロールなどで上部のバーが変化した時でもダークモードを維持するための関数
 * @param {JQuery<HTMLElement>} topBar 上部のバーのjQuery HTMLElement
 */
function homePageTopBarTracker(topBar) {
  //jQuery ElementをJavaScript標準の形のElementに変換(MutationObserverはjQueryの機能ではないため)
  const topBarJS = topBar[0];

  //上部のバー変化した時に実行するコード
  const observer = new MutationObserver(records => {
    topBar.css("background-color", "#222222");
    //各種リンクの文字色を白にする
    const topBarButtons = topBar.find("div > div > div > a");
    topBarButtons.css("color","#FFFFFF");
  });
  //中身の変化の監視を開始
  observer.observe(topBarJS,{
    attributes: true,
    attributeFilter: ['class']
  });
}