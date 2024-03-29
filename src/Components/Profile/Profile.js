import React, { useState, useEffect } from 'react'
import { auth, provider, firestore } from "../../Firebase";
import { PaperClipIcon } from '@heroicons/react/20/solid'
import Login from '../Login/Login';
const Profile = () => {
  const [profiledata, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCurrentUer,serIsCurrentUser]=useState(false)
  useEffect(() => {
    // Function to fetch a single document from Firestore
    // firestore.collection("userlogin").doc(localStorage.getItem("did")).get()
    // Assuming you have a collection named 'users'
    if(localStorage.getItem('id')){
      serIsCurrentUser(true)
    }else{
      serIsCurrentUser(false)
    }
    const fetchData = async () => {
      try {
        const fieldValue = localStorage.getItem("id"); // Value to search for
        const querySnapshot = await firestore.collection('userlogin').where('userId', '==', fieldValue).limit(1).get();

        if (!querySnapshot.empty) {
          // Since limit(1) is used, there should be only one document in the result
          querySnapshot.forEach(doc => {
            setProfileData(doc.data());
          });
        } else {
          setError('Document not found');
        }
      } catch (error) {
        setError('Error fetching document: ' + error.message);
      }finally {
        setLoading(false);
      }
    };

    fetchData();

    // .then((snapShot)=>{
    //   if(snapShot){
    //     setProfileData(snapShot.data());
    //   }
    // })
    // Invoke the function
  }, []);
  if (loading) {
    return <div className="flex justify-center items-center h-screen">
    <div className="relative inline-flex">
        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
        <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
    </div>
</div>
  }
  if (error) {
    return <div>{error} - Please check login to view your profile</div>;
  }


  return (
    <div><div className='mx-5'>
        {/* <p className='text-xl font-bold'>{profiledata.name}</p >
      <p className='text-xl font-bold'>{profiledata.emailId}</p > */}

      {/* <pre>{JSON.stringify(profiledata, null, 2)}</pre> */}
     


      <div className="flex items-center gap-x-6">
        <img className="h-16 w-16 rounded-full" src={profiledata.photoUrl} alt="" />
        <div>
          <h2 className="text-base font-semibold leading-7 tracking-tight text-gray-900 ">{profiledata.name}</h2>
          <p className="text-xs font-semibold leading-6 text-indigo-500">Joined On: {profiledata.joinedon}</p>
        </div>
      </div>


      {/* <div className="px-4 sm:px-0">
        <img src={profiledata.photoUrl} />
        <h3 className="text-base font-semibold leading-7 text-gray-900">User Information</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Details of the {profiledata.name}.</p>
      </div> */}
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profiledata.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">username</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">@ username</dd>
          </div>
          {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Application for</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Backend Developer</dd>
        </div> */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profiledata.emailId}</dd>
          </div>
          {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Salary expectation</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
        </div> */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">About</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
             about
            </dd>
          </div>
          {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
          <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
              <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                <div className="flex w-0 flex-1 items-center">
                  <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  <div className="ml-4 flex min-w-0 flex-1 gap-2">
                    <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                    <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Download
                  </a>
                </div>
              </li>
              <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                <div className="flex w-0 flex-1 items-center">
                  <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  <div className="ml-4 flex min-w-0 flex-1 gap-2">
                    <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                    <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Download
                  </a>
                </div>
              </li>
            </ul>
          </dd>
        </div> */}
        </dl>
      </div>
    </div>
      
      
    </div>
  )
}

export default Profile
