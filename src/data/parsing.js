import std from './visualizeContainer'

/*
변수 사용 체크
모든 변수이름을 일단 읽는다.
모든 변수이름에 대해서 필터를 건다 (변수이름 !== undefined)
있는거 변수로 넘긴다.

생성자
모든 생성자를 그 자신의 문자열과 매핑시키고
constructors['new std.Stack([1,2,3'])].copy()로 바꿔버린다.

코드에서 클래스 메소드에 세 개의 변수 추가, 현재 이 변수 이름, variable state, visualizeDatas


문자열처리
*/

const collectionName = {
  List:true,
  Stack:true,
  Queue: true,
  Deque: true,
  PriorityQueue: true,
  MapTree: true,
  MultiMapTree: true,
  MultiSetTree: true,
  SetTree: true,
};

const characters = '$_abcdefghijklnmopqrstuvwxyzABCDEFGHIJKLNMOPQRSTUVWXYZ0123456789'.split('')
const digits = '0123456789'.split('')
let data;
const openParens = ['(', '{', '[']
const closeParens = [')', '}', ']']
const escapeCode = [' ', '\b', '\f', '\n', '\r', '\t',  '\v']
const reservedWord = [
  'abstract', 'arguments', 'await', 'boolean', 'break', 'byte', 'case', 'catch',
  'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 
  'double', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'final', 'finally',
  'float', 'for', 'function', 'goto', 'if', 'implements', 'import', 'in', 'instanceof', 
  'int', 'interface', 'let', 'long', 'native', 'new', 'null', 'package', 'private', 
  'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this',
  'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void', 'volatile', 'while', 
  'with', 'yield'
];
const operSign = ['=','>', '<', '!', '&', '|']
const visualizeMethod = ['push', 'pushFront', 'pushBack', 'pop', 'popFront', 'popBack']
const varFilter = 'variables.filter(n => eval("typeof("+n+")") !== "undefined").map(n => {return{name: n, value: eval(n)}})'

/**
 * make datas for visualize.
 * @param {object} param0 - have string type variables, inputCode and inputData
 * @returns {array|false} - if code have error, return false
 */
const parsing = ({inputCode='', inputData=''}) => {
  // 시각화하고자 하는 식들의 배열
  // 한 배열의 원소는 {dataStates: array, executingCode: string, containerState:{object:object, method:string, params: array}} 형식을 갖춘다.
  const visualizeDatas = [];
  const constructors = {'List': new std.List(),
    'Stack': new std.Stack(),
    'Queue': new std.Queue(),
    'Deque': new std.Deque(),
    'PriorityQueue': new std.PriorityQueue()
  }; 
  
  // data에 값 할당
  eval('data = ' + inputData);
  

  // find variables
  const variables = findVariables(inputCode);
  console.log(variables)

  
  
  // code 변환
  inputCode = codeTransition(inputCode)
  
  
  // new 변환
  inputCode = constructorTransition(inputCode, constructors)
  
  console.log(inputCode)

  eval(inputCode)
  return visualizeDatas
}

const findVariables = (code) => {
  const result = []

  let idx = 0;
  let name = '';
  while (idx < code.length) {
    if (characters.includes(code[idx])) {
      name += code[idx]
    } else {
      if (code[idx]!=='(' && name !== '' && !reservedWord.includes(name) && !digits.includes(name[0]) && !result.includes(name)) {
        result.push(name)
      }
      name = '';
    }
    idx += 1
  }
  return result
}

const convertMethod = (method, recentDot, lastOpen, lastClose) => {
  /*
  (new List(arr)).pushBack()
  
  li.pushBack(4)
  => 
  ( (collectionName[li.constructor.name] !== undefined) ? 
  li.pushBack("li", variables.filter(n => eval(n) !== undefined).map(n => {return{name: n, value: eval(n)}}), visualizeDatas, "li.pushBack(4)", 4) :
  li.pushBack(4) )
  
  li.begin().getNext().getNext()
  */
 
  let varName = method.substring(0, recentDot)
  return '((collectionName['+varName+'.constructor.name]!==undefined)?'+
  method.substring(0,lastOpen)+'("'+varName+'", '+ varFilter +',visualizeDatas,"'+
  method+'",'+method.substring(lastOpen+1,lastClose)+'):'+method+')'
}

const codeTransition = (code) => {
  // right to left, outside to inside
  // outside to inside : iterate do this(only change outside) until don't need to change
  let changeCount = 1
  while (changeCount) {
    changeCount = 0

    let idx = 0;
    let word = '';
    let methodList = []
    while (idx < code.length) {
      if (characters.includes(code[idx])) {
        word += code[idx]
      } else {
        if (visualizeMethod.includes(word) && code[idx] === '(') {
          let method = '';
          let i = idx - 1;
          let stack = [];
          let strCheck = false;
          while (i >= 0) {
            if (strCheck) {
              if(strCheck === code[i]) {
                strCheck = false
              }
            } else {
              if (code[i] === '"' || code[i] === "'") {
                strCheck = code[i]
              } else if (closeParens.includes(code[i])) {
                stack.push(code[i])
              } else if (stack.length && openParens.includes(code[i])) {
                stack.pop()
              } else if (!stack.length && !characters.concat(['.']).includes(code[i]) ) {
                break
              }
            }
            
            method = code[i] + method
            i -= 1;
          }

          i = idx
          let behindLen = 0
          stack = []
          strCheck = false
          while (i < code.length) {
            if (strCheck) {
              if(strCheck === code[i]) {
                strCheck = false
              }
            } else {
              if (code[i] === '"' || code[i] === "'") {
                strCheck = code[i]
              } else if (openParens.includes(code[i])) {
                stack.push(code[i])
              } else if (stack.length && closeParens.includes(code[i])) {
                stack.pop()
                if (code[i] === ')' && !stack.length) {
                  method += code[i]
                  behindLen += 1
                  break;
                }
              } else if (!stack.length && !characters.concat(['.']).includes(code[i]) ) {
                break
              }
            }

            method += code[i]
            behindLen += 1
            i += 1;
          }

          idx += behindLen
          methodList.push([method, idx - method.length, idx,method.length - behindLen - word.length - 1, method.length - behindLen, method.length - 1])
        }
        word = ''
      }

      idx += 1
    }

    for (let i = 0; i < methodList.length - 1; i += 1) {
      if (methodList[i][2] >= methodList[i+1][1]) {
        methodList = methodList.filter((n, j) => j!==i)
        i -= 1
      }
    }

    for (let i = methodList.length - 1; i >= 0; i -= 1) {
      code = code.substring(0, methodList[i][1]) + convertMethod(methodList[i][0], methodList[i][3],methodList[i][4],methodList[i][5]) + code.substring(methodList[i][2])
    }
  }

  return code
}

const constructorTransition = (code, constructors) => {
  /*
  new List([1,2,3])
  =>
  constructors['List'].make([1,2,3])
  */
  let newOps = []
  let idx = 0
  let word = ''
  let strCheck = false
  while (idx < code.length) {
    if (strCheck) {
      if(strCheck === code[idx]) {
        strCheck = false
      }
    } else if (code[idx] === '"' || code[idx] === "'"){
      strCheck = code[idx]
      word = ''
    } else if (characters.includes(code[idx])) {
      word += code[idx]
    } else {
      if (word === 'new') {
        let i = idx
        let stack = []
        let strCheck = false
        let command = ''
        let openP=0, closeP = 0;
        while (i < code.length) {
          if (strCheck) {
            if(strCheck === code[i]) {
              strCheck = false
            }
          } else {
            if (code[i] === '"' || code[i] === "'") {
              strCheck = code[i]
            } else if (openParens.includes(code[i])) {
              if (!stack.length && code[i] === '(') {
                openP = i
              }
              stack.push(code[i])
            } else if (stack.length && closeParens.includes(code[i])) {
              stack.pop()
              if (code[i] === ')' && !stack.length) {
                command += code[i]
                closeP = i
                break;
              }
            } else if (!stack.length && !characters.concat(['.', ' ']).includes(code[i]) ) {
              break
            }
          }

          command += code[i]
          i += 1
        }

        let obName = ''
        for (i = openP - idx - 1; i>=0; i-=1) {
          if (characters.includes(command[i])) {
            obName = command[i] + obName
          } else {
            break
          }
        }

        if (constructors[obName] !== undefined) {
          newOps.push([obName, code.substring(openP+1, closeP), idx-3, idx+command.length])
        }
        idx = idx + command.length
      }
      word = ''
    }
    idx += 1
  }

  for (let i = newOps.length - 1; i >= 0; i -= 1) {
    code = code.substring(0, newOps[i][2]) + 'constructors["'+newOps[i][0]+'"].make('+newOps[i][1]+')'+code.substring(newOps[i][3])
  }

  return code
}


export default parsing;