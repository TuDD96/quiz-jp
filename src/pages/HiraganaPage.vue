<template>
  <div class="quiz-page">
    <div v-for="(col, index) in hiragana" :key="index" class="row-text">
      <input v-model="rowSelected" type="checkbox" name="" :value="index" />
      <span v-for="(item, idx) in col" :key="idx" class="item">
        {{ item.text_jp }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rowSelected: [],
      hiragana: [
        [
          {
            text_jp: "あ",
            romanji: "a",
          },
          {
            text_jp: "い",
            romanji: "i",
          },
          {
            text_jp: "う",
            romanji: "u",
          },
          {
            text_jp: "え",
            romanji: "e",
          },
          {
            text_jp: "お",
            romanji: "o",
          },
        ],
        [
          {
            text_jp: "か",
            romanji: "ka",
          },
          {
            text_jp: "き",
            romanji: "ki",
          },
          {
            text_jp: "く",
            romanji: "ku",
          },
          {
            text_jp: "け",
            romanji: "ke",
          },
          {
            text_jp: "こ",
            romanji: "ko",
          },
        ],
        [
          {
            text_jp: "さ",
            romanji: "sa",
          },
          {
            text_jp: "し",
            romanji: "shi",
          },
          {
            text_jp: "す",
            romanji: "su",
          },
          {
            text_jp: "せ",
            romanji: "se",
          },
          {
            text_jp: "そ",
            romanji: "so",
          },
        ],
        [
          {
            text_jp: "た",
            romanji: "ta",
          },
          {
            text_jp: "ち",
            romanji: "chi",
          },
          {
            text_jp: "つ",
            romanji: "tsu",
          },
          {
            text_jp: "て",
            romanji: "te",
          },
          {
            text_jp: "と",
            romanji: "to",
          },
        ],
        [
          {
            text_jp: "な",
            romanji: "na",
          },
          {
            text_jp: "に",
            romanji: "ni",
          },
          {
            text_jp: "ぬ",
            romanji: "nu",
          },
          {
            text_jp: "ね",
            romanji: "ne",
          },
          {
            text_jp: "の",
            romanji: "no",
          },
        ],
        [
          {
            text_jp: "は",
            romanji: "ha",
          },
          {
            text_jp: "ひ",
            romanji: "hi",
          },
          {
            text_jp: "ふ",
            romanji: "fu",
          },
          {
            text_jp: "へ",
            romanji: "he",
          },
          {
            text_jp: "ほ",
            romanji: "ho",
          },
        ],
        [
          {
            text_jp: "ま",
            romanji: "ma",
          },
          {
            text_jp: "み",
            romanji: "mi",
          },
          {
            text_jp: "む",
            romanji: "mu",
          },
          {
            text_jp: "め",
            romanji: "me",
          },
          {
            text_jp: "も",
            romanji: "mo",
          },
        ],
        [
          {
            text_jp: "や",
            romanji: "ya",
          },
          {
            text_jp: "",
            romanji: "yi",
          },
          {
            text_jp: "ゆ",
            romanji: "yu",
          },
          {
            text_jp: "",
            romanji: "ye",
          },
          {
            text_jp: "よ",
            romanji: "yo",
          },
        ],
        [
          {
            text_jp: "ら",
            romanji: "ra",
          },
          {
            text_jp: "り",
            romanji: "ri",
          },
          {
            text_jp: "る",
            romanji: "ru",
          },
          {
            text_jp: "れ",
            romanji: "re",
          },
          {
            text_jp: "ろ",
            romanji: "ro",
          },
        ],
        [
          {
            text_jp: "わ",
            romanji: "wa",
          },
          {
            text_jp: "",
            romanji: "wi",
          },
          {
            text_jp: "",
            romanji: "wu",
          },
          {
            text_jp: "",
            romanji: "we",
          },
          {
            text_jp: "を",
            romanji: "o",
          },
        ],
        [
          {
            text_jp: "",
            romanji: "a",
          },
          {
            text_jp: "",
            romanji: "i",
          },
          {
            text_jp: "",
            romanji: "u",
          },
          {
            text_jp: "",
            romanji: "e",
          },
          {
            text_jp: "ん",
            romanji: "n",
          },
        ],
        [
          {
            text_jp: "が",
            romanji: "ga",
          },
          {
            text_jp: "ぎ",
            romanji: "gi",
          },
          {
            text_jp: "ぐ",
            romanji: "gu",
          },
          {
            text_jp: "げ",
            romanji: "ge",
          },
          {
            text_jp: "ご",
            romanji: "go",
          },
        ],
        [
          {
            text_jp: "ざ",
            romanji: "za",
          },
          {
            text_jp: "じ",
            romanji: "zi",
          },
          {
            text_jp: "ず",
            romanji: "zu",
          },
          {
            text_jp: "ぜ",
            romanji: "ze",
          },
          {
            text_jp: "ぞ",
            romanji: "zo",
          },
        ],
        [
          {
            text_jp: "だ",
            romanji: "da",
          },
          {
            text_jp: "ぢ",
            romanji: "di",
          },
          {
            text_jp: "づ",
            romanji: "du",
          },
          {
            text_jp: "で",
            romanji: "de",
          },
          {
            text_jp: "ど",
            romanji: "do",
          },
        ],
        [
          {
            text_jp: "ば",
            romanji: "ba",
          },
          {
            text_jp: "び",
            romanji: "bi",
          },
          {
            text_jp: "ぶ",
            romanji: "bu",
          },
          {
            text_jp: "べ",
            romanji: "be",
          },
          {
            text_jp: "ぼ",
            romanji: "bo",
          },
        ],
        [
          {
            text_jp: "ぱ",
            romanji: "pa",
          },
          {
            text_jp: "ぴ",
            romanji: "pi",
          },
          {
            text_jp: "ぷ",
            romanji: "pu",
          },
          {
            text_jp: "ぺ",
            romanji: "pe",
          },
          {
            text_jp: "ぽ",
            romanji: "po",
          },
        ],
      ],
    };
  },
};
</script>

<style scoped>
.quiz-page {
  margin: auto;
  width: 50%;
  margin-top: 10px;
  background: #ced4da;
  padding: 30px;
  border-radius: 10px;
  min-width: 380px;
}
.question {
  height: 250px;
  text-align: center;
  padding: 20px;
  font-size: 75px;
}
.anwer {
  display: flex;
}
#anwer {
  margin: auto;
  width: 150px;
}
.title-quiz {
  font-weight: bold;
  font-size: 18px;
}
.item {
  width: 50px;
  font-size: 18px;
  font-weight: bold;
}
.row-text {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #adb5bd;
  padding: 5px 0;
}
</style>
