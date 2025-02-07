"use client";
import styles from "./SideNavig.module.css";
import { useProductCategories } from '@/app/lib/clientData';
import Link from 'next/link';
import { SideNavigSkeleton } from '@/app/ui/skeletons/mainPageSkeletons';
import { usePathname } from 'next/navigation';

/**
 * SideNav Component
 * -----------------
 * Displays a side navigation menu with product categories. 
 * Fetches categories from the API and handles loading and error states.
 * 
 * @returns JSX.Element - A side navigation menu.
 */
export default function SideNavig() {
    const pathname = usePathname(); // Get current pathname for active link styling
    const { categories, isLoading, isError } = useProductCategories();

    // Handle API error state
    if (isError) {
        console.error("Failed to load categories");
        return <div>Categories failed to load</div>;
    }

    // Show loading skeleton while categories are being fetched
    if (isLoading) {
        console.log("Loading categories...");
        return <SideNavigSkeleton />;
    }

    // Handle case where categories are empty or undefined
    if (!categories) {
        console.warn("No categories found");
        return <div>Categories not found</div>;
    }

    console.log("Categories loaded successfully:", categories);

    return (
        <nav className={styles.sideMenu}>
            <ul className={styles.menuList}>
                {categories.map((category: string) => (
                    <li key={category}>                      
                        <Link href={`/${category}`}
                            className={pathname === `/${category}` 
                                ? `${styles.link} ${styles.activeLink}` 
                                : styles.link}>
                            {capitalizeWords(category)}
                        </Link>
                        <hr className={styles.borderBetween}/>
                    </li>       
                ))}
            </ul>
        </nav>
    );
}

/**
 * Capitalizes each word in a string.
 * 
 * - Replaces hyphens with spaces
 * - Capitalizes the first letter of each word
 * 
 * @param {string} input - The input string.
 * @returns {string} - The formatted string with capitalized words.
 */
function capitalizeWords(input: string): string {
    return input
        .replace(/-/g, ' ') // Replace hyphens with spaces
        .split(' ') // Split into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(' '); // Join back into a single string
}
