import type { CoursePart } from "../types";

// Defining an props interface
interface PartProps {
  course: CoursePart;
}

const Part = ({ course }: PartProps) => {
  // Exhaustive type checking.
  const assertNever = (value: never) => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}$`
    );
  };

  switch (course.kind) {
    case "basic":
      return (
        <div>
          <span style={{ fontWeight: "bold" }}>{course.name} {course.exerciseCount}</span>
          <br /><span style={{ fontStyle: "italic" }}>{course.description}</span>
        </div>
      );
    case "group":
      return (
        <div>
          <span style={{ fontWeight: "bold" }}>{course.name} {course.exerciseCount}</span>
          <br />Project exercise {course.groupProjectCount}
        </div>
      );
    case "background":
      return (
        <div>
          <span style={{ fontWeight: "bold" }}>{course.name} {course.exerciseCount}</span>
          <br /><span style={{ fontStyle: "italic" }}>{course.description}</span>
          <br />Submit to <a href={course.backgroundMaterial}>{course.backgroundMaterial}</a>
        </div>
      );
    case "special":
      return (
        <div>
          <span style={{ fontWeight: "bold" }}>{course.name} {course.exerciseCount}</span>
          <br /><span style={{ fontStyle: "italic" }}>{course.description}</span>
          <br />Required skills: {course.requirements.map((req) => (<span key={req}>{req}{' '}</span>))}
        </div>
      )
    default:
      return assertNever(course);
  }
};

export default Part;
