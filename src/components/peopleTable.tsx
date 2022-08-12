import { Dispatch } from "react";
import { ACTIONS, ActionTypes } from "../reducer";
import Person, { PersonType } from "./person";

interface UserTableProps {
  people: { [key: string]: PersonType };
  dispatch: Dispatch<ActionTypes>;
}

const UserTable = ({ people, dispatch }: UserTableProps) => {
  const deletePerson = (id: number) => dispatch({ type: ACTIONS.REMOVE_USER, payload: id });
  return (
    <div className="mt-6 px-2 flex flex-col border-2 border-slate-700 gap-0 divide-y-2 divide-slate-700">
      {Object.entries(people).map(([id, person]) => (
        <Person key={id} person={person} deletePerson={() => deletePerson(parseInt(id, 10))} />
      ))}
    </div>
  );
};

export default UserTable;
