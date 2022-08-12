import Person, { PersonType } from "./person";

interface UserTableProps {
  people: { [key: string]: PersonType };
}

const UserTable = ({ people }: UserTableProps) => {
  return (
    <div className="mt-6 p-2 flex flex-col border-2 border-slate-700 gap-0 divide-y-2 divide-slate-700">
      {Object.entries(people).map(([id, person]) => (
        <Person key={id} person={person} />
      ))}
    </div>
  );
};

export default UserTable;
