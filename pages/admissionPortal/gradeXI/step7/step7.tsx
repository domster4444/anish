import { useEffect } from "react";

import { useRouter } from "next/router";
import AdmissionPortalStyleProvider from "@/components/AdmissionPortalStyleProvider";

const DeclarationForm = () => {
  const router = useRouter();

  const navigateToPreviousPage = () => {
    router.push("/admissionPortal/gradeXI/step6");
  };

  useEffect(() => {
    for (let i = 0; i < document.getElementsByClassName("test-upload").length; i++) {
      console.log("found node elements =", document.getElementsByClassName("test-upload")[i]);

      document.getElementsByClassName("test-upload")[i].addEventListener("change", function (e: any) {
        document.getElementsByClassName("test-preview")[i].innerHTML = ` <p id='upload-success-msg' className='one-liner' style="color: #0f5288">${e.target.files[0].name}</p>`;
      });
    }
  }, []);

  return (
    <AdmissionPortalStyleProvider grade='XI'>
      <div className='modal-body application-form-container' id='learnmore-instruction-set'>
        <h2 className='roboto_500'>Declaration</h2>
        <div className='declaration-body'>
          <div className='application-form-container'>
            <p className='roboto_400 declaration-paragraph'>
              I certify that the information I have provided in this application is true, complete, and accurate in all respects. All information I have provided in connection with this application is subject to verification and audit by DWIT College.
            </p>

            <br />
            <p className='roboto_400 declaration-paragraph'>I shall provide supporting documentation to DWIT College to verify my eligibility upon request.</p>
            <br />
            <p className='roboto_400 declaration-paragraph'>I understand that any misrepresentation on this application or failure to provide my consent to affiliating University to verify my information on this application may result in cancellation of my admission or enrollment status.</p>

            <h4 className='declaration-title roboto_700'>Rules and Regulations</h4>

            <p className='roboto_400 declaration-paragraph'>I fully understand that DWIT College has the final say on any kind of conflicts/disputes related to admission and will regard its decision as full and final.</p>

            <h4 className='declaration-title roboto_700'>Fees</h4>
            <p className='roboto_400 declaration-paragraph'>I fully understand that pre-admission deposit made during the time of admission is refundable within 21 days of the publication of the University entrance test.</p>

            <div className='declaration-agreen-container'>
              <div className='checkbox-container'>
                <input autoComplete='off' id='consent-box' required type='checkbox' name='checkbox' />
              </div>
              <label htmlFor='consent-box'>
                <p className='declaration-agreen-text roboto_500'>I fully agree with the above statement and rules and regulations.</p>
              </label>
            </div>

            <div className='two-col-detail-row-section'>
              <h4 className='roboto_500'>
                <span className='required-field'>SIGNATURE</span>
              </h4>
              <div className='column-container'>
                <div className='detail-col'>
                  <div className='input-field-container'>
                    <label className='roboto_400' htmlFor=''>
                      Student's Signature
                    </label>

                    <div className='upload-file-container'>
                      <span className='roboto_400 test-preview'>
                        Drag & Drop your file or &nbsp; <a href='#'>Browse</a>
                      </span>

                      <div className='file-input-container'>
                        <input autoComplete='off' className='test-upload' required type='file' />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='detail-col'>
                  <div className='input-field-container'>
                    <label className='roboto_400' htmlFor=''>
                      Guardian Signature
                    </label>
                    <div className='upload-file-container'>
                      <span className='roboto_400 test-preview'>
                        Drag & Drop your file or &nbsp; <a href='#'>Browse</a>
                      </span>

                      <div className='file-input-container'>
                        <input autoComplete='off' className='test-upload' required type='file' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className='application-form-footer'>
          <div className='footer-btn-container'>
            <a onClick={navigateToPreviousPage} className='proceed-btn roboto_300 sheen'>
              <i className='bx bx-left-arrow-alt'></i> Previous
            </a>
            <a
              onClick={() => {
                alert("finish");
              }}
              className='proceed-btn roboto_300 sheen'
            >
              <i className='bx bx-left-arrow-alt'></i> Finish
            </a>
          </div>
        </section>
      </div>
    </AdmissionPortalStyleProvider>
  );
};

export default DeclarationForm;
