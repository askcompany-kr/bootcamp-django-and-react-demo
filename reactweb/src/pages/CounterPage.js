import React from "react";
import {connect} from "react-redux";
import {changeColor, increment, decrement} from "../store/modules/counter";
import {Button} from "antd";
// import {bindActionCreators} from "redux";


function CounterPage({ color, number, changeColor, increment, decrement }) {
  return (
    <div>
      <h1>Counter</h1>
      color : {color}, number : {number}
      <hr/>
      <Button onClick={() => changeColor("blue")}>Chnage Color</Button>
      <Button onClick={() => increment()}>+1</Button>
      <Button onClick={() => decrement()}>-1</Button>
    </div>
  );
}


const mapStateToProps = state => ({
  color: state.counter.color,
  number: state.counter.number,
});


// const mapDispatchToProps = dispatch => ({
//   changeColor: color => dispatch(changeColor(color)),
//   increment: () => dispatch(increment()),
//   decrement: () => dispatch(decrement()),
// });

// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ changeColor, increment, decrement }, dispatch);

// 함수가 아닌 객체 설정시 자동 bindActionCreators 됨
const mapDispatchToProps = { changeColor, increment, decrement };


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterPage);
