<template>
  <tr class="align-middle" id="TaskItem">
    <td class="font-weight-bold">{{task.id}}</td>
    <td>{{task.title}}</td>
    <td>
      <button
        v-if="task.status==='todo'"
        type="button"
        :class="className"
        @click.self="$emit('status')"
      >Todo</button>
      <button
        v-else-if="task.status==='inProgress'"
        type="button"
        :class="className"
        @click.self="$emit('status')"
      >in Progress</button>
      <button
        v-else-if="task.status==='completed'"
        type="button"
        :class="className"
        @click.self="$emit('status')"
      >Completed</button>
    </td>
    <td>
      <v-btn class="edit-btn" @click="$emit('toggle'); $emit('edited')">
        <v-icon>mdi-lead-pencil</v-icon>
      </v-btn>
    </td>
    <td>
      <v-btn class="del-btn"
      @click="$emit('remove')">
        <v-icon color="blue">mdi-delete</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script>
export default {
  name: "TaskItem",
  props: ["task"],
  computed: {
    className() {
      let classes = ["btn"];
      if(this.task.status==='todo'){
        classes.push("btn-outline-dark");
      }
      else if(this.task.status==='inProgress'){
        classes.push("btn-outline-warning");
      }
      else if(this.task.status==='completed'){
        classes.push("btn-outline-success");
      }
      return classes.join(" ");
    },
  },
}
</script>