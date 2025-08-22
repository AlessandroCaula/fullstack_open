interface InputParameters {
  days: number[];
  target: number;
}

export interface ExerciseRecap {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// Parse the argument values given in the terminal
export const parseArgument = (args: string[]): InputParameters => {
  // Check if the parameters given are not enough
  if (args.length < 4) {
    throw new Error("Not enough parameters!");
  }

  // Loop through all the days and store their value in the days collection. Also check if they are all numbers.
  const days: number[] = [];
  // let target: number;
  let target: number = -1; // Initialize the variable before using it.
  for (let i: number = 2; i < args.length; i++) {
    // If the value is not a number throw an exception.
    if (isNaN(Number(args[i]))) {
      throw new Error(`Provided value is not a number! - ${args[i]}`);
    }
    // If it i is equal to 2, it is the target value
    if (i === 2) {
      target = Number(args[i]);
    } else {
      // Store the values as the exercise time of the day
      days.push(Number(args[i]));
    }
  }

  return {
    days: days,
    target: target,
  };
};

// Compute the metrics on the exercise days
export const calculateExercises = (days: number[], target: number): ExerciseRecap => {
  const periodLength = days.length;
  const trainingDays = days.filter((d) => d != 0).length;
  // Calculate the average time
  const average = days.reduce((acc, curr) => acc + curr, 0) / periodLength;
  const success = average >= target;
  // Compute the rating from 1 - 3
  const rating = Math.round((average * 100) / target / 33.3);
  // Rating description
  let ratingDescription: string = "";
  if (rating <= 1) {
    ratingDescription = "Sei na pippa";
  } else if (rating > 1 && rating <= 2) {
    ratingDescription = "Not too bad but could be better";
  } else {
    ratingDescription = "You are a PRO";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// const days = [3, 0, 2, 4.5, 0, 3, 1];
// const target = 5;

try {
  const { days, target } = parseArgument(process.argv);
  console.log(calculateExercises(days, target));
} catch (error: unknown) {
  let errorMessage: string = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
