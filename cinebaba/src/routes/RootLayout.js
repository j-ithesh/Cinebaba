import React from "react";
import styles from "./RootLayout.module.css"
import { Outlet, Link } from "react-router-dom";



function RootLayout(props) {
    return (
        <>
         <header className={styles.Header}>
            <span>Cinebaba</span>
            <nav>
                <ul className={styles.NavList}>
                    <li>
                    <Link to={'./'}>Home</Link>
                    </li>
                    <li>
                        <a href='#'>About</a>
                    </li>
                    <li>
                      <Link to={'./movies'}>Movies</Link>
                    </li>
                    <li>
                        <a href='#'>Contact</a>
                    </li>
                    <li>
                        <a href='/signup'>Sign up</a>
                    </li>
                    <li>
                        <a href='/login'>Login</a>
                    </li>
                </ul>
            </nav>
         </header>
         <Outlet />
         <footer className={styles.Footer}>
            <span>Copyright Cinebaba</span>
            <span>Developed by Jithesh</span>
            
         </footer>
        
        </>
      
    );
}
 
export default RootLayout;