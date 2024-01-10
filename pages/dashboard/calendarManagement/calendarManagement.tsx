//@ts-nocheck
"use client";

import BasicCalendar from "@/components/BasicCalendar";
import DashboardOutline from "@/components/Dashboard/DashboardOutline";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useGetAllRecordForSpecificSchoolMutation } from "app/GlobalRedux/API/eventCalendarApi";
import AddForm from "./addForm/addForm";

const CalendarManagement = () => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [getAllRecordForSpecificSchool, { data: allRecordData, error: isFetchAllRecordDataError, isLoading: isAllRecordFetchingLoading }] = useGetAllRecordForSpecificSchoolMutation();

  const fetchRecordAndSetTable = async () => {
    getAllRecordForSpecificSchool().then((res) => {
      setCalendarEvents(
        res.data.data.map((item) => {
          return {
            title: item.title,
            start: new Date(item.start),
            end: new Date(item.end),
          };
        })
      );
    });
  };

  useEffect(() => {
    fetchRecordAndSetTable();
  }, []);

  //* MODEL OPEN CLOSE FUNCTIONs Starts here
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenAddBookModel, setIsOpenAddBookModel] = useState(false);

  function closeAddModal() {
    setIsOpenAddBookModel(false);
  }

  function openAddBookModal() {
    setIsOpenAddBookModel(true);
  }
  //* MODEL OPEN CLOSE FUNCTIONs Ends here
  return (
    <DashboardOutline pageTitle='Event Calendar' isShowRightSection={true}>
      {/* //! ADD Record MODEL  */}
      <Transition appear show={isOpenAddBookModel} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={closeAddModal}>
          <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Add Calendar Event
                  </Dialog.Title>
                  <AddForm fetchRecordAndSetTable={fetchRecordAndSetTable} closeAddModalHandler={closeAddModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className='flex flex-wrap ms-1'>
        <button
          onClick={() => {
            openAddBookModal();
          }}
          className='me-2 flex mb-4 justify-center items-center bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white p-2 rounded'
        >
          <svg
            style={{
              fill: "white",
            }}
            className='mr-2'
            xmlns='http://www.w3.org/2000/svg'
            height='1em'
            viewBox='0 0 448 512'
          >
            <path d='M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z' />
          </svg>
          Schedule Post
        </button>
      </div>

      <BasicCalendar calendarEvents={calendarEvents} />
    </DashboardOutline>
  );
};

export default CalendarManagement;
