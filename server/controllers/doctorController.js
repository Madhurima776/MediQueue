const doctors =
  require("../data/mockDoctors");

const getDoctors = (req, res) => {
  res.json(doctors);
};

const getDoctorById = (req, res) => {
  const doctor = doctors.find(
    (doctor) =>
      doctor.id === Number(req.params.id)
  );

  if (!doctor) {
    return res.status(404).json({
      message: "Doctor not found",
    });
  }

  res.json(doctor);
};

module.exports = {
  getDoctors,
  getDoctorById,
};