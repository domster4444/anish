//@ts-nocheck
import { useState } from "react";

import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import DashboardOutline from "@/components/Dashboard/DashboardOutline";
import { usePostAddRecordMutation } from "app/GlobalRedux/API/postApi";
import "./linkedin.css";

import { useEffect } from "react";
import HtmlParser from "@/components/HtmlParser";
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
      <div id='linkedin'>
        <div className='container'>
          <div className='item infoRow'>
            <div className='infoRow-Item infoRow-likedName font-bold'>John Snow</div>
            <div className='infoRow-Item, font-gray'>likes this</div>
            <div className='infoRow-Item infoRow-dotsMenu'>...</div>
          </div>
          <div className='item'>
            <div className='profileInfo'>
              <div className='profileInfo-image' />
              <div className='profileInfo-text'>
                <div>
                  <span>Profile Name</span>
                  <span className='profileInfo-nth font-gray'>2nd</span>
                </div>
                <div>
                  <span className='font-gray'>CEO of google</span>
                </div>
                <div>
                  <span className='font-gray'>1w Edited</span>
                </div>
              </div>
            </div>
            <div className='profileInfo-textSection'>
              <div>
                <b>{myPost.title}</b> <HtmlParser>{`${myPost.description}`}</HtmlParser>
              </div>
            </div>
            <img src={`${globalConstant.serverURL}/storage/${loggedInUserData.schoolUniqueId}/${myPost.attachment}`} alt='post' />
            <div className='translationSection'>
              <span className='translationSection-translation font-bold'>See translation</span>
              <span>
                <span className='translationSection-likeIcon'>
                  <span className='translationSection-heartIcon'>
                    <span className='translationSection-clapIcon'>
                      <span className='translationSection-likeCount'>115</span>
                      <span>0 comments</span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
          </div>
          <div className='item'>
            <div className='userActionSection'>
              <span className='userActionSection-icons userActionSection-like font-bold font-gray'>Like</span>
              <span className='userActionSection-icons userActionSection-comment font-bold font-gray'>Comment</span>
              <span className='userActionSection-icons userActionSection-share font-bold font-gray'>Share</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardOutline>
  );
};

export default AddPost;
