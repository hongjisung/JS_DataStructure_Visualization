import {List, Stack, Queue} from 'js_dsal'

const qt = new Queue([1,2,3,4, 5, 6, 7, 8]);
qt.pop();
qt.pop();
qt.pop();

const qtf = new Queue([1,2,3,4]);
qtf.pop();
qtf.push(1);

const testDatas = [
  {
    // full
    show : qtf,
    executingCode: `qu.push(5)`,
    containerState: {"object": qtf, "method": 'push', "params": [5]}
  },
  {
    // not full, last
    show : qt,
    executingCode: `qu.push(5)`,
    containerState: {"object": qt, "method": 'push', "params": [5]}
  },
  {
    // not full, not last
    show : new Queue([1 , 3, 7, 15, -10, 6]),
    executingCode: `qu.push(5)`,
    containerState: {"object": new Queue([1 , 3, 7, 15, -10, 6]), "method": 'push', "params": [5]}
  },
  {
    // empty
    show : new Queue(),
    executingCode: `qu.push(5)`,
    containerState: {"object": new Queue(), "method": 'push', "params": [5]}
  },
  {
    show : new List([1 , 3, 7, 15, -10, 6, 8]),
    executingCode: `li.pushBack(5)`,
    containerState: {"object": new List([1 , 3, 7, 15, -10, 6, 8]), "method": 'pushBack', "params": [5]}
  },
  {
    show : new List(),
    executingCode: `li.pushBack(5)`,
    containerState: {"object": new List(), "method": 'pushBack', "params": [5]}
  },
  {
    show : new List([1 , 3, 7, 15, -10, 6, 8]),
    executingCode: `li.popBack()`,
    containerState: {"object": new List([1 , 3, 7, 15, -10, 6, 8]), "method": 'popBack', "params": []}
  },
  {
    show : new List(),
    executingCode: `li.popBack()`,
    containerState: {"object": new List(), "method": 'popBack', "params": []}
  },
  {
    show : new List([1 , 3, 7, 15, -10, 6, 8]),
    executingCode: `li.pushFront(4)`,
    containerState: {"object": new List([1 , 3, 7, 15, -10, 6, 8]), "method": 'pushFront', "params": [4]}
  },
  {
    show : new List(),
    executingCode: `li.pushFront(4)`,
    containerState: {"object": new List(), "method": 'pushFront', "params": [4]}
  },
  {
    show : new List([1 , 3, 7, 15, -10, 6, 8]),
    executingCode: `li.popFront()`,
    containerState: {"object": new List([1 , 3, 7, 15, -10, 6, 8]), "method": 'popFront', "params": []}
  },
  {
    show : new List(),
    executingCode: `li.popFront()`,
    containerState: {"object": new List(), "method": 'popFront', "params": []}
  },
  {
    show : new Stack([1, 3, 5, 7, 9]),
    executingCode: `st.push(11)`,
    containerState: {"object": new Stack([1, 3, 5, 7, 9]), "method": 'push', "params": [11]}
  },
  {
    show : new Stack(),
    executingCode: `st.push(11)`,
    containerState: {"object": new Stack(), "method": 'push', "params": [11]}
  },
  {
    show : new Stack([1, 3, 5, 7, 9]),
    executingCode: `st.pop()`,
    containerState: {"object": new Stack([1, 3, 5, 7, 9]), "method": 'pop', "params": []}
  },
  {
    show : new Stack(),
    executingCode: `st.pop()`,
    containerState: {"object": new Stack(), "method": 'pop', "params": []}
  }
]

export default testDatas