export interface Connections {
  relation: "friend" | "brother";
  id: number;
}

export interface PersonType {
  name: string;
  connections: Connections[];
}

interface PersonProps {
  person: PersonType;
}

const Person = ({ person }: PersonProps) => {
  return (
    <div className="flex p-2 ">
      <p>{person.name}</p>
    </div>
  );
};

export default Person;
