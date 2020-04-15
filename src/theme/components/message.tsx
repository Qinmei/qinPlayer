import React, { useState, useContext, useEffect, useRef } from 'react';
import { PlayerContext } from '../../model';
import styled from 'styled-components';

const Wrapper = styled.div`
  .message {
    position: absolute;
    bottom: 55px;
    left: 15px;
    padding: 8px 12px;
    background-color: rgba(0, 0, 0, 0.75);
    color: white;
    border-radius: 4px;
    font-size: 14px;
    line-height: 14px;
  }
`;

const reactComponent: React.FC<{}> = (props) => {
  const data = useContext(PlayerContext);
  const {
    state: { message },
  } = data;

  const [info, setInfo] = useState<string>('');
  const timer = useRef<number | null>();

  const getLevel = (time: string) => {
    switch (time) {
      case '1':
        return 500;
      case '2':
        return 1000;
      case '3':
        return 3000;
      case '4':
        return 5000;
      case '5':
        return 10000;
      case '6':
        return 20000;
      case '7':
        return 60000;
      case '8':
        return 360000;
      case '9':
        return 100000000;
      default:
        return 3000;
    }
  };

  useEffect(() => {
    const time = message.slice(0, 1);
    const tips = message.slice(1);
    setInfo(tips);

    if (time) {
      timer.current && clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setInfo('');
      }, getLevel(time));
    }
  }, [message]);

  return <Wrapper>{info && <div className="message">{info}</div>}</Wrapper>;
};
export default reactComponent;
