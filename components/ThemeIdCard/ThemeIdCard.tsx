//@ts-nocheck
import { useSelector } from "react-redux";
import React from "react";
import { globalConstant } from "constant/constant";
import { RootState } from "@/app/GlobalRedux/store";

const ThemeIdCard = ({ redCardFrontDesign, redCardBackDesign, greenCardFrontDesign, greenCardBackDesign, blueCardFrontDesign, blueCardBackDesign, yellowCardFrontDesign, yellowCardBackDesign }) => {
  const loggedInUserData = useSelector((state: RootState) => state.authenticated);

  const [frontDesign, setFrontDesign] = React.useState(redCardFrontDesign);
  const [backDesign, setBackDesign] = React.useState(redCardBackDesign);

  const handleFrontDesign = (design: any) => {
    setFrontDesign(design);
  };

  const handleBackDesign = (design: any) => {
    setBackDesign(design);
  };

  return (
    <div className='mx-1 mb-2 '>
      <div className='w-48 h-96  flip-card'>
        <div className='flip-card-inner'>
          <div className='flip-card-front'>
            <img className='h-full w-full rounded cursor-pointer' src={`${globalConstant.serverURL}/storage/${loggedInUserData.schoolUniqueId}/${frontDesign}`} alt='idcard theme' />
          </div>
          <div className='flip-card-back'>
            <img className='h-full w-full rounded cursor-pointer' src={`${globalConstant.serverURL}/storage/${loggedInUserData.schoolUniqueId}/${backDesign}`} alt='idcard theme' />
          </div>
        </div>
      </div>
      <div className='px-2 pt-2 bg-white'>
        <h4 className='text-sm mb-1 roboto_400'>Choose color</h4>
        <div className='flex'>
          <button
            className='h-7 w-7 p-1 me-1 bg-red-500 rounded-full border-3 border-transparent  hover:border-gray-400 '
            onClick={() => {
              handleFrontDesign(redCardFrontDesign);
              handleBackDesign(redCardBackDesign);
            }}
          ></button>
          <button
            className='h-7 w-7 p-1 me-1 bg-green-500 rounded-full border-3 border-transparent  hover:border-gray-400'
            onClick={() => {
              handleFrontDesign(greenCardFrontDesign);
              handleBackDesign(greenCardBackDesign);
            }}
          ></button>

          <button
            className='h-7 w-7 p-1 me-1 bg-blue-500 rounded-full border-3 border-transparent  hover:border-gray-400'
            onClick={() => {
              handleFrontDesign(blueCardFrontDesign);
              handleBackDesign(blueCardBackDesign);
            }}
          ></button>
          <button
            className='h-7 w-7 p-1 me-1 bg-yellow-300 rounded-full border-3 border-transparent  hover:border-gray-400'
            onClick={() => {
              handleFrontDesign(yellowCardFrontDesign);
              handleBackDesign(yellowCardBackDesign);
            }}
          ></button>
        </div>

        <button className='roboto_500 bg-red-500 hover:bg-red-700 text-white  py-2 px-4 my-3 w-full rounded'>Select</button>
      </div>
    </div>
  );
};

export default ThemeIdCard;
