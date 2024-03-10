import React from 'react'
import "./../UploadPost/UploadPost.css"
import { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

const UploadPost = () => {
    const navigate = useNavigate();
    const editor = useRef(null);
    const [content, setContent] = useState('');

    function handlePost() {
        console.log(content);
    }
    function handleTextTypeOfPost() {
        navigate("/uploadpost/textpost")
    }
    function handleImageTypeOfPost() {
        navigate("/uploadpost/imagepost")
    }

    // const config = useMemo(
    // 	{
    // 		readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    // 		placeholder: placeholder || 'Start typings...'
    // 	},
    // 	[placeholder]
    // );

    return (
        <div className='m-20 '>
            {/* <p className='m-5 text-3xl font-bold text-center'>Write here to post...</p>
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
            </div> */}
            <section className="bg-white  pt-10 dark:bg-dark lg:pt-[60px] text-center">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="mx-auto max-w-[510px] text-center lg:mb-20">
                                <span className="mb-2 block text-lg font-semibold text-primary">
                                    Tyoes of Post
                                </span>
                                <h2 className=" text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px]">
                                    Select any one method...
                                </h2>
                                {/* <p className="text-base text-body-color dark:text-dark-6">
                                 z   There are many variations of passages of Lorem Ipsum available
                                    but the majority have suffered alteration in some form.
                                </p> */}


                            </div>
                        </div>
                    </div>

                    {/* <div className="-mx-4 flex flex-wrap">
                        <BlogCard
                            date="Dec 22, 2023"
                            CardTitle="Meet AutoManage, the best AI management tools"
                            CardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                            // image="https://i.ibb.co/Cnwd4q6/image-01.jpg"
                        />
                        <BlogCard
                            date="Dec 22, 2023"
                            CardTitle="Meet AutoManage, the best AI management tools"
                            CardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                            // // image="https://i.ibb.co/Y23YC07/image-02.jpg"
                        />
                        <BlogCard
                            date="Dec 22, 2023"
                            CardTitle="Meet AutoManage, the best AI management tools"
                            CardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                            // image="https://i.ibb.co/7jdcnwn/image-03.jpg"
                        />
                    </div> */}

                </div>
            </section>
            <div className='flex justify-center'>
                <button onClick={handleTextTypeOfPost} class="block max-w-sm p-6 m-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Text Post</h5>
                    {/* <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}
                </button>

                <button onClick={handleImageTypeOfPost} class="block max-w-sm p-6 m-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Image/Video Post</h5>
                    {/* <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}
                </button>
            </div>
            {/* <Card className="mt-6 w-96">
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        Text
                    </Typography>
                    <Typography>
                        The place is close to Barceloneta Beach and bus stop just 2 min by
                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                        night life in Barcelona.
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button onClick={handleTextTypeOfPost}>Read More</Button>
                </CardFooter>
            </Card>
            <Card className="mt-6 w-96">
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                       Image/Video
                    </Typography>
                    <Typography>
                        The place is close to Barceloneta Beach and bus stop just 2 min by
                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                        night life in Barcelona.
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button onClick={handleImageTypeOfPost}>Read More</Button>
                </CardFooter>
            </Card> */}
            {/* <Card className="mt-6 w-96">
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        UI/UX Review Check
                    </Typography>
                    <Typography>
                        The place is close to Barceloneta Beach and bus stop just 2 min by
                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                        night life in Barcelona.
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button>Read More</Button>
                </CardFooter>
            </Card> */}

        </div>
    )
}

export default UploadPost;
// const BlogCard = ({ image, date, CardTitle, CardDescription }) => {
//     return (
//         <>
//             <div className="w-full px-4 md:w-1/2 lg:w-1/3">
//                 <div className="mb-10 w-full">
//                     <div className="mb-8 overflow-hidden rounded">
//                         <img src={image} alt="" className="w-full" />
//                     </div>
//                     <div>
//                         {date && (
//                             <span className="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
//                                 {date}
//                             </span>
//                         )}
//                         <h3>
//                             <a
//                                 href="/#"
//                                 className="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
//                             >
//                                 {CardTitle}
//                             </a>
//                         </h3>
//                         <p className="text-base text-body-color dark:text-dark-6">
//                             {CardDescription}
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };
