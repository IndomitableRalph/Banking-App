// Pull up the stored user information and display in a box in myAccount Dashboard
function getUser() {
  let user = JSON.parse(localStorage.getItem('user'));

  let lginAccountName = document.getElementById('lginAccountName');
  let lginUsername = document.getElementById('lginUsername');
  let lginEmail = document.getElementById('lginEmail');

  lginUsername.style.color = '#7c0a26';
  lginUsername.innerHTML = user.username;

  lginAccountName.style.color = '#7c0a26';
  lginAccountName.innerHTML = user.firstName + " " + user.lastName;

  lginEmail.style.color = '#7c0a26';
  lginEmail.innerHTML = user.email;
  console.log(JSON.parse(localStorage.getItem('user')));
  console.log(user.username);
}

getUser();



