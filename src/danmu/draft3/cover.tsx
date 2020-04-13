import React, { useEffect, useRef, useContext, useState, useLayoutEffect } from 'react';

interface PropsType {
  list: Array<any>;
  play: boolean;
  lineHeight: number;
}

const reactComponent: React.FC<PropsType> = (props) => {
  const { list, play, lineHeight } = props;

  const storeRef = useRef<any>({});

  const start = () => {
    list.map((item) => {
      item.left -= 1;
    });

    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if (element.left < 0) {
        list.splice(index, 1);
        index--;
      }
    }

    storeRef.current.play = requestAnimationFrame(start);
  };

  const stop = () => {
    if (storeRef.current.play) {
      cancelAnimationFrame(storeRef.current.play);
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
    <div className="con">
      {list.map((item) => (
        <div
          className="danmu"
          key={item._id}
          style={{
            transform: `translateX(${item.left}px)`,
            top: item.top * lineHeight,
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};
export default reactComponent;
