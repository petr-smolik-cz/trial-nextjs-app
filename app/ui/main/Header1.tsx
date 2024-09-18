'use client';

import styles from "./Header1.module.css";
import Image from "next/image";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'; // Importing Heroicons
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/solid';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';

export default function Header() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const handleSearch = useDebouncedCallback((term) => {
        console.log(`Searching... ${term}`);
        const params = new URLSearchParams(searchParams);
        if (term) {
          params.set('query', term);
          replace(`/search?${params.toString()}`);
        } else {
          params.delete('query');
          replace(`/?${params.toString()}`);
        }     
    }, 300);

    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logoTitleContainer}>
                {/* Using Next.js Image component */}
                <Image src="/logo.png" alt="Logo" width={100} height={100} className={styles.logo} />
                <h1 className={styles.pageName}>YourShop.com</h1>
            </Link>
            <div className={styles.searchContainer}>
                <MagnifyingGlassIcon className={styles.searchIcon} /> 
                <input type="text" className={styles.searchInput} placeholder="Search for..."
                 onChange={(e) => { handleSearch(e.target.value); }}
                 defaultValue={searchParams.get('query')?.toString()} />
            </div>
            <button className={styles.shoppingCartButton}>
                <ShoppingCartIcon className={styles.icon} />
            </button>
            <button className={styles.loginButton}>
                <UserIcon className={styles.userIcon} />
            </button>     
        </header>
  );
}
