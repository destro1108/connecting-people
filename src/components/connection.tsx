import Chip from "./chip";
import { ConnectionsType } from "./person";

interface ConnectionProps {
  connection: ConnectionsType;
  hideArrow: boolean;
  name: string;
}

const Connection = ({ connection, hideArrow, name }: ConnectionProps) => {
  return (
    <div className="md:py-2 mt-2 gap-2 md:ml-4 flex flex-col md:flex-row">
      <div className="flex flex-row-reverse md:flex-col items-center">
        <p className="text-xs">{`${connection.relation ?? ""}`}</p>
        {!hideArrow && (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-2 h-6 w-6 hidden md:flex"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 17l-4 4m0 0l-4-4m4 4V3" />
            </svg>
          </>
        )}
      </div>
      <Chip className="md:ml-4" text={name} />
    </div>
  );
};

export default Connection;
