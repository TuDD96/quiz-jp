<template>
  <div class="">
    <div>
      <input id="csv_file" type="file" />
    </div>
    <div>
      <button @click="uploadCsv()">Upload</button>
    </div>
  </div>
</template>

<script>
import FirestoreService from "@/services/firestore";

export default {
  data() {},
  methods: {
    async uploadCsv() {
      const csv_file = document.getElementById("csv_file");
      const file = csv_file.files[0];
      const quiz = await FirestoreService.getQuizWithFileName(
        "quizs",
        file.name
      );
      const reader = new FileReader();

      reader.onload = (e) => {
        let data = e.target.result;
        data = data.split("\r\n");
        data.shift();
        data = data.map((item) => {
          const txt = item.split(",");

          return {
            text_jp: txt[0],
            text_kanji: txt[1],
            text_vi: txt[2].replace("|", ", ").replace('"', ""),
            romanji: txt[3],
          };
        });
        const dataUpload = {
          title: file.name,
          del_flag: false,
          questions: data,
          created_at: new Date().getTime(),
        };
        if (quiz.length > 0) {
          dataUpload.created_at = quiz[0].created_at;
          this.log(quiz[0].id);
          FirestoreService.set("quizs", quiz[0].id, dataUpload).then(() => {
            alert("Updated");
          });
        } else {
          FirestoreService.create("quizs", dataUpload).then(() => {
            alert("Success");
          });
        }
      };
      reader.readAsText(file);
    },
  },
};
</script>
