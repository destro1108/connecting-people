import { Dispatch } from "react";
import { relationsType } from "../lib";
import { ACTIONS, ActionTypes } from "../reducer";
import Person, { PersonType } from "./person";

interface PeopleTableProps {
  people: { [key: number]: PersonType };
  dispatch: Dispatch<ActionTypes>;
}

const PeopleTable = ({ people, dispatch }: PeopleTableProps) => {
  const deletePerson = (id: number) => dispatch({ type: ACTIONS.REMOVE_USER, payload: id });
  return (
    <div className="mt-6 px-2 flex flex-col border-2 border-slate-700 gap-0 divide-y-2 divide-slate-700">
      {Object.keys(people).length ? (
        Object.entries(people).map(([id, person]) => (
          <Person
            key={id}
            id={parseInt(id, 10)}
            people={people}
            person={person}
            deletePerson={() => deletePerson(parseInt(id, 10))}
            connect={(relation: relationsType, personToId: number) => {
              if (person.connections.some((conn) => conn.id === personToId)) return;
              dispatch({
                type: ACTIONS.UPDATE_USER,
                payload: {
                  id: parseInt(id, 10),
                  person: {
                    ...person,
                    connections: [...person.connections, { relation, id: personToId }],
                  },
                },
              });
              dispatch({
                type: ACTIONS.UPDATE_USER,
                payload: {
                  id: personToId,
                  person: {
                    ...people[personToId],
                    connections: [
                      ...people[personToId].connections,
                      { relation, id: parseInt(id, 10) },
                    ],
                  },
                },
              });
            }}
          />
        ))
      ) : (
        <div className="my-2 flex justify-center">No Data to Display</div>
      )}
    </div>
  );
};

export default PeopleTable;
