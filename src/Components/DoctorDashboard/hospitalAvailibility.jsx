/* eslint-disable react/prop-types */
import { Field } from "formik";

export default function Availability({ index, hospitals, cols }) {
  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  const hours = [
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ];
  return (
    <>
      <Field
        className={`w-full bg-gray-800 text-white py-3 px-4 rounded-md border border-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none col-span-${cols}`}
        as="select"
        name={`hospitalName[${index}]`}
        variant="filled"
      >
        <option value="" disabled>
          Choose a hospital...
        </option>
        {hospitals.map((option, index) => (
          <option key={index} value={option?.workspaceid}>
            {option?.workspacename}
          </option>
        ))}
      </Field>
      <div className={cols == 2 ? `col-span-${cols} ` : `hidden`}></div>
      <Field
        className={`w-full bg-gray-800 text-white py-3 px-4 rounded-md border border-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none col-span-${cols}`}
        as="select"
        name={`hospitalday[${index}]`}
        variant="filled"
      >
        <option value="" disabled>
          Choose a Day...
        </option>
        {days.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Field>
      <Field
        className={`w-full bg-gray-800 text-white py-3 px-4 rounded-md border border-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none col-span-${
          cols / 2
        }`}
        as="select"
        name={`hospitalstart[${index}]`}
        variant="filled"
      >
        <option value="" disabled>
          Choose a starting hour...
        </option>
        {hours.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Field>
      <Field
        className={`w-full bg-gray-800 text-white py-3 px-4 rounded-md border border-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none col-span-${
          cols / 2
        }`}
        as="select"
        name={`hospitalend[${index}]`}
        variant="filled"
      >
        <option value="" disabled>
          Choose a starting hour...
        </option>
        {hours.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Field>
    </>
  );
}
