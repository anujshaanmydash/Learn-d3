import React from 'react';
import classes from './legend.module.scss';

const Legends = ({ data }) => {
  console.log(data);
  return (
    <>
      {data.map((d, i) => (
        <div className={classes.legend} key={i}>
          <div
            className={classes.circle}
            style={{ background: `${d.color}` }}
          ></div>
          <p className={classes.label}>{d.value}</p>
        </div>
      ))}
    </>
  );
};

export default Legends;
