//@ts-nocheck
"use client";

import { Fragment, useEffect, useState } from "react";

import Link from "next/link";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { globalConstant } from "constant/constant";

import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { RootState } from "@/app/GlobalRedux/store";
import AddBookForm from "@/pages/dashboard/transportationManagement/vehicle/addForm";
import EditBookForm from "@/pages/dashboard/transportationManagement/vehicle/editForm";
import DashboardOutline from "@/components/Dashboard/DashboardOutline";
import { useGetAllRecordForSpecificSchoolMutation, useDeleteRecordMutation } from "app/GlobalRedux/API/postApi";

const ManageGallery = () => {
  const router = useRouter();
  const loggedInUserData = useSelector((state: RootState) => state.authenticated);
  const [getAllRecordForSpecificSchool, { data: allRecordData, error, isLoading: isAllBookDataFetchingLoading }] = useGetAllRecordForSpecificSchoolMutation();
  const [deleteRecord, { data: deleteRecordData, error: deleteBookError, isLoading: isDeleteBookFetchingLoading }] = useDeleteRecordMutation();
  const [dataForViewModel, setDataForViewModel] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [editBookData, setEditBookData] = useState(null); // State variable to track the book being edited
  const [tableData, setTableData] = useState([]); // State variable to store the table data

  const fetchBookAndSetTableData = async () => {
    getAllRecordForSpecificSchool().then((res) => {
      console.log("ALL POST REPSONSE +====");
      console.log(res);
      setTableData(res.data.data);
    });
  };

  useEffect(() => {
    fetchBookAndSetTableData();
  }, []);

  //* edit modal starts here
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenAddBookModel, setIsOpenAddBookModel] = useState(false);
  let [isOpenHolderModel, setIsOpenHolderModel] = useState(false);

  function closeEditModal() {
    setIsOpen(false);
  }

  function openEditModal(bookData) {
    setEditBookData(bookData);
    setIsOpen(true);
  }
  function closeAddBookModal() {
    setIsOpenAddBookModel(false);
  }

  function closeHolderBookModal() {
    setIsOpenHolderModel(false);
  }

  function openViewDetailModal() {
    setIsOpenHolderModel(true);
  }

  function openAddBookModal() {
    setIsOpenAddBookModel(true);
  }

  //* edit modal ends here

  // Filter data based on selected filters
  const filteredData = tableData.filter((item) => {
    if (searchQuery === "") {
      return item;
    }
    if (item.title) {
      if (item.title.toLowerCase().replace(/\s/g, "").includes(searchQuery.toLowerCase().replace(/\s/g, ""))) {
        return item;
      }
    }
  });

  // Create pagination settings
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Change this to your desired page size

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Function to handle book selection
  const handleBookSelect = (isbn) => {
    if (selectedRecords.includes(isbn)) {
      // Deselect the book
      setSelectedRecords(selectedRecords.filter((selectedIsbn) => selectedIsbn !== isbn));
    } else {
      // Select the book
      setSelectedRecords([...selectedRecords, isbn]);
    }
  };

  // Filter data based on pagination
  const paginatedData = filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const deleteRecordHandler = (id) => {
    deleteRecord({
      id: id,
    }).then((res) => {
      setTableData(tableData.filter((book) => book._id !== id));
      toast.success("Record Deleted Successfully");
    });
  };

  return (
    <DashboardOutline pageTitle={"Manage Vehicle"} isShowRightSection={true}>
      <div className='pb-5 px-1  bg-gray-100'>
        <input autoComplete='off' type='text' placeholder='Search by post title' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='w-full p-3 mb-3 rounded-md' />
        <div className='flex flex-wrap  space-x-3 mb-3'>
          <div className='mt-2'>
            <label>Vehicle Type: </label>
            <select className='rounded-md' value={availabilityFilter} onChange={(e) => setAvailabilityFilter(e.target.value)}>
              <option value=''>All</option>
              <option value='ownership'>ownership</option>
              <option value='contract'>contract</option>
              <option value='hired'>hired</option>
              <option value='leased'>leased</option>
              <option value='rented'>rented</option>
              <option value='others'>others</option>
            </select>
          </div>
        </div>

        <div className='overflow-auto rounded-lg shadow '>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b-2 border-gray-200'>
              <tr className='text-xs font-medium text-gray-500 uppercase tracking-wider'>
                <th className='p-3'>Actions</th>
                <th className='p-3'>Image</th>
                <th className='p-3'>Title</th>
                <th className='p-3'>Description</th>
              </tr>
            </thead>

            <tbody className='divide-y divide-gray-100'>
              {paginatedData.map((item, index) => {
                return (
                  <tr className='bg-white' key={index}>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                      <div className='flex flex-col space-x-2'>
                        <div
                          className='flex'
                          style={{
                            marginLeft: 0,
                          }}
                        >
                          <Link className='me-1' href={`/dashboard/blog/fb/${item._id}`}>
                            <button onClick={() => openEditModal(item)} className='flex m-1 w-full justify-center items-center bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 text-white p-2 rounded'>
                              <svg className='me-3' fill='white' xmlns='http://www.w3.org/2000/svg' height='16' width='18' viewBox='0 0 576 512'>
                                <path d='M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z' />
                              </svg>
                              FB
                            </button>
                          </Link>
                          <Link className='me-1' href={`/dashboard/blog/twitter/${item._id}`}>
                            <button onClick={() => openEditModal(item)} className='flex m-1 w-full justify-center items-center bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 text-white p-2 rounded'>
                              <svg className='me-3' fill='white' xmlns='http://www.w3.org/2000/svg' height='16' width='18' viewBox='0 0 576 512'>
                                <path d='M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z' />
                              </svg>
                              Insta
                            </button>
                          </Link>
                          <Link className='me-1' href={`/dashboard/blog/linkedin/${item._id}`}>
                            <button onClick={() => openEditModal(item)} className='flex m-1 w-full justify-center items-center bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 text-white p-2 rounded'>
                              <svg className='me-3' fill='white' xmlns='http://www.w3.org/2000/svg' height='16' width='18' viewBox='0 0 576 512'>
                                <path d='M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z' />
                              </svg>
                              Linkedin
                            </button>
                          </Link>

                          <Link className='me-1' href={`/dashboard/blog/insta/${item._id}`}>
                            <button
                              onClick={() => {
                                deleteRecordHandler(item._id);
                              }}
                              className='flex m-1 w-full justify-center items-center bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 text-white p-2 rounded'
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
                                <path d='M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z' />
                              </svg>
                              Delete
                            </button>
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                      {item.attachment !== null ? (
                        <img
                          style={{
                            maxWidth: "80px",
                          }}
                          src={`${globalConstant.serverURL}/storage/${loggedInUserData.schoolUniqueId}/${item.attachment}`}
                          alt='food item'
                        />
                      ) : (
                        <img src='https://i.ibb.co/vVnqvfJ/sss.jpg' alt='Dummy Image' />
                      )}
                    </td>

                    <td className='p-3 text-sm  text-gray-400 roboto_400 whitespace-nowrap uppercase'>{item.title}</td>

                    <td className='p-3 text-sm  text-gray-400 roboto_400 whitespace-nowrap uppercase'>{item.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination flex justify-center mt-4"}
          activeClassName={"p-2 rounded bg-green-200 border-2 border-green-500 "}
          pageClassName={"p-2 rounded mx-1 text-green cursor-pointer"}
          previousClassName={"p-2  mr-2 text-green-500 hover:bg-green  cursor-pointer"}
          nextClassName={"p-2 ml-2 text-green-500 hover:bg-green  cursor-pointer"}
        />
      </div>
    </DashboardOutline>
  );
};

export default ManageGallery;
