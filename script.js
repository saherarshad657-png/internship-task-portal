/* =====================================================
   TASKFLOW
   INTERNSHIP TASK PORTAL
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   1. MOCK / LOCAL TASK DATA
===================================================== */

const defaultTasks = [
    {
        id: 1,
        title: "Build Login Page",
        description: "Create a responsive login page using HTML and CSS.",
        priority: "High",
        status: "In Progress",
        deadline: "2026-10-05"
    },
    {
        id: 2,
        title: "Database Documentation",
        description: "Prepare documentation for the internship project database structure.",
        priority: "Medium",
        status: "Pending",
        deadline: "2026-10-07"
    },
    {
        id: 3,
        title: "Create Dashboard",
        description: "Design a clean dashboard interface for displaying project information.",
        priority: "High",
        status: "Pending",
        deadline: "2026-10-10"
    },
    {
        id: 4,
        title: "Test Application",
        description: "Test the main application features and identify obvious bugs.",
        priority: "Medium",
        status: "Completed",
        deadline: "2026-10-03"
    },
    {
        id: 5,
        title: "Prepare Project Report",
        description: "Write a short report explaining the project approach, challenges, and improvements.",
        priority: "Low",
        status: "Completed",
        deadline: "2026-10-12"
    }
];


/*
   Load saved tasks from localStorage.
   If there are no saved tasks, use defaultTasks.
*/

let tasks =
    JSON.parse(
        localStorage.getItem("taskflowTasks")
    ) || defaultTasks;


/* =====================================================
   2. DOM ELEMENTS
===================================================== */

// Task display area
const taskList =
    document.getElementById("taskList");

// Empty state
const emptyState =
    document.getElementById("emptyState");

// Search
const searchInput =
    document.getElementById("searchInput");

// Filters
const statusFilter =
    document.getElementById("statusFilter");

const priorityFilter =
    document.getElementById("priorityFilter");

// Task count
const taskCount =
    document.getElementById("taskCount");

// Statistics
const totalTasks =
    document.getElementById("totalTasks");

const pendingTasks =
    document.getElementById("pendingTasks");

const progressTasks =
    document.getElementById("progressTasks");

const completedTasks =
    document.getElementById("completedTasks");

// Buttons
const clearFiltersButton =
    document.getElementById("clearFiltersButton");

const emptyStateClearButton =
    document.getElementById("emptyStateClearButton");

const openTaskFormButton =
    document.getElementById("openTaskFormButton");

const closeTaskFormButton =
    document.getElementById("closeTaskFormButton");

const cancelTaskButton =
    document.getElementById("cancelTaskButton");

// Form
const taskForm =
    document.getElementById("taskForm");

// Form inputs
const taskTitle =
    document.getElementById("taskTitle");

const taskDescription =
    document.getElementById("taskDescription");

const taskPriority =
    document.getElementById("taskPriority");

const taskDeadline =
    document.getElementById("taskDeadline");

const taskStatus =
    document.getElementById("taskStatus");

// Form section
const taskFormSection =
    document.getElementById("taskFormSection");

// Application message
const appMessage =
    document.getElementById("appMessage");


/* =====================================================
   3. SAVE TASKS TO LOCAL STORAGE
===================================================== */

function saveTasks() {

    localStorage.setItem(
        "taskflowTasks",
        JSON.stringify(tasks)
    );

}


/* =====================================================
   4. RENDER TASKS
===================================================== */

function renderTasks(taskArray = tasks) {

    // Clear the current task list
    taskList.innerHTML = "";


    // Check whether there are any tasks
    if (taskArray.length === 0) {

        emptyState.classList.remove("hidden");

        taskCount.textContent = "0 tasks";

        return;
    }


    // Hide empty state
    emptyState.classList.add("hidden");


    // Update task count
    taskCount.textContent =
        `${taskArray.length} ${
            taskArray.length === 1
                ? "task"
                : "tasks"
        }`;


    // Create a card for every task
    taskArray.forEach(function(task) {

        const taskCard =
            document.createElement("article");

        taskCard.className =
            "task-card";


        // Determine CSS class for priority
        const priorityClass =
            `priority-${task.priority.toLowerCase()}`;


        // Determine CSS class for status
        let statusClass =
            "status-pending";


        if (task.status === "In Progress") {

            statusClass =
                "status-progress";

        } else if (task.status === "Completed") {

            statusClass =
                "status-completed";

        }


        // Create task card HTML
        taskCard.innerHTML = `

            <div class="task-header">

                <div>

                    <h3 class="task-title">
                        ${task.title}
                    </h3>

                </div>

                <span class="badge ${priorityClass}">
                    ${task.priority}
                </span>

            </div>


            <p class="task-description">
                ${task.description}
            </p>


            <div class="task-meta">

                <span class="badge ${statusClass}">
                    ${task.status}
                </span>


                <span class="deadline">
                    📅 Deadline: ${formatDate(task.deadline)}
                </span>


                <div class="status-control">

                    <label for="status-${task.id}">
                        Update status
                    </label>

                    <select
                        id="status-${task.id}"
                        class="task-status-select"
                        data-task-id="${task.id}"
                    >

                        <option
                            value="Pending"
                            ${
                                task.status === "Pending"
                                    ? "selected"
                                    : ""
                            }
                        >
                            Pending
                        </option>


                        <option
                            value="In Progress"
                            ${
                                task.status === "In Progress"
                                    ? "selected"
                                    : ""
                            }
                        >
                            In Progress
                        </option>


                        <option
                            value="Completed"
                            ${
                                task.status === "Completed"
                                    ? "selected"
                                    : ""
                            }
                        >
                            Completed
                        </option>

                    </select>

                </div>

            </div>
        `;


        // Add card to task list
        taskList.appendChild(taskCard);

    });

}


/* =====================================================
   5. FORMAT DATE
===================================================== */

function formatDate(dateString) {

    const date =
        new Date(dateString);


    return date.toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );

}


/* =====================================================
   6. UPDATE STATISTICS
===================================================== */

function updateStatistics() {

    const total =
        tasks.length;


    const pending =
        tasks.filter(function(task) {

            return task.status === "Pending";

        }).length;


    const inProgress =
        tasks.filter(function(task) {

            return task.status === "In Progress";

        }).length;


    const completed =
        tasks.filter(function(task) {

            return task.status === "Completed";

        }).length;


    // Update HTML
    totalTasks.textContent =
        total;

    pendingTasks.textContent =
        pending;

    progressTasks.textContent =
        inProgress;

    completedTasks.textContent =
        completed;

}


/* =====================================================
   7. CHANGE TASK STATUS
===================================================== */

function updateTaskStatus(taskId, newStatus) {

    const task =
        tasks.find(function(item) {

            return item.id === taskId;

        });


    // Make sure the task exists
    if (!task) {

        return;
    }


    // Update status
    task.status =
        newStatus;


    // Save updated tasks
    saveTasks();


    // Refresh task display
    applyFilters();


    // Refresh statistics
    updateStatistics();


    // Show confirmation message
    showMessage(
        `Task status changed to ${newStatus}.`,
        "success"
    );

}


/* =====================================================
   8. TASK STATUS EVENT HANDLING
===================================================== */

taskList.addEventListener(
    "change",
    function(event) {

        if (
            event.target.classList.contains(
                "task-status-select"
            )
        ) {

            const taskId =
                Number(
                    event.target.dataset.taskId
                );


            const newStatus =
                event.target.value;


            updateTaskStatus(
                taskId,
                newStatus
            );

        }

    }
);


/* =====================================================
   9. FILTER TASKS
===================================================== */

function applyFilters() {

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();


    const selectedStatus =
        statusFilter.value;


    const selectedPriority =
        priorityFilter.value;


    const filteredTasks =
        tasks.filter(function(task) {


            // Search condition
            const matchesSearch =
                task.title
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                task.description
                    .toLowerCase()
                    .includes(searchTerm);


            // Status condition
            const matchesStatus =
                selectedStatus === "All"

                ||

                task.status === selectedStatus;


            // Priority condition
            const matchesPriority =
                selectedPriority === "All"

                ||

                task.priority === selectedPriority;


            return (
                matchesSearch
                &&
                matchesStatus
                &&
                matchesPriority
            );

        });


    renderTasks(filteredTasks);

}


/* =====================================================
   10. FILTER EVENT LISTENERS
===================================================== */

searchInput.addEventListener(
    "input",
    applyFilters
);


statusFilter.addEventListener(
    "change",
    applyFilters
);


priorityFilter.addEventListener(
    "change",
    applyFilters
);


/* =====================================================
   11. CLEAR FILTERS
===================================================== */

function clearFilters() {

    searchInput.value =
        "";

    statusFilter.value =
        "All";

    priorityFilter.value =
        "All";


    applyFilters();

}


clearFiltersButton.addEventListener(
    "click",
    clearFilters
);


emptyStateClearButton.addEventListener(
    "click",
    clearFilters
);


/* =====================================================
   12. OPEN / CLOSE TASK FORM
===================================================== */

function openTaskForm() {

    taskFormSection.classList.remove(
        "hidden"
    );


    taskTitle.focus();


    taskFormSection.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


function closeTaskForm() {

    taskFormSection.classList.add(
        "hidden"
    );


    taskForm.reset();


    clearValidationErrors();

}


openTaskFormButton.addEventListener(
    "click",
    openTaskForm
);


closeTaskFormButton.addEventListener(
    "click",
    closeTaskForm
);


cancelTaskButton.addEventListener(
    "click",
    closeTaskForm
);


/* =====================================================
   13. FORM VALIDATION
===================================================== */

function validateTaskForm() {

    let isValid =
        true;


    // Clear previous errors
    clearValidationErrors();


    /* ---------------------------------------------
       TITLE VALIDATION
    --------------------------------------------- */

    const title =
        taskTitle.value.trim();


    if (title === "") {

        showFieldError(
            taskTitle,
            "taskTitleError",
            "Task title is required."
        );

        isValid =
            false;

    } else if (title.length < 3) {

        showFieldError(
            taskTitle,
            "taskTitleError",
            "Task title must be at least 3 characters."
        );

        isValid =
            false;

    }


    /* ---------------------------------------------
       DESCRIPTION VALIDATION
    --------------------------------------------- */

    const description =
        taskDescription.value.trim();


    if (description === "") {

        showFieldError(
            taskDescription,
            "taskDescriptionError",
            "Task description is required."
        );

        isValid =
            false;

    } else if (description.length < 10) {

        showFieldError(
            taskDescription,
            "taskDescriptionError",
            "Description must be at least 10 characters."
        );

        isValid =
            false;

    }


    /* ---------------------------------------------
       PRIORITY VALIDATION
    --------------------------------------------- */

    if (taskPriority.value === "") {

        showFieldError(
            taskPriority,
            "taskPriorityError",
            "Please select a priority."
        );

        isValid =
            false;

    }


    /* ---------------------------------------------
       DEADLINE VALIDATION
    --------------------------------------------- */

    if (taskDeadline.value === "") {

        showFieldError(
            taskDeadline,
            "taskDeadlineError",
            "Please select a deadline."
        );

        isValid =
            false;

    }


    return isValid;

}


/* =====================================================
   14. VALIDATION HELPER FUNCTIONS
===================================================== */

function showFieldError(
    inputElement,
    errorElementId,
    message
) {

    inputElement.classList.add(
        "input-error"
    );


    const errorElement =
        document.getElementById(
            errorElementId
        );


    errorElement.textContent =
        message;

}


function clearValidationErrors() {

    const inputs = [

        taskTitle,

        taskDescription,

        taskPriority,

        taskDeadline

    ];


    inputs.forEach(function(input) {

        input.classList.remove(
            "input-error"
        );

    });


    const errors = [

        "taskTitleError",

        "taskDescriptionError",

        "taskPriorityError",

        "taskDeadlineError"

    ];


    errors.forEach(function(id) {

        document.getElementById(id)
            .textContent = "";

    });

}


/* =====================================================
   15. ADD NEW TASK
===================================================== */

taskForm.addEventListener(
    "submit",
    function(event) {

        // Prevent page refresh
        event.preventDefault();


        // Validate form
        const isValid =
            validateTaskForm();


        if (!isValid) {

            return;

        }


        // Create new task
        const newTask = {

            id:
                Date.now(),

            title:
                taskTitle.value.trim(),

            description:
                taskDescription.value.trim(),

            priority:
                taskPriority.value,

            status:
                taskStatus.value,

            deadline:
                taskDeadline.value

        };


        // Add task to array
        tasks.push(newTask);


        // Save tasks to localStorage
        saveTasks();


        // Update statistics
        updateStatistics();


        // Apply current filters
        applyFilters();


        // Close form
        closeTaskForm();


        // Show confirmation
        showMessage(
            "New task added successfully.",
            "success"
        );

    }
);


/* =====================================================
   16. APPLICATION MESSAGE
===================================================== */

function showMessage(
    message,
    type = "success"
) {

    appMessage.textContent =
        message;


    appMessage.className =
        `app-message ${type}`;


    setTimeout(function() {

        appMessage.classList.add(
            "hidden"
        );

    }, 3000);

}


/* =====================================================
   17. INITIALIZE APPLICATION
===================================================== */

function initializeApp() {

    // Display tasks
    renderTasks();


    // Calculate statistics
    updateStatistics();

}


/* =====================================================
   START APPLICATION
===================================================== */

initializeApp();











