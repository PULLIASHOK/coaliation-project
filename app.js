const apiURL = "https://fedskillstest.coalitiontechnologies.workers.dev";
const username = "coalition";
const password = "skills-test";

// Encode credentials dynamically (never hardcode base64 string)
const headers = new Headers();
headers.set(
  "Authorization",
  "Basic " + btoa(`${username}:${password}`)
);

fetch(apiURL, { method: "GET", headers })
  .then((res) => {
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  })
  .then((data) => {
    // Filter for Jessica Taylor
    const jessica = data.find((p) => p.name === "Jessica Taylor");
    if (!jessica) throw new Error("Jessica not found");

    // Render data
    const container = document.getElementById("patient");
    container.innerHTML = `
      <img src="${jessica.profile_picture}" alt="Jessica Taylor" />
      <h2>${jessica.name}</h2>
      <p><strong>Age:</strong> ${jessica.age}</p>
      <p><strong>Gender:</strong> ${jessica.gender}</p>
      <p><strong>DOB:</strong> ${jessica.date_of_birth}</p>
      <p><strong>Phone:</strong> ${jessica.phone_number}</p>
      <p><strong>Insurance:</strong> ${jessica.insurance_type}</p>
    `;
  })
  .catch((err) => {
    document.getElementById("patient").textContent = err.message;
    console.error(err);
  });

