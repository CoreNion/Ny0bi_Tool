import $ from "jquery";
import { classCSSPatcher, headStyleInjector, updateInjectStyle } from "../utilities";
import topPageCSS from "./home-common-css/top.scss";
import genresCSS from "./home-common-css/genres.scss";
import myCourceCSS from "./home-common-css/my-cource.scss";
import courceCSS from "./home-common-css/cource.scss";
import commonCSS from "./home-common-css/common.scss";
import forumCSS from "./home-common-css/forum.scss";

export default function applyDarkHomePage() {
  // 全てのページで必要なcssを読み込む
  commonCSS.use();

  const branch = () => {
    const path = location.pathname;
    if (path.match(/home/)) {
      HomeApplicator.topPage();
    } else if (path.match(/genres/)) {
      HomeApplicator.genrePage();
    } else if (path.match(/my_course/)) {
      HomeApplicator.myCourcePage();
    } else if (path.match(/courses/)) {
      HomeApplicator.courcePage();
    } else if (path.match(/questions/)) {
      HomeApplicator.forumPage();
    } else if (path.match(/lessons/)) {
      HomeApplicator.lessonListPage();
    } else if (path.match(/notices/)) {
      HomeApplicator.noticesPage();
    } else if (path.match(/setting/)) {
      HomeApplicator.settingPage();
    }
  }
  branch();

  // URLの変化の検知
  let lastUrl = location.href; 
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      branch();
    }
  }).observe(document, {subtree: true, childList: true});
}

/**
 * ホーム系のページにダークモードを適用するクラス
 */
class HomeApplicator {
  static topPage() {
    console.log("Ny0bi_Tool: Detect top page");
    topPageCSS.use();
    updateInjectStyle(topPageCSS, true);
  }

  static genrePage() {
    console.log("Ny0bi_Tool: Detect genre page");
    genresCSS.use();
    updateInjectStyle(genresCSS,true);
  }

  static myCourcePage() {
    console.log("Ny0bi_Tool: Detect my cource page");
    myCourceCSS.use();
    updateInjectStyle(myCourceCSS, true);
  }

  static courcePage() {
    console.log("Ny0bi_Tool: Detect cource page");
    courceCSS.use();
    updateInjectStyle(courceCSS, true);
  }

  static forumPage() {
    console.log("Ny0bi_Tool:Detect forum page");
    const path = location.pathname;

    forumCSS.use();
    updateInjectStyle(forumCSS, true);

    /* 旧ホーム用の関数から移植 */
    if (path.match(/questions\/\d+/)) {
      /* スレッドのページにダークモード適用 */
      const topDiv = $("[role=main] > div:nth-child(1)");
      //タイトルの文字色を変更
      topDiv.find("h1").css("color", "#e8e8ff");
      //表示する投稿を変更する部分の、文字色を変更
      topDiv.find("ul > li > a").css("color", "#FFFFFF");

      //コメント数やタグなどが書かれている部分にダークモード適用
      const postInfo = $("[role=main] > div:nth-child(2) > div:nth-child(1)");
      postInfo.css({ "background-color": "#202124", "border-color": "#404040" });
      postInfo.find("div > div > ul > li").css("background-color", "#ffffff0d");

      //スレッドの中身にダークモード適用
      const threads = $("[role=main] > div:nth-child(2) > div:not(:first-child)");
      //質問者の名前と登校時刻の部分にダークモード適用
      classCSSPatcher(threads.find("div:nth-child(2) > div").eq(0), "color: rgb(255 255 255 / 83%);", null, null);
      //質問したい教材の部分にダークモード適用(ある場合のみ)
      if (threads.eq(0).find("p").length) {
        threads.eq(0).css("background-color", "#202124");
        threads.eq(0).find("p").css("color", "#bdbdbd");
        threads.eq(0).find("div").css("border-color", "rgb(255 255 255 / 10%)");
      }

      //各コメントにダークモード適用
      for (let i = 0; i <= threads.length; i++) {
        let threed = threads.eq(i);
        //「回答」の部分だった場合はそのborder等にダークモード適用
        if (!(threed.css("border-style") == "none")) {
          threed.css("border-color", "#252525");
          threed.find("span").css({ "background-color": "#000000", "color": "#FFFFFF" });
        } else {
          //質問者の色を設定(色で判定)
          let threedBody = threed.find("div:nth-child(2)").eq(0);
          if (threedBody.css("background-color") == "rgb(226, 238, 255)") {
            //質問者の投稿の色
            classCSSPatcher(threedBody, "background-color: #607d8b; color:#FFFFFF;", null, null);
          } else if (threedBody.css("background-color") == "rgb(255, 255, 255)") {
            //他の人の投稿の色
            classCSSPatcher(threedBody, "background-color: #01579b; color:#FFFFFF;", null, null);
          } else if (threedBody.css("background-color") == "rgb(255, 247, 149)" || threedBody.css("background-color") == "rgb(255, 242, 78)") {
            //運営と先生の投稿の色
            classCSSPatcher(threedBody, "background-color: #1b5e20; color:#FFFFFF;", null, null);
          }
        }
      }

      //返信を送る部分にダークモード適用
      const replayArea = $("[role=main] > div:nth-child(3)");
      classCSSPatcher(replayArea, "background-color: #202124;", null, null);
      classCSSPatcher(replayArea.find("textarea"), "background-color: #202124; color: #e8e8e8;", null, null);
      classCSSPatcher(replayArea.find("div > div:nth-child(1) > button"), "background-color: #2b2c2f; border-color: #424242;", null, null);
    } else if (path.match(/new/)) {
      /* フォーラムに投稿を行うページにダークモード適用 */

      //ページタイトルにダークモード適用
      classCSSPatcher($("form > div > h1"), "color: #e8e8ff;", null, null);
      //コメントの内容を入力する部分ににダークモード適用
      classCSSPatcher($("form > div > div:nth-child(2) > div:nth-child(1)"), "background-color: #202124; color: #FFFFFF; border-color: #424242;", null, 2);
      classCSSPatcher($("textarea"), "background-color: #202124; color: #e8e8e8;", null, null);
      classCSSPatcher($("form > div > div:nth-child(2) > div:nth-child(2)"), "background-color: #202124; color: #FFFFFF; border-color: #424242;", null, 2);
      //画像をアップロードボタンにダークモード適用
      classCSSPatcher($("form > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > button"), "background-color: #2b2c2f; border-color: #424242;", null, null);
    }
  }

  static lessonListPage() {
    console.log("Ny0bi_Tool: Detect lesson list page");
    const path = location.pathname;

    if ($("[role=main] > div:nth-child(2) > div > div").length) {
      // 授業がない場合のお知らせの部分を黒くする
      const infoPath = "[role=main] > div:nth-child(2) > div > div";
      headStyleInjector(infoPath, "background-color: #202124; color: #FFFFFF !important; border-color: #2f2f2f;");
    } else {
      //各授業のリンクの部分にダークモード適用
      const lesson = "[role=main] > div > a > div";
      headStyleInjector(lesson, "background-color: #202124; color: #FFFFFF; border-color: #2f2f2f;");
      headStyleInjector(lesson + ":hover", "background-color: #383838");
    }

    //ページタイトルの文字色を変更
    classCSSPatcher($("[role=main] > div > h1"), "color: #e8e8ff;", null, null);

    if (!(path.match(/search/))) {
      //必修授業・課外授業の選択の部分にダークモード適用(授業一覧のページのみ)
      classCSSPatcher($("[role=tablist]"), "background-color: #202124;", null, 2);
      const tab = $("[role=tab]");
      classCSSPatcher(tab, "background-color: #202124; border-color: #2f2f2f;", null, 2);
      classCSSPatcher(tab.find("a"), "color: #ffffffcc;", "hover", null);
      classCSSPatcher(tab.find("a"), "color: #ffffffcc;", "visited", null);
      //もっと見るの部分にダークモード適用(授業一覧のページのみ)
      const seeMore = $("[role=main] > div:nth-child(2) > div");
      classCSSPatcher(seeMore, "background-color: #202124;", null, 2);
      const seeMoreButton = seeMore.find("button");
      classCSSPatcher(seeMoreButton, "background-color: #505050; border-color: #cad7ff; color: #cad7ff;", null, null);
    } else {
      //検索結果の部分にダークモード適用
      const searchResults = "[role=main] > div:nth-child(2)";
      headStyleInjector(searchResults, "background-color: #202124; border-color: #8c8c8c;");
      headStyleInjector(searchResults + "div > div:nth-child(3) > span:nth-child(1)", "color: #FFF;");

      //各授業のリンクの部分にダークモード適用
      headStyleInjector("[role=main] > a > div", "background-color: #202124; color: #FFFFFF; border-color: #2f2f2f;");
      headStyleInjector("[role=main] > a > div:hover", "background-color: #383838");
    }

    // complementaryにダークモード適用
    const rightContents = $("[role=complementary] > div");
    classCSSPatcher($("[role=complementary] > div > div:nth-child(2) > div"), "background-color: #202124; border-color: #8c8c8c;", null, null);
    // 検索窓をダークにする
    classCSSPatcher(rightContents.find("input"), "color: #FFFFFF; background-color: #222222; border-color: #404040;", null, null);
    // タグのボタンをダークにする
    classCSSPatcher($("[role=listitem] > a"), "background-color: #202124;", null, null);
    // 学習を効果的に行えるよう〜(略)の部分にダークモードを適用
    const userInfoPath = "[role=complementary] > div > div:nth-child(1)";
    headStyleInjector(userInfoPath, "background-color: #202124; color: #e8e8e8;");
  }

  static noticesPage() {
    console.log("Ny0bi_Tool: Detect notices page");

    //ページタイトルの文字色を変更
    $("[role=main] > div:nth-child(1) > h1").css("color", "#e8e8ff");

    //各通知のリンクの部分にダークモード適用
    const notice = $("[role=main] > div > a > div");
    classCSSPatcher(notice, "background-color: #202124; color: #FFFFFF; border-color: #2f2f2f;", null, null);
    //触れた時の背景色を変更
    classCSSPatcher(notice, "background-color: #383838", "hover", null);
  }

  static settingPage() {
    console.log("Ny0bi_Tool: Detect setting page");

    //ページタイトルの文字色を変更
    classCSSPatcher($("[role=main] > div:nth-child(2) > h1"), "color: #e8e8ff;", null, null);

    //中央部のメインの設定の色を変更
    const contentPath = "[role=main] > div:nth-child(3)";
    classCSSPatcher($(contentPath), "background-color: #222222; color: #FFFFFF;", null, 2);
    //設定一覧の部分の文字色を変更
    classCSSPatcher($(contentPath + " > ul:nth-child(1) > li > a"), "color: #FFFFFF !important;", null, null);
    //所属先の部分の色を変更
    classCSSPatcher($(contentPath + " > div:nth-child(3) > div:nth-child(2) > div > ul > li:nth-child(2)"), "background-color: #b8fdac; color: #000000;", null, null);
    //右側のボタンの色を変更
    classCSSPatcher($(contentPath + " > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > a > button"), "background-color: #4f73e3; color: #FFF; border: 0px", null, null);
    classCSSPatcher($(contentPath + " > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > a > button"), "color: #FFF;", "hover", null);
  }
}