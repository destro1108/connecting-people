import { PersonType } from "../components/person";

// eslint-disable-next-line no-shadow
export const ACTIONS = {
  ADD_USER: "ADD_USER",
  REMOVE_USER: "REMOVE_USER",
  SET_FROM: "SET_FROM",
  SET_TO: "SET_TO",
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

type ActionAddUser = {
  type: typeof ACTIONS.ADD_USER;
  payload: { id: number; person: PersonType };
};

type ActionRemoveUser = {
  type: typeof ACTIONS.REMOVE_USER;
  payload: number;
};
type ActionSetFrom = {
  type: typeof ACTIONS.SET_FROM;
  payload: number;
};
type ActionSetTo = {
  type: typeof ACTIONS.SET_TO;
  payload: number;
};

export type ActionTypes = ActionAddUser | ActionRemoveUser | ActionSetFrom | ActionSetTo;

// eslint-disable-next-line default-param-last
export default (state: stateType, action: actionType) => {
  const { type, payload } = action;
  let people;
  switch (type) {
    case ACTIONS.ADD_USER:
      return { ...state, people: { ...state.people, [payload.id]: payload.person } };
    case ACTIONS.REMOVE_USER:
      people = { ...state.people };
      delete people[payload];
      return { ...state, people };
    case ACTIONS.SET_FROM:
      return { ...state, from: payload };
    case ACTIONS.SET_TO:
      return { ...state, to: payload };
    default:
      return state;
  }
};
