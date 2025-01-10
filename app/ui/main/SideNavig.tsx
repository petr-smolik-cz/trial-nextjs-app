"use client";
import styles from "./sidenavig.module.css";
import { useProductCategories } from '@/app/lib/clientData';
import Link from 'next/link';
import { SideNavigSkeleton } from '@/app/ui/skeletons';
import { usePathname } from 'next/navigation';

export default function SideNav() {
    const pathname = usePathname();
    const { categories, isLoading, isError } = useProductCategories();
    if (isError) return <div>categories failed to load</div>
    if (isLoading) return <SideNavigSkeleton />
    if (!categories) return <div>categories not found</div>
    
    return (
        <nav className={styles.sideMenu}>
            <ul className={styles.menuList}>
                {categories.map((category: string) => (
                    <li key={category}>                      
                        <Link href={`/${category}`}
                            className={pathname === `/${category}` ? `${styles.link} ${styles.activeLink}` : styles.link}>
                            { capitalizeWords(category) }
                        </Link>
                        <hr className={styles.borderBetween}/>
                    </li>       
                ))}
            </ul>
        </nav>
  );
}

function capitalizeWords(input: string): string {
    // Replace hyphens with spaces and split the string into words
    const words = input.replace(/-/g, ' ').split(' ');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => {
        // Capitalize the first letter and concatenate with the rest of the word
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Join the capitalized words back into a string and return
    return capitalizedWords.join(' ');
}