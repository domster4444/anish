//@ts-nocheck
import { useState } from "react";

import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import DashboardOutline from "@/components/Dashboard/DashboardOutline";
import { usePostAddRecordMutation } from "app/GlobalRedux/API/postApi";
import "./insta.css";

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
  return (
    <DashboardOutline pageTitle='Add Post' isShowRightSection={false}>
      <div id='insta'>
        <div>
          <main>
            <div className='container'>
              <div className='col-9'>
                {/* Code for viewing the Post */}
                <div className='card'>
                  <div className='top'>
                    <div className='userDetails'>
                      <div className='profilepic'>
                        <div className='profile_img'>
                          <div className='image'>
                            <img src='https://i.ibb.co/JKSgs2H/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg' alt='img8' />
                          </div>
                        </div>
                      </div>
                      <h3>
                        Ayush Agarwal
                        <br />
                        <span>Mumbai, India</span>
                      </h3>
                    </div>
                    <div>
                      <span className='dot'>
                        <i className='fas fa-ellipsis-h' />
                      </span>
                    </div>
                  </div>
                  <div className='ms-5'>
                    <b>{myPost.title}</b> <HtmlParser>{`${myPost.description}`}</HtmlParser>
                  </div>
                  <div className='imgBx'>
                    <img src={`${globalConstant.serverURL}/storage/${loggedInUserData.schoolUniqueId}/${myPost.attachment}`} alt='post' />
                  </div>
                  <div className='bottom'>
                    <div className='actionBtns'>
                      <div className='left'>
                        <span className='heart' onclick='addlike()'>
                          <span>
                            <svg aria-label='Like' color='#262626' fill='#262626' height={24} role='img' viewBox='0 0 48 48' width={24}>
                              <path
                                d='M34.6 6.1c5.7 0 10.4 5.2 10.4  
                                                11.5 0 6.8-5.9 11-11.5 16S25 41.3 24  
                                                41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3  
                                                11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3  
                                                1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9  
                                                1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9  
                                                1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1  
                                                0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3  
                                                1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3  
                                                1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2  
                                                7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6  
                                                48 25 48 17.6c0-8-6-14.5-13.4-14.5z'
                              ></path>
                            </svg>
                          </span>
                        </span>
                        <svg aria-label='Comment' className='_8-yf5 ' color='#262626' fill='#262626' height={24} role='img' viewBox='0 0 48 48' width={24}>
                          {/* Coordinate path  */}
                          <path
                            clipRule='evenodd'
                            d='M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5  
                                        11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0  
                                        7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0  
                                        4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1  
                                        8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10  
                                        2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5  
                                        44.5 12.7 44.5 24z'
                            fillRule='evenodd'
                          ></path>
                        </svg>
                        <svg aria-label='Share Post' className='_8-yf5 ' color='#262626' fill='#262626' height={24} role='img' viewBox='0 0 48 48' width={24}>
                          <path
                            d='M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3  
                                        3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6  
                                        1 1.2 1.1h.2c.5 0 1-.3  
                                        1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2  
                                        6.1h35.5L18 18.7 5.2 6.1zm18.7  
                                        33.6l-4.4-18.4L42.4 8.6 23.9 39.7z'
                          ></path>
                        </svg>
                      </div>
                      <div className='right'>
                        <svg aria-label='Save' className='_8-yf5 ' color='#262626' fill='#262626' height={24} role='img' viewBox='0 0 48 48' width={24}>
                          {/* Coordinate path  */}
                          <path
                            d='M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6  
                                        47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7  
                                        3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4  
                                        1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8  
                                        0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6  
                                        1.4-.9 2.2-.9z'
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <a href='#'>
                      <p className='likes'>203 likes</p>
                    </a>
                    <a href='#'>
                      <p className='message'>
                        <b>Raju Modi</b>
                      </p>
                    </a>
                    <a href='#'>
                      <h4 className='comments'>View all 32 comments</h4>
                    </a>
                    <a href='#'>
                      <h5 className='postTime'>2 hours ago</h5>
                    </a>
                    <div className='addComments'>
                      <div className='reaction'>
                        <h3>
                          <i className='far fa-smile' />
                        </h3>
                      </div>
                      <input type='text' className='text' placeholder='Add a comment...' />
                      <a href='#'>Post</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-3'>
                <div className='card'>
                  <h4>Suggestions For You</h4>
                  <div className='top'>
                    <div className='userDetails'>
                      <div className='profilepic'>
                        <div className='profile_img'>
                          <div className='image'>
                            <img src='https://media.geeksforgeeks.org/wp-content/uploads/20220609093221/g2-200x200.jpg' alt='img12' />
                          </div>
                        </div>
                      </div>
                      <h3>
                        Aditya Verma
                        <br />
                        <span>Follows You</span>
                      </h3>
                    </div>
                    <div>
                      <a href='#' className='follow'>
                        follow
                      </a>
                    </div>
                  </div>
                  <div className='top'>
                    <div className='userDetails'>
                      <div className='profilepic'>
                        <div className='profile_img'>
                          <div className='image'>
                            <img src='https://media.geeksforgeeks.org/wp-content/uploads/20220609093229/g-200x200.png' alt='img13' />
                          </div>
                        </div>
                      </div>
                      <h3>
                        Amit Singh
                        <br />
                        <span>Follows You</span>
                      </h3>
                    </div>
                    <div>
                      <a href='#' className='follow'>
                        follow
                      </a>
                    </div>
                  </div>
                  <div className='top'>
                    <div className='userDetails'>
                      <div className='profilepic'>
                        <div className='profile_img'>
                          <div className='image'>
                            <img src='https://media.geeksforgeeks.org/wp-content/uploads/20220609093221/g2-200x200.jpg' alt='img14' />
                          </div>
                        </div>
                      </div>
                      <h3>
                        Piyush Agarwal
                        <br />
                        <span>Followed by Keshav Agarwal</span>
                      </h3>
                    </div>
                    <div>
                      <a href='#' className='follow'>
                        follow
                      </a>
                    </div>
                  </div>

                  <div className='top'>
                    <div className='userDetails'>
                      <div className='profilepic'>
                        <div className='profile_img'>
                          <div className='image'>
                            <img src='https://media.geeksforgeeks.org/wp-content/uploads/20220609093241/g3-200x200.png' alt='img16' className='cover' />
                          </div>
                        </div>
                      </div>
                      <h3>
                        Raj Goel
                        <br />
                        <span>Followed by Keshav Agarwal</span>
                      </h3>
                    </div>
                    <div>
                      <a href='#' className='follow'>
                        follow
                      </a>
                    </div>
                  </div>
                </div>
                {/* Our Footer Section will start from Here */}
                <div className='footer'>
                  <a className='footer-section' href='#'>
                    About
                  </a>
                  <a className='footer-section' href='#'>
                    Help
                  </a>
                  <a className='footer-section' href='#'>
                    API
                  </a>
                  <a className='footer-section' href='#'>
                    Jobs
                  </a>
                  <a className='footer-section' href='#'>
                    Privacy
                  </a>
                  <a className='footer-section' href='#'>
                    Terms
                  </a>
                  <a className='footer-section' href='#'>
                    Locations
                  </a>
                  <br />
                  <a className='footer-section' href='#'>
                    Top Accounts
                  </a>
                  <a className='footer-section' href='#'>
                    Hashtag
                  </a>
                  <a className='footer-section' href='#'>
                    Language
                  </a>
                  <br />
                  <br />
                  <span className='footer-section'>© 2023 INSTAGRAM FROM FACEBOOK</span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </DashboardOutline>
  );
};

export default AddPost;
