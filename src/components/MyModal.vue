<template id="MyModal">
  <div class="modal-mask" >
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
          <small>press 'enter' to submit your task</small>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "MyModal",
  props: ["title", "modalref", "targetTask", "editedTitle", "editedIndex"],
  methods: {
    updateTask(val){
      if(this.modalref==='inputForAdd')
        this.$emit('input', val);
      else (this.modalref==='inputForEdit')
        this.$emit('updateTask', val);
    },
    submitTarget(event){
      if(this.modalref==='inputForAdd')
        return "";
      else (this.modalref==='inputForEdit')
        return event.target.value
    }
  }
}
</script>