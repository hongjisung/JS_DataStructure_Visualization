import {Queue as OldQueue} from 'js_dsal'

/**
 * @classdesc Class representing queue.<br>
 * Circular queue.<br>
 * Use array as container.
 * @version v1.0
 */
class Queue {
  /**
   * Get none or iterable object and make queue.
   * Can get Deque type object also.
   * @constructor
   * @param {null|Object} data - Iterable object
   */
  constructor(data = null) {
    this.queue = new OldQueue(data);
  }

  // element access
  /**
   * Get the first element of queue.
   * @return {false|*} - the first element of queue. if queue is empty, return false.
   */
  front() {
    return this.queue.front();
  }

  /**
   * Get the last element of queue.
   * @return {*} - the last element of queue.
   */
  back() {
    return this.queue.back();
  }

  // capacity
  /**
   * Make sure the queue is empty.
   * @return {boolean} true if queue is empty.
   */
  empty() {
    return this.queue.empty();
  }

  /**
   * Get the number of element in queue.
   * @return {number} the number of elements.
   */
  size() {
    return this.queue.size();
  }

  // modifiers
  /**
   * Initalize the queue
   */
  clear() {
    this.queue.clear();
  }

  /**
   * Insert new data to queue.
   * @param {*} data - the element of queue.
   */
  push(variableName='', dataStates=[], visualizeDatas=[], executingCode='', data) {
    visualizeDatas.push({dataStates, executingCode: executingCode.trim(), containerState: {object: this.copy(), method: 'push', params: [data]}});
    this.queue.push(data);
  }

  /**
   * remove a data of queue.
   * @return {boolean} If queue is empty, return false.
   */
  pop(variableName='', dataStates=[], visualizeDatas=[], executingCode='') {
    visualizeDatas.push({dataStates, executingCode: executingCode.trim(), containerState: {object: this.copy(), method: 'pop', params: []}});
    return this.queue.pop();
  }

  // operations
  /**
   * Compare with other queue
   * @param {Queue} otherQueue - Queue object.
   * @return {boolean} Make sure two queues are same.
   */
  compare(otherQueue) {
    return this.queue.compare(otherQueue);
  }

  //new method
  copy() {
    return new Queue(this);
  }
  
  make(data) {
    return new Queue(data);
  }
}

module.exports = Queue;
