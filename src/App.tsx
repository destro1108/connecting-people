import { ChangeEvent, useReducer, useState } from "react";
import Button from "./components/button";
import InputField from "./components/inputField";
import PeopleTable from "./components/peopleTable";
import { PersonType } from "./components/person";
import ViewMutualConnections from "./components/viewMutualConnections";
import { sampleData1, sampleData2 } from "./lib/sampleData";
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

  const loadSampleData = (number: number) => {
    state.clearConnections();
    dispatch({ type: ACTIONS.SET_PEOPLE, payload: number === 2 ? sampleData1 : sampleData2 });
  };

  return (
    <div className="container mx-auto h-full w-screen bg-outer-space-900 text-gray-200 font-Ubuntu flex flex-col items-center flex-wrap">
      <div className="w-full flex items-center gap-3 md:gap-8 mt-20 px-2 md:px-3 py-2">
        <InputField
          id="name"
          name="name"
          type="text"
          placeholder="Enter a Name..."
          value={name}
          onChange={handleNameChange}
        />
        <Button color="primary" variant="contained" onClick={handleAddUser}>
          Add User
        </Button>
        <Button color="primary" variant="outlined" onClick={() => loadSampleData(1)}>
          Load Sample Data 1
        </Button>
        <Button color="primary" variant="outlined" onClick={() => loadSampleData(2)}>
          Load Sample Data 2
        </Button>
      </div>
      <PeopleTable people={state.people} dispatch={dispatch} />
      <ViewMutualConnections
        from={state.from}
        to={state.to}
        people={state.people}
        dispatch={dispatch}
      />
    </div>
  );
};

export default App;
