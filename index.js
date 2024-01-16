function handleFormSubmit(event) {
    event.preventDefault()

    const username = document.getElementById('username').value 
    const email = document.getElementById('email').value 
    const phone = document.getElementById('phone').value 

    const user = {
        username: username,
        email: email,
        phone: phone,
    }
//**********save the object data in local Storage***********

    // var userList= JSON.parse(localStorage.getItem('userList')) || []
    // userList.push(user)

    // localStorage.setItem('userList',JSON.stringify(userList))
    axios.post('https://crudcrud.com/api/3a774321baa0421db9df680466fecae5/appointmentdata', user)
    .then(function (response) {
        console.log('Data sent to crudcrud.com', response.data)
// index.js

document.addEventListener('DOMContentLoaded', () => {
    // Load existing appointments from crudcrud.com
    loadAppointments();
  });

  function loadAppointments() {
    // Make a GET request using Axios to retrieve existing appointments
    axios.get('https://crudcrud.com/api/3a774321baa0421db9df680466fecae5/appointmentdata')
      .then(response => {
        const appointments = response.data;

        // Save appointments to local storage
        localStorage.setItem('appointments', JSON.stringify(appointments));

        // Display appointments on the screen
        displayAppointments(appointments);
      })
      .catch(error => {
        console.error('Error loading appointments:', error);
      });
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    // Get form data
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Create an object with the form data
    const appointmentData = {
      username,
      email,
      phone,
    };

    // Make a POST request using Axios to save the new appointment
    axios.post('https://crudcrud.com/api/3a774321baa0421db9df680466fecae5/appointmentdata', appointmentData)
      .then(response => {
        console.log('Appointment data saved successfully:', response.data);
        document.getElementById('username').value=''
        document.getElementById('email').value=''
        document.getElementById('phone').value=''

        fetchAndDisplayUserList()
    })
    .catch(function (error) {
        console.error('Error sending data to crudcrud.com', error)
    })


}

function fetchAndDisplayUserList() {
    axios.get('https://crudcrud.com/api/3a774321baa0421db9df680466fecae5/appointmentdata')
    .then(function(response) {
        console.log('Data recevied from crudcrud.com:',response.data)
        displayUserList(response.data)
    })
    .catch(function (error) {
        console.error('Error fetching data from crudcrud.com', error)
    })
}

function deleteEntry(index) {
    // var userList = JSON.parse(localStorage.getItem('userList')) || []
    // userList.splice(index, 1)
    // localStorage.setItem("userList",JSON.stringify(userList))
    // displayUserList()

    axios.delete(`https://crudcrud.com/api/3a774321baa0421db9df680466fecae5/appointmentdata${userId}`)
    .then(function (response) {
        console.log('Data deleted from crudcrud.com:',response.data)
        fetchAndDisplayUserList()
    })
    .catch(function (error) {
        console.log('Error deleting data from crudcrud.com',error)
    })
}

function displayUserList() {
    // var userList =JSON.parse(localStorage.getItem('userList')) || []

    var ul =document.getElementById('userList')
    ul.innerHTML=''


    userList.forEach( function(user) {
        var li=document.createElement('li')
        li.textContent="username: " + user.username + ", Email: " + user.email + ", Phone: "+ user.phone
        li.className = "user-box"


        var deleteButton = document.createElement('button')
        deleteButton.textContent= "delete"
        deleteButton.onclick = function() {
            deleteEntry(user._id)
        }
        li.appendChild(deleteButton)
        ul.appendChild(li)
    })

}

fetchAndDisplayUserList()

        // Load appointments again to update the list
        loadAppointments();
      })
      .catch(error => {
        console.error('Error saving appointment data:', error);
      });
  }

  function displayAppointments(appointments) {
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Clear existing list

    // Display each appointment on the screen
    appointments.forEach(appointment => {
      const listItem = document.createElement('li');
      listItem.id = appointment._id; // Assuming '_id' is a unique identifier from the API
      listItem.innerHTML = `
        <strong>Username:</strong> ${appointment.username}<br>
        <strong>Email:</strong> ${appointment.email}<br>
        <strong>Phone:</strong> ${appointment.phone}
        <button onclick="deleteAppointment('${appointment._id}')">Delete</button>
      `;

      userList.appendChild(listItem);
    });
  }

  function deleteAppointment(appointmentId) {
    // Make a DELETE request using Axios
    axios.delete(`https://crudcrud.com/api/3a774321baa0421db9df680466fecae5/appointmentdata/${appointmentId}`)
      .then(response => {
        console.log('Appointment data deleted successfully:', response.data);

        // Load appointments again to update the list
        loadAppointments();
      })
      .catch(error => {
        console.error('Error deleting appointment data:', error);
      });
  }
