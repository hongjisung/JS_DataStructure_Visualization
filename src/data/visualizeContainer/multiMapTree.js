import {MultiMapTree as OldMultiMapTree, Queue} from 'js_dsal'
import RedBlackTree from 'js_dsal/src/containers/redBlackTree'
import TreeNode from 'js_dsal/src/containers/node/TreeNode'

/**
 * @classdesc self-balancing binary search tree.<br>
 * key - value mapping.<br>
 * Use composition by RedBlackTree.<br>
 * Can not have mutiple same element.
 */
class MultiMapTree {
  /**
   * Initiate MultiMapTree.<br>
   * Get parameter as null or compare function or other set tree.
   * @param {null|function|MultiMapTree} data
   */
  constructor(data = null) {
    /**
     * compose red black tree.
     * @type {OldMultiMapTree}
     * @private
     */
    this._multimaptree = new OldMultiMapTree(data);
    this.classname = 'MultiMapTree';
  }

  /**
   * Return the first iterator node of tree.
   * @returns {null|TreeNode}
   */
  begin() {
    return this._multimaptree.begin();
  }

  /**
   * this express the end of iterating.<br>
   * we can start from front with begin(), end with rbegin() and eventually meet end()<br>
   * At the end, if we use getNext() method, we get false.<br>
   * But, if we use getPrev() method, we get maximum node.
   * @return {TreeNode} - endnode of tree iterator.
   */
  end() {
    return this._multimaptree.end();
  }

  /**
   * return the last node of tree iterator.
   * @returns {null|TreeNode}
   */
  rbegin() {
    return this._multimaptree.rbegin();
  }

  /**
   * this express the front end of iterating.<br>
   * we can start from front with begin(), end with rbegin() and eventually meet end()<br>
   * At the end, if we use getNext() method, we get false.<br>
   * But, if we use getPrev() method, we get maximum node.
   * @return {TreeNode} - endnode of tree iterator.
   */
  rend() {
    return this._multimaptree.rend();
  }

  /**
   * iterator of tree.<br>
   * return value is [key, value] array.
   */
  [Symbol.iterator]() {
    const itr = this._multimaptree[Symbol.iterator]();
    let data = null;
    const iterator = {
      next() {
        data = itr.next();
        if (data.done === false) {
          return { value: data.value, done: false };
        }
        return { value: undefined, done: true };
      },
    };
    return iterator;
  }

  /**
   * make sure tree is empty.
   * @returns {boolean}
   */
  empty() {
    return this._multimaptree.empty();
  }

  /**
   * the number of nodes in tree.
   * @returns {number}
   */
  size() {
    return this._multimaptree.size();
  }

  /**
   * initiate the tree.
   */
  clear() {
    this._multimaptree.clear();
  }

  /**
   * insert new node in tree with key.<br>
   * @param {*} key - Should not TreeNode.
   * @param {*} value
   */
  insert(variableName='', dataStates=[], visualizeDatas=[], executingCode='', key, value) {
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
    visualizeDatas.push({dataStates: newdataStates, executingCode: executingCode.trim(), containerState: {object: this.copy(), method: 'insert', params: [key, value]}}); 
    
    return this._multimaptree.insert(key, value);
  }

  /**
   * If erase() get key value as param, we erase all nodes with that key.<br>
   * But if erase() get TreeNode as param, we erase only that node.
   * @param {*|TreeNode} data - Data can be key or Node of tree.
   * @returns {false|TreeNode} - next node of erased data. if cannot find the key, return falase.
   */
  erase(data) {
    return this._multimaptree.erase(data);
  }

  /**
   * Assign new value to given key.<br>
   * If key node is several, change all the data.
   * If key is not in tree, return false.
   * @param {*} key - Should not TreeNode.
   * @param {*} value
   * @returns {boolean}
   */
  assign(key, value) {
    return this._multimaptree.assign(key, value);
  }

  /**
   * Insert new key and value.<br>
   * If key already exists in tree, assign the value to that key.
   * @param {*} key - Should not TreeNode.
   * @param {*} value
   */
  insertOrAssign(key, value) {
    this._multimaptree.insertOrAssign(key, value);
  }

  /**
   * count the number of nodes which match the key.<br>
   * @param {*} key - Should not TreeNode.
   * @returns {number}
   */
  count(key) {
    return this._multimaptree.count(key);
  }

  /**
   * return arbitrary node which matches the key.
   * @param {*} key - Should not TreeNode.
   * @returns {TreeNode}
   */
  find(key) {
    return this._multimaptree.find(key);
  }

  /**
   * make sure the key is in tree.
   * @param {*} key - Should not TreeNode.
   * @returns {boolean}
   */
  contains(key) {
    return this._multimaptree.contains(key);
  }

  /**
   * return the start node and end node of given key.<br>
   * end node is next node of last match node.<br>
   * if no key in tree, return [endnode,endnode]
   * @param {*} key - Should not TreeNode.
   * @returns {Array} - [TreeNode,TreeNode]
   */
  equalRange(key) {
    return this._multimaptree.equalRange(key);
  }

  /**
   * Find the first not less node.<br>
   * It don't need to be same with given key.
   * @param {*} key - the target key to find.
   * @returns {TreeNode}
   */
  lowerBound(key) {
    return this._multimaptree.lowerBound(key);
  }

  /**
   * Find the first upper node.<br>
   * @param {*} key - the target key to find.
   * @returns {TreeNode}
   */
  upperBound(key) {
    return this._multimaptree.upperBound(key);
  }

  /**
   * return the key compare function.
   * @returns {function}
   */
  keyComp() {
    return this._multimaptree.keyComp();
  }

  /**
   * show information of object
   * @returns {string}
   */
  toString() {
    return this._multimaptree.toString();
  }

  // new method
  copy() {
    if (this._multimaptree._tree._root === null) {
      return new MultiMapTree();
    }
    // exactly copy the structure
    const rbtree = new RedBlackTree();
    
    rbtree._size = this._multimaptree._tree._size;
    rbtree._keyComp = this._multimaptree._tree._keyComp;
    rbtree._root = new TreeNode();
    
    const q1 = new Queue(), q2 = new Queue();
    q1.push(this._multimaptree._tree._root);
    q2.push(rbtree._root);
    
    while (!q1.empty()) {
      const n1 = q1.front(), n2 = q2.front();
      q1.pop(); q2.pop();

      n2.setKey(n1._key);
      n2.setValue(n1._value);
      n2.setColor(n1._color);

      if (n1.getLeftChild() !== null) {
        q1.push(n1._leftChild);

        n2.setLeftChild(new TreeNode());
        n2.getLeftChild().setParent(n2);
        q2.push(n2._leftChild);
      }

      if (n1.getRightChild() !== null) {
        q1.push(n1._rightChild);

        n2.setRightChild(new TreeNode());
        n2.getRightChild().setParent(n2);
        q2.push(n2._rightChild);
      }
      
      n2._endnode = rbtree.end();
      n2._rendnode = rbtree.rend();
    }
    
    rbtree.end();
    rbtree.rend();

    const newMultiMapTree = new MultiMapTree();
    newMultiMapTree._multimaptree._tree = rbtree;
    return newMultiMapTree;
  }

  make = (data) => new MultiMapTree(data);
}

export default MultiMapTree;
