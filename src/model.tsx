import React, { createContext, useReducer } from 'react';

interface DataType {
  play?: Boolean;
  current?: Number;
  volume?: Number;
  fullscreen?: Boolean;
  movie?: Boolean;
}

const data: DataType = {
  play: false,
  current: 0,
  volume: 0.75,
  fullscreen: false,
  movie: false,
};
const PlayerContext = createContext(data);

const reducer = (state: DataType, action: any) => {
  console.log(action);
  return {
    ...state,
    ...action,
  };
};

const PlayerProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, data);
  return (
    <PlayerContext.Provider value={{ state, dispatch }}>{props.children}</PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
