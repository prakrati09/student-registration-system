document.addEventListener('DOMContentLoaded', function() {
    const studentForm = document.getElementById('studentForm');
    const studentTable = document.querySelector('#studentTable tbody');
    
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let editIndex = null;  // Variable to track the index of the student being edited

    // Function to display students
    function displayStudents() {
        studentTable.innerHTML = '';
        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.studentId}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            studentTable.appendChild(row);
        });
    }

    // Function to add a new student
    function addStudent(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const studentId = document.getElementById('studentId').value;
        const email = document.getElementById('email').value;
        const contact = document.getElementById('contact').value;

        // Validate inputs
        if (!name || !studentId || !email || !contact) {
            alert('All fields are required.');
            return;
        }

        const newStudent = { name, studentId, email, contact };

        if (editIndex !== null) {
            // Editing an existing record
            students[editIndex] = newStudent;
            editIndex = null;  // Reset edit index after updating
        } else {
            // Adding a new student
            students.push(newStudent);
        }

        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
        studentForm.reset();  // Clear the form
        studentForm.onsubmit = addStudent;  // Reset form behavior to adding new student
    }

    // Function to edit a student
    window.editStudent = function(index) {
        const student = students[index];
        document.getElementById('name').value = student.name;
        document.getElementById('studentId').value = student.studentId;
        document.getElementById('email').value = student.email;
        document.getElementById('contact').value = student.contact;

        editIndex = index;  // Set the index for the student being edited

        // Update form submission behavior to edit the student
        studentForm.onsubmit = addStudent;
    };

    // Function to delete a student
    window.deleteStudent = function(index) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
    };

    // Initial display of students
    displayStudents();

    // Add student or edit student on form submit
    studentForm.onsubmit = addStudent;
});
