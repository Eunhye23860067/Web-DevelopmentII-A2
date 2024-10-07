//call GET API to get a list
function fetchFundraisers() {
  fetch('http://localhost:3000/api/crowdfunding')
      .then(res => res.json())
      .then(data => {
          const fundraiserList = document.getElementById('fundraiserList');
          fundraiserList.innerHTML = '';
        
          data.forEach(fundraiser => {
              const div = document.createElement('div');
              div.classList.add('fundraiser-info'); 
              div.innerHTML = `
                  <p><strong>Organizer:</strong> ${fundraiser.ORGANIZER}</p>
                  <p><strong>City:</strong> ${fundraiser.CITY}</p>
                  <p><strong>Category:</strong> ${fundraiser.CATEGORY}</p>
                  <p><strong>Target Funding:</strong> $${fundraiser.TARGET_FUNDING}</p>
                  <p><strong>Current Funding:</strong> $${fundraiser.CURRENT_FUNDING}</p>
                  <button onclick="deleteFundraiser(${fundraiser.FUNDRAISER_ID})">Delete</button>
                  <hr>
              `;
              fundraiserList.appendChild(div);
          });
      })
      .catch(error => {
        console.error("Error fetching data", error);
        document.getElementById('data').textContent = "Failed to load data";
      });
    }

// add new fundraiser
function addFundraiser() {
  const organizer = document.getElementById('newOrganizer').value;
  const caption = document.getElementById('newCaption').value;
  const target = document.getElementById('newTarget').value;
  const current = document.getElementById('newCurrent').value;
  const city = document.getElementById('newCity').value;
  const category = document.getElementById('newCategory').value;

  fetch('http://localhost:3000/api/crowdfunding/add', {
      method: 'POST',
      body: JSON.stringify({ 
        organizer, caption, target, current, city, category 
      })
  })
  .then(res => res.json())
  .then(() => {
      alert("Fundraiser added");
      fetchFundraisers();
  })
  .catch(error => 
    console.error("Error adding fundraiser:", error));
}

//delete fundraiser
function deleteFundraiser(id) {
  fetch(`http://localhost:3000/api/crowdfunding/delete/${id}`, {
    method: 'DELETE'
  })
  .then(() => {
      alert("Fundraiser deleted successfully!");
      fetchFundraisers();
  })
  .catch(error => 
    console.error("Error deleting fundraiser:", error));
}

//update fundraiser form
function updateFundraiser() {
  const id = document.getElementById('updateId').value;
  const organizer = document.getElementById('updateOrganizer').value;
  const caption = document.getElementById('updateCaption').value;
  const target = document.getElementById('updateTarget').value;
  const current = document.getElementById('updateCurrent').value;
  const city = document.getElementById('updateCity').value;
  const category = document.getElementById('updateCategory').value;

  fetch(`http://localhost:3000/api/crowdfunding/change`, {
      method: 'PUT',
      body: JSON.stringify({ 
        id, organizer, caption, target, current, city, category
       })
  })
  .then(res => res.json())
  .then(() => {
      alert("Fundraiser updated");
      fetchFundraisers();
  })
  .catch(error => 
    console.error("Error updating fundraiser:", error));
}

//show update form
function showUpdateForm(id) {
  fetch(`http://localhost:3000/api/crowdfunding/${id}`)
      .then(res => res.json())
      .then(fundraiser => {
          document.getElementById('updateId').value = fundraiser.FUNDRAISER_ID;
          document.getElementById('updateOrganizer').value = fundraiser.ORGANIZER;
          document.getElementById('updateCaption').value = fundraiser.CAPTION;
          document.getElementById('updateTarget').value = fundraiser.TARGET_FUNDING;
          document.getElementById('updateCurrent').value = fundraiser.CURRENT_FUNDING;
          document.getElementById('updateCity').value = fundraiser.CITY;
          document.getElementById('updateCategory').value = fundraiser.CATEGORY;
          document.getElementById('updateFundraiserForm').style.display = 'block';
      })
      .catch(error => 
        console.error("Error fetching fundraiser:", error));
}


window.onload = fetchFundraisers;