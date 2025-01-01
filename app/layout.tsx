import type { Metadata } from "next";
import "./globals.css";
import { openSans } from '@/app/ui/fonts';
import styles from "./layout.module.css";
import SideNav from '@/app/ui/main/SideNavig';
import Header from '@/app/ui/main/Header1';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
            <p><span>&copy;</span>&nbsp;2024 YourShop.com |&nbsp;<a href="#">About</a></p>
          </footer>
        </div>  
      </body>
    </html>
  );
}
