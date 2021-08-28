function applyDarkNewHomeCentor() {
  $("body").css({ "background-color": "#000", "color": "#e8e8e8" });
  const path = location.pathname;
  if(path.match(/home/)) {
    applyDarkNewHomePage();
  } else if (path.match(/questions/)) {
    applyDarkForumPage();
  }
}

function applyDarkNewHomePage() {
  console.log("Ny0bi_Tool:load applyDarkNewHomePage()");
}

function applyDarkForumPage() {
  console.log("Ny0bi_Tool:load applyDarkForumPage()");
  const path = location.pathname;

  /* 旧ホーム用の関数から移植 */
  if (path.match(/questions\/\d+/)) {
    /* スレッドのページにダークモード適用 */
    const topDiv = $("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(1)");
    //タイトルの文字色を変更
    topDiv.find("h1").css("color", "#e8e8ff");
    //ガイドを見るボタンにダークモード適用
    topDiv.find("div > button").css("background-color", "#2b2c2f;");
    //表示する投稿を変更する部分の、文字色を変更
    topDiv.find("ul > li > a").css("color", "#FFFFFF");

    //コメント数やタグなどが書かれている部分にダークモード適用
    const postInfo = $("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)");
    postInfo.css({ "background-color": "#202124", "border-color": "#404040" });
    postInfo.find("div > div > ul > li").css("background-color", "#ffffff0d");

    //スレッドの中身にダークモード適用
    const threads = $("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2) > div:not(:first-child)");
    //質問者の名前と登校時刻の部分にダークモード適用
    classCSSPatcher(threads.find("div:nth-child(2) > div").eq(0), "color: rgb(255 255 255 / 83%);");
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
          classCSSPatcher(threedBody, "background-color: #607d8b; color:#FFFFFF;");
        } else if (threedBody.css("background-color") == "rgb(255, 255, 255)") {
          //他の人の投稿の色
          classCSSPatcher(threedBody, "background-color: #01579b; color:#FFFFFF;");
        } else if (threedBody.css("background-color") == "rgb(255, 247, 149)" || threedBody.css("background-color") == "rgb(255, 242, 78)") {
          //運営と先生の投稿の色
          classCSSPatcher(threedBody, "background-color: #1b5e20; color:#FFFFFF;");
        }
      }
    }

    //返信を送る部分にダークモード適用
    const replayArea = $("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(3)");
    classCSSPatcher(replayArea, "background-color: #202124;");
    classCSSPatcher(replayArea.find("textarea"), "background-color: #202124; color: #e8e8e8;");
    classCSSPatcher(replayArea.find("div > div:nth-child(1) > button"), "background-color: #2b2c2f; border-color: #424242;");
  } else if (path.match(/new/)) {
    /* フォーラムに投稿を行うページにダークモード適用 */

    //ページタイトルにダークモード適用
    classCSSPatcher($("form > div > h1"), "color: #e8e8ff;");
    //コメントの内容を入力する部分ににダークモード適用
    classCSSPatcher($("form > div > div:nth-child(2) > div:nth-child(1)"), "background-color: #202124; color: #FFFFFF; border-color: #424242;", null, 2);
    classCSSPatcher($("textarea"), "background-color: #202124; color: #e8e8e8;");
    classCSSPatcher($("form > div > div:nth-child(2) > div:nth-child(2)"), "background-color: #202124; color: #FFFFFF; border-color: #424242;", null, 2);
    //画像をアップロードボタンにダークモード適用
    classCSSPatcher($("form > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > button"), "background-color: #2b2c2f; border-color: #424242;");
  } else {
    /* スレッド一覧のページで、タイトル〜表示する投稿を変更する部分にダークモード適用 */

    const mainDiv = $("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(1)");
    //タイトルの文字色を変更
    classCSSPatcher(mainDiv.find("h1"), "color: #e8e8ff;");
    //ガイドを見るボタンの色を変更
    classCSSPatcher(mainDiv.find("button"), "background-color: #2b2c2f;");
    //フォーラムの履歴の部分の色を変更
    classCSSPatcher(mainDiv.find("div").eq(2), "background-color: #2c2c2c; color: #e8e8e8;", null, 2);
    classCSSPatcher(mainDiv.find("p"), "color: #e8e8e8;");

    //表示する投稿を変更する部分の、文字色を変更
    mainDiv.find("ul > li > a").css("color", "#FFFFFF");

    /* 各投稿の一覧の部分にダークモードを適用 */
    //投稿リストの一番上の境界線を削除
    classCSSPatcher($("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2)"), "border-style: none;");
    //一番上のリストの名前にダークモード適用
    const forumListTitleDiv = $("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)");
    //全体の背景色や境界線関連の色
    classCSSPatcher(forumListTitleDiv, "background-color: #202124; border-color: #2f2f2f;");

    //タイトルの文字色(検索以外のページ用)
    if (!path.match(/search/)) {
      classCSSPatcher(forumListTitleDiv.find("h2"), "color: #FFFFFF");
    }

    //フォーラムの各投稿のリンクにダークモード適用 
    const forumLinkDiv = $("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)");
    //全体の背景色や境界線関連の色
    classCSSPatcher(forumLinkDiv, "background-color: #202124; border-color: #2f2f2f; border-bottom-width: 3px; margin-bottom: 0px;");
    //リンクに触れた時の背景色色
    classCSSPatcher(forumLinkDiv, "background-color: #383838;", "hover");
    //投稿のタイトル以外の文字色
    classCSSPatcher(forumLinkDiv.find("a"), "color: #bbbbbb;");
    //投稿のタイトルの文字色
    classCSSPatcher(forumLinkDiv.find("a > div:nth-child(1)"), "color: #e8e8e8;");
    //投稿のタグ
    classCSSPatcher(forumLinkDiv.find("a > div:nth-child(2) > ul > li"), "background-color: #ffffff0d;");
    //次へボタンなどにダークモードダークモード適用
    classCSSPatcher($("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > ul > li > button"), "background-color: #222222; color:#6187ff;");

    //(検索用)検索結果の件数の文字色にダークモード適用
    if (path.match(/search/)) {
      forumListTitleDiv.find("div").eq(3).css("color", "#FFF");
    }
  }

  if (!(path.match(/new/))) {
    /* 右側の部分にダークモード適用(フォーラム投稿ページ以外) */
    //検索窓の色を変更
    classCSSPatcher($("form > div > input"), "color: #FFFFFF; background-color: #222222; border-color: #404040;");

    //カテゴリーから探すの部分にダークモード適用
    const findbyTagDiv = $("#root > div > div:nth-child(2) > div > div > div:nth-child(2) > div:nth-child(3)");
    //全体の背景色と境界線の色を変更
    classCSSPatcher(findbyTagDiv, "background-color: #222222; border-color: #404040;");
    //「カテゴリーから探す」と書いている部分にダークモード設定
    classCSSPatcher(findbyTagDiv.find("div:nth-child(1)"), "border-color: #404040");
    classCSSPatcher(findbyTagDiv.find("div > h2"), "color: #FFFFFF");
    //タグのジャンルの名前の背景色と線の色を変更
    classCSSPatcher(findbyTagDiv.find("div > div > h3"), "color: #FFFFFF");
    classCSSPatcher(findbyTagDiv.find("div > div > h3"), "background-color: #e8e8e80d;", "before");
    //各タグのボタンにダークモード適用
    classCSSPatcher(findbyTagDiv.find("div > div > div > div > a"), "background-color: #2b2c2f; border-color: #6b6b6b;");
  }
}
