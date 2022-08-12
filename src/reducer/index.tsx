import { PersonType } from "../components/person";
import { fetchFromLocalStorage, saveToLocalStorage } from "../lib";

export const ACTIONS = {
  ADD_USER: "ADD_USER",
  REMOVE_USER: "REMOVE_USER",
  UPDATE_USER: "UPDATE_USER",
  SET_FROM: "SET_FROM",
  SET_TO: "SET_TO",
};

export interface stateType {
  people: { [id: number]: PersonType };
  from: number;
  to: number;
}

type ActionAddUser = {
  type: typeof ACTIONS.ADD_USER;
  payload: { id: number; person: PersonType };
};

type ActionRemoveUser = {
  type: typeof ACTIONS.REMOVE_USER;
  payload: number;
};

type ActionUpdateUser = {
  type: typeof ACTIONS.UPDATE_USER;
  payload: { id: number; person: PersonType };
};

type ActionSetFrom = {
  type: typeof ACTIONS.SET_FROM;
  payload: number;
};
type ActionSetTo = {
  type: typeof ACTIONS.SET_TO;
  payload: number;
};

export type ActionTypes =
  | ActionAddUser
  | ActionRemoveUser
  | ActionUpdateUser
  | ActionSetFrom
  | ActionSetTo;

export const initialState: stateType = {
  people: JSON.parse(fetchFromLocalStorage("people") ?? "{}"),
  from: -1,
  to: -1,
};

export default (state: stateType, action: ActionTypes): stateType => {
  const { type, payload } = action;
  let people;
  switch (type) {
    case ACTIONS.ADD_USER:
      saveToLocalStorage(
        "people",
        JSON.stringify({
          ...state.people,
          [(payload as ActionAddUser["payload"]).id]: (payload as ActionAddUser["payload"]).person,
        }),
      );
      return {
        ...state,
        people: {
          ...state.people,
          [(payload as ActionAddUser["payload"]).id]: (payload as ActionAddUser["payload"]).person,
        },
      };
    case ACTIONS.REMOVE_USER:
      people = Object.entries(state.people).reduce(
        (acc, [id, person]) => ({
          ...acc,
          [id]: {
            ...person,
            connections: person.connections.filter(
              (conn) => parseInt(`${conn.id}`, 10) !== payload,
            ),
          },
        }),
        { ...state.people },
      );
      delete people[(action as ActionRemoveUser).payload];
      saveToLocalStorage("people", JSON.stringify(people));
      return { ...state, people };
    case ACTIONS.UPDATE_USER:
      people = { ...state.people };
      people[(payload as ActionUpdateUser["payload"]).id] = (
        payload as ActionUpdateUser["payload"]
      ).person;
      saveToLocalStorage("people", JSON.stringify(people));
      return { ...state, people };
    case ACTIONS.SET_FROM:
      return { ...state, from: payload as ActionSetFrom["payload"] };
    case ACTIONS.SET_TO:
      return { ...state, to: payload as ActionSetTo["payload"] };
    default:
      return state;
  }
};
