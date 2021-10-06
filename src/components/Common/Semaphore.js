import React, { useState, useEffect } from "react";
import Button from "antd-button-color";
import { SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons';

export default function Semaphore({value=-1, onChange, isInput}) {
  const [level, setLevel] = useState(value);
  const icon = [
    <FrownOutlined style={{color: 'red'}} />,
    <MehOutlined style={{color: 'orange'}} />,
    <SmileOutlined style={{color: 'green'}} />
  ];
  const disabledicon = <MehOutlined style={{color: 'grey'}} />;

  useEffect(() => {
      if(value !== ''){
        setLevel(value);
      }
  }, [value]);

  const handleClick = () => {
    const lvl = (level == 2 ) ? 0 : level + 1;
    setLevel(lvl);

    onChange?.(
      lvl
    );
  }

  if(isInput){
    return <><Button icon={(level >= 0) ? icon[level]: disabledicon} onClick={handleClick} /> ({level})</>
  } else {
    return <>{(level >= 0) ? icon[level]: disabledicon} ({level})</>
  }
}