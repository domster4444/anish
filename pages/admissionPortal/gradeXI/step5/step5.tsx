//@ts-nocheck
import { ChangeEvent, useEffect, useState } from "react";

import { NextPage } from "next";

import { useRouter } from "next/router";
import AdmissionPortalStyleProvider from "@/components/AdmissionPortalStyleProvider";

const SubjectChoice: NextPage = () => {
  const router = useRouter();

  // Define the state for input values
  const [formData, setFormData] = useState({
    stream: "",
    subjects: "",
  });

  // Function to update formData and localStorage
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  // check if there is data in localStorage if there is then set the formData state to the data in localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("formData")) {
        setFormData(JSON.parse(localStorage.getItem("formData")));
      }
    }
  }, []);

  return (
    <AdmissionPortalStyleProvider grade='XI'>
      <main>
        <section className='detail-row-section'>
          <h4 className='roboto_700'>
            <span className='required-field'> Stream Selection </span>
          </h4>
          <div className='input-field-row' style={{ display: "flex", justifyContent: "flex-start" }}>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='stream' name='stream' placeholder='Stream Selection' type='text' value={formData.stream} onChange={handleInputChange} />
            </div>
          </div>

          <h4 className='roboto_700'>
            <span className='required-field'> Subject Choice </span>
          </h4>
          <p
            className='roboto_400'
            style={{
              color: "grey",
              fontSize: "13px",
              textAlign: "left",
            }}
          >
            Enter your selected subjects for Grade 11, separated by commas.
          </p>
          <div className='input-field-row' style={{ display: "flex", justifyContent: "flex-start" }}>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='subjects' name='subjects' placeholder='Subjects' type='text' value={formData.subjects} onChange={handleInputChange} />
            </div>
          </div>
        </section>

        <section className='application-form-footer'>
          <div className='footer-btn-container'>
            <a
              onClick={() => {
                router.push("/admissionPortal/gradeXI/step4");
              }}
              className='proceed-btn roboto_300 sheen'
            >
              <i className='bx bx-left-arrow-alt'></i>
              Previous
            </a>
            <a
              onClick={() => {
                router.push("/admissionPortal/gradeXI/step6");
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

export default SubjectChoice;
