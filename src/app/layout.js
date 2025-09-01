import "./globals.css";

export const metadata = {
  title: "School Registration",
  description: "School Registration",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
