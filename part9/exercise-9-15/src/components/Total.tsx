type TotalProps = {
  totExercise: number;
}

const Total = (props: TotalProps) => {
  return (
    <div>
      <p>Number of exercises <span style={{fontWeight: "bold"}}>{props.totExercise}</span></p>
    </div>
  );
};

export default Total;
