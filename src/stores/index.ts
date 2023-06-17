import { createContext, useContext } from 'react';
import { EActionStore, IRoomTypeResponse } from 'types';

// Define the type of your context value
export type MyContextValue = {
  isChangeSavedRooms: boolean;
  roomTypes: IRoomTypeResponse[];
  savedRoomsId: number[];
};

// Define the interface for your context object
export interface MyContextInterface {
  myContextValue: MyContextValue;
  dispatch: React.Dispatch<MyContextAction>;
}

// Define the action types that will be used to update the context state
type MyContextAction =
  | { type: EActionStore; payload: boolean }
  | { type: EActionStore; payload: IRoomTypeResponse[] }
  | { type: EActionStore; payload: number[] };

// Define the reducer function that will handle the state updates based on the action types
export function myContextReducer(state: MyContextValue, action: MyContextAction): MyContextValue {
  switch (action.type) {
    case EActionStore.UPDATE_SAVED_ROOM:
      return { ...state, isChangeSavedRooms: action.payload as any };

    case EActionStore.UPDATE_ROOM_TYPE:
      localStorage.setItem('roomTypes', JSON.stringify(action.payload));
      return { ...state, roomTypes: action.payload as any };

    case EActionStore.UPDATE_SAVED_ROOM_ID:
      return { ...state, savedRoomsId: action.payload as any };
    default:
      return state;
  }
}

// Create a new instance of the context using useReducer
export const MyContext = createContext<MyContextInterface | undefined>(undefined);

// Define a custom hook that uses the context
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};
