import React, { useEffect, useContext, useState } from 'react';
import { PlayerContext } from '../model';
import styled from 'styled-components';
import { colorArr, marginArr, sizeArr } from '../utils/utils';
import fetch from '../utils/request';
import vttToJson from '../utils/vttToJson';

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
    text-shadow: 0px 0px 5px ${(props: { color: any }) => colorArr[props.color]}, 0px 0px 10px black,
      0px 0px 15px black, 0px 0px 20px black;
    color: white;
    margin-bottom: ${(props: { color: string; margin: string; mode: string }) =>
      marginArr[props.mode][props.margin]};
    font-size: ${(props: { color: string; size: string; mode: string }) =>
      sizeArr[props.mode][props.size]};

    p {
      margin: 0;
    }
  }
`;

interface PropsType {}

const reactComponent: React.FC<PropsType> = (props) => {
  const data = useContext(PlayerContext);
  const {
    state: { subshow, subcolor, subsize, submargin, subtitle, mode, current },
  } = data;

  if (!subtitle) return <></>;

  const [subData, setSubData] = useState<Array<any>>([]);

  const initData = async (url: string) => {
    const data = await fetch(url).then((res) => res.text());
    const result = data ? await vttToJson(data) : [];
    setSubData(result);
  };

  useEffect(() => {
    initData(subtitle);
  }, [subtitle]);

  const subArr = subData.filter((item) => current >= item.start && current <= item.end);
  const sub = subArr.length > 0 ? subArr[0].word : [];

  return (
    <Wrapper color={subcolor} size={subsize} margin={submargin} mode={mode}>
      <div className="sub">
        {sub.map((text: string, index: number) => (
          <p key={text + index}>{text}</p>
        ))}
      </div>
    </Wrapper>
  );
};
export default reactComponent;
