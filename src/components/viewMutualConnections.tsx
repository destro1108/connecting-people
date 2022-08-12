import { ChangeEvent, Dispatch, useState } from "react";
import { ACTIONS, ActionTypes } from "../reducer";
import Button from "./button";
import Chip from "./chip";
import { ConnectionsType, PersonType } from "./person";
import Select from "./select";

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

  const [mutualConnections, setMutualConnections] = useState<ConnectionsType[][] | null>(null);

  const find = (
    source: ConnectionsType,
    visited: Set<string>,
    target: number,
    path: ConnectionsType[],
  ): void => {
    if (!path || !visited) return;
    const { id, relation } = source;
    visited.add(people[id].name);
    path.push({ id, relation });
    if (parseInt(`${id}`, 10) === target) {
      const tempPath = [...path];
      setMutualConnections((prev: ConnectionsType[][] | null) => {
        if (!prev) {
          const allPaths = [];
          allPaths.push([...tempPath]);
          return allPaths;
        }
        return [...prev, [...tempPath]];
      });
    } else {
      people[id].connections.forEach((conn) => {
        if (visited.has(people[conn.id].name)) return;
        find(conn, visited, target, path);
      });
    }
    visited.delete(people[id].name);
    path.pop();
  };

  const findConnection = () => {
    if (from === -1 || to === -1) {
      alert(`Select Person ${from === -1 ? "1" : "2"}`);
      return;
    }
    setMutualConnections(null);
    const visited = new Set<string>();
    find({ id: from, relation: null }, visited, to, []);
  };

  return (
    <div className="mx-2 mt-4 md:mt-8 flex flex-col ">
      <p className="text-xl">Find Connection</p>
      <div className="p-2 flex gap-4">
        <p className="md:px-2 px-1 py-2 text-base md:text-lg flex flex-wrap">Connection between</p>{" "}
        <Select
          id="from"
          name="from"
          onChange={handleChange}
          placeholder="Select Person 1"
          disabledOptionText="Select Person 1"
        >
          {Object.entries(people)?.map(([id, person]): JSX.Element | null => {
            if (!(parseInt(id, 10) !== to)) return null;
            return (
              <option key={id} value={id} className="px-2 py-1 ">
                {person.name}
              </option>
            );
          })}
        </Select>
        <p className="px-1 md:px-2 py-2 text-lg">&</p>
        <Select
          id="to"
          name="to"
          onChange={handleChange}
          placeholder="Select Person 2"
          disabledOptionText="Select Person 2"
        >
          {Object.entries(people).map(([id, person]) => {
            if (!(parseInt(id, 10) !== from)) return null;
            return (
              <option key={id} value={id} className="px-2 py-1 ">
                {person.name}
              </option>
            );
          })}
        </Select>
        <Button variant="contained" color="primary" onClick={findConnection}>
          Find
        </Button>
      </div>
      <div
        className={`m-2 mb-8 py-2 w-full flex md:flex-col   border-slate-600 ${
          mutualConnections?.length && "border-2"
        }`}
      >
        {mutualConnections?.map((connections) => (
          <div
            key={connections.length + Math.random()}
            className="w-full flex flex-col md:flex-row items-center"
          >
            {connections.map((connection, connectionIndex) => (
              <div
                key={connection.id + Math.random()}
                className="md:py-2 mt-2 gap-2 md:ml-4 flex flex-col md:flex-row"
              >
                <div className="flex flex-row-reverse md:flex-col items-center">
                  <p className="text-xs">{`${connection.relation ?? ""}`}</p>
                  {connectionIndex !== 0 && (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-2 h-6 w-6 hidden md:flex"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 md:hidden"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 17l-4 4m0 0l-4-4m4 4V3"
                        />
                      </svg>
                    </>
                  )}
                </div>
                <Chip className="md:ml-4" text={people[connection.id].name} rounded="xl" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewMutualConnections;
