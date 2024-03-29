import React, { useState, useEffect } from 'react'
import { firestore, storage } from "./../../../Firebase";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import TagsInput from 'react-tagsinput'
import { v4 as uuidv4 } from 'uuid';
const ImagePost = () => {
    const [image, setImage] = useState(null);
    const [userId, setUserId] = useState(localStorage.getItem("id"));
    const [images1, setImages1] = useState([]);
    const navigate = useNavigate();
    const [title, setTitle] = useState();
    const [tags, setTags] = useState([]);
    const uniqueId = uuidv4();
    const currentDate = new Date();
    const dateString = currentDate.toDateString();
    const [postedDate, setPostedDate] = useState(dateString);
    const [postId,setPostId]=useState(uniqueId)
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    const [imageUrls, setImageUrls] = useState([]);
    const handleTagsInputChange = (tags) => {
        setTags(tags)
    }
    const [isCurrentUer,serIsCurrentUser]=useState(false)
    // handleTitleChange
    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }
    useEffect(() => {

        const fetchImages = async () => {
            try {
                const storageRef = storage.ref();
                const imagesRef = storageRef.child('imageposts'); // Replace 'images' with your Firebase Storage folder name

                const imageUrls = await imagesRef.listAll();
                const urls = await Promise.all(
                    imageUrls.items.map(async imageRef => {
                        const url = await imageRef.getDownloadURL();
                        return url;
                    })
                );

                setImageUrls(urls);
            } catch (error) {
                console.error('Error fetching images: ', error);
            }
        };

        fetchImages();
        if(localStorage.getItem('id')){
            serIsCurrentUser(true)
        }
        
        // console.log(isCurrentUer)
    }, []);
    
    const handleUpload = () => {
        const uploadTask = storage.ref(`imageposts/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
            // progress function
            },
            (error) => {
                console.log(error);
            },
            () => {
                // complete function
                storage
                    .ref("imageposts")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        // Store the URL in Firestore or perform other actions
                        firestore.collection("imageposts").doc(postId).set({ url ,userId,title,tags,postId,postedDate});
                        console.log(url)
                    });
                    

            },
            // navigate('/posts')
        );
    };

    return (
        <>
        {isCurrentUer? <div className='m-20'>
        <input type={"text"} placeholder='Title' value={title} onChange={handleTitleChange} />
    <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input onChange={handleImageChange} id="dropzone-file" type="file" className="hidden" />
        </label>
    </div>
    <TagsInput value={tags} onChange={handleTagsInputChange} />
    <button
        onClick={handleUpload}
        className='m-5 bg-black dark:bg-black-2 border-black black:border-black-2 border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-black-5'><IoCloudUploadOutline />&nbsp;&nbsp;Upload</button>
    
   
    
    </div>:"Please login to upload your post."}
</>
    )
}

export default ImagePost
