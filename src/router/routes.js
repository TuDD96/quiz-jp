// page
const p = (path) => {
  return () => import(`@/pages/${path}.vue`).then((m) => m.default || m);
};

// page layout
const pl = (path) => {
  return () => import(`@/layouts/${path}.vue`).then((m) => m.default || m);
};

export default [
  {
    path: "/",
    name: "ListQuiz",
    components: {
      default: p("ListQuiz"),
      header: pl("MainHeader"),
      footer: pl("MainFooter"),
    },
    meta: {
      requiresAuth: false,
      title: "List Quiz",
    },
  },
  {
    path: "/quiz/:id",
    name: "QuizPage",
    components: {
      default: p("QuizPage"),
      header: pl("MainHeader"),
      footer: pl("MainFooter"),
    },
    meta: {
      requiresAuth: false,
      title: "Quiz Page",
    },
  },
  {
    path: "/quiz/multiple/:id",
    name: "QuizPageMultiple",
    components: {
      default: p("QuizPageMultiple"),
      header: pl("MainHeader"),
      footer: pl("MainFooter"),
    },
    meta: {
      requiresAuth: false,
      title: "Quiz Page Multiple",
    },
  },
  {
    path: "/upload-csv",
    name: "UploadCsv",
    components: {
      default: p("UploadCsvPage"),
      header: pl("MainHeader"),
      footer: pl("MainFooter"),
    },
    meta: {
      requiresAuth: false,
      title: "Upload Csv",
    },
  },
  {
    path: "/hiragana",
    name: "HiraganaPage",
    components: {
      default: p("HiraganaPage"),
      header: pl("MainHeader"),
      footer: pl("MainFooter"),
    },
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    components: {
      default: p("LoginPage"),
      header: pl("MainHeader"),
      footer: pl("MainFooter"),
    },
    meta: {
      requiresVisitor: false,
    },
  },
];
