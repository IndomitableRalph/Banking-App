function showForm(formId) {
  let loginForm = document.getElementById('loginForm');
  let registerForm = document.getElementById('registerForm');

  if (formId == 'loginForm') {
    loginForm.style.display = 'flex';
    console.log(loginForm.style.display);
    registerForm.style.display = 'none';
  }
  else {
    loginForm.style.display = 'none';
    registerForm.style.display = 'flex';
  }
}
function pwd() {
  let registerPassword = document.getElementById('registerPassword');
  let confirm_password = document.getElementById('confirm_password');
  if (registerPassword.value == "") {
    confirm_password.disabled = 'true';
  } else {
    confirm_password.disabled = false;
  }
}


check = function () {
  let message = document.getElementById('message');
  let password = document.getElementById('registerPassword').value;
  let confirm_password = document.getElementById('confirm_password').value;
  let submit = document.getElementById('submit');

  if (password == confirm_password) {
    message.style.display = 'block';
    message.style.color = 'green';
    message.innerHTML = 'Password is a match';
    submit.disabled = false;

  }
  else if (password == "" || confirm_password == "") {
    message.style.display = 'none';
  }

  else if (password != confirm_password) {
    message.style.display = 'block';
    message.style.color = 'red';
    message.innerHTML = 'Password does not match';
    submit.disabled = true;
  }


}

function registerUser(username, password, email, firstName, lastName) {
  // Check if the user exists already in my local storage
  let users = JSON.parse(localStorage.getItem("users"));
  if (!JSON.parse(localStorage.getItem("users"))) {
    users = [];
  }

  //Then, if the user already exists, then don't register
  for (let i = 0; i > users.length; i++) {
    if (users[i].username == username) {
      return false;
    }
  }

  // If the user doesn't exist, create a new user
  let newUser = {
    username: username,
    password: password,
    email: email,
    firstName: firstName,
    lastName: lastName
  }

  //push the new user to the Users array
  users.push(newUser);

  //Afterwards, set the Users array into the local storage
  localStorage.setItem("users", JSON.stringify(users));

  //Console.log users array to see the added user
  console.log(JSON.parse(localStorage.getItem("users")));
  return users;
}

function submitRegisterForm(event) {
  event.preventDefault();

  let username = document.getElementById('registerUsername').value;
  let password = document.getElementById('registerPassword').value;
  let email = document.getElementById('registerEmail').value;
  let firstName = document.getElementById('firstName').value;
  let lastName = document.getElementById('lastName').value;
  let output = document.getElementById('output')

  registerUser(username, password, email, firstName, lastName)
  console.log("Register Form Submitted");
  let users = JSON.parse(localStorage.getItem("users"));
  if (!JSON.parse(localStorage.getItem("users"))) {
    users = [];
  }
  output.style.color = 'green';
  output.innerHTML = "Welcome" + " " + username + "!" + " " + "Your Account has been registered Succesfully!";
  console.log(users);
}


function submitLoginForm(event) {
  event.preventDefault();
  let username = document.getElementById('loginUsername').value;
  let password = document.getElementById('loginPassword').value;
  loginUser(username, password);
}

// load the users array from the local storage
function loginUser(username, password) {
  if (!username) return false
  if (!password) return false
  let users = loadKey('users');
  if (users.length == 0) return false;
  let incorrectlogindetails = document.getElementById('incorrectlogindetails');


  //check that the username and password matches
  users.forEach(user => {
    console.log(user.username);
    if (user.password === password && user.username === username) {
      // store a flag in localStorage where it says "loggedIn" = true
      setKey('loggedIn', true);
      // When user logs in, store user information into a separate local storage key called user
      setKey('user', user);
      // Proceed to the Dashboard MyAccount Page to display User Account details
      window.location.replace("myAccount.html");
    }
    else {
      incorrectlogindetails.style.color = 'red';
      incorrectlogindetails.innerHTML = "Your username or password is incorrect!";
      console.log('Login Unsuccessful');
      return;
    }
  });
}


function loadKey(key) {
  let response = JSON.parse(localStorage.getItem(key)) || [];
  return response;
}

function setKey(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
