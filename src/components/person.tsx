export type Connections = {
  relation: "friend" | "brother";
  id: number;
};

export type PersonType = {
  name: string;
  connections: Connections[];
};

interface PersonProps {
  person: PersonType;
  deletePerson: () => void;
}

const Person = ({ person, deletePerson }: PersonProps) => {
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
      </div>
    </div>
  );
};

export default Person;
