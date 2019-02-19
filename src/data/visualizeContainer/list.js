import {List as OldList} from 'js_dsal'

/**
 * @classdesc Class representing List.<br>
 * Doubly linked list.
 * @version v1.0.
 */
class List {
  /**
   * Get null or iterable Object and make List sequentially.
   * @param {null|object} data - The data of iteable object.
   */
  constructor(data = null) {
    this.list = new OldList(data);
    this.classname = 'List';
  }

  // Capacity
  /**
   * Get the number of elements.
   * @return {number} the number of elements. 
   */
  size() {
    return this.list.size();
  }

  /**
   * Make sure the list is empty.
   * @return {boolean} if list is empty, true.
   */
  empty() {
    return this.list.empty();
  }

  // Element Access
  /**
   * Get the first element of list.
   * @return {boolean|*} false if list is empty, else return the first element.
   */
  front() {
    return this.list.front();
  }

  /**
   * Get the last element of list.
   * @return {boolean|*} false if list is empty, else return the last element.
   */
  back() {
    return this.list.back();
  }

  // iterable node
  /**
   * Get the first Node of list.<br>
   * Can use getNext method for next node.<br>
   * if list is empty, return null.
   * @return {null|Node} The first Node of list.
   */
  begin() {
    return this.list.begin();
  }

  /**
   * Get the back end of list, nil.<br>
   * For check of end.<br>
   * Or use getPrev method for before node:last node of list.
   * @return {Node} nil
   */
  end() {
    return this.list.end();
  }

  /**
   * Get the last node of list.<br>
   * Use the getPrev method for next node.<br>
   * If list is empty, return null.
   * @returns {null|Node} last node of list.
   */
  rbegin() {
    return this.list.rbegin();
  }

  /**
   * Get the front end of list, rnil<br>
   * For check of the end of reverse iterator.<br>
   * Use getNext method for get first node of list.
   * @returns {Node} rnil.
   */
  rend() {
    return this.list.rend();
  }

  // Modifiers
  /**
   * Make list empty.
   */
  clear() {
    return this.list.clear();
  }

  /**
   * Insert new data in front of given node and return present node like c++ stl.
   * @param {Node} node - In front of this node, the data is inserted.
   * @param {*} data - The data to insert list.
   * @returns {boolean|Node} - If node is not Node object, return false, else return this node.
   */
  insert(variableName='', dataStates=[], visualizeDatas=[], executingCode='', node, data) {
    // array, object, js_dsal의 class만 deepcopy하자
    const newdataStates = dataStates.map(n => {
      if (n.value.classname !== undefined) {
        return {...n, value: n.value.copy()}
      } else if (typeof n.value === 'object') {
        return {...n, value: JSON.parse(JSON.stringify(n))};
      } else {
        return n;
      }
    })
    visualizeDatas.push({dataStates: newdataStates, executingCode: executingCode.trim(), containerState: {object: this.copy(), method: 'insert', params: [data]}}); 
    
    return this.list.insert(node, data);
  }

  /**
   * Erase this node and return the next node.
   * @param {*} node - The node which is removed from list.
   * @returns {boolean|Node} - If node is not Node object, return false, else return the next node.
   */
  erase(node) {
    return this.list.erase(node);
  }

  /**
   * The data is added to end of list.
   * @param {*} data - the data of list.
   */
  pushBack(variableName='', dataStates=[], visualizeDatas=[], executingCode='', data) {
    // array, object, js_dsal의 class만 deepcopy하자
    const newdataStates = dataStates.map(n => {
      if (n.value.classname !== undefined) {
        return {...n, value: n.value.copy()}
      } else if (typeof n.value === 'object') {
        return {...n, value: JSON.parse(JSON.stringify(n))};
      } else {
        return n;
      }
    })
    visualizeDatas.push({dataStates: newdataStates, executingCode: executingCode.trim(), containerState: {object: this.copy(), method: 'pushBack', params: [data]}}); 
    this.list.pushBack(data);
  }

  /**
   * The data is added to front of list.
   * @param {*} data - the data of list.
   */
  pushFront(variableName='', dataStates=[], visualizeDatas=[], executingCode='', data) {
    // array, object, js_dsal의 class만 deepcopy하자
    const newdataStates = dataStates.map(n => {
      if (n.value.classname !== undefined) {
        return {...n, value: n.value.copy()}
      } else if (typeof n.value === 'object') {
        return {...n, value: JSON.parse(JSON.stringify(n))};
      } else {
        return n;
      }
    })
    visualizeDatas.push({dataStates: newdataStates, executingCode: executingCode.trim(), containerState: {object: this.copy(), method: 'pushFront', params: [data]}}); 
    this.list.pushFront(data);
  }

  /**
   * The data is removed from end of list.
   * @returns {boolean} false it the list is empty.
   */
  popBack(variableName='', dataStates=[], visualizeDatas=[], executingCode='') {
    // array, object, js_dsal의 class만 deepcopy하자
    const newdataStates = dataStates.map(n => {
      if (n.value.classname !== undefined) {
        return {...n, value: n.value.copy()}
      } else if (typeof n.value === 'object') {
        return {...n, value: JSON.parse(JSON.stringify(n))};
      } else {
        return n;
      }
    })
    visualizeDatas.push({dataStates: newdataStates, executingCode: executingCode.trim(), containerState: {object: this.copy(), method: 'popBack', params: []}});
    return this.list.popBack();
  }

  /**
   * The data is removed from front of list.
   * @returns {boolean} false it the list is empty.
   */
  popFront(variableName='', dataStates=[], visualizeDatas=[], executingCode='') {
    // array, object, js_dsal의 class만 deepcopy하자
    const newdataStates = dataStates.map(n => {
      if (n.value.classname !== undefined) {
        return {...n, value: n.value.copy()}
      } else if (typeof n.value === 'object') {
        return {...n, value: JSON.parse(JSON.stringify(n))};
      } else {
        return n;
      }
    })
    visualizeDatas.push({dataStates: newdataStates, executingCode: executingCode.trim(), containerState: {object: this.copy(), method: 'popFront', params: []}});
    return this.list.popFront();
  }

  // Operations
  /**
   * Compare iterable object with this list.
   * @param {Object} data - iterable object.
   * @returns {boolean} - true if the data and index is same in list and iterable object.
   */
  compare(data) {
    return this.list.compare(data);
  }

  /**
   * Insert elements of iterable object in list where the front of given node.
   * @param {Node} node - Elements of data are inserted in front of this node.
   * @param {Object} data - iterable object
   * @returns {boolean} If elements are well inserted, return true.
   */
  splice(node, data) {
    return this.list.splice(node, data);
  }

  /**
   * sort the list by compare function.
   * Basically quick sort, but can choose merge sort.
   * @param {function} comp - compare function 
   * @param {string} sorting - sort mode
   */
  sort(comp = (n1, n2) => n1 < n2, sorting = 'quicksort') {
    return this.list.sort(comp, sorting)
  }

  /**
   * Merge this list and data(iterable object) by sequential order.<br>
   * @param {Object} data - sortable iterable object.
   * @param {function} compare - inequality function.
   * @return {boolean} check well merged.
   */
  merge(data, compare = (d1, d2) => d1 < d2) {
    return this.list.merge(data, compare)
  }

  /**
   * Reverse the list.
   */
  reverse() {
    this.list.reverse();
  }

  // javascript iterator
  /**
   * Iterator of this list.
   * return the value of Nodes.
   * @returns {Object} {value, done}
   */
  [Symbol.iterator]() {
    let node = null;
    const start = this.begin();
    const end = this.end();
    const iterator = {
      next() {
        if (node === null) {
          node = start;
          if (node === null) {
            return { value: undefined, done: true };
          }
          return { value: node.getData(), done: false };
        }

        node = node.getNext();
        if (node === end) {
          return { value: undefined, done: true };
        }
        return { value: node.getData(), done: false };
      },
    };
    return iterator;
  }

  toString() {
    return this.list.toString();
  }

  // new method
  copy() {
    return new List(this.list);
  }
  make = (data) => new List(data);
}


export default List;
