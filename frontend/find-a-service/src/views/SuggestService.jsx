import { useState } from "react";
import { Link } from "react-router-dom";

import useAuthStore from "../store/useAuthStore";

function SuggestService() {
  const { user } = useAuthStore();

  const [formData, setFormData] = useState({
    serviceName: "",
    serviceType: "",
    address: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    /*
      ============================================================
      PLACEHOLDER ONLY

      (Admin / Save Suggestion)
      will replace this console.log() with the actual
      Firebase/database save.

      The logged-in user is already available below.
      ============================================================
    */

    console.log("Suggestion Submitted");

    console.log({
      submittedBy: user,
      suggestion: formData,
    });

    alert("Placeholder: Suggestion submitted successfully.");

    setFormData({
      serviceName: "",
      serviceType: "",
      address: "",
      description: "",
    });
  };

  return (
    <main
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>Suggest a Public Service</h1>

      <p>
        Only authenticated users can access this page.
      </p>

      <hr />

      <section
        style={{
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h2>Logged-in User</h2>

        <p>
          <strong>Name:</strong>{" "}
          {user?.displayName}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {user?.email}
        </p>

        <p>
          <strong>User ID:</strong>{" "}
          {user?.uid}
        </p>
      </section>

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: "15px" }}>
          <label>Service Name</label>

          <input
            type="text"
            name="serviceName"
            value={formData.serviceName}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Service Type</label>

          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          >
            <option value="">
              Select a service
            </option>

            <option value="Clinic">
              Clinic
            </option>

            <option value="Hospital">
              Hospital
            </option>

            <option value="Library">
              Library
            </option>

            <option value="Shelter">
              Shelter
            </option>

            <option value="Food Bank">
              Food Bank
            </option>

            <option value="Community Centre">
              Community Centre
            </option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Address</label>

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "12px 24px",
          }}
        >
          Submit Suggestion
        </button>

      </form>

      <hr
        style={{
          margin: "30px 0",
        }}
      />

      <Link to="/home">
        ← Return Home
      </Link>
    </main>
  );
}

export default SuggestService;