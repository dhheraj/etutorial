import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { auth, provider, firestore, firebase } from "./../../Firebase";
import { accordion } from '@material-tailwind/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
const Dashboard = () => {
  const [followers, setFollowers] = useState([]);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [like, setLike] = useState([]);
  const [liked, setLiked] = useState([]);
  const [userId, setUserId] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [mergedData1, setMergedData1] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isCurrentUer, serIsCurrentUser] = useState(false)
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch followers
    const fetchFollowers = async () => {
      const followersRef = firestore.collection('follower').doc(localStorage.getItem("id")).collection('followers');
      const followersSnapshot = await followersRef.get();
      const followerList = followersSnapshot.docs.map(doc => doc.id);
      setFollowers(followerList);
      // console.log(followers)
      // Fetch user data for each follower
      const userDataPromises = followerList.map(async (followerId) => {
        // console.log(followerId)
        const userDoc = await firestore.collection('userlogin').doc(followerId).get();
        return userDoc.exists ? userDoc.data() : null;

      });
      const userData = await Promise.all(userDataPromises);
      setUsers(userData.filter(user => user !== null));

      //  console.log(userData.map(doc=>    
      //   ({id:doc.id})
      //  ))
    };
    fetchFollowers();
    //    const fetchLikesForPost = async (postId) => {
    //   try {
    //     // Construct the reference to the likedby subcollection of the specified post
    //     const likedByRef = firestore.collection('likes').doc(postId).collection('likedby');

    //     // Fetch the documents from the likedby subcollection
    //     const likedBySnapshot = await likedByRef.get();

    //     const likesForPost = likedBySnapshot.docs.map(doc => ({
    //       postId: postId,
    //       userId: doc.id,
    //       // Include additional fields as needed
    //       // Example: timestamp, additional information
    //       // You can access them using doc.data().fieldName
    //     }));
    //     setLiked(likesForPost.length)

    //     console.log('Likes for post', postId, ':', likesForPost);
    //   } catch (error) {
    //     console.error('Error fetching likes for post', postId, ':', error);
    //   }
    // };




    // const fetchAllLikes = async () => {
    //   try {
    //     // Construct a query to fetch all documents within the 'likedby' subcollection
    //     const querySnapshot = await firestore.collectionGroup('likedby').get();

    //     // Extract data from each document
    //     const likesData = querySnapshot.docs.map(doc => {
    //       const userId = doc.id; // Get the userId from the document ID
    //       const likeData = {
    //         userId: userId,
    //         ...doc.data() // Include other like data
    //       };
    //       console.log('UserId:', userId); // Log the userId
    //       return {
    //         postId: doc.ref.parent.parent.id, // Get the parent document ID (post ID)
    //         likeData: likeData
    //       };
    //     });

    //     console.log('All likes:', likesData);
    //   } catch (error) {
    //     console.error('Error fetching all likes:', error);
    //   }
    // };

    // // Call the function to fetch all likes
    // fetchAllLikes();



    // const fetchAllLikes = async () => {
    //   try {
    //     // Construct a query to fetch all documents within the 'likedby' subcollection
    //     const querySnapshot = await firestore.collectionGroup('likedby').get();

    //     // Extract data from each document
    //     while(liked){


    //       const likesData = querySnapshot.docs.map(doc => ({
    //         postId: doc.ref.parent.parent.id, // Get the parent document ID (post ID)
    //         likeData: {
    //           userId: doc.id, // The userId is the ID of the 'likedby' document
    //           ...doc.data() // Include other like data
    //         }

    //       }));

    //       setLiked(likesData)
    //       // console.log('likes: ', postIds);
    //     }

    //   const postIds = liked.map(like => like.postId);
    // console.log(postIds)

    //     postIds.map(postId => {
    //       firestore.collection('posts').where("postId", '==', postId).get()
    //         .then(querySnapshot => {
    //           const postData = querySnapshot.docs.map(doc => {
    //             const data = doc.data();
    //             const userId = data.userId; 
    //             if(localStorage.getItem('id')===userId){

    //               console.log(localStorage.getItem('id')===userId)
    //               setUserId(userId)
    //             }


    //             return {
    //               id: doc.id,
    //               userId: userId,
    //               ...data
    //             };
    //           });
    //           // console.log(postData);
    //         })
    //         .catch(error => {
    //           console.error('Error fetching post data:', error);
    //         });
    //     });


    //   } catch (error) {
    //     console.error('Error fetching all likes:', error);
    //   }
    // };

    // // Call the function to fetch all likes
    // fetchAllLikes();
    // const fetchLikedPosts = async () => {
    //   try {
    //     // Fetch all likes from the Firestore database
    //     const querySnapshot = await firestore.collectionGroup('likedby').get();

    //     // Extract data from each like document
    //     const likedPostsData = querySnapshot.docs.map(doc => ({
    //       postId: doc.ref.parent.parent.id,
    //       userId: doc.id
    //     }));

    //     // Set the liked posts in the state
    //     setLikedPosts(likedPostsData);
    //   } catch (error) {
    //     console.error('Error fetching liked posts:', error);
    //   }
    // };

    // fetchLikedPosts();



    // Usage: Specify the postId for the post whose likes you want to fetch
    // Replace with actual postId


    const fetchUserData1 = async () => {
      const textpostsSnapshot = await firestore.collection('posts').get();
      const textpostsData = textpostsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(textpostsData)
    }
    fetchUserData1()



    // const fetchPosts = async () => {
    //   try {
    //     // Fetch all posts from the Firestore database
    //     const postsSnapshot = await firestore.collection('posts').get();
    //     const postsData = postsSnapshot.docs.map(doc => ({
    //       id: doc.id,
    //       ...doc.data()
    //     }));
    //     setPosts(postsData);
    //   } catch (error) {
    //     console.error('Error fetching posts:', error);
    //   }
    // };

    // fetchPosts();

    // fetchLikesForPost(postId);
    const fetchUserData = async () => {
      // Fetch comments data
      const commentsSnapshot = await firestore.collection('comments').where('userId', '==', localStorage.getItem('id')).get();
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
    if (localStorage.getItem('id')) {
      serIsCurrentUser(true)
    }


    const fetchTotalLikes = async () => {
      try {
        let total = 0;

        // Query the posts collection where userId matches
        const postsSnapshot = await firestore.collection('posts').where('userId', '==', localStorage.getItem('id')).get();

        // Iterate through each post
        for (const postDoc of postsSnapshot.docs) {
          // Get the post ID
          const postId = postDoc.id;

          // Query the 'likedby' subcollection of each post
          const likesSnapshot = await firestore.collection('likes').doc(postId).collection('likedby').get();
          // console.log(postId)
          // Increment the total by the number of likes for this post
          total += likesSnapshot.size;
        }

        setTotalLikes(total);
      } catch (error) {
        setError('Error fetching total likes: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalLikes();

    const fetchTotalSaved = async () => {
      try {
        let total = 0;

        // Query the posts collection where userId matches
        const postsSnapshot = await firestore.collection('posts').where('userId', '==', localStorage.getItem('id')).get();

        // Iterate through each post
        for (const postDoc of postsSnapshot.docs) {
          // Get the post ID
          const postId = postDoc.id;

          // Query the 'likedby' subcollection of each post
          const savedSnapshot = await firestore.collection('saved').doc(postId).collection('savedby').get();
          // console.log(postId)
          // Increment the total by the number of likes for this post
          total += savedSnapshot.size;
        }

        setTotalSaved(total);
      } catch (error) {
        setError('Error fetching total likes: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalSaved();
  }, []);
  const fetchComments = async () => {
    try {
      const commentsSnapshot = await firestore
        .collection('comments')
        .where('userId', '==', localStorage.getItem('id'))
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
  // const fetchLikesForPost = async (postId) => {
  //   try {
  //     // Construct the reference to the 'likedby' subcollection of the specified post
  //     const likedByRef = firestore.collection('posts').doc(postId).collection('likedby');

  //     // Fetch the documents from the 'likedby' subcollection
  //     const likedBySnapshot = await likedByRef.get();

  //     // Calculate the total number of likes for the post
  //     const totalLikes = likedBySnapshot.docs.length;

  //     // Return the total number of likes for the post
  //     return totalLikes;
  //   } catch (error) {
  //     console.error('Error fetching likes for post', postId, ':', error);
  //     return 0;
  //   }
  // };
  const currentUser = localStorage.getItem('id');
  const currentUserLikedPosts = likedPosts.filter(post => post.userId === currentUser);

  // Calculate the total likes for the current user's posts
  // const totalComments = comments.length;
  const totalUsers = users.length;
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  // const totalLikes = liked.length;
  return (<>
    {isCurrentUer ?
      <Tabs  align='center' variant='enclosed'>
        <TabList >
          <Tab>Follower</Tab>
          <Tab>Likes</Tab>
          <Tab>Save</Tab>
          {/* <Tab>Three</Tab> */}
        </TabList>

        <TabPanels align='start'>
          <TabPanel>
          <h2>Followers: {totalUsers}</h2>
            <div>
              {users.map((user, index) => (
                <div key={index}>

                  <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                    <li class="pb-3 sm:pb-1">
                      <div class="flex items-center space-x-4 rtl:space-x-reverse">
                        <div class="flex-shrink-0">
                          <img class="w-8 h-8 rounded-full" src={user.photoUrl} alt="Neil image" />
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {user.name}
                          </p>
                          {/* <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                email@flowbite.com
              </p> */}
                        </div>
                        {/* <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              $320
            </div> */}
                      </div>
                    </li>
                  </ul>
                </div>


              ))}
            </div>


          </TabPanel>
          <TabPanel>
            <h2>Total Likes on User's Posts</h2>
            <p>Total likes: {totalLikes}</p>
          </TabPanel>
          <TabPanel>
            <h2>Total Save on User's Posts</h2>
            <p>Total saved: {totalSaved}</p>
          </TabPanel>
          {/* <TabPanel>
            <p>three!</p>
        </TabPanel> */}
        </TabPanels>
      </Tabs>
      // <div>
      // {/* //   <h2>Followers: {totalUsers}</h2>
      //      {data.map(doc=>
      //   <div key={doc.id}>
      //     {doc.postId}
      //   </div>
      // )} */}


      // {/* Comments {totalComments} */}
      // {/* {comments.map((comment, index) => (
      //   <div key={comment.id}> */}
      //     {/* Display the user who commented */}
      //     {/* {userData[index] && (
      //       <div>
      //         <div class="flex items-center gap-4 p-1">
      //           <img class="w-10 h-10 rounded-full" src={userData[index].photoUrl} alt="User profile" />
      //           <div class="font-medium dark:text-white">
      //             <div>{userData[index].name}</div>
      //             <div class="text-sm text-gray-500 dark:text-gray-400">{comment.timestamp && comment.timestamp.toDate().toLocaleDateString()}</div>
      //           </div>
      //         </div>
      //         <p className='pl-2 text-black'>{comment.text}</p><hr />
      //       </div>
      //     )}
      //   </div>
      // ))}
      // <h2>Total Likes on User's Posts</h2>
      // <p>Total likes: {totalLikes}</p> */}
      // {/* <h2>Likes: {totalLikes}</h2> */}
      // {/* <h2>Posts with Total Likes:</h2>
      // {posts.map(post => (
      //   <div key={post.id}>
      //     <p>Post ID: {post.id}</p>
      //     <p>Content: {post.content}</p>
      //     <p>Likes: {fetchLikesForPost(post.id)}</p>
      //   </div>
      // ))} */}
      // </div>
      : "Please login to check your Dashboard."}
  </>
  )
}

export default Dashboard;
