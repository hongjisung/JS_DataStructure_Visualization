import {List, Stack} from 'js_dsal'

const testDatas = [
  {
    show : new List([1 , 3, 7, 15, -10, 6, 8]),
    executingCode: `li.pushBack(5)`,
    containerState: {"object": new List([1 , 3, 7, 15, -10, 6, 8]), "method": 'pushBack', "params": [5]}
  },
  {
    show : new List([1 , 3, 7, 15, -10, 6, 8]),
    executingCode: `li.popBack()`,
    containerState: {"object": new List([1 , 3, 7, 15, -10, 6, 8]), "method": 'popBack', "params": []}
  },
  {
    show : new List([1 , 3, 7, 15, -10, 6, 8]),
    executingCode: `li.pushFront(4)`,
    containerState: {"object": new List([1 , 3, 7, 15, -10, 6, 8]), "method": 'pushFront', "params": [4]}
  },
  {
    show : new List([1 , 3, 7, 15, -10, 6, 8]),
    executingCode: `li.popFront()`,
    containerState: {"object": new List([1 , 3, 7, 15, -10, 6, 8]), "method": 'popFront', "params": []}
  },
  {
    show : new Stack([1, 3, 5, 7, 9]),
    executingCode: `st.push(11)`,
    containerState: {"object": new Stack([1, 3, 5, 7, 9]), "method": 'push', "params": [11]}
  },
  {
    show : new Stack([1, 3, 5, 7, 9]),
    executingCode: `st.pop()`,
    containerState: {"object": new Stack([1, 3, 5, 7, 9]), "method": 'pop', "params": []}
  }
]

export default testDatas