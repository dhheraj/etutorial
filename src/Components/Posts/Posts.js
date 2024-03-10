import React, { useState, useEffect, useRef } from 'react'
import { auth, provider, firestore } from "../../Firebase";
import { Spinner } from '@chakra-ui/react'
import { CiMenuKebab,CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
const Posts = () => {
  const [mergedData, setMergedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const menuLeft = useRef(null);
  const menuRight = useRef(null);
  const toast = useRef(null);
  const items = [
    {
      label: 'Options',
      items: [
        {
          label: 'Refresh',
          icon: 'pi pi-refresh'
        },
        {
          label: 'Export',
          icon: 'pi pi-upload'
        }
      ]
    }
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Query posts collection
        const postsSnapshot = await firestore.collection('posts').where("userId", "==", localStorage.getItem("id")).get();
        const postsData = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Query users collection
        const usersSnapshot = await firestore.collection('userlogin').get();
        const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Merge data based on common field (userId)
        const mergedData = postsData.map(post => {
          const user = usersData.find(user => user.userId === post.userId);
          return { ...post, user };
        });

        setMergedData(mergedData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
      finally {
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Posted Content</h1>
      {loading ?
        <div className='flex justify-center text-center items-center h-96'>
          LOADING...
        </div>

        : ""}
      {mergedData.map(item => (
        <div key={item.id} className="mt-5 max-w-4/5 mx-auto  w-4/5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className='mb-3 flex justify-between'>
            <div className='mb-3 flex '>
              <img className='w-12' src={localStorage.getItem("pp")} />

              <div className='mt-1 ml-3 '>
                <p className='text-lg'>{localStorage.getItem("name")}</p>
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
                  <li class="flex rounded-sm p-3 hover:bg-gray-100"><CiEdit size={22}/>&nbsp;Edit</li>
                  <li class="rounded-sm p-3 hover:bg-gray-100 flex"><MdDelete  size={22}/>&nbsp;Delete</li>
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
    </div>
  );
};

export default Posts;
