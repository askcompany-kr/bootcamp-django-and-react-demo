import React from "react";
import "./WaitingList.css";


function WaitingItem({ text, entered, onEnter, onLeave }) {
  return (
    <li>
      <div className={`text ${entered ? 'entered' : ''}`}>
        {text}
      </div>
      <div className="buttons">
        <button onClick={onEnter}>입장</button>
        <button onClick={onLeave}>나감</button>
      </div>
    </li>
  )
}


export default function WaitingList({ input, waitingList, onChange, onSubmit, onEnter, onLeave }) {
  // 데이터를 컴포넌트 리스트로 변환
  const waitingItems = waitingList.map(w => (
    <WaitingItem key={w.id}
                 text={w.name}
                 entered={w.entered}
                 id={w.id}
                 onEnter={() => onEnter(w.id)}
                 onLeave={() => onLeave(w.id)} />
  ));

  return (
    <div>
      <h2>WaitingList</h2>
      <h2>대기자 명단</h2>

      <form onSubmit={onSubmit}>
        <input value={input}
               onChange={onChange} />
        <button>등록</button>
      </form>

      <ul>
        {waitingItems}
      </ul>
    </div>
  );
}
