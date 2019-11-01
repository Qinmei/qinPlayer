import React, { useEffect, useRef, useContext } from 'react';
import { PlayerContext } from '../model';
import styled from 'styled-components';
import { colorArr, marginArr, sizeArr } from '../utils/utils';

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  z-index: 7;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;

  .sub {
    text-align: center;
    text-shadow: 0px 0px 5px ${(props: { color: any }) => colorArr[props.color]};
    color: white;
    margin-bottom: ${(props: { color: string; margin: string; mode: string }) =>
      marginArr[props.mode][props.margin]};
    font-size: ${(props: { color: string; size: string; mode: string }) =>
      sizeArr[props.mode][props.size]};
  }
`;

interface PropsType {}

const reactComponent: React.FC<PropsType> = props => {
  const data = useContext(PlayerContext);
  const {
    state: { subshow, subcolor, subsize, submargin, subtitle, mode },
  } = data;

  const sub: string = '字幕测试情况';

  return subshow ? (
    <Wrapper color={subcolor} size={subsize} margin={submargin} mode={mode}>
      <div className="sub">{sub}</div>
    </Wrapper>
  ) : (
    <></>
  );
};
export default reactComponent;
