import {Stack as OldStack} from 'js_dsal'

/**
 * @classdesc Class representing a Stack.
 * @version v1.0
 */
class Stack {
  /**
   * Create a stack.
   * @param {null|Object} data - The data is iterable object.
   */
  constructor(data = null) {
    this.stack = new OldStack(data);
  }

  // element access
  /**
   * Get the top data.
   * @returns {boolean|*} false if the stack has no element else top element.
   */
  top() {
    return this.stack.top();
  }

  // capacity
  /**
   * Check the stack is empty.
   * @returns {boolean} true if the stack is empty.
   */
  empty() {
    return this.stack.empty();
  }

  /**
   * Get the number of elements in stack.
   * @returns {number} the number of elements.
   */
  size() {
    return this.stack.size();
  }

  // modifiers
  /**
   * Push a data in stack.
   * @param {*} data - The data pushed to stack.
   */
  push(variableName='', variables={}, visualizeDatas=[], executingCode='', data) {
    visualizeDatas.push({dataStates: Object.keys(variables).map(n => { return {name: n, value: variables[n]}}), 
          executingCode: executingCode.trim(), containerState: {object: this, method: 'push', params: [data]}}) 
    this.stack.push(data);
  }

  /**
   * pop the top elements
   * @return {boolean} false if the stack is empty.
   */
  pop(variableName='', variables={}, visualizeDatas=[], executingCode='') {
    visualizeDatas.push({dataStates: Object.keys(variables).map(n => { return {name: n, value: variables[n]}}), 
          executingCode: executingCode.trim(), containerState: {object: this, method: 'pop', params: []}}) 
    return this.stack.pop();
  }

  // operations
  /**
   * compare with other stack
   * @param {Object} otherStack - Stack object to compare.
   * @return {boolean} true if they are same.
   */
  compare(otherStack) {
    return this.stack.compare(otherStack);
  }


  copy() {
    return new Stack(this);
  }
}

export default Stack;
