export default const appointment_time_check = appointment_time => {
  let appointment_minutes = parseInt(appointment_time.slice(3));
  if (appointment_minutes % 15 !== 0) {
    return false;
  } else {
    return true;
  }
};