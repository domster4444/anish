import { ChangeEvent, useEffect, useState } from "react";

import { useRouter } from "next/router";
import AdmissionPortalStyleProvider from "@/components/AdmissionPortalStyleProvider";

interface SeeEquivalentData {
  graduatedYear: string;
  board: string;
  institutionName: string;
  grade: string;
  schoolType1: string;
}

const EducationHistoryPage = () => {
  const router = useRouter();

  // State for input fields
  const [seeEquivalent, setSeeEquivalent] = useState<SeeEquivalentData>({
    graduatedYear: "",
    board: "",
    institutionName: "",
    grade: "",
    schoolType1: "",
  });

  // Function to handle changes in the SEE or Equivalent section
  const handleSeeEquivalentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSeeEquivalent((prevState) => {
      localStorage.setItem("seeEquivalentChange", JSON.stringify({ ...prevState, [name]: value }));

      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("seeEquivalentChange")) {
        setSeeEquivalent(JSON.parse(localStorage.getItem("seeEquivalentChange")!) as SeeEquivalentData);
      }
    }
  }, []);

  return (
    <AdmissionPortalStyleProvider grade='XI'>
      <main>
        <section className='detail-row-section'>
          <h4 className='roboto_700'>
            <span className='required-field'> SEE or Equivalent </span>
          </h4>
          <div className='detail-row-division'>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400 input-year' id='graduated-year' name='graduatedYear' placeholder='Graduated year' type='date' value={seeEquivalent.graduatedYear} onChange={handleSeeEquivalentChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='board' name='board' placeholder='Board' type='text' value={seeEquivalent.board} onChange={handleSeeEquivalentChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='institute-name' name='institutionName' placeholder='Name of institution' type='text' value={seeEquivalent.institutionName} onChange={handleSeeEquivalentChange} />
            </div>
            <div className='detail-col'>
              <input autoComplete='off' required className='roboto_400' id='grade' name='grade' placeholder='Grade' type='text' value={seeEquivalent.grade} onChange={handleSeeEquivalentChange} />
            </div>
          </div>
          <div className='private-public-selection'>
            <h2 className='roboto_700'>
              <span className='required-field'> INSTITUTION </span>
            </h2>
            <label htmlFor='school-private1'>
              <input autoComplete='off' type='radio' name='schoolType1' id='school-private1' value='private' onChange={handleSeeEquivalentChange} />
              <span className='roboto_400'>Private</span>
            </label>
            <label htmlFor='school-public2'>
              <input autoComplete='off' type='radio' name='schoolType1' id='school-public2' value='public' onChange={handleSeeEquivalentChange} />
              <span className='roboto_400'>Public</span>
            </label>
          </div>
        </section>

        <section className='application-form-footer'>
          <div className='footer-btn-container'>
            <a
              onClick={() => {
                router.push("/admissionPortal/gradeXII/step1");
              }}
              className='proceed-btn roboto_300 sheen'
            >
              <i className='bx bx-left-arrow-alt'></i> Previous
            </a>
            <a
              onClick={() => {
                router.push("/admissionPortal/gradeXI/step3");
              }}
              className='proceed-btn roboto_300 sheen'
            >
              Next <i className='bx bx-right-arrow-alt'></i>
            </a>
          </div>
        </section>
      </main>

      <button
        onClick={() => {
          console.log(seeEquivalent);
        }}
      >
        PRINT
      </button>
    </AdmissionPortalStyleProvider>
  );
};

export default EducationHistoryPage;
