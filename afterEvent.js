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
        console.log(path);
        if (path.match(/questions/)) {
          Home_needObjectSearcher("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2) > div > a");
        } else if (path.match(/lessons/)) {
          Home_needObjectSearcher("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div > a");
        } else if (path.match(/home/)) {
          Home_needObjectSearcher("#root > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div > a > div");
        }
        chrome.storage.local.set({ 'nowPage': path });
      }
    });
  });
  if (pageNavigationBar) {
    //中身の変化の監視を開始
    observer.observe(pageNavigationBar, {
      childList: true
    });
  }
}

function Home_needObjectSearcher(obj) {
  let interval = null;
  let err = false;
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