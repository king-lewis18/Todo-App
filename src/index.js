import { isThisWeek, parseISO } from "date-fns";
import "./style.css";
import { displayProject, saveAndDisplay, myProjects, activeProject, Task, addTask } from "./UIhandlers.js";


class  Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }
}


function addProject () {
   let title = document.querySelector("#input-project").value;
   let newProject = new Project(title);
   myProjects.push(newProject);
   saveAndDisplay();
} 


const myProjectsBtn = document.querySelector("#my-projects");
myProjectsBtn.addEventListener("click", ()=> {
    displayProject();
});

const projectBtn = document.querySelector("#project-btn");
projectBtn.addEventListener("click", (event)=> {
    let projectInput = document.querySelector("#projects");
    projectInput.style.display = "flex";
});

document.querySelector("#projects").addEventListener("submit", function(event) {
   event.preventDefault();
   addProject();
   event.target.reset();
   event.target.style.display = "none";
});


const upcomingBtn = document.querySelector("#upcoming-btn");
upcomingBtn.addEventListener("click", (event) => {
  if(activeProject) {
    activeProject.tasks.sort((a, b)=> {
        if(a.date > b.date) {
            return 1;
        }else {
            return -1;
        }
    })
  }
  displayProject();
});


 const todayBtn = document.querySelector("#today"); 

    todayBtn.addEventListener("click", () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    
    const allTasks = myProjects.flatMap(project => project.tasks);

    const todaysTasks = allTasks.filter(task => task.date === todayStr);

    const displayContainer = document.querySelector("#content");
    displayContainer.innerHTML = ""; 

    const viewTitle = document.createElement("h2");
    viewTitle.textContent = "All Tasks Due Today";
    displayContainer.appendChild(viewTitle);

    if (todaysTasks.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.textContent = "F--- CAPITALISM!";
        displayContainer.appendChild(emptyMsg);
        return;
    }

    todaysTasks.forEach((task) => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");
        taskCard.innerHTML = `
            <h4>${task.title}</h4>
            <p>Date: ${task.date}</p>
            <p>Priority: ${task.priority}</p>
        `;
        displayContainer.appendChild(taskCard);
    });
});

const thisWeekBtn = document.querySelector("#week");

thisWeekBtn.addEventListener("click", ()=> {
    const thisWeekProjects = myProjects.filter(project => {
        return project.tasks.some(task => {
            const taskDate = parseISO(task.date);
            return isThisWeek (taskDate, {weekStartsOn : 1});
        });
    });

const displayContainer = document.querySelector("#content");
    displayContainer.innerHTML = ""; 

    const viewTitle = document.createElement("h2");
    viewTitle.textContent = "Projects Due This Week";
    displayContainer.appendChild(viewTitle);

    if (thisWeekProjects.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.textContent = "No projects or tasks scheduled for this week!";
        displayContainer.appendChild(emptyMsg);
        return;
    };

    thisWeekProjects.forEach((project) => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");
        projectCard.innerHTML = `<h3>${project.title}</h3>`;

        project.tasks.forEach((task) => {
            const taskCard = document.createElement("div");
            taskCard.classList.add("task-card");
            taskCard.innerHTML = `
                <h4>Task: ${task.title}</h4>
                <p>DueDate: ${task.date}</p>
                <p>Priority: ${task.priority}</p>
            `;
            projectCard.appendChild(taskCard);
        });

        displayContainer.appendChild(projectCard);
    });
});








