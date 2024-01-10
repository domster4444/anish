//@ts-nocheck
import { useState } from "react";

import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import DashboardOutline from "@/components/Dashboard/DashboardOutline";
import "./fb.css";

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
      <div id='app'>
        <div className='header'>
          <div className='left-info'>
            <div className='thumbnail'>
              <img src='https://avatarfiles.alphacoders.com/131/131892.jpg' alt='' />
            </div>
            <div className='name-info'>
              <div className='name'>
                <a href=''>Test User</a>
              </div>
              <div className='time'>
                {new Date().toLocaleTimeString()}
                <i className='global-icon' />
              </div>
            </div>
          </div>
          <div className='right-info' />
        </div>
        <div className='content'>
          <b>{myPost.title}</b>
          <HtmlParser>{`${myPost.description}`}</HtmlParser>
        </div>
        <div className='video-thumbnail'>
          <img src={`${globalConstant.serverURL}/storage/${loggedInUserData.schoolUniqueId}/${myPost.attachment}`} alt='food item' />
        </div>

        <div className='feedback-action'>
          <div className='fb-wrapper'>
            <i className='fb-icon thumb-up far fa-thumbs-up' />
            Like
          </div>
          <div className='fb-wrapper'>
            <i className='fb-icon response far fa-comment-alt' />
            Comment
          </div>
          <div className='fb-wrapper'>
            <i className='fb-icon share' />
            Share
          </div>
        </div>
        <div className='comments'>
          <div className='my-comment-wrapper'>
            <div className='my-avatar'>
              <img src='https://i.ibb.co/JKSgs2H/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg' alt='' />
            </div>
            <div className='my-comment'>
              <div className='my-comment-placeholder'>
                <input type='text' placeholder='Write a comment...' />
              </div>
            </div>
          </div>
          <div className='wrapper'>
            <div className='people-comment-wrapper'>
              <div className='people-avatar'>
                <img src='https://i1.sndcdn.com/avatars-000472635192-bk5zvc-t500x500.jpg' alt='' />
              </div>
              <div className='people-comment'>
                <div className='people-comment-container'>
                  <div className='people-name'>
                    <a href='https://www.facebook.com/Thanos-66479565036/'>Thanos</a>
                    <i className='blue-check' />
                  </div>
                  <div className='people-saying'>This is a dummy comment.</div>
                </div>
                <div className='comment-reactions'>
                  <i className='icons like-icon' />
                  <span className='number'>87</span>
                </div>
              </div>
            </div>
            <div className='like-and-response-wrapper'>
              <div className='like-comment'>
                <a>Like</a>
                <span className='tiny-dot'>・</span>
              </div>
              <div className='day-comment'>4 Days</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardOutline>
  );
};

export default AddPost;
