// @ts-nocheck
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import AdmissionPortalStyleProvider from "@/components/AdmissionPortalStyleProvider";

const ReactQuillNoSSR = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const PersonalStatementForm = () => {
  const router = useRouter();
  const [editorHtml, setEditorHtml] = useState<string>(""); // State for editor content
  const [showFullStatement, setShowFullStatement] = useState<boolean>(false); // State for showing/hiding the full statement

  const handleShowFullStatement = () => {
    setShowFullStatement(!showFullStatement);
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      const showMoreButton = document.getElementById("showMoreButton");
      if (showMoreButton) {
        showMoreButton.addEventListener("click", handleShowFullStatement);
      }
      if (localStorage.getItem("personalStatement")) {
        setEditorHtml(localStorage.getItem("personalStatement"));
      }
    }
  }, []);

  const handleEditorChange = (html: string) => {
    setEditorHtml(() => {
      localStorage.setItem("personalStatement", html);
      return html;
    });
  };

  return (
    <AdmissionPortalStyleProvider grade='XI'>
      <div className='modal-body application-form-container' id='learnmore-instruction-set'>
        <h2
          className='roboto_700'
          style={{
            fontSize: "18px",
          }}
        >
          Personal Statement
        </h2>
        <section style={{ margin: "1rem 0rem" }}>
          {showFullStatement ? (
            <div>
              <section id='learn-more-section'>
                <p className='roboto_700 title'>A PERSONAL STATEMENT IS</p>
                <ul className='ml-5 roboto_500'>
                  <li>Your personal essay should produce a picture of you as a person.</li>
                  <li>The reader must be invited to get to know you, personally. Bridge the assumed distance of strangers. Make your reader welcome.</li>
                  <li>An indication of your priorities and judgment. What you choose to say in your statement tells the committee what your priorities are. What you say, and how you say it, is crucial.</li>
                  <li>
                    And a story, or more precisely, your story. Everyone has a story to tell, but we are not all natural storytellers. If you are like most people, your life lacks inherent drama. This is when serious self-reflection, conversation with friends, family, and mentors, and permission to
                    be creative come in handy.
                  </li>
                </ul>

                <p className='roboto_500'>Things you must include in the personal statement.</p>
                <p className='roboto_500'>
                  An effective personal statement will answer the following questions:
                  <br />
                </p>
                <ul className='ml-5 roboto_500'>
                  <li>Who am I?</li>
                  <li>Who do I want to be?</li>
                  <li>What kind of contribution do I want to make, and how? What kind of life-changing experience have I undergone?</li>
                  <li>Why does it make sense for me to study at Deerwalk Institute of Technology?</li>
                </ul>
                <p></p>

                <p className='roboto_700 title'>Technical Guidelines</p>

                <ul className='ml-5 roboto_500'>
                  <li>The total length of your personal statement should not be less than 250 words.</li>
                  <li>Once complete, please scan your personal statement and save it in a pdf format.</li>
                  <li>Upload the scanned copy of the personal statement.</li>
                </ul>

                <button
                  className='roboto_400'
                  style={{
                    marginTop: "1rem",
                    fontSize: "14px",
                  }}
                  onClick={handleShowFullStatement}
                >
                  Show Less
                </button>
              </section>
            </div>
          ) : (
            <div>
              <div className='roboto_400'>
                A personal statement is your introduction to a selection committee. The committee gets to know you through this. While mark sheets and scores tell your academic soundness, a personal statement tells who you are as a person. In a personal statement, your goal is to close the distance
                between you and the reader. Personal statements carry a weightage of 20% in the overall admission process.
              </div>
              <button
                className='roboto_400'
                style={{
                  marginTop: "1rem",
                  fontSize: "14px",
                }}
                id='showMoreButton'
              >
                Show More
              </button>
            </div>
          )}
        </section>
        <ReactQuillNoSSR value={editorHtml} onChange={handleEditorChange} theme='snow' />
      </div>

      <section className='application-form-footer'>
        <div className='footer-btn-container'>
          <a
            onClick={() => {
              router.push("/admissionPortal/gradeXI/step5");
            }}
            className='proceed-btn roboto_300 sheen'
          >
            <i className='bx bx-left-arrow-alt'></i> Previous
          </a>
          <a
            onClick={() => {
              router.push("/admissionPortal/gradeXI/step7");
            }}
            className='proceed-btn roboto_300 sheen'
          >
            Next <i className='bx bx-right-arrow-alt'></i>
          </a>
        </div>
      </section>
    </AdmissionPortalStyleProvider>
  );
};

export default PersonalStatementForm;
