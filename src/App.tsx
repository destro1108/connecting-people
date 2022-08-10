/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ChangeEvent, useReducer, useState } from "react";
import PeopleTable from "./components/peopleTable";
import { PersonType } from "./components/person";
import reducer, { ACTIONS, initialState } from "./reducer";

const App = () => {
  const [name, setName] = useState<string>("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const handleAddUser = () => {
    if (name === "") {
      alert("Please specify a name");
      return;
    }
    const person: PersonType = {
      name,
      connections: [],
    };
    dispatch({ type: ACTIONS.ADD_USER, payload: { id: Date.now(), person } });
    setName("");
  };
  return (
    <div className="container mx-auto h-full w-screen bg-outer-space-900 text-gray-200 font-Ubuntu">
      <div className="w-full flex items-center gap-8 mt-20 px-3 py-2">
        <input
          id="name"
          type="text"
          placeholder="Enter a Name..."
          autoComplete="off"
          value={name}
          className="m-1 px-3 py-2 rounded-md bg-white text-black border-none outline-none"
          onChange={handleNameChange}
        />
        <div className="btn-contained" onClick={handleAddUser} onKeyPress={handleAddUser}>
          Add User
        </div>
        <div className="btn-outlined">Load Sample Data</div>
      </div>
      <PeopleTable people={state.people} dispatch={dispatch} />
    </div>
  );
};

export default App;
