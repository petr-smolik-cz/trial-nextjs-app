import type { Metadata } from "next";
import "./globals.css";
import { openSans } from '@/app/ui/fonts';
import styles from "./layout.module.css";
import SideNavig from '@/app/ui/main/SideNavig';
import Header from '@/app/ui/main/Header1';
import { Suspense } from 'react';
import { HeaderSkeleton } from '@/app/ui/skeletons/mainPageSkeletons';

/**
 * Metadata for the application
 * ----------------------------
 * Defines the title and description for SEO purposes.
 */
export const metadata: Metadata = {
  title: "YourShop.com", // Website title shown in the browser tab
  description: "This is just a fake e-shop made for learning purposes", // Meta description for SEO
};

/**
 * RootLayout Component
 * --------------------
 * This component serves as the root layout for all pages in the app.
 * It includes:
 * - The global HTML structure
 * - The main header
 * - Side navigation
 * - Main content area for dynamic pages
 * - A footer with credits
 *
 * @param {React.ReactNode} children - The dynamically rendered page content.
 * @returns {JSX.Element} - The root layout of the application.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  console.log("Rendering RootLayout..."); // Log to track when the layout is rendered

  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        <div className={styles.container}>
          
          <Suspense fallback={<HeaderSkeleton />}>
            {/* Main website header */}
            <Header />
          </Suspense>

          {/* Side navigation bar */}
          <SideNavig />

          {/* Main content area where pages are rendered */}
          <main className={styles.mainContent}>
            {children}
          </main>      

          {/* Footer with copyright and credits */}
          <footer className={styles.footer}>
            <p>&copy;&nbsp;2025 YourShop.com | Icons by <a href="https://icons8.com">Icons8</a></p>
            {/* |&nbsp;<a href="/">About</a> */}
          </footer>
        </div>  
      </body>
    </html>
  );
}
