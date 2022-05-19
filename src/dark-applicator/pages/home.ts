import $ from "jquery";
import { classCSSPatcher, headStyleInjector } from "../utilities";

/**
 * ホーム系のページにダークモードを適用するクラス
 */
export default class HomeApplicator {
  static topPage() {
    console.log("Ny0bi_Tool: Detect top page");

    //左のコース一覧の部分にダークモード適用
    const courseListPath = "[role=navigation] > div";
    //背景色
    classCSSPatcher($(courseListPath), "background-color: #1d1d1d; color: #e8e8e8;", null, 2);
    //「コースを探す」の文字色
    classCSSPatcher($(courseListPath + " > div:nth-child(2)"), "color: #dadada;", null, null);
    //必修授業/課外授業表記とコース名の文字色
    classCSSPatcher($(courseListPath + " > div:nth-child(3) > button > h2"), "color: #e8e8e8;", null, null);
    classCSSPatcher($(courseListPath + " > div:nth-child(3) > div:nth-child(3) > div > div > a > h2"), "color: #e8e8e8;", null, null);

    //右側の各h1タイトルにダークモード適用
    classCSSPatcher($("[role=main] > div > div > div:nth-child(1) > h1"), "color: #FFFFFF;", null, null);

    //各コース/途中再開の部分にダークモード適用
    const coursechapterLinkPath = "[role=main] > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div > a > div";
    //教材名や最終閲覧日時などが書かれている部分の背景色
    headStyleInjector(coursechapterLinkPath + " > div:nth-child(2)", "background-color: #202124;");
    //教材名の文字色
    headStyleInjector(coursechapterLinkPath + " > div:nth-child(2) > div:nth-child(1)", "color: #FFFFFF;");
    //コース名の文字色
    headStyleInjector(coursechapterLinkPath + " > div:nth-child(2) > div:nth-child(2)", "color: #e0e0e0;");

    //フォーラムの各投稿の部分にダークモード適用
    //フォーラムの投稿はページロード後に出るので出現次第適用
    let interval!: NodeJS.Timer;
    interval = setInterval(function () {
      const forumLinkDivPath = "[role=main] > div > div:nth-child(9) > div";
      if ($(forumLinkDivPath).length) {
        //背景色
        classCSSPatcher($(forumLinkDivPath), "background-color: #202124;", null, null);
        //投稿の文字色
        classCSSPatcher($(forumLinkDivPath + " > a"), "color: #e8e8e8", null, null);
        classCSSPatcher($(forumLinkDivPath + " > a"), "color: #e8e8e8", "hover", null);
        //投稿日時の文字色
        classCSSPatcher($(forumLinkDivPath + " > a > div:nth-child(2) > div"), "color: #CFCFCF;", null, null);
        clearInterval(interval);
      }
    }, 50);
    setTimeout(function () {
      clearInterval(interval);
    }, 5000);
  }

  static genrePage() {
    console.log("Ny0bi_Tool: Detect genre page()");

    //左のコース一覧の部分にダークモード適用
    const courseListPath = "[role=navigation] > div";
    //背景色
    classCSSPatcher($(courseListPath), "background-color: #1d1d1d; color: #e8e8e8;", null, 2);
    //「コースを探す」の文字色
    classCSSPatcher($(courseListPath + " > div:nth-child(2)"), "color: #dadada;", null, null);
    //必修授業/課外授業表記とコース名の文字色
    classCSSPatcher($(courseListPath + " > div:nth-child(3) > button >  h2"), "color: #e8e8e8;", null, null);
    classCSSPatcher($(courseListPath + " > div:nth-child(3) > div:nth-child(3) > div > div > a > h2"), "color: #e8e8e8;", null, null);

    //科目の部分にダークモード適用
    const subjectPath = "[role=main] > div > div:nth-child(2) > div:nth-child(1)";
    //科目タイトルの文字色を変更
    classCSSPatcher($(subjectPath + " > div > h1"), "color: #FFFFFF;", null, null);
    //各コースへのリンクの背景色を変更
    classCSSPatcher($(subjectPath + " > div:nth-child(2) > div:nth-child(1) > a > div"), "background-color: #202124;", null, 2);
    //リンクの文字色を変更
    classCSSPatcher($(subjectPath + " > div:nth-child(2) > div:nth-child(1) > a > div > div:nth-child(2)"), "color: #FFFFFF;", null, null);
  }

  static myCourcePage() {
    console.log("Ny0bi_Tool: Detect my cource page");

    //コースが選択されているままリロードされるとダークモードが壊れるので、選択していないページに移動
    if (location.search) location.replace("https://www.nnn.ed.nico/my_course");

    //ページタイトルと概要を黒くする
    const pageInfo = $("[role=main] > div > div:nth-child(1)");
    pageInfo.find("h1").css("color", "#e8e8ff");
    pageInfo.find("a,div").css("color", "#e8e8e8");

    //リストの背景色を変更
    classCSSPatcher($("[role=main] > div > div:nth-child(2) > div > div > div"), "background-color: #000000;", null, null);
    //コースリストの各色を変更
    const applyDarkCourceList = (courceLink: JQuery<HTMLElement>) => {
      //リンクの色
      classCSSPatcher(courceLink, "background-color: #202124 !important; color: #FFFFFF !important; border-color: #2f2f2f !important;", null, 2);
      //触れた時の背景色
      classCSSPatcher(courceLink, "background-color: #383838 !important;", "hover", null);
      //アイコンの色
      classCSSPatcher(courceLink.find("div > i"), "color: #648aff;", null, null);
      //進捗度のバーの色(ある場合のみ)
      if (courceLink.find("div").eq(2).length) classCSSPatcher(courceLink.find("div").eq(2), "background-color: #bfbfbf;", null, null);
      //名前の文字色
      classCSSPatcher(courceLink.find("div > div"), "color: #e8e8e8;", null, null);
    }

    //コースのリンクがbuttonに変更になったが、一部aのままの部分もあるので分岐
    if ($("[role=main] > div > div:nth-child(2) > div > div > div > div > div > button").length) {
      applyDarkCourceList($("[role=main] > div > div:nth-child(2) > div > div > div > div > div > button"));
    }
    if ($("[role=main] > div > div:nth-child(2) > div > div > div > div > div > a").length) {
      applyDarkCourceList($("[role=main] > div > div:nth-child(2) > div > div > div > div > div > a > div"));
    }

    //最初の「コースを選択してください」の部分を黒くする
    const rightElement = $("[role=main] > div > div:nth-child(2) > div:nth-child(2)");
    rightElement.css("background-color", "#202124");
    rightElement.find("div").css("background-color", "#202124");

    //コース選択後に出てくる概要を黒くする
    //コースが選択された後にしか出ないので、発火後に要素を探す方式を取る
    const applyDarkOverview = () => $("[role=main] > div > div:nth-child(2) >  div:nth-child(1) > div > div > div > div > button").on("click", () => {
      let interval!: NodeJS.Timer
      interval = setInterval(function () {
        const path = "[role=main] > div > div:nth-child(2) > div:nth-child(2) > div > div > ";
        if ($(path + "div:nth-child(1) > div:nth-child(2) > div:nth-child(2)").length) {
          //コース概要部の背景色適用
          classCSSPatcher($(path + "div:nth-child(1)"), "background-color: #202124;", null, null);
          //タイトルの左にある線の色を変更
          classCSSPatcher($(path + "div:nth-child(1) > div:nth-child(1) > div:nth-child(1)"), "border-left-color: #648aff", null, null);
          //折り畳みの部分の色を変更
          $("head").append('<style>' + path + 'div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) { background: #353535 !important; box-shadow: none; } </style>');
          $("head").append('<style>' + path + 'div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) { background: #353535 !important; box-shadow: none; } </style>')
          //「このコースに含まれる章」部にダークモード適用
          classCSSPatcher($(path + "div:nth-child(2)"), "background-color: #202124; color: #e8e8e8; border-bottom-color: #404040;", null, null);
          //境界線にダークモード適用
          classCSSPatcher($(path + "div:nth-child(3)"), "border-color: #404040;", null, null);
          //各章のリンクにダークモード適用
          classCSSPatcher($(path + "div:nth-child(3) > a"), "background-color: #202124; color: #FFFFFF !important; border-color: #2f2f2f !important;", null, null);
          classCSSPatcher($(path + "div:nth-child(3) > a"), "background-color: #383838 !important;", "hover", null);
          clearInterval(interval);
        }
      }, 50);
      setTimeout(function () {
        clearInterval(interval);
      }, 5000);
    });
    applyDarkOverview();

    //課外授業選択後に概要へのダークモード適用イベントがリセットされるのでその対策
    $("[role=main] > div > div:nth-child(2) > div:nth-child(1) > div > ul").on("click", () => {
      let interval!: NodeJS.Timer;
      interval = setInterval(() => {
        if ($("[role=main] > div > div:nth-child(2) >  div:nth-child(1) > div > div > div > div > button").length) {
          applyDarkOverview();
          clearInterval(interval);
        }
      }, 50);
      setTimeout(function () {
        clearInterval(interval);
      }, 5000);
    });
  }

  static courcePage() {
    console.log("Ny0bi_Tool: Detect cource page");

    //ページタイトルの文字色を変更
    $("[role=main] > div:nth-child(1) > h1").css("color", "#e8e8ff");

    //コース概要の部分にダークモード適用
    const courseDivPath = "[role=main] > div:nth-child(2)";
    classCSSPatcher($(courseDivPath), "background-color: #000000; border: solid #7d7d7d !important;", null, 2);
    //受講のオンオフの部分の効果の色を変更
    classCSSPatcher($(courseDivPath + " > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)"), "background: #202124; box-shadow: #202124 0px -12px 12px;", null, null);
    //受講を止めるボタンがない場合への対応
    if ($(courseDivPath + " > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div > div > button").length) {
      classCSSPatcher($(courseDivPath + " > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div > div > button"), "background-color: #2f0000; border-color: #7d7d7d;", null, null);
    }

    //章のリンクの部分にダークモード適用
    classCSSPatcher($(courseDivPath + " > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > a > div"), "background-color: #000000; border-width: 0px 0px 1px 1px; color: #e8e8e8;", null, null);
    classCSSPatcher($(courseDivPath + " > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > a > div"), "background-color: #383838;", "hover", null);
  }

  static forumPage() {
    console.log("Ny0bi_Tool:Detect forum page");
    const path = location.pathname;

    /* 旧ホーム用の関数から移植 */
    if (path.match(/questions\/\d+/)) {
      /* スレッドのページにダークモード適用 */
      const topDiv = $("[role=main] > div:nth-child(1)");
      //タイトルの文字色を変更
      topDiv.find("h1").css("color", "#e8e8ff");
      //ガイドを見るボタンにダークモード適用
      topDiv.find("div > button").css("background-color", "#2b2c2f;");
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
    } else {
      /* スレッド一覧のページで、タイトル〜表示する投稿を変更する部分にダークモード適用 */

      const mainDiv = $("[role=main] > div:nth-child(1)");
      //タイトルの文字色を変更
      classCSSPatcher(mainDiv.find("h1"), "color: #e8e8ff;", null, null);
      //ガイドを見るボタンの色を変更
      classCSSPatcher(mainDiv.find("button"), "background-color: #2b2c2f;", null, null);
      //フォーラムの履歴の部分の色を変更
      classCSSPatcher(mainDiv.find("div").eq(2), "background-color: #2c2c2c; color: #e8e8e8;", null, 2);
      classCSSPatcher(mainDiv.find("p"), "color: #e8e8e8;", null, null);

      //表示する投稿を変更する部分の、文字色を変更
      mainDiv.find("ul > li > a").css("color", "#FFFFFF");

      /* 各投稿の一覧の部分にダークモードを適用 */
      //投稿リストの一番上の境界線を削除
      classCSSPatcher($("[role=main] > div:nth-child(2)"), "border-style: none;", null, null);
      //一番上のリストの名前にダークモード適用
      const forumListTitleDiv = $("[role=main] > div:nth-child(2) > div:nth-child(1)");
      //全体の背景色や境界線関連の色
      classCSSPatcher(forumListTitleDiv, "background-color: #202124; border-color: #2f2f2f;", null, null);

      //タイトルの文字色(検索以外のページ用)
      if (!path.match(/search/)) {
        classCSSPatcher(forumListTitleDiv.find("h2"), "color: #FFFFFF", null, null);
      }

      //フォーラムの各投稿のリンクにダークモード適用 
      const forumLinkDiv = $("[role=main] > div:nth-child(2) > div:nth-child(2)");
      //全体の背景色や境界線関連の色
      classCSSPatcher(forumLinkDiv, "background-color: #202124; border-color: #2f2f2f; border-bottom-width: 3px; margin-bottom: 0px;", null, null);
      //リンクに触れた時の背景色色
      classCSSPatcher(forumLinkDiv, "background-color: #383838 !important;", "hover", null);
      //投稿のタイトル以外の文字色
      classCSSPatcher(forumLinkDiv.find("a"), "color: #bbbbbb;", null, null);
      //投稿のタイトルの文字色
      classCSSPatcher(forumLinkDiv.find("a > div:nth-child(1) > div:nth-child(1)"), "color: #e8e8e8;", null, null);
      //投稿のタグ
      classCSSPatcher(forumLinkDiv.find("a > div:nth-child(2) > ul > li"), "background-color: #ffffff0d;", null, null);
      //次へボタンなどにダークモードダークモード適用
      classCSSPatcher($("[role=main] > ul > li > button"), "background-color: #222222; color:#6187ff;", null, null);

      //(検索用)検索結果の件数の文字色にダークモード適用
      if (path.match(/search/)) {
        forumListTitleDiv.find("div").eq(3).css("color", "#FFF");
      }
    }

    if (!(path.match(/new/))) {
      /* 右側の部分にダークモード適用(フォーラム投稿ページ以外) */
      //検索窓の色を変更
      classCSSPatcher($("form > div > input"), "color: #FFFFFF; background-color: #222222; border-color: #404040;", null, null);

      //カテゴリーから探すの部分にダークモード適用
      const findbyTagDiv = $("[role=complementary] > div:nth-child(3)");
      //全体の背景色と境界線の色を変更
      classCSSPatcher(findbyTagDiv, "background-color: #222222; border-color: #404040;", null, null);
      //「カテゴリーから探す」と書いている部分にダークモード設定
      classCSSPatcher(findbyTagDiv.find("div:nth-child(1)"), "border-color: #404040", null, null);
      classCSSPatcher(findbyTagDiv.find("div > h2"), "color: #FFFFFF", null, null);
      //タグのジャンルの名前の背景色と線の色を変更
      classCSSPatcher(findbyTagDiv.find("div > div > h3"), "color: #FFFFFF", null, null);
      classCSSPatcher(findbyTagDiv.find("div > div > h3"), "background-color: #e8e8e80d;", "before", null);
      //各タグのボタンにダークモード適用
      classCSSPatcher(findbyTagDiv.find("div > div > div > div > a"), "background-color: #2b2c2f; border-color: #6b6b6b;", null, null);
    }
  }

  static lessonListPage() {
    console.log("Ny0bi_Tool: Detect lesson list page");
    const path = location.pathname;

    //各授業のリンクの部分にダークモード適用
    const lesson = $("[role=main] > div > a > div");
    classCSSPatcher(lesson, "background-color: #202124; color: #FFFFFF; border-color: #2f2f2f;", null, null);
    //触れた時の背景色を変更
    classCSSPatcher(lesson, "background-color: #383838", "hover", null);

    //ページタイトルの文字色を変更
    classCSSPatcher($("[role=main] > div > h1"), "color: #e8e8ff;", null, null);

    if (!(path.match(/search/))) {
      //必修授業・課外授業の選択の部分にダークモード適用(授業一覧のページのみ)
      const selectWhenLesson = $("[role=main] > div > ul").eq(0);
      classCSSPatcher(selectWhenLesson, "background-color: #202124; border-color: #2f2f2f;", null, 2);
      classCSSPatcher(selectWhenLesson.find("a"), "color: #ffffffcc;", "hover", null);
      classCSSPatcher(selectWhenLesson.find("a"), "color: #ffffffcc;", "visited", null);
      //もっと見るの部分にダークモード適用(授業一覧のページのみ)
      const seeMore = $("[role=main] > div:nth-child(2) > div");
      classCSSPatcher(seeMore, "background-color: #202124;", null, 2);
      const seeMoreButton = seeMore.find("button");
      classCSSPatcher(seeMoreButton, "background-color: #505050; border-color: #cad7ff; color: #cad7ff;", null, null);
    } else {
      //検索結果の部分にダークモード適用
      const searchResults = $("[role=main] > div:nth-child(2) > div");
      classCSSPatcher(searchResults, "background-color: #202124; border-color: #8c8c8c;", null, 2);
      classCSSPatcher(searchResults.find("div > div:nth-child(3) > span:nth-child(1)"), "color: #FFF;", null, null);
    }
    //検索系のところにダークモード適用
    const rightContents = $("[role=complementary] > div");
    //検索窓をダークにする
    classCSSPatcher(rightContents.find("input"), "color: #FFFFFF; background-color: #222222; border-color: #404040;", null, null);
    //タグのボタンをダークにする
    classCSSPatcher(rightContents.find("div > ul > li"), "background-color: #202124;", null, null);
    //学習を効果的に行えるよう〜(略)の部分にダークモードを適用
    const userInfo = rightContents.find("div:nth-child(2)").eq(0);
    classCSSPatcher(userInfo, "background-color: #202124; border-color: #8c8c8c;", null, 2);
    classCSSPatcher(userInfo.find("div:nth-child(1)"), "background-color: #202124; color: #e8e8e8;", null, null);
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