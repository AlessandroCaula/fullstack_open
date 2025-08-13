// // With JavaScript
// 
// const multiplicator = (a, b, printText) => {
// 	console.log(printText, a * b);
// }
// multiplicator('how about a string?', 4, 'Multiplied a string and 4, the result is:');


// // With TypeScript
// 
// const multiplicatorTs = (a: number, b: number, printText: string) => {
// 	console.log(printText, a * b);
// }
// multiplicatorTs('how about a string', 4, 'Multiplied a string and 4, the result is:')


// // Type Operator
// // 
// type Operation = 'multiply' | 'add' | 'divide';

// const calculator = (a: number, b: number, op: Operation): number | string => {
// 	if (op === 'multiply') {
// 		return a * b;
// 	} else if (op === 'add') {
// 		return a + b;
// 	} else if (op === 'divide') {
// 		if (b === 0) return 'can\'t divide by 0!';
// 		return a / b;
// 	}
// }
// console.log(calculator(2, 4, 'divide'));


// Switch
type Operation = 'multiply' | 'add' | 'divide';

const calculator = (a: number, b: number, op: Operation): number => {
	switch(op) {
		case 'multiply':
			return a * b;
		case 'divide':
			if (b === 0) throw new Error('Can\'t divide by 0!');
		case 'add':
			return a + b;
		default:
			throw new Error('Operation is not multiply, add or divide!');
	}
}

try {
	console.log(calculator(1, 5, 'divide'));
} catch (error: unknown) {
	let errorMessage = 'Something went wrong: ';
	if (error instanceof Error) {
		errorMessage += error.message;
	}
	console.log(errorMessage);
}