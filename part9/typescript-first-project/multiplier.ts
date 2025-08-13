const multiplicator = (a, b, printText) => {
	console.log(printText, a * b);
}

multiplicator('how about a string?', 4, 'Multiplied a string and 4, the result is:');


// With TypeScript
const multiplicatorTs = (a: number, b: number, printText: string) => {
	console.log(printText, a * b);
}

multiplicatorTs('how about a string', 4, 'Multiplied a string and 4, the result is:')