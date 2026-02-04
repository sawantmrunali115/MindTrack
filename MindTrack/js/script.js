document.addEventListener("DOMContentLoaded", () => {
  const newTaskBtn = document.querySelector(".btn.btn-primary");
  const saveTaskBtn = document.getElementById("saveTaskBtn");

  const taskTitleInput = document.getElementById("taskTitle");
  const taskDescInput = document.getElementById("taskDesc");

  const todoColumn = document.querySelector(".col-md-4:nth-child(1)");
  const inProgressColumn = document.querySelector(".col-md-4:nth-child(2)");
  const completedColumn = document.querySelector(".col-md-4:nth-child(3)");

  const modal = new bootstrap.Modal(
    document.getElementById("newTaskModal")
  );

  // Open modal on New Task click
  newTaskBtn.addEventListener("click", () => {
    taskTitleInput.value = "";
    taskDescInput.value = "";
    modal.show();
  });

  // Save task
  saveTaskBtn.addEventListener("click", () => {
    const title = taskTitleInput.value.trim();
    const desc = taskDescInput.value.trim() || "No description";

    if (!title) {
      alert("Task title is required");
      return;
    }

    const taskCard = createTaskCard(title, desc, "todo");
    todoColumn.appendChild(taskCard);

    modal.hide();
  });

  function createTaskCard(title, desc, status) {
    const card = document.createElement("div");
    card.className = "card task-board shadow-sm mb-3";

    const badgeMap = {
      todo: "bg-warning text-dark",
      progress: "bg-info",
      done: "bg-success",
    };

    const textMap = {
      todo: "Pending",
      progress: "In Progress",
      done: "Done",
    };

    card.innerHTML = `
      <div class="card-body">
        <h6 class="mb-1">${title}</h6>
        <p class="small mb-2">${desc}</p>
        <span class="badge ${badgeMap[status]}">${textMap[status]}</span>

        <div class="d-flex gap-2 mt-3">
          ${
            status !== "progress"
              ? `<button class="btn btn-sm btn-outline-primary progress-btn">Progress</button>`
              : ""
          }
          ${
            status !== "done"
              ? `<button class="btn btn-sm btn-outline-success done-btn">Done</button>`
              : ""
          }
        </div>
      </div>
    `;

    card.querySelector(".progress-btn")?.addEventListener("click", () => {
      card.remove();
      inProgressColumn.appendChild(createTaskCard(title, desc, "progress"));
    });

    card.querySelector(".done-btn")?.addEventListener("click", () => {
      card.remove();
      completedColumn.appendChild(createTaskCard(title, desc, "done"));
    });

    return card;
  }
});
    

 /* ===========================
     TASK CARD FACTORY
  ============================ */
  function createTaskCard(title, desc, status) {
    const card = document.createElement("div");
    card.className = "card task-board shadow-sm mb-3";

    const badgeMap = {
      todo: "bg-warning text-dark",
      progress: "bg-info",
      done: "bg-success",
    };

    const textMap = {
      todo: "Pending",
      progress: "In Progress",
      done: "Done",
    };

    card.innerHTML = `
      <div class="card-body">
        <h6 class="mb-1">${title}</h6>
        <p class="small mb-2">${desc}</p>
        <span class="badge ${badgeMap[status]}">${textMap[status]}</span>

        <div class="d-flex gap-2 mt-3">
          ${
            status === "todo"
              ? `<button class="btn btn-sm btn-outline-primary progress-btn">Start</button>`
              : ""
          }
          ${
            status !== "done"
              ? `<button class="btn btn-sm btn-outline-success done-btn">Done</button>`
              : ""
          }
        </div>
      </div>
    `;

    // Move to In Progress
    card.querySelector(".progress-btn")?.addEventListener("click", () => {
      card.remove();
      progressColumn.appendChild(
        createTaskCard(title, desc, "progress")
      );
    });

    // Move to Completed
    card.querySelector(".done-btn")?.addEventListener("click", () => {
      card.remove();
      completedColumn.appendChild(
        createTaskCard(title, desc, "done")
      );
    });

    return card;
  }

  /* ===========================
     SIDEBAR ACTIVE STATE
  ============================ */
  sidebarLinks.forEach(link => {
    link.addEventListener("click", () => {
      sidebarLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  /* ===========================
     LOGOUT ACTION
  ============================ */
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      // Redirect logic (change later when backend exists)
      window.location.href = "index.html";
    }
  });

  /* ===========================
     NAVBAR ICON INTERACTIONS (OPTIONAL)
  ============================ */
  document.querySelector(".bi-gear")?.addEventListener("click", () => {
    alert("Settings page coming soon ⚙️");
  });

  document.querySelector(".bi-search")?.addEventListener("click", () => {
    alert("Search feature coming soon 🔍");
  });
