// layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import SideNav from './components/sidenav';
import "./globals.css";
import { ChatProvider } from './context/chat-context'; // Import ChatProvider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Routify",
  description: "An FGFBrands hackathon project.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) { // Add type for children
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap the entire application content with ChatProvider */}
        <ChatProvider>
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
              <SideNav />
            </div>
            <div className="flex-grow md:overflow-y-auto">{children}</div>
          </div>
        </ChatProvider>
      </body>
    </html>
  );
}