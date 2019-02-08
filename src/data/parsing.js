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
*/

const checkEmpty = n => {if(n===''){return false} else {return true}}
const characters = '.$_abcdefghijklnmopqrstuvwxyzABCDEFGHIJKLNMOPQRSTUVWXYZ0123456789'.split('')
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
const containEqualOperator = ['=>', '===', '==', '>=', '<=', '!=', '!==']
const conditionOrLoop = [
  'if', 'switch', 'while', 'for'
]
const operSign = ['=','>', '<', '!', '&', '|']

/**
 * make datas for visualize.
 * @param {object} param0 - have string type variables, inputCode and inputData
 * @returns {array|false} - if code have error, return false
 */
const parsing = ({inputCode='', inputData=''}) => {
  // 시각화하고자 하는 식들의 배열
  // 한 배열의 원소는 {dataStates: array, executingCode: string, containerState:{object:object, method:string, params: array}} 형식을 갖춘다.
  const visualizeDatas = [];
  const constructors = [];

  // data에 값 할당
  eval('data = ' + inputData);

  // syntax처리기
  codeTransition({inputCode, visualizeDatas, constructors})
  
  return visualizeDatas
}

const codeTransition = ({inputCode, visualizeDatas, constructors}) => {

}


export default parsing;