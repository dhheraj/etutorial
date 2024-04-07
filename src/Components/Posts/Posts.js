import React, { useState, useEffect, useRef } from 'react'
import { auth, provider, firestore } from "../../Firebase";
import { Spinner } from '@chakra-ui/react'
import { CiMenuKebab, CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Posts = () => {
  const navigate = useNavigate();
  const [mergedData, setMergedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [textmergedData, setTextMergedData] = useState([]);
  const [imagemergedData, setImageMergedData] = useState([]);
  const [data, setData] = useState('');
  const [isCurrentUer, serIsCurrentUser] = useState(false)
  const [isDeleted, serIsDeleted] = useState(false)
  const [isSelectedTab, setIsSelectedTab] = useState(true);
  useEffect(() => {


    fetchData();
    if (localStorage.getItem('id')) {
      serIsCurrentUser(true)
    }
    serIsDeleted(false)


  }, []);
  const fetchData = async () => {
    try {
      // Query posts collection
      const textpostsSnapshot = await firestore.collection('posts').where("userId", "==", localStorage.getItem("id")).get();
      const textpostsData = textpostsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const imagepostsSnapshot = await firestore.collection('imageposts').where("userId", "==", localStorage.getItem("id")).get();
      const imagepostsData = imagepostsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Query users collection
      const usersSnapshot = await firestore.collection('userlogin').get();
      const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Merge data based on common field (userId)
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

    } catch (error) {
      console.error('Error fetching data: ', error);
    }
    finally {
      setLoading(false)
    }
  };
  const handleEditPost = (item) => {
    setData(`/editpost/${item.postId}`)
    navigate(data)
  }
  const handleDeleteTextPost = (item) => {
    firestore.collection('posts').doc(item.postId).delete();
    console.log(item)
    fetchData();
    toast.error('You have deleted your post! (refresh to update)', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
    serIsDeleted(true)
  }
  const handleDeleteImagePost = (item) => {
    firestore.collection('imageposts').doc(item.postId).delete();
    console.log(item)
    fetchData();
    toast.error('You have deleted your post! (refresh to update)', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
    serIsDeleted(true)
  }
  return (
    <>
      {isCurrentUer ?
        <div>
          <h1 className='flex justify-center text-center m-2'>Posted Content</h1>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

          {loading ?
            <div class="flex justify-center items-center m-5">
              <div class="relative inline-flex">
                <div class="w-8 h-8 bg-blue-500 rounded-full"></div>
                <div class="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
                <div class="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
              </div>
            </div>

            :
            <div>
              <div>
                <div className='flex justify-center items-center'>
                  <div class="inline-flex rounded-md shadow-sm ">
                    <button onClick={() => { setIsSelectedTab(true) }} aria-current="page" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                      Text
                    </button>
                    {/* <button class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                                      Settings
                                  </button> */}
                    <button onClick={() => { setIsSelectedTab(false) }} class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                      Image
                    </button>
                  </div>
                </div>
              </div>
              <div>
                {
                  isSelectedTab ?
                    <div>
                      {
                        textmergedData.length === 0 ?
                          <div className='flex justify-center text-center'>Start uploading text post &nbsp;<NavLink to={"/uploadpost/textpost"} className='text-blue-500 underline'>Upload now</NavLink></div> :
                          <div>
                            {textmergedData.map(item => (
                              <div key={item.id} className="mt-5 max-w-4/5 mx-auto  w-4/5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className='mb-3 flex justify-between'>
                                  <div className='mb-3 flex '>
                                    {item.user ?
                                      <img className='w-12 h-12 rounded-full' src={item.user.photoUrl} /> : ""}


                                    <div className=' ml-3 '>
                                      {item.user ?
                                        <p className='text-lg'>{item.user.name}</p> : ""}

                                      <h6 className='text-sm'>Posted on: {item.postedDate}</h6>
                                    </div>
                                  </div>
                                  <div className='mt-1'>

                                    <div class="group inline-block">
                                      <button onClick={() => handleDeleteTextPost(item)} type="button" class="focus:outline-none text-white  hover:bg-red-300 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 me-2 mb-2 dark:hover:bg-red-300 dark:focus:ring-red-900"><MdDelete size={20} color='red' /></button>
                                      {/* <ul
                class="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
        transition duration-150 ease-in-out origin-top p-3"
              >
                <li><button onClick={()=>handleEditPost(item)} class="flex rounded-sm hover:bg-gray-100 p-3"><CiEdit size={22} />&nbsp;Edit</button></li>
                <li><button  class="flex rounded-sm hover:bg-gray-100 p-3"><MdDelete size={22} />&nbsp;Delete</button></li>
              </ul> */}
                                    </div>


                                  </div>
                                </div>

                                {/* <div onClick={() => handleClick(doc)}> */}
                                <a href="#" >
                                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {item.postTitle}
                                  </h5>
                                </a>
                                <p class="line-clamp-1" dangerouslySetInnerHTML={{ __html: item.postContent }} />

                                {/* </div> */}
                              </div>
                              // <li key={item.id}>
                              //   <strong>Title:</strong> {item.postTitle}<br />
                              //   {/* <strong>Content:</strong><p dangerouslySetInnerHTML={{ __html: item.postContent }}/><br /> */}

                              //   <strong>User:</strong> {item.user ? item.user.name : 'Unknown'}<br />
                              //   {item.user?<img src={item.user.photoUrl}/>:'Unknown'}

                              // </li>
                            ))}
                          </div>
                      }

                    </div> :
                    <div>
                      {
                        imagemergedData.length === 0 ?
                          <div className='flex justify-center text-center'>Start uploading image post &nbsp;<NavLink to={"/uploadpost/imagepost"} className='text-blue-500 underline'>Upload now</NavLink></div> :
                          <div>
                            <div className="grid grid-cols-4 md:grid-cols-6">
                              {imagemergedData.map(item => (
                                <div key={item.id} className='max-w-2/4 mx-auto  w-3xl p-1'>
                                  <div className='flex justify-between'>
                                    <div className='flex '>
                                      {item.user ?
                                        <img className='w-4  h-4 rounded-full' src={item.user.photoUrl} /> : ""}

                                      <div className=' ml-1 '>
                                        {item.user ?
                                          <p className='text-xs'>{item.user.name}</p> : ""}

                                      </div>
                                    </div>
                                  </div>
                                  <h6 className='text-xs'>Posted on: {item.postedDate}</h6>
                                  {/* <div onClick={() => handleClick(doc)}> */}
                                  <a href="#" >
                                    <p className=" text-lg font-bold tracking-tight text-gray-900 dark:text-white leading-tight mb-1">
                                      {item.title}
                                    </p>
                                  </a>
                                  <div className="relative">
                                  <img className='h-52 w-52 max-w-full max-h-full rounded-lg' src={item.url} />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100   dark:focus:ring-red-900  h-52 w-52 max-w-full rounded-lg">
                                    <button onClick={() => handleDeleteImagePost(item)} type="button" class="focus:outline-none text-white  hover:bg-red-300 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm  dark:hover:bg-red-300 dark:focus:ring-red-900 h-52 w-52 max-w-full flex items-center justify-center"><MdDelete  size={50} color='red' /></button>
                                    </div>
                                  </div>
                                  {/* <div className='hover:'>
                                    <img className='h-52 w-52 max-w-full max-h-full rounded-lg' src={item.url} />
                                  </div> */}
                                  {/* </div> */}
                                </div>
                                // <li key={item.id}>
                                //   <strong>Title:</strong> {item.postTitle}<br />
                                //   {/* <strong>Content:</strong><p dangerouslySetInnerHTML={{ __html: item.postContent }}/><br /> */}

                                //   <strong>User:</strong> {item.user ? item.user.name : 'Unknown'}<br />
                                //   {item.user?<img src={item.user.photoUrl}/>:'Unknown'}

                                // </li>
                              ))}
                            </div>
                          </div>
                      }
                    </div>
                }
              </div>
            </div>
          }




        </div> : "Please login check your uploaded post."}
    </>
  );
};

export default Posts;
