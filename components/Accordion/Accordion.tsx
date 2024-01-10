import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

export default function Example() {
  return (
    <div className='w-full  rounded-2xl bg-white p-2'>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              style={{
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
              className='flex w-full justify-between rounded-md bg-white px-4 py-4 text-left text-md font-medium text-black focus:outline-none'
            >
              <span className='primary-blue-text'>What is School Management Software?</span>
              <ChevronUpIcon className={`${open ? "rotate-180 transform" : ""} h-8 w-8 text-red-500`} />
            </Disclosure.Button>
            <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
              School management software is a platform that helps in automating and streamlining the institute’s daily academic and administrative activities in the most effective manner. At its core, school management software holds all institute data in one place and helps stakeholders in making a
              better decision. School Software helps in improving the productivity of their institution by managing online admission, student attendance, online fee payment, timetable, parent communication, examination management, payroll, and online learning. The school ERP platform also offers
              many other 50+ features that help institutes in handling every operation smoothly and efficiently.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure as='div' className='mt-2'>
        {({ open }) => (
          <>
            <Disclosure.Button
              style={{
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
              className='flex w-full justify-between rounded-md bg-white px-4 py-4 text-left text-md font-medium text-black focus:outline-none'
            >
              <span className='primary-blue-text'>Why do institutes need School Software?</span>
              <ChevronUpIcon className={`${open ? "rotate-180 transform" : ""} h-8 w-8 text-red-500`} />
            </Disclosure.Button>
            <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
              With School Software, institutes can avoid manual handling operations, eliminate the paperwork, reduce the possibility of errors in the process and minimize monotonous tasks of all departments. By embracing the right school management system software the workload of employees can be
              reduced and various tasks can be completed without consuming too much time & effort.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure as='div' className='mt-2'>
        {({ open }) => (
          <>
            <Disclosure.Button
              style={{
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
              className='flex w-full justify-between rounded-md bg-white px-4 py-4 text-left text-md font-medium text-black focus:outline-none'
            >
              <span className='primary-blue-text'>How can schools benefit from e-learning modules in School Software?</span>
              <ChevronUpIcon className={`${open ? "rotate-180 transform" : ""} h-8 w-8 text-red-500`} />
            </Disclosure.Button>
            <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
              Benefits of having an E-learning module in school management system are - Institutes can deliver a better learning experience to students beyond classroom boundaries. Teachers can create media-rich customised courses and resolve students doubts in real-time. Students can download the
              study material and watch the recorded lectures at the comfort of their home.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure as='div' className='mt-2'>
        {({ open }) => (
          <>
            <Disclosure.Button
              style={{
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
              className='flex w-full justify-between rounded-md bg-white px-4 py-4 text-left text-md font-medium text-black focus:outline-none'
            >
              <span className='primary-blue-text'>Who uses School Software?</span>
              <ChevronUpIcon className={`${open ? "rotate-180 transform" : ""} h-8 w-8 text-red-500`} />
            </Disclosure.Button>
            <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
              School ERP Platform is generally used by students, teachers, parents, admin and other staff members in the institution. It reduces the burden of repetitive tasks of employees, simplifies communication among all stakeholders and allows stakeholders to access up-to-date information from
              anywhere at any time on any device.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure as='div' className='mt-2'>
        {({ open }) => (
          <>
            <Disclosure.Button
              style={{
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
              className='flex w-full justify-between rounded-md bg-white px-4 py-4 text-left text-md font-medium text-black focus:outline-none'
            >
              <span className='primary-blue-text'>How much does School Management Software cost?</span>
              <ChevronUpIcon className={`${open ? "rotate-180 transform" : ""} h-8 w-8 text-red-500`} />
            </Disclosure.Button>
            <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
              There are multiple ERP platforms available in the market and the costing of each platform depends on features and plugins selected by the institution - like SMS, Mobile App, Biometric, Vehicle Tracking System, Payment Gateway, Video conferencing integration, E-learning platform and
              more.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
