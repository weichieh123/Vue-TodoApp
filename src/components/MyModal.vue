<template id="MyModal">
  <div class="modal-mask">
    <div class="modal-container" @click.self="$emit('toggle')">
        <div class="modal-header">{{title}}</div>
        <div class="modal-body">
          <input
            type="text"
            :ref="modalref"
            v-bind:value="this.targetTask"
            v-on:input="updateTask($event.target.value)"           
            @keyup.enter="$emit('submit',submitTarget($event))"
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
            {{this.nowStatus}}
          </button>
          <div class="dropdown-menu" aria-labelledby="fiterStatusBtn">
            <a
              class="dropdown-item"
              value="todo"
              @click="updateStatus('todo')"
              >Todo</a
            >
            <a
              class="dropdown-item"
              value="inProgress"
              @click="updateStatus('inProgress')"
              >in Progress</a
            >
            <a
              class="dropdown-item"
              value="completed"
              @click="updateStatus('completed')"
              >Completed</a
            >
          </div>
        </div>
        <small>press 'enter' to submit your task</small>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "MyModal",
  props: ["title", "modalref", "targetTask", "targetStatus", "editedTitle", "editedIndex"],
  data(){
    return {
      nowStatus: this.targetStatus
    }
  },
  methods: {
    updateTask(val){
      if(this.modalref==='inputForAdd')
        this.$emit('input', val);
      else (this.modalref==='inputForEdit')
        this.$emit('updateTask', val);
    },
    updateStatus(val){
      if(this.modalref==='inputForAdd'){
        this.$emit('updateStatus', val);
        this.nowStatus = val
        // console.log('updateStatus', val, this.nowStatus, this.targetStatus)
      }
      else (this.modalref==='inputForEdit')
        this.$emit('updateStatus', val);
        this.nowStatus = val
        // console.log('modal status', this.targetStatus, this.nowStatus)
    },
    submitTarget(event){
      if(this.modalref==='inputForAdd')
        return "";
      else (this.modalref==='inputForEdit')
        return event.target.value
    }
  },
  watch: {
    targetStatus: function(){
      this.nowStatus = this.targetStatus
    }
  },
}
</script>
<style lang="scss" scoped>
  input[type="text"] {
    width: 70%;
  }
</style>