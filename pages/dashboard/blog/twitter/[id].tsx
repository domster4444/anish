//@ts-nocheck
import { useState } from "react";

import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import DashboardOutline from "@/components/Dashboard/DashboardOutline";
import "./twitter.css";

import HtmlParser from "@/components/HtmlParser";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGetSinglePostMutation } from "app/GlobalRedux/API/postApi";
import { globalConstant } from "constant/constant";
import { RootState } from "@/app/GlobalRedux/store";
import { useSelector } from "react-redux";

const ReactQuillNoSSR = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const AddPost: React.FC = () => {
  const loggedInUserData = useSelector((state: RootState) => state.authenticated);

  const router = useRouter();
  const [myPost, setMyPost] = useState({
    title: "Dummy Title",
    description: "This is a dummy description. It's will be updated later!",
    attachment: "1704708348879.png",
  });
  const [postAddRecord, { isLoading }] = useGetSinglePostMutation();

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      postAddRecord({
        id: id,
      })
        .unwrap()
        .then((res) => {
          console.log(res);
          setMyPost(res.data);
        })
        .catch((err) => {});
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <DashboardOutline pageTitle='Add Post' isShowRightSection={false}>
      <div id='tweet'>
        <>
          <div className='tweet-wrap'>
            <div className='tweet-header'>
              <img src='https://pbs.twimg.com/profile_images/1012717264108318722/9lP-d2yM_400x400.jpg' alt='' className='avator' />
              <div className='tweet-header-info'>
                Steve Schoger <span>@Steve Schoger</span>
                <span>. Jun 27</span>
                <div>
                  <b>{myPost.title}</b>
                </div>
                <HtmlParser>{`<div className='roboto_400'>${myPost.description}</div>`}</HtmlParser>
              </div>
            </div>
            <div className='tweet-img-wrap'>
              <img src={`${globalConstant.serverURL}/storage/${loggedInUserData.schoolUniqueId}/${myPost.attachment}`} alt='food item' />
            </div>
            <div className='tweet-info-counts'>
              <div className='comments'>
                <svg className='feather feather-message-circle sc-dnqmqq jxshSx' xmlns='http://www.w3.org/2000/svg' width={20} height={20} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                  <path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' />
                </svg>
                <div className='comment-count'>33</div>
              </div>
              <div className='retweets'>
                <svg className='feather feather-repeat sc-dnqmqq jxshSx' xmlns='http://www.w3.org/2000/svg' width={20} height={20} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                  <polyline points='17 1 21 5 17 9' />
                  <path d='M3 11V9a4 4 0 0 1 4-4h14' />
                  <polyline points='7 23 3 19 7 15' />
                  <path d='M21 13v2a4 4 0 0 1-4 4H3' />
                </svg>
                <div className='retweet-count'>397</div>
              </div>
              <div className='likes'>
                <svg className='feather feather-heart sc-dnqmqq jxshSx' xmlns='http://www.w3.org/2000/svg' width={20} height={20} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                  <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
                </svg>
                <div className='likes-count'>2.6k</div>
              </div>
              <div className='message'>
                <svg className='feather feather-send sc-dnqmqq jxshSx' xmlns='http://www.w3.org/2000/svg' width={20} height={20} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                  <line x1={22} y1={2} x2={11} y2={13} />
                  <polygon points='22 2 15 22 11 13 2 9 22 2' />
                </svg>
              </div>
            </div>
          </div>
          <link href='https://fonts.googleapis.com/css?family=Asap' rel='stylesheet' />
          <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' />
        </>
      </div>
    </DashboardOutline>
  );
};

export default AddPost;
