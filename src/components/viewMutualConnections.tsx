import { ChangeEvent, Dispatch, useState } from "react";
import { ACTIONS, ActionTypes } from "../reducer";
import { PersonType } from "./person";

interface ViewMutualConnectionsProps {
  people: { [key: number]: PersonType };
  dispatch: Dispatch<ActionTypes>;
  from: number;
  to: number;
}

const ViewMutualConnections = ({ people, from, to, dispatch }: ViewMutualConnectionsProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>
    dispatch({
      type: e.target.name === "from" ? ACTIONS.SET_FROM : ACTIONS.SET_TO,
      payload: parseInt(e.target.value, 10),
    });

  const [state, setState] = useState(null);

  const find = (id: number, visited: Set<string>, target: number, path: string[]): void => {
    if (!path || !visited) return;
    console.log(people[id].name);

    visited.add(people[id].name);
    path.push(people[id].name);
    if (parseInt(`${id}`, 10) === target) {
      const tempPath = [...path];
      console.log("found", tempPath, state);
      setState((prev) => {
        if (!prev) {
          const allPaths = [];
          allPaths.push([...tempPath]);
          return allPaths;
        }
        console.log("setting", tempPath);
        return [...prev, [...tempPath]];
      });
    } else {
      people[id].connections.forEach((conn) => {
        if (visited.has(people[conn.id].name)) return;
        console.log(conn.id);
        find(conn.id, visited, target, path);
      });
    }
    visited.delete(people[id].name);
    console.log("popping", path.pop());
  };

  const findConnection = () => {
    console.log(from, to);
    const personPool = [];
    const visited = new Set<string>();
    find(from, visited, to, []);
    console.log(state, "55");
  };

  return (
    <div className="mx-2 mt-8 flex flex-col">
      <p className="text-xl">Find Connection</p>
      <div className="p-2 flex">
        <p className="px-2 py-2 text-lg">Connection between</p>{" "}
        <select
          id="from"
          defaultValue=""
          name="from"
          onChange={handleChange}
          placeholder="Select Person 1"
          className="select"
        >
          <option value="" disabled>
            Select Person 1
          </option>
          {Object.entries(people).map(
            ([id, person]) =>
              parseInt(id, 10) !== to && (
                <option key={id} value={id} className="px-2 py-1 ">
                  {person.name}
                </option>
              ),
          )}
        </select>
        <p className="px-2 py-2 text-lg">&</p>
        <select
          id="from"
          defaultValue=""
          name="to"
          onChange={handleChange}
          placeholder="Select Person 2"
          className="select"
        >
          <option value="" disabled>
            Select Person 2
          </option>
          {Object.entries(people).map(
            ([id, person]) =>
              parseInt(id, 10) !== from && (
                <option key={id} value={id} className="px-2 py-1 ">
                  {person.name}
                </option>
              ),
          )}
        </select>
        <button type="button" onClick={findConnection} className="btn-contained mx-4">
          Find
        </button>
      </div>
    </div>
  );
};

export default ViewMutualConnections;
