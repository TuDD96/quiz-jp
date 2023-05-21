<template>
  <div>
    <div class="card text-center">
      <div class="card-header">
        <a href="#demo-modal" style="float: left">{{ title }}</a>
        <div>
          <select
            v-model="typeSelect"
            style="float: right"
            @change="selectType()"
          >
            <option value="">Random</option>
            <option value="0">Vi</option>
            <option value="1">Ja</option>
          </select>
          <div style="float: right; margin-right: 10px">
            <label for="showHira" style="margin-right: 5px">showHira</label>
            <input id="showHira" v-model="showHira" type="checkbox" />
          </div>
        </div>
      </div>
      <div class="card-body">
        <div v-if="typeTest === 1" class="question">
          <h6 v-if="showHira">{{ questionSelect.text_jp }}</h6>
          <h1>
            {{ questionSelect.text_kanji }}
            <label
              href="#"
              style="font-size: 23px; margin-left: 10px; cursor: pointer"
              @click="textToSpeech(questionSelect.text_kanji)"
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
              @click="textToSpeech(questionSelect.text_kanji)"
            >
              <i class="fa fa-volume-up" aria-hidden="true"></i>
            </label>
          </h1>
        </div>
        <div class="anwer">
          <div id="anwer" class="input-group mb-3">
            <input
              v-model="answer"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': !isTrue }"
              placeholder="Answer"
              @keyup.enter="checkAnswer()"
            />
            <div class="input-group-append">
              <button class="btn btn-info" type="button" @click="checkAnswer()">
                <i class="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="next">
          <button type="button" class="btn btn-primary" @click="checkFunc()">
            Check
          </button>
          <button
            type="button"
            style="margin-left: 15px"
            class="btn btn-primary"
            @click="next()"
          >
            Next
          </button>
        </div>
      </div>
      <div class="card-footer text-muted">Created By TuDD</div>
    </div>

    <div id="demo-modal" class="modal">
      <div class="modal__content">
        <div style="border-bottom: 1px solid #adb5bd; height: 32px">
          <label>{{ title }}</label>
        </div>
        <div class="example" style="overflow-y: auto; height: 90%">
          <div v-for="(question, index) in listQuestionUse" :key="index">
            <div style="display: flex; flex-direction: row">
              <div class="cb-question-select">
                <input
                  :id="`cb-question_${index}`"
                  type="checkbox"
                  :checked="question.select"
                  @change="toggleQuestion(index)"
                />
              </div>
              <div class="box-text" style="width: 60%">
                <div>
                  <label :for="`cb-question_${index}`">Kanji</label>:
                  <span>
                    <b>{{ question.text_kanji }}</b>
                  </span>
                </div>
                <div>
                  <label :for="`cb-question_${index}`">Hira</label>:
                  <span>
                    <b>{{ question.text_jp }}</b>
                  </span>
                </div>
              </div>
              <div>{{ question.text_vi }}</div>
            </div>
            <hr />
          </div>
        </div>
        <div class="modal__footer">
          <button
            style="margin-left: 15px"
            type="button"
            class="btn btn-sm btn-primary"
            @click="toggleAll()"
          >
            Check All
          </button>
          <a
            style="margin-left: 15px"
            type="button"
            class="btn btn-sm btn-primary"
            @click="saveListQuestionUse()"
          >
            Save
          </a>
        </div>
        <a href="#" class="modal__close">&times;</a>
      </div>
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
    let clickTimer = null;
    this.initData();
    this.elm = window;
    this.funcHandle = (event) => {
      if (event.keyCode === 38) {
        this.checkFunc();
      }
      if (event.keyCode === 39) {
        this.next();
      }
      if (event.keyCode === 40) {
        this.textToSpeech(this.questionSelect.text_kanji);
      }
    };
    this.elm.removeEventListener("keydown", this.funcHandle);
    this.elm.addEventListener("keydown", this.funcHandle);

    this.elm.addEventListener("click", (e) => {
      if (clickTimer == null) {
        clickTimer = setTimeout(function () {
          clickTimer = null;
        }, 200);
      } else {
        clearTimeout(clickTimer);
        clickTimer = null;
        this.next();
      }
    });
  },
  unmounted() {
    this.elm.removeEventListener("keydown", this.funcHandle);
  },
  methods: {
    async initData() {
      const data = await FirestoreService.get("quizs", this.$route.params.id);
      this.questions = data.questions;
      this.listQuestionUse = this.questions.map((q) => {
        return { ...q, select: true };
      });
      this.questionSelect = this.get_random(this.questions);
      this.title = data.title;
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
    selectType() {
      if (this.typeSelect !== "") {
        this.typeTest = parseInt(this.typeSelect);
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
    textToSpeech(text) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = text;
      utterance.lang = "ja-JP";
      speechSynthesis.speak(utterance);
    },
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
  min-height: 85px;
  /* height: 250px; */
  /* text-align: center;
  padding: 20px;
  font-size: 75px; */
}
.anwer {
  display: flex;
  margin-bottom: 15px;
}
#anwer {
  margin: auto;
  width: 250px;
}
.next {
  margin: auto;
  width: 150px;
  display: flex;
  justify-content: center;
}
.title-quiz {
  font-weight: bold;
  font-size: 18px;
}
.card-body {
  margin-top: 150px;
}
.card-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
button:focus,
input:focus {
  outline: 0 !important;
  box-shadow: none;
}
.list-question {
  position: absolute;
  width: 100%;
  height: 80vh;
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
  margin-right: 5px;
}
.box-text label {
  cursor: pointer;
}
</style>
