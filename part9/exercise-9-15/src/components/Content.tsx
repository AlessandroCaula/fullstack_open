import type { CoursePart } from "../types";
import Part from "./Part";

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
  return (
    <div>
      {courseParts.map((course) => (
        <div key={course.name}>
          <Part course={course} />
          <br />
        </div>
      ))}
    </div>
  );
};

export default Content;
