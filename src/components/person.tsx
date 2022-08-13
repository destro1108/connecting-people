import { ChangeEvent, useState } from "react";
import { relations, relationsType } from "../lib";
import Button from "./button";
import Chip from "./chip";
import Select from "./select";

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
    connect(connection.relation, parseInt(`${connection.id}`, 10));
  };
  return (
    <div className="px-2 py-4 flex lg:flex-row flex-col lg:items-center justify-between">
      <div className="flex items-center my-2">
        <p>{person.name}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`mx-2 h-6 w-6 ${person.connections.length === 0 && "hidden"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
        <div className="flex gap-3 flex-wrap">
          {person.connections.map((personConnection) => (
            <Chip
              key={personConnection.id}
              className=""
              text={`${people[personConnection.id].name} - ${personConnection.relation?.slice(
                0,
                2,
              )}`}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-4 my-2">
        <p className="flex items-center">Add Connection: </p>
        <Select
          id="relation"
          name="relation"
          onChange={handleChange}
          value={connection.relation ?? -1}
          placeholder="Select Relation"
          disabledOptionText="Select Relation"
        >
          {relations.map(
            (type): JSX.Element => (
              <option key={type} value={type} className="px-2 py-1 ">
                {type}
              </option>
            ),
          )}
        </Select>
        <Select
          id="personTo"
          name="id"
          value={connection.id}
          onChange={handleChange}
          placeholder="Select Person"
          disabledOptionText="Select Person"
        >
          {people &&
            Object.entries(people)
              .filter(([personId]) => id !== parseInt(personId, 10))
              .map(([idTo, personTo]) => (
                <option key={idTo} value={idTo} className="px-2 py-1 ">
                  {personTo.name}
                </option>
              ))}
        </Select>
        <Button variant="contained" color="primary" onClick={handleConnectClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:h-5 md:w-5 mr-1"
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
        </Button>
        <Button variant="outlined" color="error" onClick={deletePerson}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default Person;
