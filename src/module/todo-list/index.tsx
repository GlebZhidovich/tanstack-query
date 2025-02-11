import { useQuery } from "@tanstack/react-query";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export const getTodos = () =>
  new Promise<Todo[]>((res) =>
    setTimeout(
      res,
      1000,
      new Array(20).fill(1).map((_, i) => ({
        id: `${i + 1}`,
        text: `text ${i + 1}`,
        done: false,
      }))
    )
  );

export const TodoList = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["todos", "list"],
    queryFn: getTodos,
  });

  if (isPending) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>{JSON.stringify(error, null, 2)}</div>;
  }

  return (
    <>
      <h1>Todo List</h1>
      <ul>
        {data.map(({ id, text }) => (
          <li key={id}>{text}</li>
        ))}
      </ul>
    </>
  );
};
