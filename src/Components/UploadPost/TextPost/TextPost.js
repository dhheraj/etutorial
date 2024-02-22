import React from 'react'
import { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';

const TextPost = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    function handlePost() {
        console.log(content);
    }
  return (
    <div className='m-20'>
      <p className='m-5 text-3xl font-bold text-center'>Write here to post...</p>
            <JoditEditor
                ref={editor}
                value={content}
                // config={config}
                // tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => { }}
            />
            <div className='text-center'>
                <button onClick={handlePost}
                    className='m-5 bg-dark dark:bg-dark-2 border-dark dark:border-dark-2 border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5'
                >Post</button>
                <button
                    className='m-5 dark:bg-dark-2 border-dark dark:border-dark-2 border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-black hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5'
                >Save as Draft</button>
            </div> 
    </div>
  )
}

export default TextPost
