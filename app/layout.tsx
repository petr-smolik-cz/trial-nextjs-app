import type { Metadata } from "next";
import "./globals.css";
import { openSans } from '@/app/ui/fonts';
import styles from "./layout.module.css";
import SideNav from '@/app/ui/main/SideNavig';
import Header from '@/app/ui/main/Header1';

export const metadata: Metadata = {
  title: "YourShop.com",
  description: "This is just fake e-shop made for learning purposes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        <div className={styles.container}>
          <Header />
          <SideNav />
          <main className={styles.mainContent}>
            {children}
          </main>      
          <footer className={styles.footer}>
            <p>&copy;&nbsp;2025 YourShop.com | Icons by <a href="https://icons8.com">Icons8</a>
              {/* |&nbsp;<a href="/">About</a>*/}
            </p> 
          </footer>
        </div>  
      </body>
    </html>
  );
}
