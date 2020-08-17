let cardsArea = document.getElementById("cards-area");
let cardPattern = [0,1,2,3,4,5]; // カードの絵柄種類 （./img の下に 0~5.png として配置）

/** カードを生成する
 * @param {array} cardPattern カード名の配列
 */
function createCards(cardPattern) {
    
    // カードをペアにする (以下デッキと呼ぶ)
    let deck = cardPattern.concat(cardPattern);

    //ユーザーがクリックしたカードを入れる配列
    let clicked_cards = [];

    // デッキをシャッフルする (Fisher–Yates shuffle)
    // シャッフルのアルゴリズム: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    for (let i = deck.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    // デッキをHTMLにとして追加する
    for ( i of deck ) { // カードの枚数だけループ
        const card = document.createElement("div"); // カードは <div> タグとして作成
        card.style = `background-image: url('./img/${i}.png');` // <div> タグの css "background-image" として画像を設定
        card.className = "card facedown"; // card はカードのスタイル用の class, facedown は裏面用スタイルの class.

        // カードをクリックしたら裏面用スタイルを外すイベントを設定
        card.onclick = (e) => {
            e.target.classList.remove("facedown");
            
            //クリックした絵柄を配列にプッシュ
            clicked_cards.push(e.target.style.backgroundImage);
                //配列の値が２つ以上になったら比較して結果を反映。そしてページ更新。
                if(clicked_cards.length > 1){
                    if(clicked_cards[0] === clicked_cards[1]){
                        setTimeout(() => {
                            alert('あたり！');
                            location.reload();
                        },200);
                    }else {
                        setTimeout(() => {
                            alert('はずれ！');
                            location.reload();
                        },200);
                    }
                }
        }
        cardsArea.appendChild(card); // 生成したタグを追加
    }
}

createCards(cardPattern);