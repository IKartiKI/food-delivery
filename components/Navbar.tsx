'use client'

import { NAV_LINKS } from "@/constants"
import { link } from "fs"
import Image from "next/image"
import Link from "next/link"
import Button from "./Button"
import ThemeSwitch from "./ThemeSwitch"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, User } from "@nextui-org/react"
import getBasket from "@/utils/get-basket"

const Navbar = () => {

  const [allBasket, setAllBasket] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  // const cartItemCount = useSelector(state => state.cart.cartCount);
  const [email, setEmail] = useState(String);
  const pathname = usePathname();
  const [shouldShake, setShouldShake] = useState(false);
  const [username, setUsername] = useState('User Name');
  const nameFromStorage = localStorage.getItem('username')?.toString();

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if(token){
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    const fetchBasket = async () => {
        try {
            const data = await getBasket();
            setAllBasket(data);
            setCartItemCount(data.length);
        } catch (error) {
            console.error("Error fetching dishes:", error);
        }
    };

    fetchBasket(); // Call the async function
  }, [allBasket]);

  const showLoginButton = () => {
    const pathsToHideLoginButton = ['/register', '/login'];
    return !pathsToHideLoginButton.includes(pathname);
  };

  // const showLogoutButton = () => {
  //   const pathsToShowLogoutButton = ['/profile'];
  //   return pathsToShowLogoutButton.includes(pathname);
  // }

  const handleLogout = () => {
    localStorage.clear();
  };

  useEffect(() => {
    const emailFromStorage = localStorage.getItem('email')?.toString();
    if(emailFromStorage){
      setEmail(emailFromStorage);
    }
  }, []);

  useEffect(() => {
    if(nameFromStorage){
      setUsername(nameFromStorage);
    }
  }, [nameFromStorage]);

  useEffect(() => {
    setShouldShake(true);
    const timer = setTimeout(() => setShouldShake(false), 500); // Reset after 500ms
    return () => clearTimeout(timer); // Cleanup on unmount
 }, [cartItemCount]);

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5 " >
      <Link href="/">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 122.88 85.82"><defs></defs><title>food-delivery</title><path className="cls-1 dark:text-white" d="M77.1.61h40.36a2.48,2.48,0,0,1,2.47,2.47V30.52h.24a2.72,2.72,0,0,1,2.71,2.72v3A2.77,2.77,0,0,1,120.12,39H101.05c14.17,1.26,22.27,14.44,21.39,31.58H109.83a15,15,0,0,1-29.95,0h-38c0-.27,0-.54,0-.8a40.85,40.85,0,0,1-.34,5.8l-7.91-3.73A15.29,15.29,0,1,1,7.61,59.63L0,56c6.34-7.21,14-10.24,23.25-8.16,3.31.84,6.41,1.59-.08,0A112.39,112.39,0,0,1,33.72,13.07L29,13h0c-1,0-2.05.25-2.72-.24a3.59,3.59,0,0,1-2.88-1.84,7.12,7.12,0,0,1-1-3.79,7.16,7.16,0,0,1,1-3.8,3.91,3.91,0,0,1,2-1.68,1,1,0,0,1,0-.3C26.51-.46,28.7.08,30.65.08l1.9.12a11.1,11.1,0,0,1,4,1.36l2.17,1.22h1.76L46.4,3.92c1.93.38,2.21.22,1.76,2.59a7.49,7.49,0,0,1-.24.9c-.58,1.73-1,1.09-2.84.72L39.55,7c.21,2.23-.5,5-1.49,8.15,3.17,2.69,4.61,6.52,2.43,11.58L35.21,43c8.86,6.28,14.18,12,14.49,21.29H60.93c7.22-5.47,6-15.21-1.9-21.43V39h0V33.16c0-1.86,1-2.7,2.85-2.64H74.63V3.08A2.48,2.48,0,0,1,77.1.61ZM24.36,67.53,16.81,64a6.72,6.72,0,1,0,7.55,3.56Zm1.1-64.26c.09,2.53.25,5.78.37,8a3.4,3.4,0,0,1-.61-.72,6.54,6.54,0,0,1-.89-3.46,6.5,6.5,0,0,1,.89-3.45c.08-.12.16-.24.24-.34ZM98.22,4.86a2.27,2.27,0,0,1,1.6.67,2.32,2.32,0,0,1,.35,2.8,13.12,13.12,0,0,1,3.41,1c5,2.5,7.74,6.41,7.74,12.22a.67.67,0,0,1-.62.67H85.77a.66.66,0,0,1-.66-.67A12.88,12.88,0,0,1,92.85,9.34a12.64,12.64,0,0,1,3.41-1,2.31,2.31,0,0,1,.35-2.8,2.28,2.28,0,0,1,1.61-.67ZM82.36,26.09V24.22a.19.19,0,0,1,.19-.2h31.24a.19.19,0,0,1,.19.2v1.87a.19.19,0,0,1-.19.19H82.55a.19.19,0,0,1-.19-.19ZM101.45,70.6a6.6,6.6,0,0,1-13.19,0Z"/></svg>
      </Link>
      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link href={link.href} key={link.key}
          className="regular-16 text-gray-50 flexCenter cursor-pointer
          pb-1.5 transition-all hover:font-bold">
            {link.label}
          </Link>
        ))}
      </ul>

      {!checkAuth() && showLoginButton() && (
      <div className="lg:flexCenter">
        <Link href="/login" passHref>
        <Button
          type="button"
          title="Login"
          icon="/user.svg"
          variant="btn_dark_green"
        />
        </Link>
      </div>
      )}
      {checkAuth() && (
      <div className="lg:flexCenter">
        <Link href="/login" passHref>
        <Button
          click={handleLogout}
          type="button"
          title="Logout"
          icon="/logout.png"
          variant="btn_dark_green"
        />
        </Link>
      </div>
      )}
      <ThemeSwitch/>
      {checkAuth() && (
        <div className="dark:text-white">
          <Link href="/cart" passHref>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 92 92" id="cart" className={`inline-block cursor-pointer fill-current text-black dark:text-white transform hover:scale-105 ${shouldShake ? 'shake' : ''}`}>
              <path d="M91.8 27.3 81.1 61c-.8 2.4-2.9 4-5.4 4H34.4c-2.4 0-4.7-1.5-5.5-3.7L13.1 19H4c-2.2 0-4-1.8-4-4s1.8-4 4-4h11.9c1.7 0 3.2 1.1 3.8 2.7L36 57h38l8.5-27H35.4c-2.2 0-4-1.8-4-4s1.8-4 4-4H88c1.3 0 2.5.7 3.2 1.7.8 1 1 2.4.6 3.6zm-55.4 43c-1.7 0-3.4.7-4.6 1.9-1.2 1.2-1.9 2.9-1.9 4.6 0 1.7.7 3.4 1.9 4.6 1.2 1.2 2.9 1.9 4.6 1.9 1.7 0 3.4-.7 4.6-1.9 1.2-1.2 1.9-2.9 1.9-4.6 0-1.7-.7-3.4-1.9-4.6s-2.9-1.9-4.6-1.9z"></path>
          </svg>
          {cartItemCount > 0 && <span className="ml-2">{cartItemCount}</span>}
          </Link>
        </div>
      )}
      {checkAuth() && (
      <Link href="/profile" passHref>
        <div className="lg:flexCenter gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 512 512" id="user" className="dark:text-white fill-current"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm0 398.7c-58.6 0-111.1-26.6-146.1-68.3 17.8-7.7 62.2-23.7 90.3-31.9 2.2-.7 2.6-.8 2.6-10.7 0-10.6-1.2-18.1-3.8-23.6-3.5-7.5-7.7-20.2-9.2-31.6-4.2-4.9-9.9-14.5-13.6-32.9-3.2-16.2-1.7-22.1.4-27.6.2-.6.5-1.2.6-1.8.8-3.7-.3-23.5-3.1-38.8-1.9-10.5.5-32.8 15-51.3 9.1-11.7 26.6-26 58-28h17.5c31.9 2 49.4 16.3 58.5 28 14.5 18.5 16.9 40.8 14.9 51.3-2.8 15.3-3.9 35-3.1 38.8.1.6.4 1.2.6 1.7 2.1 5.5 3.7 11.4.4 27.6-3.7 18.4-9.4 28-13.6 32.9-1.5 11.4-5.7 24-9.2 31.6-3.3 6.9-6.6 15.1-6.6 23.3 0 9.9.4 10 2.7 10.7 26.7 7.9 72.7 23.8 93 32.1-35 41.8-87.5 68.5-146.2 68.5z"></path></svg>
          {/* <img src="/user-dp.svg" className="rounded-full cls-1" width={42} height={42}/> */}
          <span>{username}</span>
        </div>
      </Link>
      )}
      <Image
        src="menu.svg"
        alt="menu"
        width={32}
        height={32}
        className="inline-block cursor-pointer lg:hidden"
      />
    </nav>
  )
}   

export default Navbar