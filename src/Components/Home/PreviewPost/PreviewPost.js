import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth, firestore, firebase } from './../../../Firebase';
import { IoIosHeartEmpty } from 'react-icons/io';
import { IoHeart } from "react-icons/io5";
import { IoBookmark,IoBookmarkOutline } from 'react-icons/io5';
import { RiUserFollowLine,RiUserUnfollowLine  } from "react-icons/ri";
import { CiMenuKebab } from 'react-icons/ci';
import { GoPlus, GoComment } from 'react-icons/go';
const PreviewPost = () => {
  const { postId, userId } = useParams();
  const [profiledata, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mergedData, setMergedData] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [users, setUsers] = useState([]);
  const [followers, setFollowers] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Query posts collection
        const postsSnapshot = await firestore.collection('posts').where("postId", "==", postId).get();
        const postsData = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Query users collection
        const usersSnapshot = await firestore.collection('userlogin').get();
        const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Merge data based on common field (userId)
        const mergedData = postsData.map(post => {
          const user = usersData.find(user => user.userId === post.userId);
          return { ...post, user };
        });
        const currentUser = auth.currentUser;
        if (currentUser) {
          const followingRef = firestore.collection('follower').doc(userId).collection('followers').doc(currentUser.uid);
          const followingSnapshot = await followingRef.get();
          setIsFollowing(followingSnapshot.exists);
        }
        setMergedData(mergedData);
      } catch (error) {
        setError('Error fetching document: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    // fetchData();

    fetchData();
    fetchLikes();
    fetchSavepost();
    fetchComments();
  }, [postId, userId]);
  const handleFollow = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const followingRef = firestore.collection('follower').doc(userId).collection('followers').doc(currentUser.uid);
        if (!isFollowing) {
          await followingRef.set({ followedAt: firebase.firestore.FieldValue.serverTimestamp() });
        } else {
          await followingRef.delete();
        }
        setIsFollowing(!isFollowing);
      }
    } catch (error) {
      console.error('Error handling follow:', error);
    }
  };
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
  const fetchLikes = async () => {
    try {
      const likesSnapshot = await firestore.collection('likes').doc(postId).collection('likedby').get();
      const likesCount = likesSnapshot.docs.length;
      setLikesCount(likesCount);

      const currentUser = auth.currentUser;
      if (currentUser) {
        const liked = likesSnapshot.docs.some(doc => doc.id === currentUser.uid);
        setIsLiked(liked);
      }
    } catch (error) {
      console.error('Error fetching likes:', error.message);
    }
  };
  const fetchSavepost = async () => {
    try {
      const likesSnapshot = await firestore.collection('saved').doc(postId).collection('savedby').get();
      const savedCount = likesSnapshot.docs.length;
      setSavedCount(savedCount);

      const currentUser = auth.currentUser;
      if (currentUser) {
        const saved = likesSnapshot.docs.some(doc => doc.id === currentUser.uid);
        setIsSaved(saved);
      }
    } catch (error) {
      console.error('Error fetching likes:', error.message);
    }
  };

  const handleSave = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const likeRef = firestore.collection('saved').doc(postId).collection('savedby').doc(currentUser.uid);
      if (isSaved) {
        await likeRef.delete();
         setSavedCount(prevCount => prevCount - 1);
      } else {
        await likeRef.set({ likedAt: firebase.firestore.FieldValue.serverTimestamp() });
         setSavedCount(prevCount => prevCount + 1);
      }
      setIsSaved(!isSaved);
    }
  };
  const handleLike = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const saveRef = firestore.collection('likes').doc(postId).collection('likedby').doc(currentUser.uid);
      if (isLiked) {
        await saveRef.delete();
        setLikesCount(prevCount => prevCount - 1);
      } else {
        await saveRef.set({ likedAt: firebase.firestore.FieldValue.serverTimestamp() });
        setLikesCount(prevCount => prevCount + 1);
      }
      setIsLiked(!isLiked);
    }
  };

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
      setCommentsCount(commentsData.length)
      // console.log(commentsData.length)
    } catch (error) {
      console.error('Error fetching comments:', error.message);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {mergedData.map(item => (
        <div key={item.id} className="mt-5 max-w-4/5 mx-auto w-4/5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.postTitle}</h1>
          <div className='mb-3 flex justify-between'>
            <div className='mb-3 flex '>
              {/* Display user profile */}
              {item.user ?
                <img className='w-12 h-12 rounded-full' src={item.user.photoUrl} alt="user profile photo" />
                : 'Error in loading user profile'
              }

              <div className='ml-3 '>
                <p className='text-lg'>
                  {item.user ? item.user.name : 'Error in loading user name'}
                </p>
                <h6 className='text-sm'>Posted on: {item.postedDate}</h6>
              </div>
            </div>
            <div className='mt-1'>
            {/* Follow Button */}
            {
              localStorage.getItem("id")===userId?"": <button onClick={handleFollow}>
              {isFollowing ? <div className='flex rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'><RiUserUnfollowLine size={26} /><span className='text-lg'> Unfollow</span></div> : <div className='flex rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'><RiUserFollowLine size={26} /><span className='text-lg'> Follow</span></div>}
            </button>
            }
     
            </div>
          </div>
          <div className='mt-1 flex'>
              <button className='flex' onClick={handleLike}>
                {isLiked ? (
                  <>
                    <IoHeart size={24} color="#ff0000" />
                    <span className='text-lg'>{likesCount}</span>
                  </>
                ) : (
                  <>
                    <IoIosHeartEmpty size={24} />
                    <span className='text-lg'>{likesCount}</span>
                  </>
                )}
              </button>
              {/* Save post btn  */}
              <button className='flex' onClick={handleSave}>
                {isSaved ? (
                  <>
                    <IoBookmark size={24} color="black" />
                    <span className='text-lg'>{savedCount}</span>
                  </>
                ) : (
                  <>
                    <IoBookmarkOutline size={24} />
                    <span className='text-lg'>{savedCount}</span>
                  </>
                )}
              </button>
            </div>
          {/*<div className='m-5 flex'>
             Other elements
          </div> */}
          <p dangerouslySetInnerHTML={{ __html: item.postContent }} /><br /><hr />
          <h3>{commentsCount} Comments</h3>
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
  );
};

export default PreviewPost;

