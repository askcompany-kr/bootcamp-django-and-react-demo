import React from "react";
import {connect} from "react-redux";
// import {changeInput, create, enter, leave} from "../store/modules/waiting";
import * as waitingActions from "../store/modules/waiting";
import {bindActionCreators} from "redux";
import WaitingList from "../components/WaitingList";


function WaitingListContainer({ input, list, WaitingActions }) {
  const onChange = e => {
    console.log(">>> onChange :", input, e.target.value);
    WaitingActions.changeInput(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    WaitingActions.create(input);
    WaitingActions.changeInput('');
  };

  const onEnter = id => {
    WaitingActions.enter(id);
  };

  const onLeave = id => {
    WaitingActions.leave(id);
  };

  return (
    <div>
      <h1>Waiting Page Container</h1>
      <WaitingList
        input={input}
        waitingList={list}
        onChange={onChange}
        onSubmit={onSubmit}
        onEnter={onEnter}
        onLeave={onLeave}
      />
    </div>
  );
}


const mapStateToProps = ({ waiting }) => ({
  input: waiting.input,
  list: waiting.list,
});


// const mapDispatchToProps = {
//   changeInput,
//   create,
//   enter,
//   leave,
// };


// FIXME: 이런 구조로 하면, 나중에 다양한 리덕스 모듈을 적용하기가 수월합니다.
const mapDispatchToProps = dispatch => ({
  WaitingActions: bindActionCreators(waitingActions, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WaitingListContainer);
