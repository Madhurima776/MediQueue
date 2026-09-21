const departments =
  require(
    "../data/mockDepartments"
  );

const getDepartments = (
  req,
  res
) => {
  res.json(departments);
};

module.exports = {
  getDepartments,
};