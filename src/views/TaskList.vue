<!-- 列表template -->
<template id="TaskList">
  <div class="container mx-auto">
    <!-- Modal: Add Task -->
    <MyModal
      v-if="showAddModal"
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
      v-if="showEditModal"
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

    <h2 class="fit-content mx-auto mb-3">Hello! {{ userName }}</h2>
    <div class="col-12 d-flex align-items-center">
      <h2 class="d-inline">My tasks</h2>

      <!-- Filter Status  -->
      <!-- <div class="dropdown d-inline ml-auto mr-3">
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
      </div> -->
      <button
        type="button"
        class="btn btn-outline-info ml-auto"
        @click="toggleAddModal"
      >
        Add Task
      </button>
      <div class="input-group fit-content">
        <input
          v-model="search"
          type="search"
          class="w-75 ml-3"
          placeholder="search task"
          @keyup.enter="searchTask"
        />
        <div class="form-outline"></div>
        <button
          id="search-btn"
          type="button"
          class="btn btn-outline-info"
          @click="searchTask"
        >
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
          v-for="(task, index) in displayedTasks"
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

    <!-- Pagination -->
    <nav aria-label="Page navigation" id="pagination">
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click="changePage(-1), displayTasks()"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          :class="pageNo === page ? 'page-item active' : 'page-item'"
          :key="index"
          v-for="(pageNo, index) in pages.slice(pageStart, pageStart + 5)"
          @click="displayTasks()"
        >
          <a class="page-link" href="#" @click="page = pageNo">{{ pageNo }}</a>
        </li>
        <li class="page-item" @click="changePage(+1), displayTasks()">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
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
          {
          id: 1,
          title: "Make todo list",
          status: 'todo',
        },
        {
          id: 2,
          title: "Go skydiving",
          status: 'inProgress',
        },
        {
          id: 3,
          title: "Go walking",
          status: 'completed',
        },
        {
          id: 4,
          title: "Buy drinks",
          status: 'inProgress',
        },
        {
          id: 5,
          title: "Clean house",
          status: 'inProgress',
        },
        {
          id: 6,
          title: "Trip prepare",
          status: 'inProgress',
        },
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
      newStatus: "todo",
      editedTitle: "123",
      editedIndex: 333,
      editedStatus: "",
      filteredTasks: [...this.tasks],
      filteredStatus: "All",
      displayedTasks: this.paginate(this.tasks),
      search: "",
      page: 1,
      perPage: 4,
      pages: [],
    };
  },
  methods: {
    setPages(tasks) {
      this.pages = [];
      let numOfPages = Math.ceil(tasks.length / this.perPage);
      for (let i = 1; i <= numOfPages; i++) {
        this.pages.push(i);
      }
    },
    paginate(tasks) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return tasks.slice(from, to);
    },
    displayTasks() {
      this.displayedTasks = this.paginate(this.filteredTasks);
      // console.log('displayed:',this.filteredTasks, this.paginate(this.tasks));
    },
    changePage(step) {
      this.page = this.page + step;
      if (this.page < 1) this.page = 1;
      else if (this.page > this.pages[this.pages.length - 1])
        this.page = this.pages[this.pages.length - 1];
    },
    searchTask() {
      this.filteredTasks = this.tasks.filter((task) =>
        task.title.toLowerCase().includes(this.search.toLowerCase())
      );
      this.setPages(this.filteredTasks);
    },
    updateStatus(val) {
      this.newStatus = val;
      // console.log('parent updateStatus', this.newStatus, val)
    },
    toggleAddModal() {
      this.showAddModal = !this.showAddModal;
      this.newStatus = 'todo'
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
            status: this.newStatus,
            id: idNum + 1,
          });
          this.newTask = "";
          this.newStatus = "todo";
          this.showAddModal = !this.showAddModal;
        } else {
          let idNum = this.tasks[this.tasks.length - 1].id;
          this.tasks.push({
            title: this.newTask,
            status: this.newStatus,
            id: idNum + 1,
          });
          this.newTask = "";
          this.newStatus = "todo";
          this.showAddModal = !this.showAddModal;
        }
      }
    },
    editTask(val) {
      if (val) {
        if(this.newStatus==='' ) {
          this.newStatus = this.tasks[this.editedIndex].status;
        }
        // console.log(this.tasks[this.editedIndex].inProgress,this.tasks[this.editedIndex].completed, this.newStatus)
        this.tasks[this.editedIndex].title = val;
        this.tasks[this.editedIndex].status = this.newStatus;
      }
      this.showEditModal = !this.showEditModal;
      this.newStatus = "";
    },
    changeStatus(task) {
      if(task.status==='todo'){
        // change to inProgress
        task.status = 'inProgress';
      }
      else if(task.status==='inProgress'){
        // change to Completed
        task.status = 'completed';
      }
      else if(task.status==='completed'){
        // change to todo
        task.status = 'todo';
      }
    },

    editedTask(index) {
      /*
        this.editedTitle => 要編輯的項目的title
        this.editedIndex => 要編輯的項目的index
      */
      this.editedIndex = (this.page - 1) * this.perPage + index;
      this.editedTitle = this.tasks[this.editedIndex].title;
      this.editedStatus = this.tasks[this.editedIndex].status;
      // console.log('editedTask',this.editedStatus)
    },

    removeTask(index) {
      let removeIndex = (this.page - 1) * this.perPage + index;
      this.tasks.splice(removeIndex, 1);
    },
    // clearCompleted() {
    //   this.tasks = this.tasks.filter(this.inProgress);
    // },
    // filterTasks(status) {
    //   switch (status) {
    //     case "todo":
    //       this.filteredTasks = this.tasks.filter((task) => !task.inProgress);
    //       this.filteredStatus = "Todo";
    //       this.setPages(this.filteredTasks);
    //       this.displayTasks();
    //       break;
    //     case "inProgress":
    //       this.filteredTasks = this.tasks.filter(
    //         (task) => task.inProgress && !task.completed
    //       );
    //       this.filteredStatus = "in Progress";
    //       this.setPages(this.filteredTasks);
    //       this.displayTasks();
    //       break;
    //     case "completed":
    //       this.filteredTasks = this.tasks.filter((task) => task.completed);
    //       this.filteredStatus = "Completed";
    //       this.setPages(this.filteredTasks);
    //       this.displayTasks();
    //       break;
    //     default:
    //       this.filteredTasks = [...this.tasks];
    //       this.filteredStatus = "All";
    //       this.setPages(this.filteredTasks);
    //       this.displayTasks();
    //   }
    // },
  },
  computed: {
    pageStart() {
      let pageLimit = 5;
      let totalPages = this.pages.length;
      if (totalPages <= pageLimit) {
        // 如果總頁數<=5，直接顯示所有頁碼
        return 0;
      } else {
        // 總頁數>5，到最後5頁會停止改變頁碼顯示
        if (this.page <= this.pages.length - pageLimit + 1) {
          // console.log("<=", this.page - 1);
          return this.page - 1;
        } else {
          // console.log(
          //   ">",
          //   this.page,
          //   this.pages.length,
          //   this.pages.length - pageLimit + 1
          // );
          return this.pages.length - pageLimit + 1;
        }
      }
    },
  },
  watch: {
    showAddModal: function () {
      if(this.showAddModal) {
        this.$nextTick(function () {
          this.$refs.AddModal.$refs.inputForAdd.focus();
        });
      }
    },
    showEditModal: function () {
      if(this.showEditModal) {
        this.$nextTick(function () {
          this.$refs.EditModal.$refs.inputForEdit.focus();
        });
      }
    },
    tasks: function () {
      this.filteredTasks = [...this.tasks];
      this.filteredStatus = "All";
      this.setPages(this.tasks);
      this.displayTasks();
    },
    filteredTasks: function () {
      // this.search = "";
      this.page = 1;
      this.displayTasks();
    },
  },
  created() {
    this.pages = [];
    this.setPages(this.tasks);
    this.displayTasks();
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
#pagination {
  margin-top: 50px;
  margin-bottom: 100px;
}
</style>