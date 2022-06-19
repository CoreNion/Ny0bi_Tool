import $ from "jquery"
import Module from "module";

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
 * headにstyleを注入する関数
 * @param {String} selector セレクター
 * @param {string} style Style
 */
export function headStyleInjector(selector: String, style: String) {
  $("head").append(`<style>${selector} { ${style} }</style>`);
}

/**
 * css(style)のrequire(module)を保存する連想配列
 * 
 * (updateInjectStyle用)
 *  */
let requireStorage: { [key: string]: Module | null } = {
  mainPage: null, subPage: null
};

/**
 * 現在のstyleを保存し、過去のstyleを削除する関数
 * @param css cssのrequire(module)
 * @param main メインページ用であるか、サブページ用であるか
 */
export function updateInjectStyle(css: Module, main: boolean) {
  /* style-loaderの型定義は存在しないためとりあえず@ts-ignore */

  if (main) {
    if (!(requireStorage.mainPage == null)) {
      // 保存されているStyleの利用状態を解除
      // @ts-ignore
      requireStorage.mainPage.unuse();

      if (!(requireStorage.subPage == null)) {
        // @ts-ignore
        requireStorage.subPage.unuse();

        // 残っているサブページのstyleを削除
        requireStorage.subPage = null;
      }
    }
    // 現在のメインページのStyleを保存
    requireStorage.mainPage = css;
  } else {
    // 上記の処理をサブページのみ実行
    if (!(requireStorage.subPage == null)) {
      // @ts-ignore
      requireStorage.subPage.unuse();
    }

    requireStorage.subPage = css;
  }

  console.log(requireStorage);
}