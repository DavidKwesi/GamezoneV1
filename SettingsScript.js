function uploadProfilePicture() {
    const fileInput = document.getElementById('profilePictureUpload');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const profilePictureUrl = e.target.result;
            localStorage.setItem('profilePictureUrl', profilePictureUrl);
            alert('Profile picture uploaded successfully!');
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select a file to upload.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    // Handle profile picture upload (assuming this function is defined elsewhere)
    function uploadProfilePicture() {
        const fileInput = document.getElementById('profilePictureUpload');
        const file = fileInput.files[0];
        if (file) {
            // Logic to handle file upload
            console.log('Profile picture uploaded:', file.name);
        }
    }

    // Handle username change
    document.getElementById('changeUsernameForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const newUsername = document.getElementById('newUsername').value;
        if (newUsername) {
            localStorage.setItem('username', newUsername);
            alert('Username changed successfully!');
            // Update username on the dashboard
            document.getElementById('username').textContent = newUsername;
        } else {
            alert('Please enter a valid username.');
        }
    });

    // Handle password change
    document.getElementById('changePasswordForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const storedPassword = localStorage.getItem('password');

        if (currentPassword === storedPassword) {
            if (newPassword) {
                localStorage.setItem('password', newPassword);
                alert('Password changed successfully!');
            } else {
                alert('Please enter a new password.');
            }
        } else {
            alert('Current password is incorrect.');
        }
    });

    // Set initial username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        document.getElementById('username').textContent = storedUsername;
    }

    // Set initial password in localStorage if not already set (for demonstration purposes)
    if (!localStorage.getItem('password')) {
        localStorage.setItem('password', 'defaultpassword'); // Set a default password initially
    }
});
