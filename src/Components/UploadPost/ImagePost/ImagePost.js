import React, { useState, useEffect } from 'react';
import { firestore, storage } from "./../../../Firebase";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import TagsInput from 'react-tagsinput';
import { v4 as uuidv4 } from 'uuid';

const ImagePost = () => {
    const [image, setImage] = useState('');
    
    const [imageSelected, setImageSelected] = useState(false);
    // const [imageName, setImageName] = useState('');
    const [userId, setUserId] = useState(localStorage.getItem("id"));
    const [images1, setImages1] = useState([]);
    const navigate = useNavigate();
    const [title, setTitle] = useState();
    const [tags, setTags] = useState([]);
    const uniqueId = uuidv4();
    const currentDate = new Date();
    const dateString = currentDate.toDateString();
    const [postedDate, setPostedDate] = useState(dateString);
    const [postId, setPostId] = useState(uniqueId);
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            // console.log(e.target.files[0])
            // setImageName(e.target.files[0].name)
        }
    };

    const handleTagsInputChange = (tags) => {
        setTags(tags);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const storageRef = storage.ref();
                const imagesRef = storageRef.child('imageposts');

                const imageUrls = await imagesRef.listAll();
                const urls = await Promise.all(
                    imageUrls.items.map(async imageRef => {
                        const url = await imageRef.getDownloadURL();
                        return url;
                    })
                );

                // setImageUrls(urls);
            } catch (error) {
                console.error('Error fetching images: ', error);
            }
        };

        fetchImages();
        if (localStorage.getItem('id')) {
            setIsCurrentUser(true);
        }
if(image!==null){
    setImageSelected(true)
}
    }, []);

    const handleUpload = () => {
        setIsLoading(true);
        const uploadTask = storage.ref(`imageposts/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setUploadProgress(progress);
            },
            (error) => {
                console.log(error);
                setIsLoading(false);
            },
            () => {
                storage
                    .ref("imageposts")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        firestore.collection("imageposts").doc(postId).set({ url, userId, title, tags, postId, postedDate });
                        console.log(url);
                        setIsLoading(false);
                        setUploadProgress(0);
                    })
                    .catch(error => {
                        console.error('Error uploading image to Firestore: ', error);
                        setIsLoading(false);
                        setUploadProgress(0);
                    });
            }
        );
    };

    return (
        <>
            {isCurrentUser ? (
                <div className='m-20'>
                    <input type={"text"} placeholder='Title' value={title} onChange={handleTitleChange} />
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input onChange={handleImageChange} id="dropzone-file" type="file" className="hidden" />
                        </label>
                    </div>
                    {imageSelected?<div>{image.name}</div>
                    :"Please select the file to upload"}
                    
                   
                   
                    <TagsInput value={tags} onChange={handleTagsInputChange} />
                    {uploadProgress > 0 && (
                        <div className="mt-3">
                            <progress value={uploadProgress} max="100" />
                        </div>
                    )}
                    {isLoading ? (
                        <button className='m-5 bg-gray dark:bg-gray-2 border-black black:border-black-2 border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-black hover:bg-body-color hover:border-body-color disabled:bg-black-3 disabled:border-black-3 disabled:text-black-5' disabled="true"><div className="w-5 h-5 border-4 border-gray-300 rounded-full border-t-gray-500 animate-spin"></div>&nbsp;&nbsp;Upload</button>
                
                            
                    ) : (
                        <button
                            onClick={handleUpload}
                            className='m-5 bg-black dark:bg-black-2 border-black black:border-black-2 border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-black-5'><IoCloudUploadOutline />&nbsp;&nbsp;Upload</button>
                    )}
                    
                </div>
            ) : (
                "Please login to upload your post."
            )}
        </>
    );
};

export default ImagePost;
