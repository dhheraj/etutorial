import { async } from '@firebase/util';
import React, { useContext, useEffect, useState } from 'react'
// import { AuthContext } from '../../Context/AuthContext';
import { AuthContext } from "../../Context/AuthContext"
import { auth, provider, firestore } from "./../../Firebase";
import PreviewPost from './PreviewPost/PreviewPost';
import { CgSearch } from "react-icons/cg";
import { Input } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import { Link, NavLink } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
// import {MagnifyingGlassIcons} from "@heroicons/react"
const Home = () => {
    // const { authUser, setAuthUser, postPreview, setPostPreview } = useContext(AuthContext);
    // localStorage.setItem("login",JSON.stringify(authUser))
    // console.log(authUser)


    const [profiledata, setProfileData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [data, setData] = useState('');
    const [id, setId] = useState('');
    const [dataId, setDataId] = useState('');
    const [textmergedData, setTextMergedData] = useState([]);
    const [imagemergedData, setImageMergedData] = useState([]);
    // const history = useHistory(); //Not working in the project



    const handleSearch = async () => {

        // try {
        //     const snapshot = await firestore.collection('posts').get();
        //     const fetchedData = snapshot.docs.map(doc => ({
        //       id: doc.postId,
        //       ...doc.data()
        //     }));
        //     setProfileData(fetchedData);
        //     console.log(profiledata)
        //   } catch (error) {
        //     console.error('Error fetching data:', error);
        //   }
        const fieldValue = localStorage.getItem("id"); // Value to search for
        //   firestore.settings({timestampsInSnapshots:true})
        //   firestore.collection('posts').where('tags', 'array-contains', 'demo').get().then((querySnapshot)=>{
        //     querySnapshot.docs.forEach(doc => {
        //         // setProfileData(doc.data());
        //         console.log("b")
        //         console.log(doc.data())

        //       });
        //   })





        // try {
        //     const snapshot = await firestore.collection('posts').where('tags', 'array-contains', search).get();
        //     const documentsData = snapshot.docs.map(doc => ({ id: doc.postId, ...doc.data() }));
        //     setProfileData(documentsData);
        //     // console.table("result: ",documentsData)
        // } catch (error) {
        //     console.error('Error fetching documents: ', error);
        // }





        try {
            setLoading(true)


            const textpostsSnapshot = await firestore.collection('posts').where('tags', 'array-contains', search).get();
            const textpostsData = textpostsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));


            const imagepostsSnapshot = await firestore.collection('imageposts').where('tags', 'array-contains', search).get();
            const imagepostsData = imagepostsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Query users collection


            const usersSnapshot = await firestore.collection('userlogin').get();
            const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));


            const textmergedData = textpostsData.map(post => {
                const user = usersData.find(user => user.userId === post.userId);

                return { ...post, user };
            });

            setTextMergedData(textmergedData);


            const imagemergedData = imagepostsData.map(post => {
                const user = usersData.find(user => user.userId === post.userId);
                return { ...post, user };
            });

            setImageMergedData(imagemergedData);

            if (textmergedData.length === 0 && imagemergedData.length === 0) {

                setIsSearch(true)
                console.log("if", isSearch)
            }
            else {
                setIsSearch(false)
                console.log("else", isSearch)
            }
            // const snapshot = await firestore.collection('posts').where('tags', 'array-contains', search).get();
            // const documentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // setProfileData(documentsData);
            // console.table(profiledata)

        } catch (error) {
            console.error('Error fetching documents: ', error.message);
            // setError(error.message);
        }
        finally {
            setLoading(false);
        }




        //   console.log("hh")

        // Since limit(1) is used, there should be only one document in the result


        // if (loading) {
        //     return <div>Loading...</div>;
        //   }

        //   if (error) {
        //     return <div>Error: {error}</div>;
        //   }





    }
    // if (loading) {
    //     return <div className="text-center">
    //         <div role="status">
    //             <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                 <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
    //                 <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    //             </svg>
    //             <span className="sr-only text-black">Loading...</span>
    //         </div>
    //     </div>;
    // }
    // const handleTransfer=()=>{
    //     setDataId()
    // }


    const textSearch = (event) => {
        setSearch(event.target.value)
    }
    const handleClick = (doc) => {
        setData(`/search/postpreview/${doc.userId}/${doc.postId}`)
        // localStorage.setItem("value", data)
        // console.log(data)
    };
    const handleViewProfile = (doc) => {
        setData(`/search/profilepreview/${doc.userId}`)
        console.log(doc.userId)
    }
    return (
        <div>
            <p className='flex justify-center items-center p-5 text-2xl'>Welcome, {localStorage.getItem("name")}</p>
            {/* {authUser.userLoginData.user.uid}<br/> */}
            <div className='flex justify-center'>
                <div className="flex w-96 flex-row gap-6">
                    <Input value={search} onChange={textSearch} variant="Search" label="Search here" placeholder="Standard" required size='lg' />
                    <button onClick={handleSearch} disabled={loading} class=" rounded-md p-2.5 text-gray-70 bg-cyan-500 hover:bg-cyan-300 ..."><CgSearch size={27} /></button>
                </div>
            </div>




            <Tabs>
                <TabList >
                    <Tab>Text</Tab>
                    <Tab>Image</Tab>
                    {/* <Tab>Three</Tab> */}
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <div>
                            {
                                textmergedData.map(doc => (

                                    <div key={doc.postId} className="mt-5 max-w-4/5 mx-auto  w-4/5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        {doc.user ? <button onClick={() => handleViewProfile(doc)}>
                                            <Link to={data}>
                                                <div className='mb-3 flex'>
                                                    <img className='w-12 rounded-full' src={doc.user.photoUrl} />

                                                    <div className='mt-1 ml-3 '>
                                                        <p className='text-lg'>{doc.user.name}</p>
                                                        <h6 className='text-sm'>Posted on: {doc.postedDate}</h6>
                                                    </div>

                                                </div></Link>
                                        </button> : ""}
                                        {/* onClick={() => handleClick(doc)} */}
                                        <div onClick={() => handleClick(doc)}>
                                            {/* <div onClick={handleTransfer}> */}
                                            <Link to={data}>
                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                    {doc.postTitle}
                                                </h5>
                                            </Link>
                                            {/* </div> */}

                                            <p className="line-clamp-1" dangerouslySetInnerHTML={{ __html: doc.postContent }} />

                                        </div>
                                    </div>
                                ))
                            }
                        </div>


                    </TabPanel>
                    <TabPanel>
                        {
                            imagemergedData.map(doc => (

                                <div key={doc.postId} className="mt-5 max-w-4/5 mx-auto  w-4/5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                                    {doc.user ? <button onClick={() => handleViewProfile(doc)}>
                                        <Link to={data}>
                                            <div className='mb-3 flex'>
                                                <img className='w-12 rounded-full' src={doc.user.photoUrl} />

                                                <div className='mt-1 ml-3 '>
                                                    <p className='text-lg'>{doc.user.name}</p>
                                                    <h6 className='text-sm'>Posted on: {doc.postedDate}</h6>
                                                </div>

                                            </div></Link>
                                    </button> : ""}

                                    {/* onClick={() => handleClick(doc)} */}
                                    <div >
                                        {/* <div onClick={handleTransfer}> */}
                                        <Link to={data}>
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                {doc.title}
                                            </h5>
                                        </Link>
                                        {/* </div> */}

                                        <img className='w-40' src={doc.url} />

                                    </div>
                                </div>
                            ))
                        }
                    </TabPanel>
                    {/* <TabPanel>
                        <p>three!</p>
                    </TabPanel> */}
                </TabPanels>
            </Tabs>




            {
                loading ?
                    //     <div class="border border-blue-300 shadow rounded-md p-4 m-4 max-w-4/5 w-4/5 mx-auto ">
                    //     <div class="animate-pulse flex space-x-4">
                    //         <div class="rounded-full bg-slate-200 h-10 w-10 bg-black"></div>
                    //         <div class="flex-1 space-y-6 py-1">
                    //             <div class="h-2 bg-slate-200 rounded bg-black"></div>
                    //             <div class="space-y-3">
                    //                 <div class="grid grid-cols-3 gap-4">
                    //                     <div class="h-2 bg-slate-200 rounded bg-black col-span-2"></div>
                    //                     <div class="h-2 bg-slate-200 rounded bg-black col-span-1"></div>
                    //                 </div>
                    //                 <div class="h-2 bg-slate-200 rounded bg-black"></div>
                    //             </div>
                    //         </div>
                    //     </div>
                    // </div>
                    <div class='flex space-x-2 justify-center bg-white h-screen dark:invert mt-5'>
                        <span class='sr-only'>Loading...</span>
                        <div class='h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div class='h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                        <div class='h-4 w-4 bg-black rounded-full animate-bounce'></div>
                    </div>
                    : ""
            }






            {/* <div className="flex justify-center items-center h-screen">
      <div className="w-24 h-24 rounded-full bg-blue-500 animate-pulse"></div>
    </div> */}
            {/* {profiledata} */}
            {/* {profiledata.map(item => (
          <li key={item.postId}>{item.postTitle}</li>
        ))} */}


        </div >

    )
}

export default Home;
