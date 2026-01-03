// load from projects_description.json
async function loadData() {
    
    try {
        const response = await fetch('./projects_data.json');
        if (!response.ok) throw new Error("Could not fetch data");

        const data = await response.json();
  
        return Array.isArray(data) ? data : Object.values(data);
    }
    catch (error) {
        console.error(error);
    }
      
}

// dispays description on mouse hover
async function descriptionLoader() {
    const myData = await loadData();
    const projectCards = document.querySelectorAll('.projects');
    const title = document.getElementById('title');
    const description = document.getElementById('description');

    projectCards.forEach((card, index) => {
        card.addEventListener("mouseover", () => {
            const data = myData[index];
            if (data) {
                title.textContent = data.title;
                description.textContent = data.description;
            }
        });
        card.addEventListener("mouseleave", () => {
            const data = myData[index];
            if (data) {
                title.textContent = "Description";
                description.textContent = "";
            }
        });
    });
}

descriptionLoader();