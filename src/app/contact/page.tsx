export default function ContactPage() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Contact Us</h1>
      <p>
        If you have any questions or concerns, feel free to reach out to us
        using the form below.
      </p>
      <form style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="name"
            style={{ display: "block", marginBottom: ".5rem" }}
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            style={{
              width: "100%",
              padding: ".5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: ".5rem" }}
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            style={{
              width: "100%",
              padding: ".5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="message"
            style={{ display: "block", marginBottom: ".5rem" }}
          >
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            style={{
              width: "100%",
              padding: ".5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          ></textarea>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#007BFF",
            color: "#fff",
            padding: ".75rem 1.5rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

// export default ContactPage;
