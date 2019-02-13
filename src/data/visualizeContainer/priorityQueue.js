import {PriorityQueue as OldPriorityQueue} from 'js_dsal'

/**
 * @classdesc Class representing priority queue.<br>
 * Use Array as container.
 * @version v1.0
 */
class PriorityQueue {
  /**
   * Create a prioirty queue.
   * @param {function} compare - inequality function, compare two element and return true or false.
   * @param {PriorityQueue} otherPriorityQueue - priority queue for deep copy.
   */
  constructor(compare = (n1, n2) => n1 < n2, otherPriorityQueue = null) {
    this.pq = new OldPriorityQueue(compare, otherPriorityQueue);
    this.classname = 'PriorityQueue';
  }

  // element access
  /**
   * Get the compare function of priority queue.
   * @return {function} compare function
   */
  compareFunction() {
    return this.pq.compareFunction();
  }

  /**
   * Get the top element of priority queue.
   * @return {boolean|*} false if the priority queue is empty else top element.
   */
  top() {
    return this.pq.top();
  }

  // capacity
  /**
   * Make sure the priority queue is empty.
   * @return {boolean} let know the priority queue is empty.
   */
  empty() {
    return this.pq.empty();
  }

  /**
   * Get the number of elements
   * @return {number} the number of elements
   */
  size() {
    return this.pq.size();
  }

  // modifiers
  /**
   * Push new data into priority queue.
   * @param {*} data - the element of priority queue.
   */
  push(variableName='', dataStates=[], visualizeDatas=[], executingCode='', data) {
    visualizeDatas.push({dataStates, executingCode: executingCode.trim(), containerState: {object: this.copy(), method: 'push', params: [data]}});
    this.pq.push(data);
  }

  /**
   * pop the top element of priority queue.
   * @returns {boolean} check well eliminated.
   */
  pop(variableName='', dataStates=[], visualizeDatas=[], executingCode='', ) {
    visualizeDatas.push({dataStates, executingCode: executingCode.trim(), containerState: {object: this.copy(), method: 'pop', params: []}});
    return this.pq.pop();
  }

  

  //new method
  copy() {
    return new PriorityQueue(this.pq.compareFunction(), this.pq);
  }
  
  make(compare, otherPriorityQueue) {
    return new PriorityQueue(compare, otherPriorityQueue);
  }
}

export default PriorityQueue;
