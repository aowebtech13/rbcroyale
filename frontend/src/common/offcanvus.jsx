import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import MobileMenus from '../layout/headers/mobile-menus';
import { useAuth } from '../context/AuthContext';
 
// images import 
import logo from "../../public/assets/img/logo/logo-white.png"


const Offcanvus = ({sidebarOpen, setSidebarOpen}) => {
    const { isAuthenticated } = useAuth();
    
    return (
        <>
            <div className="tpoffcanvas-area">
                <div className={`tpoffcanvas ${sidebarOpen && "opened"}`}>
                    <div className="tpoffcanvas__close-btn">
                    <button className="close-btn" onClick={() => setSidebarOpen(false)}><i className="fa-solid fa-xmark"></i></button>
                    </div>
                    <div className="tpoffcanvas__logo text-center">
                    <Link href={isAuthenticated ? "/dashboard" : "/"} onClick={() => setSidebarOpen(false)}>
                        <Image src={logo} width={120} height={50} alt="theme-pure" />
                    </Link>
                    </div>
                    <div className="mobile-menu mean-container">
                        <MobileMenus />
                    </div>
                  
                   
                    <div className="tpoffcanvas__social">
                    <div className="social-icon text-center">
                        <Link href="#"><i className="fab fa-twitter"></i></Link>
                        <Link href="#"><i className="fab fa-instagram"></i></Link>
                        <Link href="#"><i className="fab fa-facebook-square"></i></Link>
                        <Link href="#"><i className="fab fa-dribbble"></i></Link>
                    </div>
                    </div>
                </div>
            </div>
            <div className={`body-overlay ${sidebarOpen &&  "apply"}`} onClick={() => setSidebarOpen(false)}></div>
        </>
    );
};

export default Offcanvus;