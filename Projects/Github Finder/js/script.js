// UI Elements
let searchBtn = document.querySelector('#searchBtn');
let searchUser = document.querySelector('#searchUser');

let ui = new UI();
// Event Listener
searchBtn.addEventListener('click', (e) => {
    let userText = searchUser.value;
    if (userText != '') {
        //Fetch API
        fetch(`https://api.github.com/users/${userText}`).then(result => result.json()).then(data => {
            if (data.message == 'Not Found') {
                ui.showAlert("User Not Found!", 'alert alert-danger');
            } else {
                ui.showProfile(data);
            }
        });
    } else {
        ui.showAlert("Please write a username!", 'alert alert-danger')
        ui.clearProfile();
    }
});