import { ChangeEvent, Dispatch, useState } from "react";
import { ACTIONS, ActionTypes } from "../reducer";
import { ConnectionsType, PersonType } from "./person";

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
    <div className="mx-2 mt-4 md:mt-8 flex flex-col">
      <p className="text-xl">Find Connection</p>
      <div className="p-2 flex">
        <p className="md:px-2 px-1 py-2 text-base md:text-lg flex flex-wrap">Connection between</p>{" "}
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
        <p className="px-1 md:px-2 py-2 text-lg">&</p>
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
        <button
          type="button"
          onClick={findConnection}
          className="btn-contained mx-4 focus:outline-none"
        >
          Find
        </button>
      </div>
      <div
        className={`m-2 py-2 flex md:flex-col   border-slate-600 ${
          mutualConnections?.length && "border-2"
        }`}
      >
        {mutualConnections?.map((connections, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="w-full flex flex-col md:flex-row items-center">
            {connections.map((connection, connectionIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={connection.id + connectionIndex}
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
                <p className="p-2 md:ml-4 border-2 border-slate-500 rounded-xl">
                  {people[connection.id].name}{" "}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewMutualConnections;
