import React, { useContext, useEffect } from 'react'
import { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import { auth, provider, firestore}  from "./../../../Firebase";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import { async } from '@firebase/util';

// import {AuthContext} from '../../../Context/AuthContext';
const TextPost = () => {
    const editor = useRef(null);

    const [uniqueIdCheck,setUniqueIdCheck]=useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState();
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);


    // Get current date
    const currentDate = new Date();

    // Convert date to string
    const dateString = currentDate.toDateString();
    const uniqueId = uuidv4();




    const handleTagsInputChange = (tags) => {
        setTags(tags)
    }
    // handleTitleChange
    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }


    // const handleTextareaChange = (event) => {
    //     // setTextareaValue(event.target.value);
    //     // Split the textarea value by newline characters ("\n")
    // const valuesArray = textareaValue.split(',').map(value => value.trim());
    // setTextareaValue(valuesArray)
    // // Do something with the extracted valuesArray, for example:
    // console.log(valuesArray);
    //  };


    const handlePost = () => {
        // console.log(tags);
        
        try {
            const postData = {
                postId: uniqueId,
                userId: localStorage.getItem("id"),
                postTitle: title,
                postContent: content,
                tags: tags,
                postedDate: dateString,
              };
              
              const postId = uniqueId; 
              
              const postRef = firestore.collection("posts").doc(postId);
              
              postRef.set(postData)
            
                .then((docRef) => {
                    console.log("Value added with ID: ", docRef.id);
                    setLoading(false)
                })
                .catch((error) => {
                    console.error("Error adding value: ", error);
                });
            setLoading(true)
        } finally {
            setLoading(false)
            navigate("/dashboard")
        }
    }
    if (loading) {
        navigate("/")
        return <div>LOADING...</div>;
    }

    const handleSaveAsDraft = () => {

        console.log('Title:', title);
    }


    // useEffect(() => {


    //     // Log current date string to the console
    //     console.log('Current Date:', dateString);
    //     console.log('Title:', title);
    // }, []);



    // const userlogindata=useContext(UserLoginContext)
    return (
        <div className='m-20'>
            {/* {userlogindata} */}
            <p className='m-5 text-3xl font-bold text-center'>Write here to post...</p>
            <input type={"text"} placeholder='Title' value={title} onChange={handleTitleChange} />
            <JoditEditor
                ref={editor}
                value={content}
                // config={config}
                // tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => { }}
                
            />
            {/* onChange={handleTextareaChange}  */}
            {/* <textarea onChange={handleTextareaChange} placeholder='Tags'/> */}
            {/* <Alert status='success' variant='left-accent'>
                <AlertIcon />
                Data uploaded to the server. Fire on!
            </Alert> */}
            <TagsInput value={tags} onChange={handleTagsInputChange} />

            <div className='text-center'>
                <button onClick={handlePost}
                    className='m-5 bg-black dark:bg-black-2 border-black black:border-black-2 border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-black-5'
                >Post</button>
                {/* <button onClick={handleSaveAsDraft}
                    className='m-5 dark:bg-dark-2 border-dark dark:border-dark-2 border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-black hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5'
                >Save as Draft</button> */}
            </div>

            <div>
                <p>Generated ID: {uniqueId}</p>
                {/* {content}
                <p dangerouslySetInnerHTML={{ __html: content }} /> */}
            </div>



        </div>
    )
}

export default TextPost
