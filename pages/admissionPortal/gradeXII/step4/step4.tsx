import { useEffect } from "react";

import { useRouter } from "next/router";
import AdmissionPortalStyleProvider from "@/components/AdmissionPortalStyleProvider";

const DocumentUploadForm: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const handleFileChange = (i: number, e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const fileName = target.files[0].name;
        console.log("File selected: " + fileName);
        const previewElements = document.querySelectorAll(".test-preview") as NodeListOf<HTMLSpanElement>;
        if (previewElements[i]) {
          previewElements[i].innerHTML = `<p id='upload-success-msg' className='one-liner' style="color: #0f5288">${fileName}</p>`;
        }
      }
    };

    const uploadElements = document.querySelectorAll(".test-upload") as NodeListOf<HTMLInputElement>;
    uploadElements.forEach((element, i) => {
      element.addEventListener("change", (e) => handleFileChange(i, e));
    });
  }, []);

  return (
    <AdmissionPortalStyleProvider grade='XII'>
      <main>
        <section className='application-form-container'>
          <div className='two-col-detail-row-section'>
            <h4 className='roboto_500'>
              <span className='required-field'>Upload your documents</span>
            </h4>
            <div className='column-container'>
              <div className='detail-col'>
                <div className='input-field-container'>
                  <label className='roboto_400' htmlFor='ppSizePhoto'>
                    PP Size Photo
                  </label>
                  <div className='upload-file-container'>
                    <span className='roboto_400 test-preview'>
                      Drag & Drop your file or &nbsp; <a href='#'> Browse </a>
                    </span>
                    <div className='file-input-container'>
                      <input autoComplete='off' className='test-upload' required type='file' id='ppSizePhoto' />
                    </div>
                  </div>
                </div>
                <div className='input-field-container'>
                  <label className='roboto_400' htmlFor='gradeXIMarksheet'>
                    Grade-XI Marksheet
                  </label>
                  <div className='upload-file-container'>
                    <span className='roboto_400 test-preview'>
                      Drag & Drop your file or &nbsp; <a href='#'> Browse </a>
                    </span>
                    <div className='file-input-container'>
                      <input autoComplete='off' className='test-upload' required type='file' id='gradeXIMarksheet' />
                    </div>
                  </div>
                </div>
              </div>

              <div className='detail-col'>
                <div className='input-field-container'>
                  <label className='roboto_400' htmlFor='characterCertificate'>
                    Previous School <br /> Character Certificate (if applicable)
                  </label>
                  <div className='upload-file-container'>
                    <span className='roboto_400 test-preview'>
                      Drag & Drop your file or &nbsp; <a href='#'> Browse </a>
                    </span>
                    <div className='file-input-container'>
                      <input autoComplete='off' className='test-upload' required type='file' id='characterCertificate' />
                    </div>
                  </div>
                </div>
                <div className='input-field-container'>
                  <label className='roboto_400' htmlFor='transferCertificate'>
                    Transfer Certificate (if applicable)
                  </label>
                  <div className='upload-file-container'>
                    <span className='roboto_400 test-preview'>
                      Drag & Drop your file or &nbsp; <a href='#'> Browse </a>
                    </span>
                    <div className='file-input-container'>
                      <input autoComplete='off' className='test-upload' required type='file' id='transferCertificate' />
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
