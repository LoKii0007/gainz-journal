const validateSet = (data) => {
  const { reps, weight, unit, weightType, exerciseId } = data;

  // Check required fields
  if (!reps || !weight || !unit || !weightType || !exerciseId) {
    return "Please provide all required fields";
  }

  // Validate reps
  if (typeof reps !== "number" || reps < 1) {
    return "Reps must be a positive number";
  }

  // Validate weight
  if (typeof weight !== "number" || weight < 0) {
    return "Weight must be a non-negative number";
  }

  // Validate unit
  const validUnits = ["KG", "LBS"];
  if (!validUnits.includes(unit)) {
    return "Invalid weight unit. Must be either KG or LBS";
  }

  // Validate weightType
  const validWeightTypes = ["TOTAL", "PER_SIDE"];
  if (!validWeightTypes.includes(weightType)) {
    return "Invalid weight type. Must be either TOTAL or PER_SIDE";
  }

  return null;
};

module.exports = {
  validateSet,
}; 