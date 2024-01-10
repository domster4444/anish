import moment from "moment";

import Calendar from "components/Calendar";

const events = [
  {
    start: moment("2023-01-01T00:00:00").toDate(),
    end: moment("2023-01-01T23:59:59").toDate(),
    title: "New Year's Day",
  },
  {
    start: moment("2023-05-01T00:00:00").toDate(),
    end: moment("2023-05-01T23:59:59").toDate(),
    title: "International Labor Day",
  },
  {
    start: moment("2023-06-05T00:00:00").toDate(),
    end: moment("2023-06-05T23:59:59").toDate(),
    title: "Constitution Day",
  },
  {
    start: moment("2023-07-13T00:00:00").toDate(),
    end: moment("2023-07-13T23:59:59").toDate(),
    title: "Rato Machhindranath Rath Yatra",
  },
  {
    start: moment("2023-08-15T00:00:00").toDate(),
    end: moment("2023-08-15T23:59:59").toDate(),
    title: "Gai Jatra",
  },
  {
    start: moment("2023-09-19T00:00:00").toDate(),
    end: moment("2023-09-19T23:59:59").toDate(),
    title: "Indra Jatra",
  },
  {
    start: moment("2023-09-20T00:00:00").toDate(),
    end: moment("2023-09-20T23:59:59").toDate(),
    title: "Constitution Day",
  },
  {
    start: moment("2023-10-08T00:00:00").toDate(),
    end: moment("2023-10-08T23:59:59").toDate(),
    title: "Dashain (Day 1)",
  },
  {
    start: moment("2023-10-26T00:00:00").toDate(),
    end: moment("2023-10-26T23:59:59").toDate(),
    title: "Tihar (Deepawali) - Day 1",
  },
  {
    start: moment("2023-11-07T00:00:00").toDate(),
    end: moment("2023-11-07T23:59:59").toDate(),
    title: "Chhath Puja",
  },
  {
    start: moment("2023-12-25T00:00:00").toDate(),
    end: moment("2023-12-25T23:59:59").toDate(),
    title: "Christmas Day",
  },
  {
    start: moment("2023-02-12T00:00:00").toDate(),
    end: moment("2023-02-12T23:59:59").toDate(),
    title: "Maha Shivaratri",
  },
  {
    start: moment("2023-03-18T00:00:00").toDate(),
    end: moment("2023-03-18T23:59:59").toDate(),
    title: "Holi",
  },
  {
    start: moment("2023-04-06T00:00:00").toDate(),
    end: moment("2023-04-06T23:59:59").toDate(),
    title: "Buddha Jayanti",
  },
  {
    start: moment("2023-10-14T00:00:00").toDate(),
    end: moment("2023-10-14T23:59:59").toDate(),
    title: "Laxmi Puja",
  },

  {
    start: moment("2023-02-12T00:00:00").toDate(),
    end: moment("2023-02-12T23:59:59").toDate(),
    title: "Maha Shivaratri",
  },
  {
    start: moment("2023-03-18T00:00:00").toDate(),
    end: moment("2023-03-18T23:59:59").toDate(),
    title: "Holi",
  },

  {
    start: moment("2023-10-14T00:00:00").toDate(),
    end: moment("2023-10-14T23:59:59").toDate(),
    title: "Laxmi Puja",
  },
  {
    start: moment("2023-11-28T00:00:00").toDate(),
    end: moment("2023-11-28T23:59:59").toDate(),
    title: "MRI Registration",
  },

  {
    start: moment("2023-01-14T00:00:00").toDate(),
    end: moment("2023-01-14T23:59:59").toDate(),
    title: "Maghe Sankranti",
  },
  {
    start: moment("2023-02-16T00:00:00").toDate(),
    end: moment("2023-02-16T23:59:59").toDate(),
    title: "Sonam Lhosar",
  },
  {
    start: moment("2023-04-14T00:00:00").toDate(),
    end: moment("2023-04-14T23:59:59").toDate(),
    title: "Nepali New Year (Bikram Sambat)",
  },
  {
    start: moment("2023-04-14T00:00:00").toDate(),
    end: moment("2023-04-14T23:59:59").toDate(),
    title: "Baisakh Bhu Nakha",
  },
  {
    start: moment("2023-06-20T00:00:00").toDate(),
    end: moment("2023-06-20T23:59:59").toDate(),
    title: "Ropain Diwas (National Paddy Day)",
  },
  {
    start: moment("2023-08-01T00:00:00").toDate(),
    end: moment("2023-08-01T23:59:59").toDate(),
    title: "Shrawan Somvar (Beginning of Holy Month Shrawan)",
  },
  {
    start: moment("2023-11-02T00:00:00").toDate(),
    end: moment("2023-11-02T23:59:59").toDate(),
    title: "Bhai Tika",
  },
  {
    start: moment("2023-12-30T00:00:00").toDate(),
    end: moment("2023-12-30T23:59:59").toDate(),
    title: "Tamudhi Lhosar",
  },
  {
    start: moment("2023-03-01T00:00:00").toDate(),
    end: moment("2023-03-01T23:59:59").toDate(),
    title: "Pashupatinath Shivaratri",
  },
  {
    start: moment("2023-03-08T00:00:00").toDate(),
    end: moment("2023-03-08T23:59:59").toDate(),
    title: "International Women's Day",
  },
  {
    start: moment("2023-04-29T00:00:00").toDate(),
    end: moment("2023-04-29T23:59:59").toDate(),
    title: "Akshaya Tritiya",
  },
  {
    start: moment("2023-06-06T00:00:00").toDate(),
    end: moment("2023-06-06T23:59:59").toDate(),
    title: "World Environment Day",
  },

  {
    start: moment("2023-12-10T00:00:00").toDate(),
    end: moment("2023-12-10T23:59:59").toDate(),
    title: "Human Rights Day",
  },
  {
    start: moment("2023-11-01T00:00:00").toDate(),
    end: moment("2023-11-01T23:59:59").toDate(),
    title: "Nepal Sambat New Year's Day",
  },
];

console.log("EVENT MOMENT ", moment("2023-11-01T00:00:00").toDate() === moment("2023-11-01T23:59:59").toDate());
export default function BasicCalendar({ calendarEvents }: any) {
  console.log("CALENDAR EVENTS===", calendarEvents);
  return (
    <>
      <Calendar events={calendarEvents} />;
    </>
  );
}
