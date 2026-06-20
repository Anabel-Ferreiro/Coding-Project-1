// Step 3 & 4: DOM elements and event delegation
const form = document.getElementById("feedback-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const commentsInput = document.getElementById("comments");
const charCount = document.getElementById("char-count");
const feedbackDisplay = document.getElementById("feedback-display");

const MAX_CHARS = 200;

// Character count (real-time as user types)
commentsInput.addEventListener("input", function() {
  const length = commentsInput.value.length;
  charCount.textContent = `${length} / ${MAX_CHARS} characters`;

  if (length > MAX_CHARS) {
    charCount.style.color = "#e74c3c";
  } else {
    charCount.style.color = "#666";
  }
});

// Step 3: Mouse events for tooltips (event delegation on the form)
form.addEventListener("mouseover", function(event) {
  if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
    const tooltip = event.target.parentElement.querySelector(".tooltip");
    if (tooltip) {
      tooltip.style.display = "block";
    }
  }
});

form.addEventListener("mouseout", function(event) {
  if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
    const tooltip = event.target.parentElement.querySelector(".tooltip");
    if (tooltip) {
      tooltip.style.display = "none";
    }
  }
});

// Step 3: Form validation and submission
// Step 3: Form validation and submission
form.addEventListener("submit", function(event) {
  event.preventDefault();

  let isValid = true;

  // Validate name
  if (nameInput.value.trim() === "") {
    document.getElementById("name-error").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("name-error").style.display = "none";
  }

  // Validate email
  if (emailInput.value.trim() === "") {
    document.getElementById("email-error").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("email-error").style.display = "none";
  }

  // Validate comments
  if (commentsInput.value.trim() === "") {
    document.getElementById("comments-error").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("comments-error").style.display = "none";
  }

  // If valid, append feedback entry
  if (isValid) {
    const now = new Date();
    const timestamp = now.toLocaleString();

    const entry = document.createElement("div");
    entry.className = "feedback-entry";
    entry.innerHTML = `
      <h3>✅ ${nameInput.value}</h3>
      <p class="entry-email">${emailInput.value}</p>
      <p>${commentsInput.value}</p>
      <p class="entry-timestamp">${timestamp}</p>
    `;
    feedbackDisplay.appendChild(entry);

    setTimeout(() => {
      entry.classList.add("show");
    }, 10);

    form.reset();
    charCount.textContent = `0 / ${MAX_CHARS} characters`;
  }
});

// Clear all feedback button
const clearBtn = document.getElementById("clear-btn");
if (clearBtn) {
  clearBtn.addEventListener("click", function() {
    const entries = document.querySelectorAll(".feedback-entry");
    entries.forEach(entry => entry.remove());
  });
}

// Step 5: Prevent background clicks from triggering form events
document.addEventListener("click", function(event) {
  if (!form.contains(event.target)) {
    event.stopPropagation();
  }
});