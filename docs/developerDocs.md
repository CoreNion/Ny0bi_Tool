# Welcome to Ny0bi Tool's Document(β)!!

このDocsでは、主にNy0bi Dark Toolの仕組みを説明します。

# manifest.jsonの解説

manifest.jsonはChrome拡張機能の設定を記述するjsonファイルです。

ここではNy0bi Toolで使うオプションについて解説します。

`content_scripts`で、コンテンツスクリプトを利用することを宣言しています。

`"all_frames": true`で、`matches`に当てはまるURLのiframe**全て**でこの拡張機能を発動するよう設定しています。

N予備校は、テキストの本文はiframeで読み込む仕様になっているため、このオプションにより、親ページからiframeを読む必要がなくなります。

# 全体的な解説

## jQueryについて

Ny0bi Toolでは、**jQuery**を利用しています！

理由は、jQueryを利用することによって、Java ScriptでHTML Elementを変更することが簡単になるからです。

例えば、`body`のbackground-colorとcolorを変更するとします。

jQueryなしの場合、

```Javascript
const body = document.getElementByID('body');
body.style.backgroundColor = "#000000";
body.style.color = "#FFFFFF";
```

のようになります。

量が少ない場合だとあまり問題になりませんが、これが量が多くかったり、複雑な位置や仕組みがある所のHTML Elementを操作する場合には、大きな負担がかかります。

ですが、jQueryを使った場合には、

```Javascript
const body = $("body");
body.css({ "background-color": "#000000", "color": "#FFFFFF" });
```

こうなります。

かなり直感的にCSSを操作できます！また、この場合はCSSですが、他の中のデータもほぼ同様の方法で取れます！

これだと、コーディング時の負担が大きく減ります。

また、`find()`を使えば、条件に一致するもの全てに適用することも出来ます！

## ソースコードについて

現在のバージョンでは、ソースコードは2つに分けています。

### afterLoad.js

afterLoad.jsでは、ページが画像も含め完全に読み込み終わってから読み込むコードを入れています。

### afterEvent.js

afterEvent.jsでは、ボタンを押した時などに出るダイアログなどに読み込むようなコードを入れています。

クラス・IDが難読化されていたり、クラスでの設定が困難な場合は、イベント後に要素にダークモードを設定するような措置をとっています。

一部headにstyleを追加している部分がありますが、これはCSSの擬似要素にダークモードを適用する必要がある場合や、.cssで設定できなかった場合は、headに追加しています。