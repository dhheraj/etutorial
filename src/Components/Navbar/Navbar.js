// import React, { useState,useContext } from "react";
// import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'
// import {AuthContext} from "../../Context/AuthContext"
// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const {  authUser, setAuthUser }=useContext(AuthContext);

//   return (
//     <header className={`flex w-full items-center bg-white dark:bg-dark`}>
//       <div className="container">
//         <div className="relative -mx-4 flex items-center justify-between">
//           <div className="w-60 max-w-full px-4">
//             <a href="/" className="block w-full py-5">
//               {/* <img
//                 src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-primary.svg"
//                 alt="logo"
//                 className="dark:hidden"
//               />
//               <img
//                 src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-white.svg"
//                 alt="logo"
//                 className="hidden dark:block"
//               /> */}
//               <p className="text-3xl font-bold">eTutorial </p>
//               {/* <img className="size-sm" src={authUser.userLoginData.user.photoURL}/> */}
//             </a>
//             {/* <img
//     src={authUser.userLoginData.user.photoURL}
//     alt="avatar"
//     class="relative inline-block h-12 w-12 !rounded-full  object-cover object-center"
//   /> */}


//           </div>
//           <div className="flex w-full items-center justify-between px-4">
//             <div>
//               <button
//                 onClick={() => setOpen(!open)}
//                 id="navbarToggler"
//                 className={` ${
//                   open && "navbarTogglerActive"
//                 } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
//               >
//                 <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
//                 <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
//                 <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
//               </button>
//               <nav
//                 // :className="!navbarOpen && 'hidden' "
//                 id="navbarCollapse"
//                 className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${
//                   !open && "hidden"
//                 } `}
//               >
//                 <ul className="block lg:flex">
//                   <ListItem NavLink="/">Home</ListItem>
//                   <ListItem NavLink="/posts">Posts</ListItem>
//                   <ListItem NavLink="/profile">Profile</ListItem>
//                   <ListItem NavLink="/dashboard">Dashboard</ListItem>
//                 </ul>
//               </nav>
//             </div>
//             <div className="hidden justify-end pr-16 sm:flex lg:pr-0">

//                 <a
//                   href="/uploadpost"
//                   class="bg-dark dark:bg-dark-2 border-dark dark:border-dark-2 border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5"
//                   >
//                   <span class="pr-[10px]">
//                   <ArrowUpTrayIcon className="h-6 w-6 text-white-500" />
//                   </span>
//                   Upload Posts
//                 </a>

//                 <a
//                   href="/login"
//                   className="rounded-md px-7 py-3 text-base font-medium text-primary "
//                 >
//                   Log In
//                 </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

// const ListItem = ({ children, NavLink }) => {
//   return (
//     <>
//       <li>
//         <a
//           href={NavLink}
//           className="flex py-2 text-base font-medium text-body-color hover:text-dark dark:text-dark-6 dark:hover:text-white lg:ml-12 lg:inline-flex"
//         >
//           {children}
//         </a>
//       </li>
//     </>
//   );
// };






// // import React from "react";
// // import {
// //   Navbar,
// //   MobileNav,
// //   Typography,
// //   Button,
// //   IconButton,
// //   Card,
// // } from "@material-tailwind/react";

// // const Responsivenavbar=()=> {
// //   const [openNav, setOpenNav] = React.useState(false);

// //   React.useEffect(() => {
// //     window.addEventListener(
// //       "resize",
// //       () => window.innerWidth >= 960 && setOpenNav(false),
// //     );
// //   }, []);

// //   const navList = (
// //     <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
// //       <Typography
// //         as="li"
// //         variant="small"
// //         color="blue-gray"
// //         className="p-1 font-normal"
// //       >
// //         <a href="#" className="flex items-center">
// //           Pages
// //         </a>
// //       </Typography>
// //       <Typography
// //         as="li"
// //         variant="small"
// //         color="blue-gray"
// //         className="p-1 font-normal"
// //       >
// //         <a href="#" className="flex items-center">
// //           Account
// //         </a>
// //       </Typography>
// //       <Typography
// //         as="li"
// //         variant="small"
// //         color="blue-gray"
// //         className="p-1 font-normal"
// //       >
// //         <a href="#" className="flex items-center">
// //           Blocks
// //         </a>
// //       </Typography>
// //       <Typography
// //         as="li"
// //         variant="small"
// //         color="blue-gray"
// //         className="p-1 font-normal"
// //       >
// //         <a href="#" className="flex items-center">
// //           Docs
// //         </a>
// //       </Typography>
// //     </ul>
// //   );

// //   return (
// //     <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll">
// //       <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
// //         <div className="flex items-center justify-between text-blue-gray-900">
// //           <Typography
// //             as="a"
// //             href="#"
// //             className="mr-4 cursor-pointer py-1.5 font-medium"
// //           >
// //             Material Tailwind
// //           </Typography>
// //           <div className="flex items-center gap-4">
// //             <div className="mr-4 hidden lg:block">{navList}</div>
// //             <div className="flex items-center gap-x-1">
// //               <Button
// //                 variant="text"
// //                 size="sm"
// //                 className="hidden lg:inline-block"
// //               >
// //                 <span>Log In</span>
// //               </Button>
// //               <Button
// //                 variant="gradient"
// //                 size="sm"
// //                 className="hidden lg:inline-block"
// //               >
// //                 <span>Sign in</span>
// //               </Button>
// //             </div>
// //             <IconButton
// //               variant="text"
// //               className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
// //               ripple={false}
// //               onClick={() => setOpenNav(!openNav)}
// //             >
// //               {openNav ? (
// //                 <svg
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   fill="none"
// //                   className="h-6 w-6"
// //                   viewBox="0 0 24 24"
// //                   stroke="currentColor"
// //                   strokeWidth={2}
// //                 >
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     d="M6 18L18 6M6 6l12 12"
// //                   />
// //                 </svg>
// //               ) : (
// //                 <svg
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   className="h-6 w-6"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   strokeWidth={2}
// //                 >
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     d="M4 6h16M4 12h16M4 18h16"
// //                   />
// //                 </svg>
// //               )}
// //             </IconButton>
// //           </div>
// //         </div>
// //         <MobileNav open={openNav}>
// //           {navList}
// //           <div className="flex items-center gap-x-1">
// //             <Button fullWidth variant="text" size="sm" className="">
// //               <span>Log In</span>
// //             </Button>
// //             <Button fullWidth variant="gradient" size="sm" className="">
// //               <span>Sign in</span>
// //             </Button>
// //           </div>
// //         </MobileNav>
// //       </Navbar>
// //       <div className="mx-auto max-w-screen-md py-12">
// //         <Card className="mb-12 overflow-hidden">
// //           <img
// //             alt="nature"
// //             className="h-[32rem] w-full object-cover object-center"
// //             src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
// //           />
// //         </Card>
// //         <Typography variant="h2" color="blue-gray" className="mb-2">
// //           What is Material Tailwind
// //         </Typography>
// //         <Typography color="gray" className="font-normal">
// //           Can you help me out? you will get a lot of free exposure doing this
// //           can my website be in english?. There is too much white space do less
// //           with more, so that will be a conversation piece can you rework to make
// //           the pizza look more delicious other agencies charge much lesser can
// //           you make the blue bluer?. I think we need to start from scratch can my
// //           website be in english?, yet make it sexy i&apos;ll pay you in a week
// //           we don&apos;t need to pay upfront i hope you understand can you make
// //           it stand out more?. Make the font bigger can you help me out? you will
// //           get a lot of free exposure doing this that&apos;s going to be a chunk
// //           of change other agencies charge much lesser. Are you busy this
// //           weekend? I have a new project with a tight deadline that&apos;s going
// //           to be a chunk of change. There are more projects lined up charge extra
// //           the next time.
// //         </Typography>
// //       </div>
// //     </div>
// //   );
// // }
// // export default Responsivenavbar;







import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { NavLink } from "react-router-dom";
import { auth, provider, firestore, firebase, app } from "./../../Firebase";
import { useAccordion } from '@chakra-ui/react';

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Posts', href: '/posts', current: false },
  { name: 'Dashboard', href: '/dashboard', current: true },
  // { name: 'Calendar', href: '#', current: false },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [isCurrentUer,serIsCurrentUser]=useState(false)
  useEffect(()=>{
    
    
    if(localStorage.getItem('id')){
      serIsCurrentUser(true)
    }else{
      serIsCurrentUser(false)
    }
    
  },[]);
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <h4 className='className="h-8 w-auto text-white font-bold'>e-T</h4>
                  {/* <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  /> */}
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <a href='/login' className='text-white'>login</a>
                <a href='/uploadpost'
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white "
                >
                  {/* <span className="absolute -inset-1.5" />
                  
                  <span className="sr-only">View notifications</span> */}
                  <PlusCircleIcon className="h-6 w-6" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white "
                >
                  {/* <span className="absolute -inset-1.5" />
                  
                  <span className="sr-only">View notifications</span> */}
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                        {isCurrentUer}
                      {
                        isCurrentUer?<img 
                        className="h-8 w-8 rounded-full "
                        src={localStorage.getItem("pp")}
                        alt="profile photot"
                      />
                        :<div class="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg class="absolute w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    </div>
                      
                      
                      }
                      
                    </Menu.Button>
                    
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/logout"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Logout
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
