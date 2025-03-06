// script.js
document.addEventListener('DOMContentLoaded', function() {
    const userRole = localStorage.getItem('userRole') || 'patient'; // Default to patient
    const profileContent = document.getElementById('profile-content');

    const users = {
        admin: {
            firstName: "Admin", lastName: "User", email: "admin@example.com", phone: "123-456-7890", role: "admin",
            doctors: [
                { firstName: "Dr.", lastName: "Smith", email: "smith@example.com", phone: "987-654-3210", expertise: "Cardiology" },
                { firstName: "Dr.", lastName: "Jones", email: "jones@example.com", phone: "111-222-3333", expertise: "Radiology" }
            ],
            patients: [
                { firstName: "Patient", lastName: "One", age: 25, email: "patient1@example.com", phone: "555-123-4567" },
                { firstName: "Patient", lastName: "Two", age: 30, email: "patient2@example.com", phone: "555-987-6543" }
            ]
        },
        doctor: {
            firstName: "Dr.", lastName: "Jones", birthdate: "1980-05-15", email: "jones@example.com", phone: "111-222-3333", role: "doctor",
            patients: [
                { firstName: "Patient", lastName: "One", age: 25, email: "patient1@example.com", phone: "555-123-4567" }
            ]
        },
        patient: {
            firstName: "Patient", lastName: "One", age: 25, email: "patient1@example.com", phone: "555-123-4567", role: "patient",
            doctors: [
                { firstName: "Dr.", lastName: "Kareem", email: "kemoeltop@example.com", phone: "6969696969", expertise: "five stars" },
                { firstName: "Dr.", lastName: "Nihad", email: "warda_inGarden@example.com", phone: "666 666 666", expertise: "five stars and one dead" },
                { firstName: "Dr.", lastName: "Mohamed", email: "7mada52@example.com", phone: "111 111 111 111", expertise: "2.5 stars" }
            ]
        }
    };

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