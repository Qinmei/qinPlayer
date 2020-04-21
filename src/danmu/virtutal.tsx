import React from 'react';
import { DanmuTextShow } from './index';

interface PropsTypes {
  data: DanmuTextShow[];
  gap: number;
  width: number;
}

const reactComponent = (props: PropsTypes) => {
  const { data, gap, width } = props;
  const show = data.filter((item) => item.left < width + item.self);

  return show.map((item) => (
    <div
      className="danmu"
      key={item.id}
      style={{
        transform: `translateX(${item.left}px)`,
        top: item.top * gap,
      }}
    >
      {item.text}
    </div>
  ));
};
export default reactComponent;
