<template id="MyModal">
  <div class="modal-mask">
    <div class="modal-container" @click.self="$emit('toggle')">
      <div class="modal-header">{{ title }}</div>
      <div class="modal-body">
        <div class="col-12 d-flex align-items-center justify-content-between">
          <!-- @keyup.enter="$emit('updateStatus', nowStatus), $emit('submit', submitTarget())" -->
          <input
            type="text"
            :ref="modalref"
            v-bind:value="this.targetTask"
            v-on:input="updateTask($event.target.value)"
            placeholder="What you want to do?"
          />
          <div class="dropdown d-inline">
            <button
              id="nowStatusBtn"
              class="btn btn-outline-info dropdown-toggle ml-1"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ this.nowStatus }}
            </button>
            <div class="dropdown-menu" aria-labelledby="fiterStatusBtn">
              <a
                class="dropdown-item"
                value="todo"
                @click="changeNowStatus('todo')"
                >Todo</a
              >
              <a
                class="dropdown-item"
                value="inProgress"
                @click="changeNowStatus('inProgress')"
                >in Progress</a
              >
              <a
                class="dropdown-item"
                value="completed"
                @click="changeNowStatus('completed')"
                >Completed</a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="col-12 d-flex">
          <button
            ref="submit"
            type="button"
            class="btn btn-info w-25 ml-auto mr-3 text-light fit-content"
            @click="clickHandler"
          >
            Submit
          </button>
          <!-- @keyup.enter="this.$refs.submit.click()" -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyModal",
  props: [
    "title",
    "modalref",
    "targetTask",
    "targetStatus", //newStatus & editedStatus
    "editedTitle",
    "editedIndex",
  ],
  data() {
    return {
      nowStatus: this.targetStatus,
    };
  },
  methods: {
    clickHandler() {
      // $emit('updateStatus', nowStatus), $emit('submit', submitTarget())
      this.$emit("updateStatus", this.nowStatus);
      this.$emit("submit", this.submitTarget());
    },
    updateTask(val) {
      if (this.modalref === "inputForAdd") {
        this.$emit("input", val);
      } else if (this.modalref === "inputForEdit") {
        this.$emit("updateTask", val);
      }
    },
    changeNowStatus(val) {
      this.nowStatus = val;
    },
    submitTarget() {
      if (this.modalref === "inputForAdd") {
        return "";
      } else if (this.modalref === "inputForEdit") {
        return this.$refs.inputForEdit.value;
      }
    },
  },
  watch: {
    targetStatus: function () {
      // console.log('targetStatus', this.targetStatus)
      this.nowStatus = this.targetStatus;
    },
  },
  mounted() {
    this.nowStatus = this.targetStatus;
    // console.log('mounted')
  },
  // updated() {
  //   console.log('updated')
  // },
  // destroyed() {
  //   console.log('destroyed')
  // }
};
</script>
<style lang="scss" scoped>
input[type="text"] {
  width: 340px;
}
#nowStatusBtn {
  height: 40px;
  width: 120px;
  // margin: 5px 0;
}
</style>
