import React, { useReducer } from 'react';
import { MyContext, myContextReducer } from 'stores';
const MyContextProvider: React.FC = ({ children }) => {
  const [myContextValue, dispatch] = useReducer(myContextReducer, { isChangeSavedRooms: false, roomTypes: [] });
  const value = { myContextValue, dispatch };
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export default MyContextProvider;
