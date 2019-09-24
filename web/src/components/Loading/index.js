import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import 'bootstrap/dist/css/bootstrap.css';

export function Loading(props) {
  const [done, setDone] = useState(undefined);

  useEffect();

  return (
    <div>
      {!done ? (
        <ReactLoading type="bars" color="white" />
      ) : (
        <h1>hello world</h1>
      )}
    </div>
  );
}
