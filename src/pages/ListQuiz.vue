<template>
  <div style="position: relative; overflow-y: auto">
    <div class="main-list">
      <div class="list-quiz">
        <div v-for="(quiz, index) in quizs" :key="index" class="quiz-item">
          <div>
            <div>
              <input
                :id="`ip-select${quiz.id}`"
                type="checkbox"
                class="ip-select"
                @change="selectQuiz(quiz.id)"
              />
              <label :for="`ip-select${quiz.id}`">{{ quiz.title }}</label>
            </div>
            <button
              v-if="auth"
              class="btn btn-sm btn-danger"
              @click="hidenQuiz(quiz.id)"
            >
              <i class="fa fa-trash" />
            </button>
          </div>
        </div>
        <div style="height: 80px"></div>
      </div>
    </div>
  </div>
  <div
    style="
      height: 80px;
      padding-top: 10px;
      background: #5b5b5b;
      width: 100%;
      position: absolute;
      bottom: 0;
    "
  >
    <button
      id="next-button"
      :class="{ 'btn-disabled': listQuizSelect.length === 0 }"
      :disabled="listQuizSelect.length === 0"
      @click="goToQuizMultiple()"
    >
      Start
    </button>
  </div>
</template>

<script>
import FirestoreService from "@/services/firestore";

export default {
  data() {
    return {
      quizs: [],
      auth: false,
      listQuizSelect: [],
    };
  },
  created() {
    if (this.$route.query.user === "tudd") {
      this.auth = true;
    }
    this.initData();
  },
  methods: {
    async initData() {
      const data = await FirestoreService.getAll("quizs");
      this.quizs = data;
    },
    goToQuiz(id) {
      this.$router.push({ name: "QuizPage", params: { id: id } });
    },
    goToQuizMultiple() {
      this.$router.push({
        name: "QuizPageMultiple",
        params: { id: this.listQuizSelect.join("_") },
      });
    },
    selectQuiz(id) {
      if (!this.listQuizSelect.includes(id)) {
        this.listQuizSelect.push(id);
      } else {
        const index = this.listQuizSelect.indexOf(id);
        if (index !== -1) {
          this.listQuizSelect.splice(index, 1);
        }
      }
    },
    async hidenQuiz(id) {
      const text = "Are You Sure?";
      if (confirm(text) == true) {
        await FirestoreService.update("quizs", id, {
          del_flag: true,
        });
        await this.initData();
      }
    },
  },
};
</script>

<style scoped>
.list-quiz {
  margin: auto;
  width: 50%;
  margin-top: 10px;
  min-width: 380px;
}
.quiz-item {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #adb5bd;
  padding: 10px 7px;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 10px;
}
.quiz-item label {
  cursor: pointer;
}
.quiz-item:hover {
  background: #dee2e6;
}
.ip-select {
  margin-right: 5px;
  cursor: pointer;
}
.main-list {
  max-height: calc(100vh - 132px);
}
button {
  border: none;
  outline: none;
  cursor: pointer;
}
#next-button {
  font-size: 1em;
  display: flex;
  margin: 0 auto;
  background-color: #2196f3;
  color: #ffffff;
  padding: 0.7em 1.8em;
  border-radius: 0.3em;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
  width: 380px;
  justify-content: center;
}
.btn-disabled {
  opacity: 0.5;
}
</style>
