import React, { useEffect, useRef, useContext, useState } from 'react';
import { PlayerContext } from '../model';
import styled from 'styled-components';
import { colorArr, marginArr, sizeArr } from '../utils/utils';
import fetch from '../utils/request';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 7;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
`;

interface PropsType {}

const reactComponent: React.FC<PropsType> = props => {
  const data = useContext(PlayerContext);
  const {
    state: { danmu, current },
  } = data;

  if (!danmu) return <></>;

  const [danmuData, setDanmuData] = useState<Array<any>>([]);
  const [show, setShow] = useState<Array<any>>([]);

  const initData = async (target: string) => {
    const data = await fetch(target).then(res => res.json());
    setDanmuData(data.data);
  };

  const filterData = (list: Array<any>) => {
    const data = list.filter(item => item.time <= current + 0.5).map(item => item.text);
    show.push(...data);
    setShow(show);
  };

  useEffect(() => {
    initData(danmu);
  }, [danmu]);

  useEffect(() => {
    filterData(danmuData);
  }, [current]);

  return (
    <Wrapper>
      <div className="danmu">
        {show.map((text: string, index: number) => (
          <p key={text + index}>{text}</p>
        ))}
      </div>
    </Wrapper>
  );
};
export default reactComponent;
