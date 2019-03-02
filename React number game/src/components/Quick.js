import React, { useState } from "react";

const myUseRef = (function() {
  let oldRef;
  return function(ref) {
    if (oldRef) return oldRef;
    oldRef = {
      current: ref
    };
    return oldRef;
  };
})();

function myUseState(initialState) {
  const setState = newState => (state[0] = newState);
  const state = [initialState, setState];
  return state;
}

export default function Quick() {
  const [, setState] = useState(0);
  //   const [myState, mySetState] = myUseState(10);

  const ref = myUseRef([]);
  const secRef = myUseRef([]);
  const renderList = ref.current.map(num => <li key={num}>{num}</li>);

  return (
    <div className="quick">
      <p>Testing</p>
      <button
        onClick={() => {
          ref.current.push(Math.random().toFixed(2));
          secRef.current.push("FOO");
          setState(Math.random());
          //   mySetState(50);
          console.log(ref, secRef);
        }}
      >
        Click me
      </button>
      <ul>{renderList}</ul>
    </div>
  );
}
