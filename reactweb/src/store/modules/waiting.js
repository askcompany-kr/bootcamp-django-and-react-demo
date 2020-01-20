import {createAction, handleActions } from "redux-actions";

const CHANGE_INPUT = 'waiting/CHANGE_INPUT';  // 인풋 값 변경
const CREATE = 'waiting/CREATE';  // 명단에 이름 추가
const ENTER = 'waiting/ENTER';  // 입장
const LEAVE = 'waiting/LEAVE';  // 나감

// 액션 생성 함수를 간편하게 만들 수 있게 해주는 redux-actions 의 createAction 이라는 함수를 사용하여 작성
// FSA (Flux standard action) 규칙을 따르는 액션 객체를 생성할 것입니다.
//  - https://github.com/redux-utilities/flux-standard-action
//  - 순수 자바스크립트 객체이며, type 값이 있어야 합니다.
//  - error, payload, meta 값이 있어야 합니다.
// FSA 규칙을 따르는 액션 객체는, 액션에서 사용 할 파라미터의 필드명을 payload 로 통일 시킵니다.
// 이를 통하여, 우리는 액션 생성 함수를 훨씬 더 쉽게 작성 할 수 있습니다.
// error 는 에러가 발생 할 시 넣어 줄 수 있는 값이고, meta 는 상태 변화에 있어서 완전히 핵심적이지는 않지만 참조할만한 값을 넣어줍니다.

// export const changeInput = text => ({ type: CHANGE_INPUT, payload: text });
// export const create = text => ({ type: CREATE, payload: text });
// export const enter = id => ({ type: ENTER, payload: id });
// export const leave = id => ({ type: LEAVE, payload: id });

let id = 4;
export const changeInput = createAction(CHANGE_INPUT, text => text);
export const create = createAction(CREATE, text => ({ text, id: id++ }));
export const enter = createAction(ENTER, id => id);
export const leave = createAction(LEAVE, id => id);

// 훨씬 가독성이 좋나요?


const initialState = {
  input: '',
  list: [
    {
      id: 1,
      name: '홍길동',
      entered: true,
    },
    {
      id: 2,
      name: '콩쥐',
      entered: false,
    },
    {
      id: 3,
      name: '팥쥐',
      entered: false,
    }
  ]
};


// handleActions 를 사용하면, 더이상 switch / case 문을 사용 할 필요가 없이
// 각 액션 타입마다 업데이터 함수를 구현하는 방식으로 할 수 있어서 가독성이 더 좋아집니다.
export default handleActions({
  [CHANGE_INPUT]: (state, { payload: input }) => ({
    ...state,  input,
  }),
  [CREATE]: (state, { payload: { id, text }}) => ({
    ...state,
    list: state.list.concat({
      id,
      name: text,
      entered: false,
    })
  }),
  [ENTER]: (state, action) => ({
    ...state,
    list: state.list.map(
      item =>
        item.id === action.payload
        ? { ...item, entered: !item.entered }
        : item
    )
  }),
  [LEAVE]: (state, action) => ({
    ...state,
    list: state.list.filter(item => item.id !== action.payload)
  })
}, initialState);
