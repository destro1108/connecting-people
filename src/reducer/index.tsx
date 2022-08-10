import { PersonType } from "../components/person";

export const ACTIONS: { [key: string]: string } = {
  ADD_USER: "ADD_USER",
};

export interface stateType {
  people: { [id: number]: PersonType };
  from: number | null;
  to: number | null;
}

interface actionType {
  type: string;
  payload: any;
}

export const initialState: stateType = {
  people: {},
  from: null,
  to: null,
};

// eslint-disable-next-line default-param-last
export default (state: stateType, action: actionType) => {
  switch (action.type) {
    case ACTIONS.ADD_USER:
      return { ...state, people: { ...state.people, [action.payload.id]: action.payload.person } };
    default:
      return state;
  }
};
