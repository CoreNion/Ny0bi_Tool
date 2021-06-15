'use strict';

/**
 * ホーム系のページにおいて、URLの変更を検知し、検知後にapplyDarkHomePageを実行する関数
 */
function URLTracker() {
  const pageNavigationBar = $("#root > div > div:nth-child(2) > div:nth-child(1) > nav > ol")[0];

  const observer = new MutationObserver(records => {
    chrome.storage.local.get("nowPage", function (data) {
      const path = location.pathname;
      //URLがかわっった時に実行するもの
      if (!(data.nowPage == path)) {
        //クラスにCSSを適用する時に必要なelementを探して、作られた時にapplyDarkHomePage()を実行
        if (path.match(/questions\/\d+/)) {
          Home_needElementSearcher("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)");
        } else if (path.match(/questions/)) {
          Home_needElementSearcher("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2) > div > a");
        } else if (path.match(/lessons/)) {
          Home_needElementSearcher("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div > a");
        } else if (path.match(/home/)) {
          Home_needElementSearcher("#root > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div > a > div");
        } else if (path.match(/setting/)) {
          Home_needElementSearcher("#root > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(3)");
        } else if (path.match(/notices/)) {
          Home_needElementSearcher("#root > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > a > div");
        }
        chrome.storage.local.set({ 'nowPage': path });
      }
    });
  });
  if (pageNavigationBar) {
    //ページ名が書かれている部分の変化の監視を開始
    observer.observe(pageNavigationBar, {
      childList: true
    });
  }
}

/**
 *  [Home系ページ用] 入力されたパスにelementが作られた時に、applyDarkHomePage()を実行する関数 
 */
function Home_needElementSearcher(obj) {
  let interval = null;
  let err = false;
  //100ms毎に存在するか確認、存在するか10秒待っても出なかったら停止
  interval = setInterval(function () {
    if ($(obj).length) {
      try {
        applyDarkHomePage();
      } catch { err = true; }
      if (!err) {
        clearInterval(interval);
      }
    }
  }, 100);
  setTimeout(function () {
    clearInterval(interval);
  }, 10000);
}

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
    topBarButtons.css("color", "#FFFFFF");
  });
  //中身の変化の監視を開始
  observer.observe(topBarJS, {
    attributes: true,
    attributeFilter: ['class']
  });
}