import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "blog.ryanson.tech — Ryanson Jonathan",
  description: "Thoughts on math, data science, and code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="container">
          <header style={{ marginBottom: '48px' }}>
            <a href="/" style={{
              fontSize: 'clamp(28px, 5vw, 42px)',
              color: 'var(--accent)',
              textDecoration: 'none',
              letterSpacing: '-1px',
              display: 'inline-block'
            }}>
              blog.ryanson.tech<span style={{ opacity: 0.85 }}>;</span>
            </a>
            <p style={{ color: 'var(--muted)', margin: 0, fontSize: '16px' }}>
              thoughts on math, data science, and code.
            </p>
          </header>
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
