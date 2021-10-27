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
          class="btn btn-secondary dropdown-toggle"
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
  // props: ['tasks'],

  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      newTask: "",
      editedTitle: "123",
      editedIndex: 333,
      filteredTasks: [...this.tasks],
      filteredStatus: "All",
      myRef: "",
    };
  },
  methods: {
    updateTask(editedVal) {
      this.editedTitle = editedVal;
    },
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
            completed: false,
            inProgress: false,
            id: idNum + 1,
          });
          this.newTask = "";
          this.showAddModal = !this.showAddModal;
        } else {
          let idNum = this.tasks[this.tasks.length - 1].id;
          this.tasks.push({
            title: this.newTask,
            completed: false,
            inProgress: false,
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
  },
  components: {
    MyModal,
    TaskItem,
  },
};
</script>