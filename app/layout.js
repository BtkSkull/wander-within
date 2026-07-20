import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/components/providers/SessionProvider";
import Script from "next/script";

export const metadata = {
  title: "Wander Within",
  description: "Mental Health Therapy Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}