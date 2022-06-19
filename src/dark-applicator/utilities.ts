import $ from "jquery"
import { applyDarkMode } from "../content";
import applyDarkHomePage from "./pages/home";

/**
 * Elementが所属しているクラスのCSSの変更を恒久的に適用する関数
 * 
 * @param {JQuery<HTMLElement>} element 変更したいHTMLElement
 * @param {string} property CSSの内容({}は不要)
 * @param {string?} pseudoClass 疑似クラス(必要な場合のみ, ":"は不要)
 * @param {number?} classNumber 何番目のクラスに適用するかの値(手動指定する場合のみ、デフォルトは最後尾(最優先のクラス))
 */
export function classCSSPatcher(element: JQuery<HTMLElement>, property: String, pseudoClass: String | null, classNumber: number | null) {
  const elementAttr = element.attr("class");
  if (elementAttr) {
    //所属しているクラス一覧を取得し、クラス名の一文字目に.を付け、配列化
    const elementClassArrary = ("." + elementAttr.split(' ').join(' .')).split(' ');

    //クラスの番号を決定する
    let className = null;
    if (classNumber) {
      className = elementClassArrary[classNumber];
    } else {
      //指定されていない場合は最後尾(最優先)のクラスに設定する
      className = elementClassArrary[elementClassArrary.length - 1]
    }

    //headにstyleを追加
    if (pseudoClass) {
      //疑似クラスが必要な場合
      $("head").append("<style> " + className + ":" + pseudoClass + " { " + property + " }</style>");
    } else {
      $("head").append("<style> " + className + " { " + property + " }</style>");
    }
  }
}

/**
 * ホーム系のページにおいて、URLの変更を検知し、検知後にapplyDarkHomePageを実行する関数
 */
export function URLTracker() {
  const HTMLbody = $("body")[0];

  //bodyの中身に変化があったときに実行
  const observer = new MutationObserver(records => {
    chrome.storage.local.get("nowPage", data => {
      const path = location.pathname;
      //URLが変わった時に実行するもの
      if (!(data.nowPage == path)) {
        //クラスにCSSを適用する時に必要なelementを探して、作られた時にapplyDarkNewHomeCentor()を実行
        if (path.match(/questions\/new/)) {
          Home_needElementSearcher("form > div > div:nth-child(2) > div:nth-child(1)");
        } else if (path.match(/questions\/\d+/)) {
          Home_needElementSearcher("[role=main] > div:nth-child(2) > div:nth-child(1)");
        } else if (path.match(/questions/)) {
          Home_needElementSearcher("[role=main] > div:nth-child(2) > div > a");
        } else if (path.match(/lessons/)) {
          Home_needElementSearcher("[role=main]");
        } else if (path.match(/home/)) {
          Home_needElementSearcher("[role=main] > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div > a > div > div:nth-child(2) > div:nth-child(3) > div > div");
        } else if (path.match(/genres/)) {
          Home_needElementSearcher("[role=main] > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div > h1")
        } else if (path.match(/setting/)) {
          Home_needElementSearcher("[role=main] > div:nth-child(3)");
        } else if (path.match(/notices|courses\/\d+\/chapters/)) {
          Home_needElementSearcher("[role=main] > div > a > div");
        } else if (path.match(/my_course/)) {
          Home_needElementSearcher("[role=main] > div > div:nth-child(2) >  div:nth-child(1) > div > div > div > div > button");
        } else if (path.match(/courses/)) {
          Home_needElementSearcher("[role=main] > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > a:nth-child(1)");
        } else {
          location.reload();
        }
        chrome.storage.local.set({ 'nowPage': path });
      }
    });
  });

  //bodyの変化の監視を開始
  observer.observe(HTMLbody, {
    childList: true
  });
}

/**
 *  [Home系ページ用] 入力されたパスにelementが作られた時に、applyDarkHomePage()を実行する関数 
 */
export function Home_needElementSearcher(obj: String) {
  let interval!: NodeJS.Timer;
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
 * headにstyleを注入する関数
 * @param {String} selector セレクター
 * @param {string} style Style
 */
export function headStyleInjector(selector:String, style: String) {
  $("head").append(`<style>${selector} { ${style} }</style>`);
}