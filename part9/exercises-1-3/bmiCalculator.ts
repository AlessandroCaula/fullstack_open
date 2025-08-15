const calculateBmi = (heigh: number, weight: number): string => {
  // The Body Mass Index (BMI) is a value derived from the mass and height of a person.
  // The BMI is defined as the body mass divided by the square of the body height [kg/m2].
  const weightM = weight / 100;
  const bodyMass: number = heigh / Math.pow(weightM, 2);

  // Check the categories
  if (bodyMass < 16) {
    return "Underweight (Severe thinness)";
  } else if (bodyMass > 16.0 && bodyMass < 17.0) {
    return "Underweight (Moderate thinness)";
  } else if (bodyMass > 17.0 && bodyMass < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (bodyMass > 18.5 && bodyMass < 25.0) {
    return "Normal range";
  } else if (bodyMass > 25.0 && bodyMass < 30.0) {
    return "Overweight (Pre-obese)";
  } else if (bodyMass > 30.0 && bodyMass < 35.0) {
    return "Obese (Class I)";
  } else if (bodyMass > 35.0 && bodyMass < 40.0) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

console.log(calculateBmi(64, 178));
