import React, { useState, useEffect, useRef } from 'react'
import { auth, provider, firestore } from "../../Firebase";
import { Spinner } from '@chakra-ui/react'
import { CiMenuKebab, CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { useNavigate,Link } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const Posts = () => {
  const navigate=useNavigate();
  const [mergedData, setMergedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [textmergedData, setTextMergedData] = useState([]);
  const [imagemergedData, setImageMergedData] = useState([]);
  const [data, setData] = useState('');
  useEffect(() => {
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

    fetchData();
  }, []);
const handleEditPost=(item)=>{
  setData(`/editpost/${item.postId}`)
  navigate(data)
}
  return (
    <div>
      <h1>Posted Content</h1>
      {loading ?
        <div class="flex justify-center items-center h-screen">
          <div class="relative inline-flex">
            <div class="w-8 h-8 bg-blue-500 rounded-full"></div>
            <div class="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
            <div class="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
          </div>
        </div>

        : ""}


      <Tabs variant='enclosed'>
        <TabList>
          <Tab>Text</Tab>
          <Tab>Image</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
          {textmergedData.map(item => (
        <div key={item.id} className="mt-5 max-w-4/5 mx-auto  w-4/5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className='mb-3 flex justify-between'>
            <div className='mb-3 flex '>
              {item.user?
              <img className='w-12 rounded-full' src={item.user.photoUrl} />:""}
              

              <div className='mt-1 ml-3 '>
              {item.user?
              <p className='text-lg'>{item.user.name}</p>:""}
                
                <h6 className='text-sm'>Posted on: {item.postedDate}</h6>
              </div>
            </div>
            <div className='mt-1'>

              <div class="group inline-block">
                <button
                  class=" px-3 py-1 bg-white rounded-sm flex"
                >
                  <span class="pr-1 font-semibold flex-1"> <CiMenuKebab /></span>
                </button>
                <ul
                  class="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
          transition duration-150 ease-in-out origin-top p-3"
                >
                  <li><button onClick={()=>handleEditPost(item)} class="flex rounded-sm hover:bg-gray-100 p-3"><CiEdit size={22} />&nbsp;Edit</button></li>
                  <li><button  class="flex rounded-sm hover:bg-gray-100 p-3"><MdDelete size={22} />&nbsp;Delete</button></li>
                </ul>
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
          </TabPanel>
          <TabPanel>
          {imagemergedData.map(item => (
        <div key={item.id} className="mt-5 max-w-4/5 mx-auto  w-4/5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className='mb-3 flex justify-between'>
            <div className='mb-3 flex '>
            {item.user?
              <img className='w-12 rounded-full' src={item.user.photoUrl} />:""}

              <div className='mt-1 ml-3 '>
              {item.user?
              <p className='text-lg'>{item.user.name}</p>:""}
                <h6 className='text-sm'>Posted on: {item.postedDate}</h6>
              </div>
            </div>
            <div className='mt-1'>

              <div class="group inline-block">
                <button
                  class=" px-3 py-1 bg-white rounded-sm flex"
                >
                  <span class="pr-1 font-semibold flex-1"> <CiMenuKebab /></span>
                </button>
                <ul
                  class="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
          transition duration-150 ease-in-out origin-top p-3"
                >
                  <li><button onClick={()=>handleEditPost(item)} class="flex rounded-sm hover:bg-gray-100 p-3"><CiEdit size={22} />&nbsp;Edit</button></li>
                  <li><button  class="flex rounded-sm hover:bg-gray-100 p-3"><MdDelete size={22} />&nbsp;Delete</button></li>
                </ul>
              </div>


            </div>
          </div>

          {/* <div onClick={() => handleClick(doc)}> */}
          <a href="#" >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item.title}
            </h5>
          </a>
         <img className='w-40' src={item.url}/>

          {/* </div> */}
        </div>
        // <li key={item.id}>
        //   <strong>Title:</strong> {item.postTitle}<br />
        //   {/* <strong>Content:</strong><p dangerouslySetInnerHTML={{ __html: item.postContent }}/><br /> */}

        //   <strong>User:</strong> {item.user ? item.user.name : 'Unknown'}<br />
        //   {item.user?<img src={item.user.photoUrl}/>:'Unknown'}

        // </li>
      ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
      
    </div>
  );
};

export default Posts;
