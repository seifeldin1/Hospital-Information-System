
const users = {
    admin: {
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        phone: "123-456-7890",
        password: "adminpassword",
        role: "admin",
        doctors: [
            {
                firstName: "Dr.",
                lastName: "Smith",
                email: "smith@example.com",
                phone: "987-654-3210",
                expertise: "Cardiology"
            },
            {
                firstName: "Dr.",
                lastName: "Jones",
                email: "jones@example.com",
                phone: "111-222-3333",
                expertise: "Radiology"
            }
        ],
        patients: [
            {
                firstName: "Patient",
                lastName: "One",
                age: 25,
                email: "patient1@example.com",
                phone: "555-123-4567"
            },
            {
                firstName: "Patient",
                lastName: "Two",
                age: 30,
                email: "patient2@example.com",
                phone: "555-987-6543"
            }
        ]
    },
    
};

document.addEventListener('DOMContentLoaded', function () {
    const userRole = localStorage.getItem('userRole') || 'patient'; 
    const profileContent = document.getElementById('profile-content');

    const users = {
        admin: {
            firstName: "Admin", lastName: "User", email: "admin@example.com", phone: "123-456-7890", role: "admin",
            doctors: [
                {firstName: "Dr.", lastName: "Smith", email: "smith@example.com", phone: "987-654-3210", expertise: "Cardiology"},
                {firstName: "Dr.", lastName: "Jones", email: "jones@example.com", phone: "111-222-3333", expertise: "Radiology"}
            ],
            patients: [
                {firstName: "Patient", lastName: "One", age: 25, email: "patient1@example.com", phone: "555-123-4567"},
                {firstName: "Patient", lastName: "Two", age: 30, email: "patient2@example.com", phone: "555-987-6543"}
            ]
        },
        doctor: {
            firstName: "Dr.", lastName: "Jones", birthdate: "1980-05-15", email: "jones@example.com", phone: "111-222-3333", role: "doctor",
            patients: [
                {firstName: "Patient", lastName: "One", age: 25, email: "patient1@example.com", phone: "555-123-4567"}
            ]
        },
        patient: {
            firstName: "Patient", lastName: "One", age: 25, email: "patient1@example.com", phone: "555-123-4567", role: "patient",
            doctors: [
                {firstName: "Dr.", lastName: "Kareem", email: "kemoeltop@example.com", phone: "6969696969", expertise: "five stars"},
                {firstName: "Dr.", lastName: "Nihad", email: "warda_inGarden@example.com", phone: "666 666 666", expertise: "five stars and one dead"},
                {firstName: "Dr.", lastName: "Mohamed", email: "7mada52@example.com", phone: "111 111 111 111", expertise: "2.5 stars"}
            ]
        }
    };

    // Function to handle login
    function login() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        let found = false;
        let role = '';
        for (const key in users) {
            if (users.hasOwnProperty(key)) {
                const user = users[key];
                if (user.email === email && user.password === password) {
                    found = true;
                    role = user.role;
                    break;
                }
            }
        }
        if (found) {
            localStorage.setItem('userRole', role);
            window.location.href = 'profile.html';
        } else {
            alert("Wrong email or password");
        }
    }

    // Function to handle signup
    function signup() {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const birthdate = document.getElementById('birthdate').value;
        const gender = document.getElementById('gender').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;

        if (!firstName || !lastName || !birthdate || !gender || !email || !phone || !password) {
            alert("Please fill in all fields");
            return;
        }


        // Add new user to the 'users' object
        users[email] = {
            firstName: firstName,
            lastName: lastName,
            birthdate: birthdate,
            gender: gender,
            email: email,
            phone: phone,
            password: password,
            role: 'patient'
        };

        // Redirect to login page
        alert("Signup successful! You can now log in.");
        window.location.href = 'login.html';
    }

    // Function to display feedback
    function displayFeedback() {
        const feedbackData = [
            {name: "John Doe", feedback: "Great service!", rating: 5},
            {
                name: "Jane Smith",
                feedback: "Friendly staff and quick results.",
                rating: 4
            }
            
        ];

        const feedbackContainer = document.getElementById('feedback-container');
        if (feedbackContainer) {
            let feedbackHtml = "";
            feedbackData.forEach(feedback => {
                feedbackHtml += `<div class="feedback-item">
                                    <p>${feedback.feedback}</p>
                                    <p>Rating: ${feedback.rating} stars - ${feedback.name}</p>
                                </div>`;
            });
            feedbackContainer.innerHTML = feedbackHtml;
        }
    }

    // Function to display top doctors
    function displayTopDoctors() {
        const topDoctors = [
            {name: "Dr. Mohamed", image: "images/pic1.webp", expertise: "Radiology"},
            {name: "Dr. Nihad", image: "images/pic2.webp", expertise: "Oncology"},
            {
                name: "Dr. Kareem",
                image: "images/pic3.webp",
                expertise: "Cardiology"
            }
        ];

        const doctorsContainer = document.getElementById('best-doctors');
        if (doctorsContainer) {
            let doctorsHtml = `<div class="row">`;
            topDoctors.forEach(doctor => {
                doctorsHtml += `<div class="col-md-4">
                                    <h3>${doctor.name}</h3>
                                    <img src="${doctor.image}" alt="${doctor.name}" class="img-fluid">
                                    <p>Expertise: ${doctor.expertise}</p>
                                </div>`;
            });
            doctorsHtml += `</div>`;
            doctorsContainer.innerHTML = doctorsHtml;
        }
    }


    displayFeedback();
    displayTopDoctors();

    const user = users[userRole];

    if (user) {
        let profileHtml = `<h2>${user.firstName} ${user.lastName}</h2>`;

        if (userRole === 'admin') {
            profileHtml += `<h3>Doctors</h3><table><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Expertise</th><th>Action</th></tr></thead><tbody>`;
            user.doctors.forEach(doctor => {
                profileHtml += `<tr><td>${doctor.firstName} ${doctor.lastName}</td><td>${doctor.email}</td><td>${doctor.phone}</td><td>${doctor.expertise}</td><td><button class="btn btn-danger btn-sm">Remove</button></td></tr>`;
            });
            profileHtml += `</tbody></table>`;

            profileHtml += `<h3>Patients</h3><table><thead><tr><th>Name</th><th>Age</th><th>Email</th><th>Phone</th><th>Action</th></tr></thead><tbody>`;
            user.patients.forEach(patient => {
                profileHtml += `<tr><td>${patient.firstName} ${patient.lastName}</td><td>${patient.age}</td><td>${patient.email}</td><td>${patient.phone}</td><td><button class="btn btn-danger btn-sm">Remove</button></td></tr>`;
            });
            profileHtml += `</tbody></table>`;
        } else if (userRole === 'doctor') {
            profileHtml += `<h3>Patients</h3><table><thead><tr><th>Name</th><th>Age</th><th>Phone</th></tr></thead><tbody>`;
            user.patients.forEach(patient => {
                profileHtml += `<tr><td>${patient.firstName} ${patient.lastName}</td><td>${patient.age}</td><td>${patient.phone}</td></tr>`;
            });
            profileHtml += `</tbody></table>`;
        } else if (userRole === 'patient') {
            profileHtml += `<h3>Doctors</h3><table><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Expertise</th></tr></thead><tbody>`;
            user.doctors.forEach(doctor => {
                profileHtml += `<tr><td>${doctor.firstName} ${doctor.lastName}</td><td>${doctor.email}</td><td>${doctor.phone}</td><td>${doctor.expertise}</td></tr>`;
            });
            profileHtml += `</tbody></table>`;
        }

        profileContent.innerHTML = profileHtml;
    } else {
        profileContent.innerHTML = "<p>User data not found.</p>";
    }
});

//////////////profile
document.addEventListener("DOMContentLoaded", function () {
    const feedbackForm = document.getElementById("feedback-form");
    const feedbackContainer = document.getElementById("patient-feedback");

    function loadFeedback() {
        const patientEmail = localStorage.getItem("userEmail"); 
        let feedbackData = JSON.parse(localStorage.getItem("feedback")) || [];
        feedbackContainer.innerHTML = "";

        feedbackData.forEach(feedback => {
            if (feedback.email === patientEmail) {
                feedbackContainer.innerHTML += `<div class="feedback-item">
                    <p>${feedback.text}</p>
                    <p>Rating: ${feedback.rating} stars</p>
                </div>`;
            }
        });
    }

    if (feedbackForm) {
        feedbackForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const feedbackText = document.getElementById("feedback-text").value;
            const rating = document.getElementById("rating").value;
            const patientEmail = localStorage.getItem("userEmail"); 

            if (!feedbackText.trim()) {
                alert("Please enter valid feedback.");
                return;
            }

            let feedbackData = JSON.parse(localStorage.getItem("feedback")) || [];
            feedbackData.push({ email: patientEmail, text: feedbackText, rating: rating });

            localStorage.setItem("feedback", JSON.stringify(feedbackData));

            document.getElementById("feedback-text").value = ""; // Clear input after submission
            alert("Feedback submitted successfully!");
            loadFeedback();
        });

        loadFeedback(); // Load feedback on page load
    }
});
