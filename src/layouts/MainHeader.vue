<template>
  <div>
    <ul>
      <li>
        <router-link :to="{ name: 'ListQuiz' }" class="">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'UploadCsv' }" class="">
          Upload Csv
        </router-link>
      </li>
      <!-- <li>
        <router-link :to="{ name: 'HiraganaPage' }"  class="">Hiragana</router-link>
      </li> -->
    </ul>
  </div>
</template>

<script>
export default {
  data() {},
  methods: {
    isActive() {},
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #111;
}

.active {
  background-color: #04aa6d;
}
</style>
