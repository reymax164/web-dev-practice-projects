// load from projects_data.json
async function loadData() {
  
  try {
    const response = await fetch('./projects_data.json');
    if (!response.ok) throw new Error("Could not fetch data");

    const data = await response.json();

    // converts the data to array then returns it
    return Array.isArray(data) ? data : Object.values(data);
  }
  catch (error) {
    console.error(error);
  }
    
}

async function loadProjects() {
  try {
    const response = await fetch('./projects_data.json');
    if (!response.ok) throw new Error("Could not fetch projects");

    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error(error);
  }
}

// dispays description on mouse hover
async function descriptionLoader() {
  const dataset = await loadData();
  const projectCards = document.querySelectorAll('.projects');
  const title = document.getElementById('title');
  const description = document.getElementById('description');

  // tracks active timer for the transiions
  let currentTimeout;

  projectCards.forEach((card, index) => {
    const data = dataset[index];

    // mouse over
    card.addEventListener("mouseover", () => {
      if (!data) return;

      // stops any pending "Home" revert or previous card switch
      if (currentTimeout) clearTimeout(currentTimeout);

      // fade out
      title.style.opacity = 0;
      description.style.opacity = 0;

      // wait 250ms, swap text, fade In
      currentTimeout = setTimeout(() => {
        title.textContent = data.title;
        description.textContent = data.description;

        title.style.opacity = 1;
        description.style.opacity = 1;
      }, 200); 
    });

    // mouse leave
    card.addEventListener("mouseleave", () => {
      if (!data) return;

      // stops pending card reveal
      if (currentTimeout) clearTimeout(currentTimeout);

      // fade out
      title.style.opacity = 0;
      description.style.opacity = 0;

      // wait for fade out, reset to default, fade in
      currentTimeout = setTimeout(() => {
        title.textContent = "Home";
        description.textContent = ""; 

        // fade in
        title.style.opacity = 1;
        description.style.opacity = 1; 
      }, 200);
    });
  });
}

async function projectsLoader() {
  const projects = await loadProjects();
  const main = document.getElementById('home-main');
  
  // all projects to single string
  let projectCards = "";

  // add to string
  projects.forEach((project) => {
    projectCards += `
      <div class="projects">
        <a href="${project.href}">
          <p>${project.title}</p>
        </a>
      </div>
    `;
  });

  // add to DOM
  main.innerHTML = projectCards; 
}

projectsLoader();
descriptionLoader();