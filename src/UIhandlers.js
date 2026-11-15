
export class Task {
    constructor(title, date, priority) {
        this.title = title;
        this.date = date;
        this.priority = priority;
    }
}

export let myProjects = JSON.parse(localStorage.getItem("myProjects")) || [];
displayProject();

export let activeProject = null;

export function addTask () {
    let title = document.querySelector("#title").value;
    let date = document.querySelector("#date").value;
    let priority = document.querySelector("#priority").value;
    let newTask = new Task(title, date, priority);
    
    if (activeProject) {
        activeProject.tasks.push(newTask);
        saveAndDisplay();
    }

}

export  function  displayProject () {
    const displayContainer = document.querySelector("#content");
    displayContainer.innerHTML = "";

    myProjects.forEach((Project, index) => {
     const projectCard = document.createElement("div");
     projectCard.classList.add("project-card");
     projectCard.innerHTML = `<h3>${Project.title}</h3>`;

     Project.tasks.forEach((Task, index)=> {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");
        taskCard.innerHTML = `
            <h4>${Task.title}</h4>
            <p> DueDate: ${Task.date} </p>
            <p> ${Task.priority} </p>
        `;
        
        const deleteTask = document.createElement("button");
        deleteTask.classList.add("delete-task");
        deleteTask.textContent = "Nuke Task";
        deleteTask.addEventListener("click", (event)=> {
            Project.tasks.splice(index, 1);
            localStorage.removeItem("myProjects.tasks");
            saveAndDisplay();
        });

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-button");
        editBtn.addEventListener("click", (event)=> {
           activeProject = Project;
           if(editBtn.textContent === 'Edit') {
              const h4 = taskCard.querySelector("h4");
              const input1 = document.createElement("input");
              input1.type = 'text';
              input1.value = h4.textContent;
              taskCard.insertBefore(input1, h4);
              taskCard.removeChild(h4);

              const p1 = taskCard.querySelector("p");
              const input2 = document.createElement("input");
              input2.type = "date";
              input2.value = p1.textContent;
              taskCard.insertBefore(input2, p1);
              taskCard.removeChild(p1);

              const p3 = taskCard.querySelector("p");
              const input3 = document.createElement("input");
              input3.type = "text";
              input3.value = p3.textContent;
              taskCard.insertBefore(input3, p3);
              taskCard.removeChild(p3);

              editBtn.textContent = "Save";
           }else if (editBtn.textContent === "Save") {
            const allInputs = taskCard.querySelectorAll("input");

            const input1 = allInputs[0];
            const input2 = allInputs[1];
            const input3 = allInputs[2];

            Task.title = input1.value;
            Task.date = input2.value;
            Task.priority = input3.value;

            saveAndDisplay();
            editBtn.textContent = "Edit";
           }

        });
        
        taskCard.appendChild(editBtn);
        taskCard.appendChild(deleteTask);
        projectCard.appendChild(taskCard);
     });

     const deleteProject = document.createElement("button");
     deleteProject.classList.add("delete-projo");
     deleteProject.textContent = "Nuke Projo";

     deleteProject.addEventListener("click", (event)=> {
        myProjects.splice(index, 1);
        saveAndDisplay();
     });
     projectCard.appendChild(deleteProject);

     const addTaskBtn = document.createElement("button");
     addTaskBtn.textContent = "Add Task";
     addTaskBtn.classList.add("add-task-btn");

     addTaskBtn.addEventListener("click", (event)=> {
        activeProject = Project;
        const taskForm =  document.createElement("form");
        taskForm.classList.add("tasks-form");

        let titleLabel = document.createElement("label");
        titleLabel.textContent = "Task:";  
        let titleInput = document.createElement("input");
        taskForm.appendChild(titleLabel);;
        taskForm.appendChild(titleInput);

        let dateLabel = document.createElement("label");
        dateLabel.textContent = "DueDate:"
        let dateInput = document.createElement("input");
        dateInput.type = "date";
        taskForm.appendChild(dateLabel);
        taskForm.appendChild(dateInput);

        let priorityLabel = document.createElement("label");
        priorityLabel.textContent = "Priority:"  
        let priorityInput =  document.createElement("input");
        taskForm.appendChild(priorityLabel);
        taskForm.appendChild(priorityInput);

        let submitBtn = document.createElement("button");
        submitBtn.classList.add("submit");
        submitBtn.textContent = "submit";
        taskForm.appendChild(submitBtn);

        taskForm.style.display = "flex";
        taskForm.addEventListener("submit", (event)=> {
            event.preventDefault();
            let newTask = new Task(titleInput.value, dateInput.value, priorityInput.value);
            Project.tasks.push(newTask);
            saveAndDisplay();
        });

        projectCard.appendChild(taskForm);
     }); 

     projectCard.appendChild(addTaskBtn);
     displayContainer.appendChild(projectCard);
    });
  
}

export function saveAndDisplay () {
    localStorage.setItem("myProjects", JSON.stringify(myProjects));
    displayProject();
};