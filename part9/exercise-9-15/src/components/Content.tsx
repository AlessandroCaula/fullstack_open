import type { CoursePart } from "../types";

// // Define a type for a single course part. I could use both type and interface.
// type CoursePart = {
//   name: string;
//   exerciseCount: number;
// };

// Type the props. courseParts is an array of CoursePart
interface ContentProps {
  courseParts: CoursePart[];
}

// Content component. Using props.
const Content = ({ courseParts }: ContentProps) => {

  courseParts.forEach((part) => {
    switch (part.kind) {
      case "basic":
        console.log(part.name, part.description, part.exerciseCount);
        break;
      case "group":
        console.log(part.name, part.exerciseCount, part.groupProjectCount);
        break;
      case "background":
        console.log(part.name, part.description, part.exerciseCount, part.backgroundMaterial);
        break;
    }
  });

  return (
    <div>
      {courseParts.map((course) => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
