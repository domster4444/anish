import { ChangeEvent, MouseEvent, useEffect } from "react";

import { useRouter } from "next/router";
import AdmissionPortalStyleProvider from "@/components/AdmissionPortalStyleProvider";

const DocumentUploadForm = () => {
  const router = useRouter();

  useEffect(() => {
    for (let i = 0; i < document.getElementsByClassName("test-upload").length; i++) {
      console.log("found node elements =", document.getElementsByClassName("test-upload")[i] as HTMLInputElement);

      document.getElementsByClassName("test-upload")[i].addEventListener("change", function (e) {
        const inputElement = e.target as HTMLInputElement;
        console.log(inputElement.files![0].name);

        (document.getElementsByClassName("test-preview")[i] as HTMLElement).innerHTML = ` <p id='upload-success-msg' className='one-liner' style="color: #0f5288">${inputElement.files![0].name}</p>`;
      });
    }
  }, []);

  return (
    <AdmissionPortalStyleProvider grade='XI'>
      <main>
        <section className='application-form-container'>
          <div className='two-col-detail-row-section'>
            <h4 className='roboto_500'>
              <span className='required-field'>Upload your documents</span>
            </h4>
            <div className='column-container'>
              <div className='detail-col'>
                <div className='input-field-container'>
                  <label className='roboto_400' htmlFor='pp-size-photo'>
                    PP Size Photo
                  </label>
                  <div className='upload-file-container'>
                    <span className='roboto_400 test-preview'>
                      Drag & Drop your file or &nbsp; <a href='#'> Browse </a>
                    </span>
                    <div className='file-input-container'>
                      <input autoComplete='off' className='test-upload' required type='file' id='pp-size-photo' />
                    </div>
                  </div>
                </div>
                <div className='input-field-container'>
                  <label className='roboto_400' htmlFor='grade-10-marksheet'>
                    Grade 10 Marksheet
                  </label>
                  <div className='upload-file-container'>
                    <span className='roboto_400 test-preview'>
                      Drag & Drop your file or &nbsp; <a href='#'> Browse </a>
                    </span>
                    <div className='file-input-container'>
                      <input autoComplete='off' className='test-upload' required type='file' id='grade-10-marksheet' />
                    </div>
                  </div>
                </div>
              </div>

              <div className='detail-col'>
                <div className='input-field-container'>
                  <label className='roboto_400' htmlFor='character-certificate'>
                    Previous School <br /> Character Certificate (if applicable)
                  </label>
                  <div className='upload-file-container'>
                    <span className='roboto_400 test-preview'>
                      Drag & Drop your file or &nbsp; <a href='#'> Browse </a>
                    </span>
                    <div className='file-input-container'>
                      <input autoComplete='off' className='test-upload' required type='file' id='character-certificate' />
                    </div>
                  </div>
                </div>
                <div className='input-field-container'>
                  <label className='roboto_400' htmlFor='transfer-certificate'>
                    Transfer Certificate (if applicable)
                  </label>
                  <div className='upload-file-container'>
                    <span className='roboto_400 test-preview'>
                      Drag & Drop your file or &nbsp; <a href='#'> Browse </a>
                    </span>
                    <div className='file-input-container'>
                      <input autoComplete='off' className='test-upload' required type='file' id='transfer-certificate' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='application-form-footer'>
          <div className='footer-btn-container'>
            <a
              onClick={() => {
                router.push("/admissionPortal/gradeXII/step3");
              }}
              className='proceed-btn roboto_300 sheen'
            >
              <i className='bx bx-left-arrow-alt'></i> Previous
            </a>
            <a
              onClick={() => {
                router.push("/admissionPortal/gradeXII/step5");
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

export default DocumentUploadForm;
