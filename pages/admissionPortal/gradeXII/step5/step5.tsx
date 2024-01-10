import { ChangeEvent, useEffect, useState } from "react";

import { NextPage } from "next";

import { useRouter } from "next/router";
import AdmissionPortalStyleProvider from "@/components/AdmissionPortalStyleProvider";

interface FormData {
  stream: string;
}

const SubjectChoice: NextPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    stream: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      localStorage.setItem("formData", JSON.stringify({ ...prevData, [name]: value }));

      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("formData")) {
        //@ts-ignore
        setFormData(JSON.parse(localStorage.getItem("formData")));
      }
    }
  }, []);

  return (
    <AdmissionPortalStyleProvider grade='XII'>
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
            className='roboto_400 '
            style={{
              color: "grey",
              fontSize: "13px",
              textAlign: "left",
            }}
          >
            Enter your selected subjects for Grade 12, separated by commas.
          </p>
          <div className='input-field-row' style={{ display: "flex", justifyContent: "flex-start" }}>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='subjects' name='subjects' placeholder='Subjects' type='text' value={formData.stream} onChange={handleInputChange} />
            </div>
          </div>
        </section>

        <section className='application-form-footer'>
          <div className='footer-btn-container'>
            <a
              onClick={() => {
                router.push("/admissionPortal/gradeXII/step4");
              }}
              className='proceed-btn roboto_300 sheen'
            >
              Previous <i className='bx bx-right-arrow-alt'></i>
            </a>
            <a
              onClick={() => {
                router.push("/admissionPortal/gradeXII/step6");
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
