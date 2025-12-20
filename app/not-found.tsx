import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background:
          "linear-gradient(145deg, #0b1626 0%, #0a1020 60%, #0a0e1a 100%)",
        color: "#fff9f2",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: "100%",
          padding: 28,
          borderRadius: 28,
          background: "rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 25px 80px rgba(0,0,0,0.5)",
          backdropFilter: "blur(12px)",
        }}
      >
        <p style={{ margin: 0, letterSpacing: 1.4, opacity: 0.8 }}>
          Santa&apos;s Workshop
        </p>
        <h1 style={{ margin: "6px 0 10px", fontSize: 28 }}>Page not found</h1>
        <p style={{ margin: "0 0 18px", opacity: 0.78, lineHeight: 1.5 }}>
          Looks like this path got lost in the snow. Head back and try again.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "12px 18px",
            borderRadius: 16,
            textDecoration: "none",
            fontWeight: 700,
            color: "#0c0f1c",
            background: "linear-gradient(130deg, #ff4b5c, #ffb36b)",
            boxShadow: "0 14px 36px rgba(255,75,92,0.45)",
          }}
        >
          Return to the hotline
        </Link>
      </div>
    </main>
  );
}
