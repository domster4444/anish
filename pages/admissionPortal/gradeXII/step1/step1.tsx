import { useEffect, useState } from "react";

import { NextPage } from "next";

import { useRouter } from "next/router";
import AdmissionPortalStyleProvider from "@/components/AdmissionPortalStyleProvider";

interface FormData {
  firstname: string;
  middlename: string;
  lastname: string;
  province: string;
  district: string;
  municipality: string;
  gender: string;
  cell: string;
  email_address: string;
  dob: string;
  father_firstname: string;
  father_middlename: string;
  father_lastname: string;
  father_cell: string;
  father_email: string;
  father_province: string;
  father_district: string;
  father_municipality: string;
  mother_firstname: string;
  mother_middlename: string;
  mother_lastname: string;
  mother_cell: string;
  mother_email: string;
  mother_province: string;
  mother_district: string;
  mother_municipality: string;
  local_guardian_firstname: string;
  local_guardian_middlename: string;
  local_guardian_lastname: string;
  local_guardian_cell: string;
  local_guardian_email: string;
  local_guardian_province: string;
  local_guardian_district: string;
  local_guardian_municipality: string;
  nationality: string;
  religion: string;
}

const PersonalInfoPage: NextPage = () => {
  const router = useRouter();

  // Define the state for input values
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    middlename: "",
    lastname: "",
    province: "",
    district: "",
    municipality: "",
    gender: "",
    cell: "",
    email_address: "",
    dob: "",
    father_firstname: "",
    father_middlename: "",
    father_lastname: "",
    father_cell: "",
    father_email: "",
    father_province: "",
    father_district: "",
    father_municipality: "",
    mother_firstname: "",
    mother_middlename: "",
    mother_lastname: "",
    mother_cell: "",
    mother_email: "",
    mother_province: "",
    mother_district: "",
    mother_municipality: "",
    local_guardian_firstname: "",
    local_guardian_middlename: "",
    local_guardian_lastname: "",
    local_guardian_cell: "",
    local_guardian_email: "",
    local_guardian_province: "",
    local_guardian_district: "",
    local_guardian_municipality: "",
    nationality: "",
    religion: "",
  });

  // Function to update formData and localStorage
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update the formData state
    setFormData((prevData) => {
      localStorage.setItem("formData", JSON.stringify({ ...prevData, [name]: value }));

      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // Check if there is data in localStorage, if there is, then set the formData state to the data in localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("formData")) {
        setFormData(JSON.parse(localStorage.getItem("formData")!));
      }
    }
  }, []);

  return (
    <AdmissionPortalStyleProvider grade='XII'>
      <main>
        <section className='detail-row-section'>
          <h4 className='roboto_700'>
            <span className='required-field'> Student Information </span>
          </h4>
          {/* 1st input field row for student information */}
          <div className='input-field-row' style={{ display: "flex", justifyContent: "flex-start" }}>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='firstname' name='firstname' placeholder='First name' type='text' value={formData.firstname} onChange={handleInputChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='middlename' name='middlename' placeholder='Middle name' type='text' value={formData.middlename} onChange={handleInputChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='lastname' name='lastname' placeholder='Last name' type='text' value={formData.lastname} onChange={handleInputChange} />
            </div>
          </div>
          {/* 2nd input field row for student information */}
          <div className='input-field-row' style={{ display: "flex", justifyContent: "flex-start" }}>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='province' name='province' placeholder='Province' type='text' value={formData.province} onChange={handleInputChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='district' name='district' placeholder='District' type='text' value={formData.district} onChange={handleInputChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='municipality' name='municipality' placeholder='Municipality / VDC' type='text' value={formData.municipality} onChange={handleInputChange} />
            </div>
          </div>

          {/* 3rd input field row for student information */}

          <div className='input-field-row' style={{ display: "flex", justifyContent: "flex-start" }}>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='dob' name='dob' placeholder='Date of Birth' type='text' value={formData.dob} onChange={handleInputChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='nationality' name='nationality' placeholder='Nationality' type='text' value={formData.nationality} onChange={handleInputChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='religion' name='religion' placeholder='Religion' type='text' value={formData.religion} onChange={handleInputChange} />
            </div>
          </div>

          {/* 4th input field row for student information */}
          <div className='input-field-row' style={{ display: "flex", justifyContent: "flex-start" }}>
            <div className='detail-col'>
              <h4 className='roboto_400 gender-heading'>Gender :</h4>
              <div className='gender-field roboto_400'>
                <label htmlFor='male'>
                  <input autoComplete='off' name='gender' id='male' value='male' type='radio' checked={formData.gender === "male"} onChange={handleInputChange} />
                  <span> Male </span>
                </label>
                <label htmlFor='female'>
                  <input autoComplete='off' name='gender' id='female' value='female' type='radio' checked={formData.gender === "female"} onChange={handleInputChange} />
                  <span> Female</span>
                </label>
                <label htmlFor='others'>
                  <input autoComplete='off' name='gender' id='others' value='others' type='radio' checked={formData.gender === "others"} onChange={handleInputChange} />
                  <span> Others </span>
                </label>
              </div>
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='cell' name='cell' placeholder='Phone number' type='tel' minLength={6} maxLength={15} value={formData.cell} onChange={handleInputChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='email_address' name='email_address' placeholder='Email address' type='email' value={formData.email_address} onChange={handleInputChange} />
            </div>
          </div>
        </section>

        {/* //!EERROR SECTION START */}
        <section className='detail-row-section' id='parent-info'>
          <h4 className='roboto_700'>
            <span className='required-field'> Parents Information </span>
          </h4>
          <br />
          <br />
          <h4 className='roboto_400 gender-heading'>
            <span className='required-field'> Father Information </span>
          </h4>
          {/* 1st input field row for parent information */}
          <div className='input-field-row' style={{ display: "flex", justifyContent: "flex-start" }}>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='father_firstname' name='father_firstname' placeholder="Father's name" type='text' value={formData.father_firstname} onChange={handleInputChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='father_middlename' name='father_middlename' placeholder="Father's middle Name" type='text' value={formData.father_middlename} onChange={handleInputChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='father_lastname' name='father_lastname' placeholder="Father's last name" type='text' value={formData.father_lastname} onChange={handleInputChange} />
            </div>
          </div>
          {/* 2nd input field row for parent information */}
          <div className='input-field-row' style={{ display: "flex", justifyContent: "flex-start" }}>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='father_cell' name='father_cell' placeholder="Father's Phone number" type='tel' minLength={6} maxLength={15} value={formData.father_cell} onChange={handleInputChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='father_email' name='father_email' placeholder="Father's Email address" type='email' value={formData.father_email} onChange={handleInputChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='father_province' name='father_province' placeholder="Father's Province" type='text' value={formData.father_province} onChange={handleInputChange} />
            </div>
          </div>
          {/* 3rd input field row for parent information */}
          <div className='input-field-row' style={{ display: "flex", justifyContent: "flex-start" }}>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='father_district' name='father_district' placeholder="Father's District" type='text' value={formData.father_district} onChange={handleInputChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='father_municipality' name='father_municipality' placeholder="Father's Municipality / VDC" type='text' value={formData.father_municipality} onChange={handleInputChange} />
            </div>
          </div>
          <br />
          <br />
          <h4 className='roboto_400 gender-heading'>
            <span className='required-field'> Mother Information </span>
          </h4>
          {/* 1st input field row for parent information */}

          <div className='input-field-row' style={{ display: "flex", justifyContent: "flex-start" }}>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='mother_firstname' name='mother_firstname' placeholder="Mother's name" type='text' value={formData.mother_firstname} onChange={handleInputChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='mother_middlename' name='mother_middlename' placeholder="Mother's middle Name" type='text' value={formData.mother_middlename} onChange={handleInputChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='mother_lastname' name='mother_lastname' placeholder="Mother's last name" type='text' value={formData.mother_lastname} onChange={handleInputChange} />
            </div>
          </div>

          {/* 2nd input field row for parent information */}
          <div className='input-field-row' style={{ display: "flex", justifyContent: "flex-start" }}>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='mother_cell' name='mother_cell' placeholder="Mother's Phone number" type='tel' minLength={6} maxLength={15} value={formData.mother_cell} onChange={handleInputChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='mother_email' name='mother_email' placeholder="Mother's Email address" type='email' value={formData.mother_email} onChange={handleInputChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='mother_province' name='mother_province' placeholder="Mother's Province" type='text' value={formData.mother_province} onChange={handleInputChange} />
            </div>
          </div>
          {/* 3rd input field row for parent information */}
          <div className='input-field-row' style={{ display: "flex", justifyContent: "flex-start" }}>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='mother_district' name='mother_district' placeholder="Mother's District" type='text' value={formData.mother_district} onChange={handleInputChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='mother_municipality' name='mother_municipality' placeholder="Mother's Municipality / VDC" type='text' value={formData.mother_municipality} onChange={handleInputChange} />
            </div>
          </div>
        </section>
        {/* //!EERROR SECTION END */}

        {/* Local Guardian information */}
        <section className='detail-row-section' id='parent-info'>
          <h4 className='roboto_700'>
            <span className='required-field'> Local Guardian Information </span>
          </h4>
          {/* 1st input field row for parent information */}
          <div className='input-field-row' style={{ display: "flex", justifyContent: "flex-start" }}>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='local_guardian_firstname' name='local_guardian_firstname' placeholder='Name' type='text' value={formData.local_guardian_firstname} onChange={handleInputChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='local_guardian_middlename' name='local_guardian_middlename' placeholder='Middle Name' type='text' value={formData.local_guardian_middlename} onChange={handleInputChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='local_guardian_lastname' name='local_guardian_lastname' placeholder='Last name' type='text' value={formData.local_guardian_lastname} onChange={handleInputChange} />
            </div>
          </div>
          {/* 2nd input field row for parent information */}
          <div className='input-field-row' style={{ display: "flex", justifyContent: "flex-start" }}>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='local_guardian_cell' name='local_guardian_cell' placeholder='Phone number' type='tel' minLength={6} maxLength={15} value={formData.local_guardian_cell} onChange={handleInputChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='local_guardian_email' name='local_guardian_email' placeholder='Email address' type='email' value={formData.local_guardian_email} onChange={handleInputChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='local_guardian_province' name='local_guardian_province' placeholder='Province' type='text' value={formData.local_guardian_province} onChange={handleInputChange} />
            </div>
          </div>
          {/* 3rd input field row for parent information */}
          <div className='input-field-row' style={{ display: "flex", justifyContent: "flex-start" }}>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='local_guardian_district' name='local_guardian_district' placeholder='District' type='text' value={formData.local_guardian_district} onChange={handleInputChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='local_guardian_municipality' name='local_guardian_municipality' placeholder='Municipality / VDC' type='text' value={formData.local_guardian_municipality} onChange={handleInputChange} />
            </div>
          </div>
          <br />
          <br />
        </section>

        <section className='application-form-footer'>
          <div className='footer-btn-container'>
            <a
              onClick={() => {
                router.push("/admissionPortal/gradeXII/step2");
              }}
              className='proceed-btn roboto_300 sheen'
            >
              Next <i className='bx bx-right-arrow-alt'></i>
            </a>
          </div>
        </section>
      </main>
    </AdmissionPortalStyleProvider>
  );
};

export default PersonalInfoPage;
