<template>
  <div id="display-container">
    <div class="header">
      <div class="number-of-count">
        <span class="number-of-question">
          {{ arrIdxUsed.length }}/{{ listQuestionUse.length }}
        </span>
      </div>
      <div class="title-quiz">
        <a href="#demo-modal">{{ title }}</a>
      </div>
      <div>
        <!-- <img
          src="https://uxwing.com/wp-content/themes/uxwing/download/time-and-date/stopwatch-icon.png"
          width="20px"
        />
        <span class="time-left">10s</span> -->
        Sub
        <label class="switch">
          <input v-model="showHira" type="checkbox" />
          <span class="slider round"></span>
        </label>
      </div>
    </div>
    <div id="container">
      <div v-if="typeTest === 1" class="question">
        <h6 v-if="showHira">{{ questionSelect.text_jp }}</h6>
        <h1>
          {{ questionSelect.text_kanji }}
          <label
            href="#"
            style="font-size: 23px; margin-left: 10px; cursor: pointer"
            @click="textToSpeech(questionSelect)"
          >
            <i class="fa fa-volume-up" aria-hidden="true"></i>
          </label>
        </h1>
      </div>
      <div v-if="typeTest === 0" class="question">
        <h1>
          {{ questionSelect.text_vi }}
          <label
            href="#"
            style="font-size: 23px; margin-left: 10px; cursor: pointer"
            @click="textToSpeech(questionSelect)"
          >
            <i class="fa fa-volume-up" aria-hidden="true"></i>
          </label>
        </h1>
      </div>
      <input
        v-model="answer"
        type="text"
        class="option-div"
        :class="{ 'is-invalid': !isTrue }"
        placeholder="Answer"
        @keyup.enter="checkAnswer()"
      />
    </div>
    <div class="button-control">
      <button id="check-button" @click="checkFunc()">
        Switch to {{ typeTest === 1 ? "vi" : "ja" }}
      </button>
      <button id="next-button" @click="next()">Next</button>
    </div>
  </div>
  <div id="demo-modal" class="modal">
    <div class="modal__content">
      <div class="title-modal">
        <label>{{ title }}</label>
      </div>
      <div class="example" style="overflow-y: auto; height: 85%">
        <div v-for="(question, index) in listQuestionUse" :key="index">
          <div style="display: flex; flex-direction: row">
            <div class="cb-question-select">
              <input
                :id="`cb-question_${index}`"
                type="checkbox"
                :checked="question.select"
                @change="toggleQuestion(index)"
              />
              <label
                href="#"
                style="font-size: 23px; margin-left: 10px; cursor: pointer"
                @click="textToSpeech(question)"
              >
                <i class="fa fa-volume-up" aria-hidden="true"></i>
              </label>
            </div>
            <div class="box-text" style="width: 50%">
              <div>
                <label :for="`cb-question_${index}`">
                  <b style="font-size: 10px">{{ question.text_jp }}</b>
                </label>
              </div>
              <div>
                <label :for="`cb-question_${index}`">
                  <b>{{ question.text_kanji }}</b>
                </label>
              </div>
            </div>
            <div style="line-height: 48px">{{ question.text_vi }}</div>
          </div>
          <hr />
        </div>
      </div>
      <div class="modal__footer">
        <button
          style="margin-left: 15px"
          type="button"
          class="button-example"
          @click="toggleAll()"
        >
          Check All
        </button>
        <a
          style="margin-left: 15px"
          type="button"
          class="button-example"
          @click="saveListQuestionUse()"
        >
          Save
        </a>
      </div>
      <a href="#" class="modal__close">&times;</a>
    </div>
  </div>
</template>

<script>
import FirestoreService from "@/services/firestore";

export default {
  data() {
    return {
      winStrick: 0,
      title: "",
      questions: [],
      listQuestionUse: [],
      answer: "",
      questionSelect: { question: "" },
      typeTest: 0,
      isTrue: true,
      typeSelect: 0,
      arrIdxUsed: [],
      showHira: true,
      elm: null,
      funcHandle: null,
    };
  },
  created() {
    const clickTimer = null;
    this.initData();
    this.elm = window;
    this.funcHandle = (event) => {
      if (event.keyCode === 37) {
        this.showHira = !this.showHira;
      }
      if (event.keyCode === 38) {
        this.checkFunc();
      }
      if (event.keyCode === 39) {
        this.next();
      }
      if (event.keyCode === 40) {
        this.textToSpeech(this.questionSelect);
      }
    };
    this.elm.removeEventListener("keydown", this.funcHandle);
    this.elm.addEventListener("keydown", this.funcHandle);

    // this.elm.addEventListener("click", (e) => {
    //   if (e.target.classList && e.target.classList.contains("slider")) {
    //     return false;
    //   }
    //   if (clickTimer == null) {
    //     clickTimer = setTimeout(() => {
    //       clickTimer = null;
    //     }, 200);
    //   } else {
    //     clearTimeout(clickTimer);
    //     clickTimer = null;
    //     this.next();
    //   }
    // });
  },
  unmounted() {
    this.elm.removeEventListener("keydown", this.funcHandle);
  },
  methods: {
    async initData() {
      const listId = this.$route.params.id.split("_");
      this.log(listId);
      const proms = [];
      listId.map((id) => proms.push(FirestoreService.get("quizs", id)));
      this.log(proms);
      const d = await Promise.all(proms);
      d.map((item) => {
        this.questions = [...this.questions, ...item.questions];
        this.title += ` ${item.title}`;
      });
      this.listQuestionUse = this.questions.map((q) => ({
        ...q,
        select: true,
      }));
      this.questionSelect = this.get_random(this.questions);
    },
    get_random(list) {
      if (this.typeSelect === "") {
        this.typeTest = this.getRandomInt(2);
      }
      if (this.arrIdxUsed.length === this.questions.length) {
        this.arrIdxUsed = [];
      }
      const idx = Math.floor(Math.random() * list.length);
      if (!this.arrIdxUsed.includes(idx)) {
        this.arrIdxUsed.push(idx);

        return list[idx];
      }

      return this.get_random(list);
    },
    next() {
      this.questionSelect = this.get_random(this.questions);
      this.answer = "";
    },
    checkAnswer() {
      let checked = false;
      if (this.typeTest === 1) {
        checked = this.answer.toLowerCase() === this.questionSelect.text_vi;
      }
      if (this.typeTest === 0) {
        checked = this.answer.toLowerCase() === this.questionSelect.text_jp;
        if (!checked) {
          checked =
            this.answer.toLowerCase() === this.questionSelect.text_kanji;
        }
      }
      if (checked) {
        this.isTrue = true;
        this.questionSelect = this.get_random(this.questions);
        this.answer = "";
        this.winStrick++;
      } else {
        this.winStrick = 0;
        this.isTrue = false;
      }
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    selectType(e) {
      if (e.target.checked) {
        this.typeTest = 1;
      } else {
        this.typeTest = 0;
      }
    },
    checkFunc() {
      if (this.typeSelect == 1) {
        this.typeTest = 0;
        this.typeSelect = 0;
      } else if (this.typeSelect == 0) {
        this.typeTest = 1;
        this.typeSelect = 1;
      }
    },
    toggleQuestion(index) {
      this.listQuestionUse[index].select = !this.listQuestionUse[index].select;
    },
    saveListQuestionUse() {
      const listItemUse = this.listQuestionUse.filter(
        (item) => item.select === true
      );
      if (listItemUse.length) {
        this.questions = listItemUse;
        this.arrIdxUsed = [];
        document.querySelector(".modal__close").click();
      } else {
        alert("Can't Save List Question!!!");
      }
    },
    toggleAll() {
      const itemChecked = this.listQuestionUse.find(
        (item) => item.select === false
      );
      if (itemChecked) {
        this.listQuestionUse = this.listQuestionUse.map((q) => {
          return { ...q, select: true };
        });
      } else {
        this.listQuestionUse = this.listQuestionUse.map((q) => {
          return { ...q, select: false };
        });
      }
    },
    textToSpeech(question) {
      let text = question.text_jp;
      if (text.length === 0) {
        text = question.text_kanji;
      }
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = text;
      utterance.lang = "ja-JP";
      speechSynthesis.speak(utterance);
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  height: 100vh;
  background: linear-gradient(184deg, #2196f3, #8e2de2);
}
.start-screen,
.score-container {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
button {
  border: none;
  outline: none;
  cursor: pointer;
}
#start-button,
#restart {
  font-size: 1.3em;
  padding: 0.5em 1.8em;
  border-radius: 0.2em;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.4);
}
#restart {
  margin-top: 0.9em;
}
#display-container {
  background-color: #ffffff;
  width: 95%;
  max-width: 37.5em;
  margin: 20px auto;
  border-radius: 0.6em;
}
.header {
  margin-bottom: 1.8em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.6em;
  border-bottom: 0.1em solid #c0bfd2;
}
.timer-div {
  background-color: #e1f5fe;
  width: 7.5em;
  border-radius: 1.8em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7em 1.8em;
}
.question {
  margin-bottom: 1.25em;
  font-weight: 600;
  text-align: center;
  min-height: 85px;
}
.option-div {
  font-size: 0.9em;
  width: 100%;
  padding: 1em;
  margin: 0.3em 0;
  text-align: left;
  outline: none;
  background: transparent;
  border: 1px solid #c0bfd2;
  border-radius: 0.3em;
}
.option-div:disabled {
  color: #000000;
  cursor: not-allowed;
}
#next-button {
  font-size: 1em;
  margin-top: 1.5em;
  background-color: #2196f3;
  color: #ffffff;
  padding: 0.7em 1.8em;
  border-radius: 0.3em;
  float: right;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
}
#check-button {
  font-size: 1em;
  margin-top: 1.5em;
  background-color: #2196f3;
  color: #ffffff;
  padding: 0.7em 1.8em;
  border-radius: 0.3em;
  float: right;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
}
.button-example {
  font-size: 1em;
  margin-top: 1.5em;
  background-color: #2196f3;
  color: #ffffff;
  padding: 0.7em 1.8em;
  border-radius: 0.3em;
  float: right;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
  line-height: 1em;
  height: 36px;
}
.hide {
  display: none;
}
.incorrect {
  background-color: #ffdde0;
  color: #d32f2f;
  border-color: #d32f2f;
}
.correct {
  background-color: #e7f6d5;
  color: #689f38;
  border-color: #689f38;
}
#user-score {
  font-size: 1.5em;
  color: #ffffff;
}
.button-control {
  display: flex;
  justify-content: space-around;
}

.modal {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(77, 77, 77, 0.7);
  transition: all 0.4s;
}

.modal:target {
  visibility: visible;
  opacity: 1;
}

.modal__content {
  border-radius: 4px;
  position: relative;
  width: 700px;
  max-width: 90%;
  background: #fff;
  padding: 1em 2em;
  height: 80vh;
}
.modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #585858;
  text-decoration: none;
}
.modal__footer {
  height: 50px;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
}
.cb-question-select {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.box-text label {
  cursor: pointer;
}

.switch {
  position: relative;
  display: inline-block;
  width: 35px;
  height: 18px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.title-quiz {
  white-space: nowrap;
  width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

.title-modal {
  border-bottom: 1px solid rgb(173, 181, 189);
  height: 32px;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
