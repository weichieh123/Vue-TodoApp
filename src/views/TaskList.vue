<!-- 列表template -->
<template id="TaskList">
  <div class="container mx-auto">
    <!-- Modal: Add Task -->
    <MyModal
      v-show="showAddModal"
      ref="AddModal"
      :title="'Add new task:'"
      :modalref="'inputForAdd'"
      :targetTask="newTask"
      :targetStatus="newStatus"
      @updateStatus="updateStatus"
      @toggle="toggleAddModal"
      @submit="addTask"
      v-model="newTask"
    />

    <!-- Modal: Edit Task -->
    <MyModal
      v-show="showEditModal"
      ref="EditModal"
      :title="'Edit your task:'"
      :modalref="'inputForEdit'"
      :targetTask="editedTitle"
      :targetStatus="editedStatus"
      @updateStatus="updateStatus"
      @toggle="toggleEditModal"
      @submit="editTask"
      v-model="editedTitle"
    />

    <h2 class="fit-content mx-auto mb-2">Hello! {{ userName }}</h2>
    <div class="col-12 d-flex align-items-center">
      <h2 class="d-inline">My tasks</h2>

      <div class="dropdown d-inline ml-auto mr-3">
        <button
          id="fiterStatusBtn"
          class="btn btn-outline-info dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {{ this.filteredStatus }}
        </button>
        <div class="dropdown-menu" aria-labelledby="fiterStatusBtn">
          <a class="dropdown-item" value="all" @click="filterTasks('all')"
            >All</a
          >
          <a class="dropdown-item" value="todo" @click="filterTasks('todo')"
            >Todo</a
          >
          <a
            class="dropdown-item"
            value="inProgress"
            @click="filterTasks('inProgress')"
            >in Progress</a
          >
          <a
            class="dropdown-item"
            value="completed"
            @click="filterTasks('completed')"
            >Completed</a
          >
        </div>
      </div>
      <button
        type="button"
        class="btn btn-outline-info"
        @click="toggleAddModal"
      >
        Add Task
      </button>
      <div class="input-group fit-content">
        <input v-model="search" type="search" class="w-75 ml-3" placeholder="search task" @keyup.enter="searchTask" />
        <div class="form-outline"></div>
        <button id="search-btn" type="button" class="btn btn-outline-info" @click="searchTask">
          <v-icon>mdi-magnify</v-icon>
        </button>
      </div>
    </div>

    <!-- Table -->
    <table class="table">
      <thead>
        <tr>
          <th class="col-2">#</th>
          <th class="col-3">Task Name</th>
          <th class="col-3">Status</th>
          <th class="col-2">Edit</th>
          <th class="col-2">Remove</th>
        </tr>
      </thead>
      <tbody>
        <TaskItem
          v-for="(task, index) in filteredTasks"
          @remove="removeTask(index)"
          @complete="completeTask(task)"
          @status="changeStatus(task)"
          @toggle="toggleEditModal"
          @edited="editedTask(index)"
          :task="task"
          :key="index"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import MyModal from "../components/MyModal.vue";
import TaskItem from "./TaskItem.vue";
// import _ from 'lodash';

export default {
  name: "TaskList",
  props: {
    tasks: {
      type: Array,
      default: function () {
        return [
          { id: 1, title: "default task", completed: false, inProgress: false },
        ];
      },
    },
    userName: { type: String, default: "" },
  },

  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      newTask: "",
      newStatus: "todo", //child choose value to change
      editedTitle: "123",
      editedIndex: 333,
      editedStatus: "",
      filteredTasks: [...this.tasks],
      filteredStatus: "All",
      myRef: "",
      search: "",
    };
  },
  methods: {
    searchTask(){
      this.filteredTasks = this.tasks.filter((task)=> task.title.toLowerCase().includes(this.search.toLowerCase()));
    },
    updateStatus(val){
      this.newStatus = val;
      // console.log('parent updateStatus', this.newStatus, val)
    }, 
    // updateTask(editedVal) {
    //   this.editedTitle = editedVal;
    // },
    toggleAddModal() {
      this.showAddModal = !this.showAddModal;
      this.myRef = "inputForAdd";
    },
    toggleEditModal() {
      this.showEditModal = !this.showEditModal;
    },
    addTask() {
      if (this.newTask) {
        if (!this.tasks.length) {
          let idNum = 0;
          this.tasks.push({
            title: this.newTask,
            inProgress: (this.newStatus==='todo' ? false : true),
            completed: (this.newStatus==='completed' ? true : false),
            id: idNum + 1,
          });
          this.newTask = "";
          this.showAddModal = !this.showAddModal;
        } else {
          let idNum = this.tasks[this.tasks.length - 1].id;
          this.tasks.push({
            title: this.newTask,
            inProgress: (this.newStatus==='todo' ? false : true),
            completed: (this.newStatus==='completed' ? true : false),
            id: idNum + 1,
          });
          this.newTask = "";
          this.showAddModal = !this.showAddModal;
        }
      }
    },
    editTask(val) {
      if (val) {
        this.tasks[this.editedIndex].title = val;
        this.tasks[this.editedIndex].inProgress = (this.newStatus==='todo' ? false : true);
        this.tasks[this.editedIndex].completed = (this.newStatus==='completed' ? true : false);
      }
      this.showEditModal = !this.showEditModal;
    },
    changeStatus(task) {
      if (!task.inProgress && !task.completed) {
        // change to inProgress
        task.inProgress = true;
      } else if (task.inProgress && !task.completed) {
        // change to Completed
        task.completed = true;
      } else if (task.inProgress && task.completed) {
        // change to ToDo
        task.completed = false;
        task.inProgress = false;
      }
    },

    editedTask(index) {
      /*
        this.editedTitle => 要編輯的項目的title
        this.editedIndex => 要編輯的項目的index
      */
      this.editedTitle = this.tasks[index].title;
      this.editedIndex = index;
      if(this.tasks[index].completed)
        this.editedStatus = "completed"
      else if(!this.tasks[index].inProgress)
        this.editedStatus = "todo"
      else 
        this.editedStatus = "inProgress"
      // console.log('editedTask',this.editedStatus)
    },

    removeTask(index) {
      this.tasks.splice(index, 1);
    },
    clearCompleted() {
      this.tasks = this.tasks.filter(this.inProgress);
    },
    filterTasks(status) {
      switch (status) {
        case "todo":
          this.filteredTasks = this.tasks.filter((task) => !task.inProgress);
          this.filteredStatus = "Todo";
          break;
        case "inProgress":
          this.filteredTasks = this.tasks.filter(
            (task) => task.inProgress && !task.completed
          );
          this.filteredStatus = "in Progress";
          break;
        case "completed":
          this.filteredTasks = this.tasks.filter((task) => task.completed);
          this.filteredStatus = "Completed";
          break;
        default:
          this.filteredTasks = [...this.tasks];
          this.filteredStatus = "All";
      }
    },
  },
  watch: {
    showAddModal: function () {
      this.$nextTick(function () {
        this.$refs.AddModal.$refs.inputForAdd.focus();
      });
    },
    showEditModal: function () {
      this.$nextTick(function () {
        this.$refs.EditModal.$refs.inputForEdit.focus();
      });
    },
    tasks: function () {
      this.filteredTasks = [...this.tasks];
      this.filteredStatus = "All";
    },
    filteredTasks: function(){
      this.search = "";
    }
  },
  components: {
    MyModal,
    TaskItem,
  },
};
</script>
<style lang="scss" scoped>
  input[type="search"] {
    border-radius: 5px;
    height: 38px;
    outline: 1px solid #17a2b8;
  }
  #search-btn {
    height: 38px;
    margin: 5px 0;
  }
</style>