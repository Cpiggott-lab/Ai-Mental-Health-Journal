export default function JournalPage() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Welcome to Your Journal</h1>
      <p>Start writing your thoughts and feelings here.</p>
      <textarea
        style={{
          width: "100%",
          height: "200px",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
        placeholder="Write your journal entry..."
      />
      <button
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Save Entry
      </button>
    </div>
  );
}
