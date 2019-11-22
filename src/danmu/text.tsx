import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { getFontLength } from '../utils/utils';

interface props {
  left: number;
  top: number;
  width: number;
}

const Wrapper = styled.div`
  position: absolute;
  display: inline-block;
  right: ${(props: props) => props.width}px;
  top: ${(props: props) => props.top}px;
  background-color: green;
  white-space: nowrap;
  transform: translateX(${(props: props) => props.left}px);
`;

interface PropsType {
  text: string;
  left: number;
  top: number;
  size: number;
  width: number;
  play: boolean;
}

const reactComponent: React.FC<PropsType> = props => {
  const { text, left: preLeft, top, size, width, play } = props;

  const newLeft = ((getFontLength(text) + preLeft) * size) / 2;
  const newTop = top * (size + 4);

  let [left, setLeft] = useState<number>(newLeft + width);
  const textRef: React.RefObject<T> = useRef({});

  const start = () => {
    left -= 5;
    setLeft(left);
    console.log(text, left, new Date().getTime());
    textRef.current.play = requestAnimationFrame(start);
  };

  const stop = () => {
    if (textRef.current.play) {
      cancelAnimationFrame(textRef.current.play);
    }
  };

  useEffect(() => {
    if (play) {
      start();
    } else {
      stop();
    }
  }, [play]);

  return (
    <Wrapper left={left} top={newTop} width={width}>
      {text}
    </Wrapper>
  );
};
export default reactComponent;
