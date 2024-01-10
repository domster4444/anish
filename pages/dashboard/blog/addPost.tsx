//@ts-nocheck
import { useState } from "react";

import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import DashboardOutline from "@/components/Dashboard/DashboardOutline";
import { usePostAddRecordMutation } from "app/GlobalRedux/API/postApi";

const ReactQuillNoSSR = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const AddPost: React.FC = () => {
  const [postAddRecord, { isLoading, isError, isSuccess, error }] = usePostAddRecordMutation();
  const [formData, setFormData] = useState(new FormData());

  const [editorHtml, setEditorHtml] = useState<string>(""); // State for editor content

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (Array.isArray(value)) {
      return;
    }
    if (name === "coverImage") {
      formData.append(name, files[0]);
    } else {
      formData.set(name, value);
    }
  };

  const handleEditorChange = (html: string) => {
    setEditorHtml(() => {
      localStorage.setItem("personalStatement", html);
      return html;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.set("description", editorHtml);
    console.log(editorHtml);

    try {
      postAddRecord(formData)
        .unwrap()
        .then((res) => {
          console.log(res);
          toast.success("Post added successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardOutline pageTitle='Add Post' isShowRightSection={true}>
      <>
        <div className='flex flex-col'>
          <div className='w-full'>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col'>
                <div className='w-full'>
                  <label htmlFor='title' className='text-sm font-medium text-gray-700'>
                    Title
                  </label>
                  <input type='text' name='title' id='title' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' placeholder='Title' onChange={handleInputChange} />
                </div>
              </div>
              <div className='flex flex-col mt-4'>
                <div className='w-full'>
                  <label htmlFor='coverImage' className='text-sm font-medium text-gray-700'>
                    Cover Image
                  </label>
                  <input type='file' name='coverImage' id='coverImage' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={handleInputChange} />
                </div>
              </div>
              <div className='flex flex-col mt-4'>
                <div className='w-full'>
                  <label htmlFor='description' className='text-sm font-medium text-gray-700'>
                    Description
                  </label>
                  <ReactQuillNoSSR theme='snow' value={editorHtml} onChange={handleEditorChange} modules={AddPost.modules} formats={AddPost.formats} placeholder='Write something awesome...' />
                </div>
              </div>

              <button type='submit' className='mt-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none'>
                {isLoading ? "Loading..." : "Add Post"}
              </button>
            </form>
          </div>
        </div>
      </>
    </DashboardOutline>
  );
};

export default AddPost;
