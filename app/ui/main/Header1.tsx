'use client';

import styles from "./Header1.module.css";
import Image from "next/image";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'; // Importing Heroicons
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/solid';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';

/**
 * Header Component
 * ----------------
 * Displays the website's header, including:
 * - Logo and branding
 * - Search bar with debounce for optimized API calls
 * - Shopping cart button (currently non-functional)
 * 
 * @returns JSX.Element - The website's header section.
 */
export default function Header() {
    const searchParams = useSearchParams(); // Retrieve URL search parameters
    const { replace } = useRouter(); // Navigation for modifying the URL

    /**
     * Handles search input with debounce (300ms delay)
     * - Updates query string in URL
     * - Navigates to search results page
     */
    const handleSearch = useDebouncedCallback((term) => {
        console.log(`Searching... ${term}`);

        const params = new URLSearchParams(searchParams); // Get current search params

        if (term) {
            params.set('query', term); // Update query parameter
            replace(`/search?${params.toString()}`); // Navigate to search results
        } else {
            params.delete('query'); // Remove query if empty
            replace(`/?${params.toString()}`); // Reset to homepage
        }
    }, 300); // 300ms debounce to reduce API calls

    return (
        <header className={styles.header}>
            {/* Logo and Title */}
            <Link href="/" className={styles.logoTitleContainer}>
                {/* Next.js Image component for optimized loading */}
                <Image src="/logo.png" alt="Logo" width={100} height={100} className={styles.logo} />
                <h1 className={styles.pageName}>YourShop.com</h1>
            </Link>

            {/* Search Bar */}
            <div className={styles.searchContainer}>
                <MagnifyingGlassIcon className={styles.searchIcon} /> 
                <input 
                    type="text" 
                    className={styles.searchInput} 
                    placeholder="Search for..."
                    onChange={(e) => handleSearch(e.target.value)} // Trigger search on input change
                    defaultValue={searchParams.get('query')?.toString()} // Maintain query state on refresh
                />
            </div>

            {/* Shopping Cart Button (Future Feature) */}
            <button className={styles.shoppingCartButton}>
                <ShoppingCartIcon className={styles.icon} />
                <span className={styles.tooltipText}>Your shopping cart<br/>(Coming Soon)</span>
            </button>

            {/* User Login Button (Currently Commented Out) */}
            {/* <button className={styles.loginButton}>
                <UserIcon className={styles.userIcon} />
                <span className={styles.tooltipText}>Login</span>
            </button> */}  
        </header>
    );
}
