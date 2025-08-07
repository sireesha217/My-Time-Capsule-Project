const addMemoryBtn = document.getElementById("addMemoryBtn");
const viewMemoriesBtn = document.getElementById("viewMemoriesBtn");
const memoryForm = document.getElementById("memoryForm");
const memoriesList = document.getElementById("memoriesList");
const saveBtn = document.getElementById("saveMemory");

// Show form when "Add Memory" clicked
addMemoryBtn.onclick = () => {
  memoryForm.style.display = "block";
  memoriesList.style.display = "none";
};

// Show saved memories when "View Memories" clicked
viewMemoriesBtn.onclick = () => {
  memoryForm.style.display = "none";
  memoriesList.style.display = "block";
  displayMemories();
};

// Save memory
saveBtn.onclick = () => {
  const title = document.getElementById("title").value.trim();
  const message = document.getElementById("message").value.trim();
  const category = document.getElementById("category").value;
  const unlockDate = document.getElementById("unlockDate").value;

  if (!title || !message || !category || !unlockDate) {
    alert("Please fill in all fields.");
    return;
  }

  const memory = { title, message, category, unlockDate };
  let memories = JSON.parse(localStorage.getItem("memories")) || [];
  memories.push(memory);
  localStorage.setItem("memories", JSON.stringify(memories));
  alert("Memory saved successfully!");

  // Clear form
  document.getElementById("title").value = "";
  document.getElementById("message").value = "";
  document.getElementById("category").value = "";
  document.getElementById("unlockDate").value = "";
  memoryForm.style.display = "none";
};

// Display memories
function displayMemories() {
  memoriesList.innerHTML = "";
  const memories = JSON.parse(localStorage.getItem("memories")) || [];

  if (memories.length === 0) {
    memoriesList.innerHTML = "<p>No memories saved yet.</p>";
    return;
  }

  memories.forEach((mem) => {
    const div = document.createElement("div");
    div.className = "memoryItem";
    div.innerHTML = `
      <h3>${mem.title}</h3>
      <p>${mem.message}</p>
      <p><strong>Category:</strong> ${mem.category}</p>
      <p><strong>Unlock Date:</strong> ${mem.unlockDate}</p>
    `;
    memoriesList.appendChild(div);
  });
}
