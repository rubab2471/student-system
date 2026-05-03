console.log("SCRIPT LOADED");

const API = "http://localhost:5000/api/items";

// Load data when page opens
window.onload = getStudents;

// ======================
// GET (READ)
// ======================
async function getStudents() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    let rows = "";

    data.forEach(student => {
      rows += `
        <tr>
          <td>${student.name}</td>
          <td>${student.age}</td>
          <td>${student.course}</td>
          <td>
            <button class="edit" onclick="editStudent('${student._id}', '${student.name}', '${student.age}', '${student.course}')">Edit</button>
            <button class="delete" onclick="deleteStudent('${student._id}')">Delete</button>
          </td>
        </tr>
      `;
    });

    document.getElementById("tableBody").innerHTML = rows;

  } catch (err) {
    console.error("GET ERROR:", err);
  }
}

// ======================
// CREATE + UPDATE
// ======================
async function saveStudent() {
  console.log("SAVE CLICKED");

  const id = document.getElementById("studentId").value;
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const course = document.getElementById("course").value;

  if (!name || !age || !course) {
    alert("All fields are required");
    return;
  }

  // ✅ FIXED: correct scope
  const studentData = {
    name,
    age,
    course
  };

  console.log("DATA:", studentData);

  try {
    if (id) {
      // UPDATE
      await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData)
      });
    } else {
      // CREATE
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData)
      });
    }

    clearForm();
    getStudents();

  } catch (err) {
    console.error("SAVE ERROR:", err);
  }
}

// ======================
// EDIT
// ======================
function editStudent(id, name, age, course) {
  document.getElementById("studentId").value = id;
  document.getElementById("name").value = name;
  document.getElementById("age").value = age;
  document.getElementById("course").value = course;
}

// ======================
// DELETE
// ======================
async function deleteStudent(id) {
  if (confirm("Are you sure you want to delete?")) {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      getStudents();
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  }
}

// ======================
// CLEAR FORM
// ======================
function clearForm() {
  document.getElementById("studentId").value = "";
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("course").value = "";
}