function validateForm() {
  // Reset previous error messages and hide error icons
  resetErrorMessages();

  // Get form values
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Check for empty fields and display error messages
  if (!firstName) {
    displayError("firstName", "First Name cannot be empty");
  }
  if (!lastName) {
    displayError("lastName", "Last Name cannot be empty");
  }
  if (!email) {
    displayError("email", "looks like this is not an email");
  } else if (!isValidEmail(email)) {
    displayError("email", "Please enter a valid email address");
  }
  if (!password) {
    displayError("password", "Password cannot be empty");
  } else if (password.length < 6) {
    displayError("password", "Password must be at least 6 characters long");
  }

  // Check email format using a simple regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    displayError("email", "Please enter a valid email address.");
  }
}

// Error Displays
function displayError(fieldId, message) {
  // Display error message
  document.getElementById(`${fieldId}ErrorMessage`).innerHTML = message;
  // Show error icon
  document.getElementById(`${fieldId}Error`).style.visibility = "visible";
  // Add error class to input container
  document.getElementById(`${fieldId}Container`).classList.add("error");
  // Removes the placeholder value in the input field
  const field = document.getElementById(fieldId);
  field.placeholder = "";
  // Set the specified text inside the email input field when the error occurs
  if (fieldId === "email") {
    const emailInput = document.getElementById("email");
    if (message) {
      emailInput.value = "email@example/com";
      emailInput.classList.add("error-value");
    } else {
      emailInput.value = "";
      emailInput.classList.remove("error-value");
    }
  }
}

// Function to handle input focus
function handleInputFocus(fieldId) {
  // Remove error class from input container when focused
  document.getElementById(`${fieldId}Container`).classList.remove("error");
  // Hide error icon
  document.getElementById(`${fieldId}Error`).style.visibility = "hidden";
  // Clear error message
  document.getElementById(`${fieldId}ErrorMessage`).innerHTML = "";

  const inputField = document.getElementById(fieldId);

  // Check if the input field has no value and restore placeholder
  if (!inputField.value.trim()) {
    // Restore placeholder if input field is empty
    inputField.placeholder = inputField.getAttribute("data-placeholder");
    // Hide error icon
    document.getElementById(`${fieldId}Error`).style.visibility = "hidden";
  }
}

// Attach focus event listeners to inputs
document.getElementById("firstName").addEventListener("focus", function () {
  handleInputFocus("firstName");
});
document.getElementById("lastName").addEventListener("focus", function () {
  handleInputFocus("lastName");
});
document.getElementById("email").addEventListener("focus", function () {
  handleInputFocus("email");
});
document.getElementById("password").addEventListener("focus", function () {
  handleInputFocus("password");
});

function resetErrorMessages() {
  // Reset error messages and hide error icons
  const fields = ["firstName", "lastName", "email", "password"];
  fields.forEach((field) => {
    document.getElementById(`${field}ErrorMessage`).innerHTML = "";
    document.getElementById(`${field}Error`).style.visibility = "hidden";
  });
}
