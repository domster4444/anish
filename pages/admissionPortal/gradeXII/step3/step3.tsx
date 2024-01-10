import { ChangeEvent, useEffect, useState } from "react";

import { useRouter } from "next/router";
import AdmissionPortalStyleProvider from "@/components/AdmissionPortalStyleProvider";

interface TableRow {
  sn: number;
  subject: string;
  theory: string;
  practical: string;
  aggregate: string;
}

const AcademicInfoForm: React.FC = () => {
  const router = useRouter();

  const [tableRows, setTableRows] = useState<TableRow[]>([
    {
      sn: 1,
      subject: "",
      theory: "",
      practical: "",
      aggregate: "",
    },
  ]);

  const addRow = () => {
    const newSN = tableRows.length + 1;
    const newRow: TableRow = { sn: newSN, subject: "", theory: "", practical: "", aggregate: "" };
    setTableRows((prevRows) => [...prevRows, newRow]);
  };

  const removeRow = () => {
    if (tableRows.length > 1) {
      setTableRows((prevRows) => prevRows.slice(0, -1));
    }
  };

  const removeIndividualRow = () => {
    alert("This feature is left to be completed");
  };

  const overrideSN = () => {
    const updatedRows: TableRow[] = tableRows.map((row, index) => ({ ...row, sn: index + 1 }));
    setTableRows(updatedRows);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, rowIndex: number, field: keyof TableRow) => {
    const { value } = event.target;
    const updatedRows = [...tableRows];
    //@ts-ignore
    updatedRows[rowIndex][field] = value;

    localStorage.setItem("academicInformation", JSON.stringify(updatedRows));

    setTableRows(updatedRows);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("academicInformation")) {
        setTableRows(JSON.parse(localStorage.getItem("academicInformation") || "[]"));
      }
    }
  }, []);

  return (
    <AdmissionPortalStyleProvider grade='XII'>
      <main>
        <section className='detail-row-section'>
          <h2 className='title roboto_500'>
            <span className='required-field'> Marks Obtained in Grade XI </span>
          </h2>

          <div className='table-btn-container'>
            <button className='table-btn' onClick={addRow}>
              <i className='bx bx-plus'></i>
            </button>
            <button className='table-btn' onClick={removeRow}>
              <i className='bx bx-minus'></i>
            </button>
          </div>

          <div id='table-form-section' className='table-container'>
            <table className='table1 table-striped table-bordered table-hover table-condensed'>
              <thead>
                <tr>
                  <th className='roboto_400'>S.N</th>
                  <th className='roboto_400'>SUBJECTS</th>
                  <th className='roboto_400'>THEORY</th>
                  <th className='roboto_400'>PRACTICAL</th>
                  <th className='roboto_400'>AGGREGATE GRADE</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className='table-sn-number roboto_400'>{row.sn}</div>
                    </td>
                    <td>
                      <input autoComplete='off' type='text' name='subject' placeholder='Subject name' value={row.subject} onChange={(event) => handleInputChange(event, index, "subject")} />
                    </td>
                    <td>
                      <input autoComplete='off' type='number' name='theory' placeholder='Theory marks' value={row.theory} onChange={(event) => handleInputChange(event, index, "theory")} />
                    </td>
                    <td>
                      <input autoComplete='off' type='number' name='practical' placeholder='Practical marks' value={row.practical} onChange={(event) => handleInputChange(event, index, "practical")} />
                    </td>
                    <td>
                      <input autoComplete='off' type='number' name='aggregate' placeholder='Aggregate grade' value={row.aggregate} onChange={(event) => handleInputChange(event, index, "aggregate")} />
                    </td>
                    <td>
                      <button className='table-btn' onClick={removeIndividualRow}>
                        <i className='bx bx-trash'></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <section className='application-form-footer'>
            <div className='footer-btn-container'>
              <a
                onClick={() => {
                  router.push("/admissionPortal/gradeXII/step2");
                }}
                className='proceed-btn roboto_300 sheen'
              >
                <i className='bx bx-left-arrow-alt'></i> Previous
              </a>
              <a
                onClick={() => {
                  router.push("/admissionPortal/gradeXII/step4");
                }}
                className='proceed-btn roboto_300 sheen'
              >
                Next <i className='bx bx-right-arrow-alt'></i>
              </a>
            </div>
          </section>
        </section>
      </main>
      <button
        onClick={() => {
          console.log(tableRows);
        }}
      >
        Print Data In Console
      </button>
    </AdmissionPortalStyleProvider>
  );
};

export default AcademicInfoForm;
