import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Muvie | Film Dissent And Discourse",
  description: "Created By Ross Gray",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main>
            <div className="flex items-start justify-center min-h-screen">
              <div className="mt-20">{children}</div>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
