import std from '../data/visualizeContainer'
const Queue = std.Queue;
const Stack = std.Stack;
const List = std.List;

const qt = new Queue([1,2,3,4, 5, 6, 7, 8]);
qt.pop();
qt.pop();
qt.pop();

const qtf = new Queue([1,2,3,4]);
qtf.pop();
qtf.push('',[],[],'',1);

const qtpop1 = new Queue([1,2,3,4]);
qtpop1.pop();
qtpop1.pop();
qtpop1.pop();
qtpop1.push('',[],[],'',5);
qtpop1.push('',[],[],'',6);
const qtpop2 = new Queue([1,2,3]);
qtpop2.pop();
qtpop2.pop();
const qtpop3 = new Queue();
const qtpop4 = new Queue([1,2,3,4,5,6]);


const testDatas = [
  {
    // front is last node in array and queue.size() >=2
    executingCode: `qu.pop()`,
    containerState: {"object": qtpop1, "method": 'pop', "params": []}
  },
  {
    // queue.size() == 1
    executingCode: `qu.pop()`,
    containerState: {"object": qtpop2, "method": 'pop', "params": []}
  },
  {
    // empty
    executingCode: `qu.pop()`,
    containerState: {"object": qtpop3, "method": 'pop', "params": []}
  },
  {
    // else
    executingCode: `qu.pop()`,
    containerState: {"object": qtpop4, "method": 'pop', "params": []}
  },
  {
    // full
    executingCode: `qu.push(5)`,
    containerState: {"object": qtf, "method": 'push', "params": [5]}
  },
  {
    // not full, last
    executingCode: `qu.push(5)`,
    containerState: {"object": qt, "method": 'push', "params": [5]}
  },
  {
    // not full, not last
    executingCode: `qu.push(5)`,
    containerState: {"object": new Queue([1 , 3, 7, 15, -10, 6]), "method": 'push', "params": [5]}
  },
  {
    // empty
    executingCode: `qu.push(5)`,
    containerState: {"object": new Queue(), "method": 'push', "params": [5]}
  },
  {
    executingCode: `li.pushBack(5)`,
    containerState: {"object": new List([1 , 3, 7, 15, -10, 6, 8]), "method": 'pushBack', "params": [5]}
  },
  {
    executingCode: `li.pushBack(5)`,
    containerState: {"object": new List(), "method": 'pushBack', "params": [5]}
  },
  {
    executingCode: `li.popBack()`,
    containerState: {"object": new List([1 , 3, 7, 15, -10, 6, 8]), "method": 'popBack', "params": []}
  },
  {
    executingCode: `li.popBack()`,
    containerState: {"object": new List(), "method": 'popBack', "params": []}
  },
  {
    executingCode: `li.pushFront(4)`,
    containerState: {"object": new List([1 , 3, 7, 15, -10, 6, 8]), "method": 'pushFront', "params": [4]}
  },
  {
    executingCode: `li.pushFront(4)`,
    containerState: {"object": new List(), "method": 'pushFront', "params": [4]}
  },
  {
    executingCode: `li.popFront()`,
    containerState: {"object": new List([1 , 3, 7, 15, -10, 6, 8]), "method": 'popFront', "params": []}
  },
  {
    show : new List(),
    executingCode: `li.popFront()`,
    containerState: {"object": new List(), "method": 'popFront', "params": []}
  },
  {
    executingCode: `st.push(11)`,
    containerState: {"object": new Stack([1, 3, 5, 7, 9]), "method": 'push', "params": [11]}
  },
  {
    executingCode: `st.push(11)`,
    containerState: {"object": new Stack(), "method": 'push', "params": [11]}
  },
  {
    executingCode: `st.pop()`,
    containerState: {"object": new Stack([1, 3, 5, 7, 9]), "method": 'pop', "params": []}
  },
  {
    executingCode: `st.pop()`,
    containerState: {"object": new Stack(), "method": 'pop', "params": []}
  }
]

export default testDatas