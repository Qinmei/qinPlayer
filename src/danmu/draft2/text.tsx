import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

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
  white-space: nowrap;
`;

interface PropsType {
  text: string;
  left: number;
  top: number;
  width: number;
  play: boolean;
  id: string;
  height: number;
  onChange: (id: string, left: number) => void;
}

const reactComponent: React.FC<PropsType> = (props) => {
  const { text, id, left: preLeft, top, width, height, play, onChange } = props;

  let [left, setLeft] = useState<number>(preLeft);
  const textRef = useRef<any>({});

  const start = () => {
    left -= 2;
    setLeft(left);
    console.log('start', new Date().getTime());
    textRef.current.play = requestAnimationFrame(start);
  };

  console.log('render', new Date().getTime());

  const stop = () => {
    if (textRef.current.play) {
      cancelAnimationFrame(textRef.current.play);
    }
  };

  useEffect(() => {
    onChange && onChange(id, left);
  }, [left]);

  useEffect(() => {
    if (play) {
      start();
    } else {
      stop();
    }
  }, [play]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return (
    <Wrapper top={top * height} width={width} style={{ transform: `translateX(${left}px)` }}>
      {text}
    </Wrapper>
  );
};
export default reactComponent;
