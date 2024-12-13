import app from "../app.js";
import pool from "../server.js";
import { catchAsyncError } from "../utilities.js";

const retrieveAllAppointments = async (
  fields,
  filters,
  orders,
  limit,
  page
) => {
  try {
    let query = "select ";
    if (fields) query += fields;
    else
      query += ` 
                  a.appointmentId,
                  a.appointmentDate,
                  a.appointmentStatus,
                  d.fees,
                  a.bookingDate,
                  a.paymentStatus,
                  a.doctorId ,
                  ud.firstName as doctorFirstName ,
                  ud.lastName as doctorlastName ,
                  d.specialization ,
                  a.patientId ,
                  up.firstName as patientFirstName , 
                  up.lastName as patientlastName,
                  a.locationId,
                  wl.workspaceId
                  `;
    query += `
                  from Appointments a 
                  join doctors d on d.doctorId = a.doctorId
                  join Users  ud  on ud.userId = a.doctorId 
                  join Users  up on up.userId = a.patientId
                  left join WorkspaceLocations wl on wl.locationId = a.locationId
                  `;
    if (filters) query += `where ${filters.join(" and ")}       `;
    if (orders) query += `order by ${orders.join(" , ")}       `;
    query += ` LIMIT ${limit} OFFSET ${page - 1} * ${limit} ; `;
    console.log(query);
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {
    console.log(error);
  }
};

const createAppointmentDb = async (attributes, locationId) => {
  try {
    const query = `insert into Appointments
                   (appointmentDate, appointmentStatus, fees, paymentStatus, bookingDate, patientId, doctorId,locationId) 
                   values($1,$2,$3,$4,$5,$6,$7,$8)
                   returning *`;
    attributes[4] = new Date(new Date(attributes[4]).toISOString());
    const appointment = await pool.query(query, [...attributes, locationId]);
    if (appointment.rowCount) {
      const secQuery = `select workspacesLocation from
                        WorkspaceLocations where locationId =$1`;
      const loc = await pool.query(secQuery, [locationId]);
      if (loc.rowCount) {
        appointment.rows[0].location = loc.rows[0];
      }
    }
    // console.log(appointment);
    if (appointment.rowCount) return appointment.rows[0];
    return false;
  } catch (error) {
    console.log(error);
  }
};

const updateAppointment = async (attributes, id) => {
  try {
    let query = `update Appointments SET `;
    let cnt = 0;
    Object.entries(attributes).forEach(([k, v]) => {
      if (cnt && v) query += " , ";
      if (v) {
        query += k + " = " + `$${++cnt}`;
      }
    });
    query += ` where appointmentId = $${++cnt}
              returning *`;
    const readyAtt = Object.values(attributes).filter((val) => val);
    const appointment = await pool.query(query, [...readyAtt, id]);
    if (appointment.rowCount) return appointment.rows[0];
    return false;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export { retrieveAllAppointments, createAppointmentDb, updateAppointment };
