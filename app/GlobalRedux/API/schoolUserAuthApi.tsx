//@ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";
import { getDataByValue } from "services/LocalStorageService";

export const schoolUserAuthApi = createApi({
  reducerPath: "schoolUserAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${globalConstant.serverURL}/api/v1/`,
  }),
  endpoints: (builder) => ({
    //* POST ADD Schooluser --working
    postRegisterSchoolUser: builder.mutation({
      query: (formData) => ({
        url: "register",
        method: "POST",
        body: formData,
        formData: true,
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),

    //* GET all Schooluser for a school --working
    getAllSchoolUserOfParticularSchool: builder.mutation({
      query: () => {
        return {
          url: `get-all-school-users-of-particular-school`,
          method: "POST",
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),
    //* GET all Schooldriver for a school --working
    getAllSchoolDriverOfParticularSchool: builder.mutation({
      query: () => {
        return {
          url: `get-all-school-driver-of-particular-school`,
          method: "POST",
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),
    getAllSchoolStudentOfParticularSchool: builder.mutation({
      query: () => {
        return {
          url: `get-all-school-student-of-particular-school`,
          method: "POST",
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),
    //* GET all canteen staff for a school --working
    getAllSchoolCanteenStaffOfParticularSchool: builder.mutation({
      query: () => {
        return {
          url: `get-all-school-canteen-user-of-particular-school`,
          method: "POST",
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),
    //* GET all Librarian for a school --working
    getAllSchoolLibrarianOfParticularSchool: builder.mutation({
      query: () => {
        return {
          url: `get-all-school-librarian-of-particular-school`,
          method: "POST",
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* DELETE Schooluser -- working
    deleteSchoolUser: builder.mutation({
      query: (payload) => {
        console.log(payload);
        return {
          url: `delete-user/${payload.userId}`,
          method: "DELETE",
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* PATCH  Schooluser
    patchUpdateSchoolUser: builder.mutation({
      query: (payload) => {
        return {
          url: `update-user/${payload.id}`,
          method: "PATCH",
          body: payload.formData,
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),
  }),
});

export const {
  usePostRegisterSchoolUserMutation,
  useDeleteSchoolUserMutation,
  usePatchUpdateSchoolUserMutation,
  useGetAllSchoolUserOfParticularSchoolMutation,
  useGetAllSchoolDriverOfParticularSchoolMutation,
  useGetAllSchoolLibrarianOfParticularSchoolMutation,
  useGetAllSchoolCanteenStaffOfParticularSchoolMutation,
  useGetAllSchoolStudentOfParticularSchoolMutation,
} = schoolUserAuthApi;
