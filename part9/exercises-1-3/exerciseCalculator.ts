interface ExerciseRecap {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (days: number[], target: number): ExerciseRecap => {
  const periodLength = days.length;
  const trainingDays = days.filter((d) => d != 0).length;
  const success = trainingDays >= target;
  // Calculate the average time
  const average = days.reduce((acc, curr) => acc + curr, 0) / periodLength;
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
    average
  };
};

const days = [3, 0, 2, 4.5, 0, 3, 1];
const target = 5;

console.log(calculateExercises(days, target));
