import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from "./../../../Context/AuthContext"
import { useParams } from 'react-router-dom';
import { auth, provider, firestore, firebase, app } from "./../../../Firebase";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { GoPlus, GoComment } from "react-icons/go";
import { comment } from 'postcss';
const PreviewPost = () => {
  // const { authUser, setAuthUser, postPreview, setPostPreview } = useContext(AuthContext);
  let { postId, userId } = useParams();
  const [profiledata, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mergedData, setMergedData] = useState([]);
  const [mergedData1, setMergedData1] = useState([]);
  const [isLike, setIsFollow] = useState(false);
  const [isFollow, setIsLike] = useState(false);
  const [docid, setDocid] = useState("");
  const [like, setLike] = useState([]);
  const [isSave, setIsSave] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [liked, setLiked] = useState(false);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState([]);

  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  useEffect(() => {
    // Function to fetch a single document from Firestore
    // firestore.collection("userlogin").doc(localStorage.getItem("did")).get()
    // Assuming you have a collection named 'users'
    const fetchData = async () => {
      try {
        // Query posts collection
        const postsSnapshot = await firestore.collection('imageposts').where("postId", "==", postId).get();
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
    const checkLikes = async () => {
      const followingRef = firestore.collection('likes').doc(postId).collection('likedby').doc(currentUser.uid);
      const followingSnapshot = await followingRef.get();
      setIsLike(followingSnapshot.exists);
    };

    const currentUser = auth.currentUser;
    if (currentUser) {
      checkLikes();

    }
    const fetchLikes = async () => {
      const followersRef = firestore.collection('likes').doc(postId).collection('likedby');
      const followersSnapshot = await followersRef.get();
      const followerList = followersSnapshot.docs.map(doc => doc.id);
      setLike(followerList);
      setUsers(followerList.length)
    };
    fetchLikes();

    const fetchUserData = async () => {
      // Fetch comments data
      const commentsSnapshot = await firestore.collection('comments').where('postId', '==', postId).get();
      const commentsData = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Extract user IDs from comments
      const userIds = commentsData.map(comment => comment.userId);

      // Fetch userlogin data for each user ID
      const userDataPromises = userIds.map(async (userId) => {
        const userDoc = await firestore.collection('userlogin').doc(userId).get();
        return userDoc.exists ? userDoc.data() : null;
      });

      // Wait for all promises to resolve
      const userData = await Promise.all(userDataPromises);

      // console.log(userData);
      setUserData(userData)
      const mergedvalue = comments.map(
        comment => {
          const user = userData.find(user => user.userId === comment.userId);
          return { ...comment, user }
        }
      )
      setMergedData1(mergedvalue)
    }
    fetchUserData()

    fetchComments();
    if (localStorage.getItem('id') === userId) {
      setIsFollow(true)
      console.log(userId)
    }
  }, []);
  const fetchComments = async () => {
    try {
      const commentsSnapshot = await firestore
        .collection('comments')
        .where('postId', '==', postId)
        .orderBy('timestamp', 'desc')
        .get();

      const commentsData = [];
      const userData = [];

      for (const doc of commentsSnapshot.docs) {
        const comment = { id: doc.id, ...doc.data() };
        commentsData.push(comment);

        // Fetch user data for the comment's userId
        const userDoc = await firestore.collection('userlogin').doc(comment.userId).get();
        const user = userDoc.exists ? { id: userDoc.id, ...userDoc.data() } : null;
        if (user) {
          userData.push(user);
        }
      }

      setComments(commentsData);
      setUserData(userData);
    } catch (error) {
      console.error('Error fetching comments:', error.message);
    }
  };

  const totalUsers = users;
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
  const handleLikeBtn = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const followingRef = firestore.collection('likes').doc(postId).collection('likedby').doc(currentUser.uid);
      await followingRef.set({ followedAt: firebase.firestore.FieldValue.serverTimestamp() });

    } setIsLike(true)
  };

  const handleSaveBtn = () => {

  }
  const handleMenuBtn = () => {

  }
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const newComment = {
  //       text: commentText,
  //       timestamp: firebase.firestore.FieldValue.serverTimestamp()
  //     };

  //     // Add the new comment to the 'comments' collection in Firestore
  //     await firestore.collection('comments').add(newComment);

  //     console.log('Comment added successfully.');
  //   } catch (error) {
  //     console.error('Error adding comment:', error.message);
  //   }finally {
  //     setLoading(false);
  //   }
  // };
  const handleCommentSubmit = async () => {
    try {
      // Add comment to Firestore
      await firestore.collection('comments').add({
        postId: postId,
        userId: localStorage.getItem('id'),
        text: commentText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      // Clear comment input
      setCommentText('');
      // Fetch comments again after adding a new comment
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  return (
    <div>
      {/* <br />{postId}  */}
      {mergedData.map(item => (
        <div key={item.id} className="mt-5 max-w-4/5 mx-auto  w-4/5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {item.postTitle}
          </h1>
          <div className='mb-3 flex justify-between'>

            <div className='mb-3 flex '>
              {item.user ?
                <img className='w-12 rounded-full' src={item.user.photoUrl} alt="user profile photo" />
                : 'Error in loading user profile'
              }

              <div className='mt-1 ml-3 '>
                <p className='text-lg'>
                  {item.user ? item.user.name : 'Error in loading user name'}
                </p>
                <h6 className='text-sm'>Posted on: {item.postedDate}</h6>
              </div>
            </div>
            <div className='mt-1'>
              <button className='flex'><GoPlus size={26} /><span className='text-lg'> Follow</span></button>
            </div>
          </div>
          <div className='m-5 flex'>
            <div className='flex'>
              <button onClick={handleLikeBtn}>
                <IoIosHeartEmpty size={26} /></button>
              <p className='text-xl'>{totalUsers}</p>
            </div>
            <div>
              <button onClick={handleSaveBtn}>
                <IoBookmarkOutline size={26} /></button>
            </div>
            <div>
              <button onClick={handleMenuBtn}>
                <CiMenuKebab size={26} /></button>
            </div>
          </div>

          <img src={item.url} /><br/><hr/>
          <h3>Comments</h3>
      <div>
        <input type='text'
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Enter your comment..."
        />
        <button onClick={handleCommentSubmit}>Submit</button>
      </div>

      {/* Display comments */}
      <div>
        {comments.map((comment, index) => (
          <div key={comment.id}>
            {/* Display the user who commented */}
            {userData[index] && (
              <div>
                <div class="flex items-center gap-4 p-1">
                  <img class="w-10 h-10 rounded-full" src={userData[index].photoUrl} alt="User profile" />
                  <div class="font-medium dark:text-white">
                    <div>{userData[index].name}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{comment.timestamp && comment.timestamp.toDate().toLocaleDateString()}</div>
                  </div>
                </div>
                <p className='pl-2 text-black'>{comment.text}</p><hr/>
              </div>
            )}
          </div>
        ))}
      </div>
        </div>


      ))}

      
    </div>
  )
}

export default PreviewPost







