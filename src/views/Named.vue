<template id="Named">
  <div class="container named">
    <p class="named-title">請輸入姓名:</p>
    <div class="d-flex mx-auto col-8 align-items-center">
      <div class="col-10">
        <input
          ref="inputForName"
          type="text"
          placeholder="What's your name?"
          v-model="userName"
          @keyup.enter="handleSubmit"
        />
      </div>
      <div class="col-2">
        <button class="btn btn-outline-info" @click="handleSubmit">
          送出
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Named",
  data() {
    return {
      userName: "",
      tasks: [
        {
          id: 1,
          title: "Make todo list",
          completed: false,
          inProgress: false,
        },
        {
          id: 2,
          title: "Go skydiving",
          completed: false,
          inProgress: true,
        },
        {
          id: 3,
          title: "Go walking",
          completed: false,
          inProgress: true,
        },
        {
          id: 4,
          title: "Buy drinks",
          completed: false,
          inProgress: true,
        },
        {
          id: 5,
          title: "Clean house",
          completed: false,
          inProgress: true,
        },
        {
          id: 6,
          title: "Trip prepare",
          completed: false,
          inProgress: true,
        },
      ],
    };
  },
  methods: {
    handleSubmit() {
      this.$router.push({
        name: "TaskList",
        params: { userName: this.userName, tasks: this.tasks },
      });
    },
  },
  mounted() {
    this.$refs.inputForName.focus();
  }
};
</script>