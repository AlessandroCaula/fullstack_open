// Output interface for the parseArgument method
interface bmiValues {
  height: number;
  weight: number;
}

// Method for parsing the argument parameters given in the console
export const parseArgument = (args: string[]): bmiValues => {
  // Check if there are not enough parameters given as arguments
  if (args.length < 4) {
    throw new Error("Not enough arguments");
  }
  if (args.length > 4) {
    throw new Error("Too many arguments");
  }

  // Check if the parameters are values.
  // Number(args[2]) -> converts the string (args[2]) into a number. "5" -> 5. "abc" -> NaN.
  // isNaN(...) -> checks if the value is NaN. isNaN(5) -> false. isNaN(NaN) -> true
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    // Return the bmiValues
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    // Throw an error
    throw new Error("Provided values were not numbers!");
  }
};

// Method for calculating the BMI
export const calculateBmi = (height: number, weight: number): string => {
  // Check if the input weight or height parameter is 0.
  if (height === 0 || weight === 0) {
    throw new Error(
      "Impossible to have one or both the parameters equal to 0!"
    );
  }

  // The Body Mass Index (BMI) is a value derived from the mass and height of a person.
  // The BMI is defined as the body mass divided by the square of the body height [kg/m2].
  const weightM = weight / 100;
  const bodyMass: number = height / Math.pow(weightM, 2);

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

// Make sure that this works only when launched from command line
if (require.main === module) {
  try {
    const { height, weight } = parseArgument(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
