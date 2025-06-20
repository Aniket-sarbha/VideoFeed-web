import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "../context/AppContext";
import { ToastProvider } from "../components/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VideoFeed - Short Video App",
  description: "A TikTok-style short video feed application",
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <AppProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AppProvider>
      </body>
    </html>
  );
}
