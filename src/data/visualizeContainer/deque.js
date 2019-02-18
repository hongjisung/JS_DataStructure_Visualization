import {Deque as OldDeque} from 'js_dsal'
/*
Extends queue and add necessary methods

class:
  deque
Extends:
  queue
method:
  // super
    ///private
    _sizeup

    ///public
    front
    back
    empty
    size
    clear

  // modifier
  pushBack
  pushFront
  popBack
  PopFront

  // overriding
  push -> private
  pop -> private
  compare
*/

/**
 * @classdesc Class representing deque.<br>
 * deque is implemented extends queue.<br>
 * add additional method.<br>
 * pop and push method of queue is assumed as private.<br>
 * this constructor can get Queue type object.
 * @version v1.0
 */
class Deque {
  constructor(data = null) {
    this.deque = new OldDeque(data);
    this.classname = 'Deque';
  }

  /**
   * Get the first element of deque.
   * @returns {boolen} the first data of deque.
   */
  front() {
    return this.deque.front();
  }


  /**
   * Get the last element of deque.
   * @return {*} - the last element of deque.
   */
  back() {
    return this.deque.back();
  }

  /**
   * Make sure the deque is empty.
   * @return {boolean} true if deque is empty.
   */
  empty() {
    return this.deque.empty();
  }

  /**
   * Get the number of element in deque.
   * @return {number} the number of elements.
   */
  size() {
    return this.deque.size();
  }

  /**
   * Initalize the deque
   */
  clear() {
    this.deque.clear();
  }

  /**
   * add data to back of deque.
   * @param {*} data - the data of deque.
   */
  pushBack(data) {
    this.deque.pushBack(data);
  }

  /**
   * add data to front of deque.
   * @param {*} data - the data of deque.
   */
  pushFront(data) {
    this.deque.pushFront(data);
  }

  /**
   * remove the last data of deque.
   * @returns {boolean} if deque is empty, return false.
   */
  popBack() {
    return this.deque.popBack();
  }

  /**
   * remove the first data of deque.
   * @returns {boolean} if deque is empty, return false.
   */
  popFront() {
    return this.deque.popFront();
  }

  /**
   * compare data of this and param in order.
   * @param {Deque} otherDeque - Deque object.
   * @returns {boolean} Make sure this and param are same.
   */
  compare(otherDeque) {
    return this.deque.compare();
  }

  toString() {
    return this.deque.toString();
  }

  // new method
  copy() {
    return new Deque(this.deque);
  }
  
  make(data) {
    return new Deque(data);
  }
}

export default Deque;
