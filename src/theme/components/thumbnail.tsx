import React, { useEffect, useRef, useState, useContext } from 'react';
import { PlayerContext } from '../../model';
import styled from 'styled-components';

interface PropsType {
  currentTime: number;
  progressRef: React.RefObject<T>;
}

const Wrapper = styled.div`
  position: absolute;
  z-index: -2;
  background-color: black;
  width: 160px;
  height: 90px;
  top: -95px;
  transform: translateX(-50%);
  display: none;
  z-index: -2;
  pointer-events: none;
`;

const reactComponent: React.FC<PropsType> = props => {
  const { currentTime, progressRef } = props;
  const data = useContext(PlayerContext);
  const { methods, state } = data;
  const { color } = state;

  const getThumbnailLeft = (currentTime: number) => {
    const percent = currentTime / state.duration;
    const total = progressRef.current ? progressRef.current.clientWidth : 0;
    let result = percent * total;
    result < 80 && (result = 80);
    total - result < 80 && (result = total - 80);
    return (result / total) * 100;
  };

  const getThumbnailImg = (currentTime: number) => {
    const percent = currentTime / state.duration;
    const { count, urls } = state.thumbnail;
    const num = Math.round(count * percent);
    const page = Math.floor(num / 100);
    const row = Math.floor((num - 100 * page) / 10);
    const col = num - 100 * page - 10 * row;
    return {
      url: urls[page],
      left: row * 160 + 'px',
      top: col * 90 + 'px',
    };
  };

  return (
    <>
      {state.thumbnail && state.thumbnail.count > 0 && (
        <Wrapper
          color={color}
          className="thumbnail"
          style={{
            left: getThumbnailLeft(currentTime) + '%',
            backgroundImage: `url(${getThumbnailImg(currentTime).url})`,
            backgroundPosition: `${getThumbnailImg(currentTime).left} ${
              getThumbnailImg(currentTime).top
            }`,
          }}
        ></Wrapper>
      )}
    </>
  );
};
export default reactComponent;
