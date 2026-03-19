const SHEETDB_URL = "https://sheetdb.io/api/v1/2mrgiq59mfjvx"; // example: https://sheetdb.io/api/v1/abcd1234

const form = document.getElementById("admissionForm");
const loader = document.getElementById("formLoader");
const successPopup = document.getElementById("formSuccess");

// AUTO DATE & TIME
function getDateTime() {
  const now = new Date();
  return now.toLocaleString("en-IN", { hour12: true });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  loader.setAttribute("aria-hidden", "false");

  const data = {
    timestamp: new Date().toISOString(),
    fullName: form.fullName.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    gender: form.gender.value,
    course: form.course.value,
    address: form.address.value.trim(),
    city: form.city.value.trim(),
    state: form.state.value.trim(),
    pincode: form.pincode.value.trim(),
    message: form.message.value.trim(),
    dateTime: getDateTime(),
  };

  try {
    const res = await fetch(SHEETDB_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [data] })
    });

    loader.setAttribute("aria-hidden", "true");

    if (res.ok) {
      successPopup.setAttribute("aria-hidden", "false");
      form.reset();
    } else {
      alert("Error saving data!");
    }
  } catch (err) {
    loader.setAttribute("aria-hidden", "true");
    alert("Network error! Try again.");
  }
});

function closeSuccess() {
  successPopup.setAttribute("aria-hidden", "true");
}
