import { ChangeEvent, useState } from "react";
import { relations, relationsType } from "../lib";

export type ConnectionsType = {
  relation: relationsType | null;
  id: number;
};

export type PersonType = {
  name: string;
  connections: ConnectionsType[];
};

interface PersonProps {
  id: number;
  person: PersonType;
  people: { [id: number]: PersonType };
  // eslint-disable-next-line no-unused-vars
  connect: (relation: relationsType, personToId: number) => void;
  deletePerson: () => void;
}

const Person = ({ id, person, people, connect, deletePerson }: PersonProps) => {
  const [connection, setConnection] = useState<ConnectionsType>({ id: -1, relation: null });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setConnection({ ...connection, [e.target.name]: e.target.value });

  const handleConnectClick = () => {
    if (!connection.relation) {
      alert("Select a Relation");
      return;
    }
    if (connection.id === -1) {
      alert("Select a Person");
      return;
    }
    connect(connection.relation, connection.id);
  };
  return (
    <div className="flex px-2 py-4 items-center justify-between">
      <div className="flex items-center">
        <button
          type="button"
          onClick={deletePerson}
          className=" text-red-600 pr-4 cursor-pointer hover:text-red-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z" />
          </svg>
        </button>
        <p>{person.name}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`mx-2 h-6 w-6 ${person.connections.length ? "" : "hidden"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
        <div className="flex gap-3">
          {person.connections.map((conn) => (
            <p key={conn.id} className="p-2 border-2 border-slate-500 rounded-2xl">
              {people[conn.id].name} - {conn.relation?.slice(0, 2)}
            </p>
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        <p className="flex items-center">Add Connection: </p>
        <select
          id="relation"
          defaultValue=""
          name="relation"
          onChange={handleChange}
          placeholder="Select Relation"
          className="select"
        >
          <option value="" disabled>
            Select Relation
          </option>
          {relations.map((type) => (
            <option key={type} value={type} className="px-2 py-1 ">
              {type}
            </option>
          ))}
        </select>
        <select
          id="personTo"
          defaultValue=""
          name="id"
          onChange={handleChange}
          placeholder="Select Person"
          className="select"
        >
          <option value="" disabled>
            Select Person
          </option>
          {people &&
            Object.entries(people)
              .filter(([personId]) => id !== parseInt(personId, 10))
              .map(([idTo, personTo]) => (
                <option key={idTo} value={idTo} className="px-2 py-1 ">
                  {personTo.name}
                </option>
              ))}
        </select>
        <button type="button" className="btn-contained flex" onClick={handleConnectClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:px-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          <span className="hidden md:flex">Connect</span>
        </button>
      </div>
    </div>
  );
};

export default Person;
