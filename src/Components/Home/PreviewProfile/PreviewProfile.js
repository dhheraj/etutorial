import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from "./../../../Context/AuthContext"
import { useParams } from 'react-router-dom';
import { auth, provider, firestore, firebase } from "./../../../Firebase";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { GoPlus, GoComment } from "react-icons/go";
import { RiUserFollowLine,RiUserUnfollowLine  } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
const PreviewProfile = () => {
  // const { authUser, setAuthUser, postPreview, setPostPreview } = useContext(AuthContext);
  let { userId } = useParams();
  const [displayFollowBtn, setDisplayFollowBtn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mergedData, setMergedData] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const [isfollow, setIsFollow] = useState(false);
  const [docid, setDocid] = useState("");
  const [isSave, setIsSave] = useState(false);
  const [isComment, setIsComment] = useState(false);
  
  const currentDate = new Date();
  const [followers, setFollowers] = useState([]);
  const [users, setUsers] = useState([]);
    // Convert date to string
  const dateString = currentDate.toDateString();
  const uniqueId = uuidv4();
  const [textmergedData, setTextMergedData] = useState([]);
  const [imagemergedData, setImageMergedData] = useState([]);

  useEffect(() => {
    const fetchData1 = async () => {
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

    fetchData1();
    // Function to fetch a single document from Firestore
    // firestore.collection("userlogin").doc(localStorage.getItem("did")).get()
    // Assuming you have a collection named 'users'
    const fetchData = async () => {
      try {
        // Query posts collection
        // const postsSnapshot = await firestore.collection('posts').where("userId", "==", userId).get();
        // const postsData = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // // Query users collection
        // const usersSnapshot = await firestore.collection('userlogin').get();
        // const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Merge data based on common field (userId)
        // const mergedData = postsData.map(post => {
        //   const user = usersData.find(user => user.userId === post.userId);
        //   return { ...post, user };
        // });
        const snapshot = await firestore.collection("userlogin").where("userId","==",userId).get();
        const fetchedData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMergedData(fetchedData);
      } catch (error) {
        setError('Error fetching document: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // const fetchLikes = async () => {
    //   const snapshot = await firestore.collection('posts').where("postId", "==", postId).get();
    //   const postData = snapshot.docs.map(doc => ({
    //     id: doc.id, // <-- Access the document ID using doc.id
    //     ...doc.data()

    //   }));
      
    //   const documentIds = postData.map(post => post.id);
    //   console.log(documentIds);
    //   setDocid(documentIds)
    //   const doc = await firestore.collection('posts').doc(docid).get();
    //   if (doc.exists) {
    //     const data = doc.data();
    //     setLike(data.likes || 0);
    //     // setDislikes(data.dislikes);
    //   }
    // };

    // fetchLikes();

    // .then((snapShot)=>{
    //   if(snapShot){
    //     setProfileData(snapShot.data());
    //   }
    // })
    // Invoke the function
    const checkFollowing = async () => {
      const followingRef = firestore.collection('follower').doc(userId).collection('followers').doc(currentUser.uid);
      const followingSnapshot = await followingRef.get();
      setIsFollow(followingSnapshot.exists);
      console.log(isfollow)
    };

    const currentUser = auth.currentUser;
    if (currentUser) {
      checkFollowing();
      
    }
if(userId===localStorage.getItem("id")){
  setDisplayFollowBtn(false)
}
const fetchFollowers = async () => {
  const followersRef = firestore.collection('follower').doc(localStorage.getItem("id")).collection('followers');
  const followersSnapshot = await followersRef.get();
  const followerList = followersSnapshot.docs.map(doc => doc.id);
  setFollowers(followerList);

  // Fetch user data for each follower
  const userDataPromises = followerList.map(async (followerId) => {
    console.log(followerId)
    const userDoc = await firestore.collection('userlogin').doc(followerId).get();
    return userDoc.exists ? userDoc.data() : null;
  });
  const userData = await Promise.all(userDataPromises);
  setUsers(userData.filter(user => user !== null));
 console.log(userData.map(doc=>    
  ({id:doc.id})
 ))
};
fetchFollowers();

}, [userId]);
  const totalUsers = users.length;
  const totalPosts = (textmergedData.length)+(imagemergedData.length);
 
  if (loading) {
    return <div className="text-center">
      <div role="status">
        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className=" text-black">Loading...</span>
      </div>
    </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  // const handleSaveBtn = () => {

  // }
  // const handleMenuBtn = () => {

  // }
  const handleFollow=async()=>{
    const currentUser = auth.currentUser;
    if (currentUser) {
      const followingRef = firestore.collection('follower').doc(userId).collection('followers').doc(currentUser.uid);
      await followingRef.set({ followedAt: firebase.firestore.FieldValue.serverTimestamp() });
      
    }setIsFollow(true)
    
    
  }
  const handleUnfollow=async()=>{
    const currentUser = auth.currentUser;
    if (currentUser) {
      const followingRef = firestore.collection('follower').doc(userId).collection('followers').doc(currentUser.uid);
      await followingRef.delete();
      setIsFollow(false)
    }
    
  }
  return (
    <div>
      {/* {userId} <br /> */}
       {mergedData.map(item => (
        <div key={item.id} className="mt-5 max-w-4/5 mx-auto  w-4/5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {/* <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {item.postTitle}
          </h1> */}
          <div className='mb-3 flex justify-between'>

            <div className='mb-3 flex '>
             
                <img className='w-12 rounded-full' src={item.photoUrl} alt="user profile photo" />

              <div className='mt-1 ml-3 '>
                <p className='text-lg'>
                   {item.name}
                </p>
                <h6 className='text-sm'>Joined on: {item.joinedon}</h6>
              </div>
            </div>
            {
              displayFollowBtn?
              <div className='mt-1'>
              
              {
                  isfollow?
                  <button  onClick={handleUnfollow} className='flex rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'><RiUserUnfollowLine size={26} /><span className='text-lg'> Unfollow</span></button>
                  
                  :
                  <button  onClick={handleFollow} className='flex rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'><RiUserFollowLine  size={26} /><span className='text-lg'> Follow</span></button>
                }
              
              

              
            </div>:""
            }
            
          </div>
          {/* Followers: {totalUsers}&nbsp; */}
          {/* Posts: {totalPosts} */}
          <h6>Email Id: {item.emailId}</h6>
          <h6>About: {item.about}</h6>
        </div>


      ))}
    </div>
  )
}

export default PreviewProfile