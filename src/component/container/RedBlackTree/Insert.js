import React, {Component} from 'react'
import TreeNode from '../TreeNode'
import Arrow from '../TreeArrow'
import PropTypes from 'prop-types'
import Node from 'js_dsal/src/containers/node/TreeNode'
import '../../../stylesheet/container/RedBlackTree/insert.css'
/*
red-black tree의 insert 
svg에 보이는 값은 node.getKey().toString()
node를 클릭하면 전체 node.toString()이 보여짐.
set, map에 따라서 전체 값인 node.toString()은 달라진다.
multi or not처리
*/

/**
 * get parent of node.
 * @param {TreeNode} node
 * @returns {null|Treenode}
 * @private
 */
const parent = (node) => {
  // if (!(node instanceof TreeNode)) {
  //   return null;
  // }
  return node.getParent();
};

/**
 * get grandparent of node.
 * @param {TreeNode} node
 * @returns {null|Treenode}
 * @private
 */
const grandparent = (node) => {
  const p = parent(node);
  if (p === null) {
    return null;
  }
  return parent(p);
};

/**
 * get sibling of node.
 * @param {TreeNode} node
 * @returns {null|Treenode}
 * @private
 */
const sibling = (node) => {
  const p = parent(node);
  if (p === null) {
    return null;
  }
  if (p.getLeftChild() === node) {
    return p.getRightChild();
  }
  return p.getLeftChild();
};

/**
 * get uncle of node.
 * @param {TreeNode} node
 * @returns {null|Treenode}
 * @private
 */
const uncle = (node) => {
  const p = parent(node);
  const g = grandparent(node);
  if (g == null) {
    return null;
  }
  return sibling(p);
};

/**
 * move right child node to present node
 * @param {TreeNode} node
 * @returns {boolean}
 * @private
 */
const rotateLeft = (node) => {
  // if (!(node instanceof TreeNode)) {
  //   return false;
  // }
  const nnew = node.getRightChild();
  const p = parent(node);
  // check leaf
  if (nnew.getLeftChild() === null) {
    return false;
  }
  node.setRightChild(nnew.getLeftChild());
  nnew.setLeftChild(node);
  node.setParent(nnew);
  if (node.getRightChild() !== null) {
    node.getRightChild().setParent(node);
  }
  if (p !== null) {
    if (node === p.getLeftChild()) {
      p.setLeftChild(nnew);
    } else if (node === p.getRightChild()) {
      p.setRightChild(nnew);
    }
  }
  nnew.setParent(p);
  return true;
};

/**
 * move left child node to present node
 * @param {TreeNode} node
 * @returns {boolean}
 * @private
 */
const rotateRight = (node) => {
  // if (!(node instanceof TreeNode)) {
  //   return false;
  // }
  const nnew = node.getLeftChild();
  const p = node.getParent();
  // check leaf
  if (nnew.getLeftChild() === null) {
    return false;
  }
  node.setLeftChild(nnew.getRightChild());
  nnew.setRightChild(node);
  node.setParent(nnew);
  if (node.getLeftChild() !== null) {
    node.getLeftChild().setParent(node);
  }
  if (p !== null) {
    if (node === p.getLeftChild()) {
      p.setLeftChild(nnew);
    } else if (node === p.getRightChild()) {
      p.setRightChild(nnew);
    }
  }
  nnew.setParent(p);
  return true;
};

const getnnum = (node) => {
  const p = parent(node);
  if (p === null) {
    return 0;
  }
  const g = parent(p);
  if (g === null) {
    if (node === p.getLeftChild()) {
      return 1;
    }
    return 2;
  }
  if (node === g.getLeftChild().getLeftChild()) {
    return 3;
  }
  if (node === g.getLeftChild().getRightChild()) {
    return 4;
  }
  if (node === g.getRightChild().getLeftChild()) {
    return 5;
  }
  return 6;
}

const getpnum = (node) => {
  const p = parent(node);
  if (p === null) {
    return -1;
  }
  const g = parent(p);
  if (g === null) {
    return 0;
  }
  if (p === g.getLeftChild()) {
    return 1;
  }
  return 2;
}

const getgnum = (node) => {
  if (grandparent(node) !== null) {
    return 0;
  }
  return -1;
}

const getunum = (node) => {
  if (uncle(node) === null) {
    return -1;
  }
  if (uncle(node) === grandparent(node).getLeftChild()) {
    return 1;
  }
  return 2;
}

const getNodeData = (node, kind) => {
  return (node.getKey() !== null) ? node.getKey().toString() + ((kind === 'map')?'    \n: ' + node.getValue().toString(): ''): 'LEAF'
}

class Insert extends Component {
  constructor(duration = 1, stop = false, intiate = f=>f, object = {}, params = []) {
    super()
    this.keyid = 1;
    this.interval = 20;
    this.state = {
      textSvg: [],
      ElementSvg: [],  
      ArrowSvg: [],
    }

    this.drawPos = [[290,80],[170,180],[410,180],[110,280],[230,280],[350,280],[470,280],
  [80,380],[140,380],[200,380],[260,380],[320,380],[380,380],[440,380],[500,380]]
  }

  // lifecycle 
  componentDidMount() {
    if (this.props.object.classname === 'SetTree' || this.props.object.classname === 'MultiSetTree') {
      if (this.props.object.classname === 'SetTree') {
        this.tree = this.props.object.copy()._settree._tree;
      } else {
        this.tree = this.props.object.copy()._multisettree._tree;
      }
      this.treekind = 'set';
      this.newNodeExample = [<TreeNode key={this.keyid} data={this.props.params[0].toString() + ((this.treekind === 'map')?'    \n: ' + this.props.params[1].toString(): '')} cx = {this.interval+20} cy={75} r={18} color={'red'} strokewidth='0px'/>]
      this.keyid += 1;

      if (this.tree.contains(this.props.params[0]) && this.props.object.classname === 'SetTree') {
        // duplicated key
        this.props.initiate(this.props.duration*2*1000);
        this.setState({textSvg: [<text key={this.keyid} x={this.interval} y={50} width={30} height={15}>Error: SetTree contains key already</text>]});
        this.keyid +=1;
      } else if (this.tree.size() === 0) {
        // empty tree
        this.props.initiate(this.props.duration*2*1000);
        
        let ElementSvg = [];
        ElementSvg.push(<TreeNode border='deepskyblue' key={this.keyid} className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={this.props.duration.toString() + 's'} data={this.props.params[0].toString() + ((this.treekind === 'map')?'    \n: ' + this.props.params[1].toString(): '')} cx={290} cy={120} r={20} color={'black'}/>)
        this.keyid += 1;
        ElementSvg.push(<TreeNode key={this.keyid} className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={this.props.duration.toString() + 's'} data={'LEAF'} cx={140} cy={200} r={20} color={'black'}/>)
        this.keyid +=1;
        ElementSvg.push(<TreeNode key={this.keyid} className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={this.props.duration.toString() + 's'} data={'LEAF'} cx={430} cy={200} r={20} color={'black'}/>)
        this.keyid +=1;
        // new Arrow
        ElementSvg = (Arrow(290, 120, 140, 200, 'appear80', this.keyid, this.props.duration.toString() + 's', this.props.duration.toString() + 's')).concat(ElementSvg)
        this.keyid += 1;  
        ElementSvg = (Arrow(290, 120, 430, 200, 'appear80', this.keyid, this.props.duration.toString() + 's', this.props.duration.toString() + 's')).concat(ElementSvg)
        this.keyid += 1;  

        this.setState({ElementSvg, textSvg: [<text key={this.keyid} x={this.interval} y={50} width={30} height={15}>Insert To Empty Tree</text>]});
        this.keyid +=1;
      } else {
        const ElementSvg = this.drawNodeArrow(this.tree._root);
        this.setState({ElementSvg, textSvg: [<text key={this.keyid} x={this.interval} y={50} width={30} height={15}>Original {(this.props.object.classname === 'SetTree') ? 'SetTree' : 'MultiSetTree'}</text>]});
        this.keyid +=1;
        this.sto = setTimeout(() => this.findInsertPose(this.tree._root), this.props.duration*1*1000);
      }
    } else if (this.props.object.classname === 'MapTree' || this.props.object.classname === 'MultiMapTree') {
      if (this.props.object.classname === 'MapTree') {
        this.tree = this.props.object.copy()._maptree._tree;
      } else {
        this.tree = this.props.object.copy()._multimaptree._tree;
      }
      this.treekind = 'map';
      this.newNodeExample = [<TreeNode key={this.keyid} data={this.props.params[0].toString() + ((this.treekind === 'map')?'    \n: ' + this.props.params[1].toString(): '')} cx = {this.interval+20} cy={75} r={18} color={'red'} strokewidth='0px'/>]
      this.keyid += 1;

      if (this.tree.contains(this.props.params[0]) && this.props.object.classname === 'MapTree') {
        // duplicated key
        this.props.initiate(this.props.duration*2*1000);
        this.setState({textSvg: [<text key={this.keyid} x={this.interval} y={50} width={30} height={15}>Error: MapTree contains key already</text>]});
        this.keyid +=1;
      } else if (this.tree.size() === 0) {
        // empty tree
        this.props.initiate(this.props.duration*2*1000);
        
        let ElementSvg = [];
        ElementSvg.push(<TreeNode border='deepskyblue' key={this.keyid} className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={this.props.duration.toString() + 's'} data={this.props.params[0].toString() + ((this.treekind === 'map')?'    \n: ' + this.props.params[1].toString(): '')} cx={290} cy={120} r={20} color={'black'}/>)
        this.keyid += 1;
        ElementSvg.push(<TreeNode key={this.keyid} className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={this.props.duration.toString() + 's'} data={'LEAF'} cx={140} cy={200} r={20} color={'black'}/>)
        this.keyid +=1;
        ElementSvg.push(<TreeNode key={this.keyid} className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={this.props.duration.toString() + 's'} data={'LEAF'} cx={430} cy={200} r={20} color={'black'}/>)
        this.keyid +=1;
        // new Arrow
        ElementSvg = (Arrow(290, 120, 140, 200, 'appear80', this.keyid, this.props.duration.toString() + 's', this.props.duration.toString() + 's')).concat(ElementSvg)
        this.keyid += 1;  
        ElementSvg = (Arrow(290, 120, 430, 200, 'appear80', this.keyid, this.props.duration.toString() + 's', this.props.duration.toString() + 's')).concat(ElementSvg)
        this.keyid += 1;  

        this.setState({ElementSvg, textSvg: [<text key={this.keyid} x={this.interval} y={50} width={30} height={15}>Insert To Empty Tree</text>]});
        this.keyid +=1;
      } else {
        const ElementSvg = this.drawNodeArrow(this.tree._root);
        this.setState({ElementSvg, textSvg: [<text key={this.keyid} x={this.interval} y={50} width={30} height={15}>Original MapTree</text>]});
        this.keyid +=1;
        this.sto = setTimeout(() => this.findInsertPose(this.tree._root), this.props.duration*1*1000);
      }
    } else {
      this.setState({textSvg: [<text key={this.keyid} x={this.interval} y={50} width={30} height={15}>Error: wrong classname {console.log(this.props.object)}</text>]});
      this.keyid +=1;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.stop) {
      clearTimeout(this.sto)
      return false
    }

    return true;
  }
  
  // internal methods
  findInsertPose(node = null) {
    const key = this.props.params[0];
    // 삽입할 위치를 찾는다, leaf면은 끝

    // leaf면 노드 삽입하고 repair step으로
    if (node.getLeftChild() === null) {
      const textSvg = [<text key={this.keyid} x={this.interval} y={50} width={30} height={15}>Insert Node</text>];
      let ElementSvg;

      const nnum = getnnum(node), pnum = getpnum(node), gnum = getgnum(node);
      if (nnum === 0) {
        ElementSvg = this.drawNodeArrow(node, '', this.props.duration.toString() + 's', (this.props.duration*2).toString() + 's');
      } else if (pnum === 0) {
        ElementSvg = this.drawNodeArrow(parent(node), '', this.props.duration.toString() + 's', (this.props.duration*2).toString() + 's');
      } else {
        ElementSvg = this.drawNodeArrow(grandparent(node), '', this.props.duration.toString() + 's', (this.props.duration*2).toString() + 's');
      }
      // node border
      ElementSvg.push(<TreeNode border='deepskyblue' key={this.keyid} data={getNodeData(node, this.treekind)} cx={this.drawPos[nnum][0]} cy={this.drawPos[nnum][1]} r={20} color={node.getColor()}/>)
      this.keyid +=1;

      // new node
      ElementSvg.push(<TreeNode border='deepskyblue' key={this.keyid} className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={this.props.duration.toString() + 's'} data={key.toString() + ((this.treekind === 'map')?'    \n: ' + this.props.params[1].toString(): '')} cx={this.drawPos[nnum][0]} cy={this.drawPos[nnum][1]} r={20} color={'red'}/>)
      this.keyid += 1;
      ElementSvg.push(<TreeNode key={this.keyid} className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={this.props.duration.toString() + 's'} data={'LEAF'} cx={this.drawPos[nnum*2+1][0]} cy={this.drawPos[nnum*2+1][1]} r={20} color={'black'}/>)
      this.keyid +=1;
      ElementSvg.push(<TreeNode key={this.keyid} className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={this.props.duration.toString() + 's'} data={'LEAF'} cx={this.drawPos[nnum*2+2][0]} cy={this.drawPos[nnum*2+2][1]} r={20} color={'black'}/>)
      this.keyid +=1;
      // new Arrow
      ElementSvg = (Arrow(this.drawPos[nnum][0], this.drawPos[nnum][1], this.drawPos[nnum*2+1][0], this.drawPos[nnum*2+1][1], 'appear80', this.keyid, this.props.duration.toString() + 's', this.props.duration.toString() + 's')).concat(ElementSvg)
      this.keyid += 1;  
      ElementSvg = (Arrow(this.drawPos[nnum][0], this.drawPos[nnum][1], this.drawPos[nnum*2+2][0], this.drawPos[nnum*2+2][1], 'appear80', this.keyid, this.props.duration.toString() + 's', this.props.duration.toString() + 's')).concat(ElementSvg)
      this.keyid += 1;  

      this.setState({ElementSvg, textSvg})
      
      
      const newnode = new Node(key, (this.treekind==='map') ? this.props.params[1] : key, 'red', null, new Node(null, null, 'black', null, null, null),
        new Node(null, null, 'black', null, null, null), null, null);
      const parentnode = parent(node);

      newnode.setParent(parentnode);
      if (parentnode.getLeftChild() === node) {
        parentnode.setLeftChild(newnode);
      } else {
        parentnode.setRightChild(newnode);
      }

      this.sto = setTimeout(() => this.insertRepair(newnode), this.props.duration*2*1000);
      return;
    }

    const textSvg = [<text key={this.keyid} x={this.interval} y={50} width={30} height={15}>Find Insert Position</text>];
    let ElementSvg;

    const nnum = getnnum(node), pnum = getpnum(node), gnum = getgnum(node);
    if (nnum === 0) {
      ElementSvg = this.drawNodeArrow(node, '', this.props.duration.toString() + 's', (this.props.duration*2).toString() + 's');
    } else if (pnum === 0) {
      ElementSvg = this.drawNodeArrow(parent(node), '', this.props.duration.toString() + 's', (this.props.duration*2).toString() + 's');
    } else {
      ElementSvg = this.drawNodeArrow(grandparent(node), '', this.props.duration.toString() + 's', (this.props.duration*2).toString() + 's');
    }
    // node border
    ElementSvg.push(<TreeNode border='deepskyblue' key={this.keyid} data={getNodeData(node, this.treekind)} cx={this.drawPos[nnum][0]} cy={this.drawPos[nnum][1]} r={20} color={node.getColor()}/>)
    this.keyid +=1;
    
    // node not leaf
    ElementSvg.push(<TreeNode border='black' key={this.keyid} className={'appear'} ani_dur={(this.props.duration).toString() + 's'} ani_delay={(this.props.duration).toString() + 's'} data={getNodeData(node, this.treekind)} cx={this.drawPos[nnum][0]} cy={this.drawPos[nnum][1]} r={20} color={node.getColor()}/>)
    this.keyid +=1;
    
    if (this.tree.keyComp()(node.getKey(), key)) {
      node = node.getLeftChild();
      ElementSvg.push(<TreeNode border='deepskyblue' key={this.keyid} className={'appear'} ani_dur={(this.props.duration).toString() + 's'} ani_delay={(this.props.duration).toString() + 's'} data={getNodeData(node, this.treekind)} cx={this.drawPos[nnum*2+1][0]} cy={this.drawPos[nnum*2+1][1]} r={20} color={node.getColor()}/>)
      this.keyid +=1;
    } else {
      node = node.getRightChild();
      ElementSvg.push(<TreeNode border='deepskyblue' key={this.keyid} className={'appear'} ani_dur={(this.props.duration).toString() + 's'} ani_delay={(this.props.duration).toString() + 's'} data={getNodeData(node, this.treekind)} cx={this.drawPos[nnum*2+2][0]} cy={this.drawPos[nnum*2+2][1]} r={20} color={node.getColor()}/>)
      this.keyid +=1;
    }

    this.setState({ElementSvg, textSvg})
    this.sto = setTimeout(() => this.findInsertPose(node), this.props.duration*2*1000);
  }

  insertRepair(node = null) {
    if (parent(node) === null) {
      // console.log(1);
      this.insertCase1(node);
    } else if (parent(node).getColor() === 'black') {
      // console.log(2);
      this.insertCase2(node);
    } else if (uncle(node).getColor() === 'red') {
      // console.log(3);
      this.insertCase3(node);
    } else {
      // console.log(4);
      this.insertCase4(node);
    }
  }

  insertCase1(node = null) {
    const textSvg = [<text key={this.keyid} x={this.interval} y={50} width={30} height={15}>InsertCase1: N is root node - change color</text>];
    this.keyid += 1;
    
    let ElementSvg;

    const nnum = getnnum(node), pnum = getpnum(node), gnum = getgnum(node);
    if (nnum === 0) {
      ElementSvg = this.drawNodeArrow(node, '', this.props.duration.toString() + 's', (this.props.duration*2).toString() + 's');
    } else if (pnum === 0) {
      ElementSvg = this.drawNodeArrow(parent(node), '', this.props.duration.toString() + 's', (this.props.duration*2).toString() + 's');
    } else {
      ElementSvg = this.drawNodeArrow(grandparent(node), '', this.props.duration.toString() + 's', (this.props.duration*2).toString() + 's');
    }
    // node border
    ElementSvg.push(<TreeNode border='deepskyblue' key={this.keyid} data={getNodeData(node, this.treekind)} cx={this.drawPos[nnum][0]} cy={this.drawPos[nnum][1]} r={20} color={node.getColor()}/>)
    this.keyid +=1;
    
    // change
    node.setColor('black');
    
    // node border
    ElementSvg.push(<TreeNode border='deepskyblue' key={this.keyid} className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={this.props.duration.toString() + 's'} data={getNodeData(node, this.treekind)} cx={this.drawPos[nnum][0]} cy={this.drawPos[nnum][1]} r={20} color={node.getColor()}/>)
    this.keyid +=1;
    
    this.setState({ElementSvg, textSvg})
    this.props.initiate(this.props.duration*2*1000)  
  }

  insertCase2(node = null) {
    const textSvg = [<text key={this.keyid} x={this.interval} y={50} width={30} height={15}>InsertCase2: P is black - do nothing</text>];
    this.keyid += 1;
    
    let ElementSvg;

    const nnum = getnnum(node), pnum = getpnum(node), gnum = getgnum(node);
    if (nnum === 0) {
      ElementSvg = this.drawNodeArrow(node, '', this.props.duration.toString() + 's', (this.props.duration*2).toString() + 's');
    } else if (pnum === 0) {
      ElementSvg = this.drawNodeArrow(parent(node), '', this.props.duration.toString() + 's', (this.props.duration*2).toString() + 's');
    } else {
      ElementSvg = this.drawNodeArrow(grandparent(node), '', this.props.duration.toString() + 's', (this.props.duration*2).toString() + 's');
    }
    // node border
    ElementSvg.push(<TreeNode border='deepskyblue' key={this.keyid} data={getNodeData(node, this.treekind)} cx={this.drawPos[nnum][0]} cy={this.drawPos[nnum][1]} r={20} color={node.getColor()}/>)
    this.keyid +=1;
    
    this.setState({ElementSvg, textSvg})
    this.props.initiate(this.props.duration*2*1000)  
  }

  insertCase3 = (node) => {
    const textSvg = [<text key={this.keyid} x={this.interval} y={50} width={30} height={15}>InsertCase3: P is red and U is red - recursive</text>];
    this.keyid += 1;
    
    let ElementSvg;

    const nnum = getnnum(node), pnum = getpnum(node), gnum = getgnum(node), unum = getunum(node);
    ElementSvg = this.drawNodeArrow(grandparent(node), '', this.props.duration.toString() + 's', (this.props.duration*2).toString() + 's');

    // node border
    ElementSvg.push(<TreeNode border='deepskyblue' key={this.keyid} data={getNodeData(node, this.treekind)} cx={this.drawPos[nnum][0]} cy={this.drawPos[nnum][1]} r={20} color={node.getColor()}/>)
    this.keyid +=1;
    // parent border
    ElementSvg.push(<TreeNode border='yellow' key={this.keyid} data={getNodeData(parent(node), this.treekind)} cx={this.drawPos[pnum][0]} cy={this.drawPos[pnum][1]} r={20} color={parent(node).getColor()}/>)
    this.keyid +=1;
    // uncle border
    ElementSvg.push(<TreeNode border='magenta' key={this.keyid} data={getNodeData(uncle(node), this.treekind)} cx={this.drawPos[unum][0]} cy={this.drawPos[unum][1]} r={20} color={uncle(node).getColor()}/>)
    this.keyid +=1;
    // grandparent border
    ElementSvg.push(<TreeNode border='gray' key={this.keyid} data={getNodeData(grandparent(node), this.treekind)} cx={this.drawPos[gnum][0]} cy={this.drawPos[gnum][1]} r={20} color={grandparent(node).getColor()}/>)
    this.keyid +=1;
    
    // change
    parent(node).setColor('black');
    uncle(node).setColor('black');
    grandparent(node).setColor('red');
    
    // node
    ElementSvg.push(<TreeNode border='deepskyblue' key={this.keyid} className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={this.props.duration.toString() + 's'} data={getNodeData(node, this.treekind)} cx={this.drawPos[nnum][0]} cy={this.drawPos[nnum][1]} r={20} color={node.getColor()}/>)
    this.keyid +=1;
    // parent
    ElementSvg.push(<TreeNode border='yellow' key={this.keyid} className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={this.props.duration.toString() + 's'} data={getNodeData(parent(node), this.treekind)} cx={this.drawPos[pnum][0]} cy={this.drawPos[pnum][1]} r={20} color={parent(node).getColor()}/>)
    this.keyid +=1;
    // uncle 
    ElementSvg.push(<TreeNode border='magenta' key={this.keyid} className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={this.props.duration.toString() + 's'} data={getNodeData(uncle(node), this.treekind)} cx={this.drawPos[unum][0]} cy={this.drawPos[unum][1]} r={20} color={uncle(node).getColor()}/>)
    this.keyid +=1;
    // grandparent
    ElementSvg.push(<TreeNode border='gray' key={this.keyid} className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={this.props.duration.toString() + 's'} data={getNodeData(grandparent(node), this.treekind)} cx={this.drawPos[gnum][0]} cy={this.drawPos[gnum][1]} r={20} color={grandparent(node).getColor()}/>)
    this.keyid +=1;
    
    this.setState({ElementSvg, textSvg})
    
    this.sto = setTimeout(() => this.insertRepair(grandparent(node)), this.props.duration*2*1000);
  };
  
  insertCase4 = (node) => {
    const textSvg = [<text key={this.keyid} x={this.interval} y={50} width={30} height={15}>InsertCase4 - 1: P is red and U is red - rotate</text>];
    this.keyid += 1;
    
    // let ElementSvg = this.showAndAnimation(node, 'disappear', (this.props.duration).toString() + 's', (this.props.duration).toString() + 's');

    let ElementSvg;

    let nnum = getnnum(node), pnum = getpnum(node), gnum = getgnum(node), unum = getunum(node);
    ElementSvg = this.drawNodeArrow(grandparent(node), 'disappear', (this.props.duration).toString() + 's', (this.props.duration).toString() + 's');

    // node border
    ElementSvg.push(<TreeNode border='deepskyblue' key={this.keyid} className='disappear' ani_dur={this.props.duration.toString() + 's'} ani_delay={(this.props.duration).toString() + 's'} data={getNodeData(node, this.treekind)} cx={this.drawPos[nnum][0]} cy={this.drawPos[nnum][1]} r={20} color={node.getColor()}/>)
    this.keyid +=1;
    // parent border
    ElementSvg.push(<TreeNode border='yellow' key={this.keyid} className='disappear' ani_dur={this.props.duration.toString() + 's'} ani_delay={(this.props.duration).toString() + 's'} data={getNodeData(parent(node), this.treekind)} cx={this.drawPos[pnum][0]} cy={this.drawPos[pnum][1]} r={20} color={parent(node).getColor()}/>)
    this.keyid +=1;
    // uncle border
    ElementSvg.push(<TreeNode border='magenta' key={this.keyid} className='disappear' ani_dur={this.props.duration.toString() + 's'} ani_delay={(this.props.duration).toString() + 's'} data={getNodeData(uncle(node), this.treekind)} cx={this.drawPos[unum][0]} cy={this.drawPos[unum][1]} r={20} color={uncle(node).getColor()}/>)
    this.keyid +=1;
    // grandparent border
    ElementSvg.push(<TreeNode border='gray' key={this.keyid} className='disappear' ani_dur={this.props.duration.toString() + 's'} ani_delay={(this.props.duration).toString() + 's'} data={getNodeData(grandparent(node), this.treekind)} cx={this.drawPos[gnum][0]} cy={this.drawPos[gnum][1]} r={20} color={grandparent(node).getColor()}/>)
    this.keyid +=1;


    // change
    const p = parent(node);
    const g = grandparent(node);
    let n = node;
  
    if (n === g.getLeftChild().getRightChild()) {
      rotateLeft(p);
      n = n.getLeftChild();
      nnum = 1;
      pnum = 3;
    } else if (n === g.getRightChild().getLeftChild()) {
      rotateRight(p);
      n = n.getRightChild();
      nnum = 2;
      pnum = 6;
    } else {
      this.insertCase4Step2(n);
      return;
    }

    this.drawNodeArrow(parent(node), 'appear80', (this.props.duration).toString() + 's', (this.props.duration*2).toString() + 's').map(n=>ElementSvg.push(n));
    // node border
    ElementSvg.push(<TreeNode border='deepskyblue' key={this.keyid} className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={(this.props.duration*2).toString() + 's'} data={getNodeData(node, this.treekind)} cx={this.drawPos[nnum][0]} cy={this.drawPos[nnum][1]} r={20} color={node.getColor()}/>)
    this.keyid +=1;
    // parent border
    if (nnum === 1) {
      // parent border
      ElementSvg.push(<TreeNode border='yellow' key={this.keyid} className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={(this.props.duration*2).toString() + 's'} data={getNodeData(node.getLeftChild(), this.treekind)} cx={this.drawPos[pnum][0]} cy={this.drawPos[pnum][1]} r={20} color={node.getLeftChild().getColor()}/>)
      this.keyid +=1;
    } else {
      // parent border
      ElementSvg.push(<TreeNode border='yellow' key={this.keyid} className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={(this.props.duration*2).toString() + 's'} data={getNodeData(node.getRightChild(), this.treekind)} cx={this.drawPos[pnum][0]} cy={this.drawPos[pnum][1]} r={20} color={node.getRightChild().getColor()}/>)
      this.keyid +=1;
    }
    // uncle border
    ElementSvg.push(<TreeNode border='magenta' key={this.keyid} className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={(this.props.duration*2).toString() + 's'} data={getNodeData(sibling(node), this.treekind)} cx={this.drawPos[unum][0]} cy={this.drawPos[unum][1]} r={20} color={sibling(node).getColor()}/>)
    this.keyid +=1;
    // grandparent border
    ElementSvg.push(<TreeNode border='gray' key={this.keyid} className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={(this.props.duration*2).toString() + 's'} data={getNodeData(parent(node), this.treekind)} cx={this.drawPos[gnum][0]} cy={this.drawPos[gnum][1]} r={20} color={parent(node).getColor()}/>)
    this.keyid +=1;

    this.setState({ElementSvg, textSvg})
    this.sto = setTimeout(() => this.insertCase4Step2(n), this.props.duration*4*1000);
  }
  
  insertCase4Step2 = (node) => {
    const textSvg = [<text key={this.keyid} x={this.interval} y={50} width={30} height={15}>InsertCase4 - 2: P is red and U is red - rotate</text>];
    this.keyid += 1;
    
    // let ElementSvg = this.showAndAnimation(node, 'disappear', (this.props.duration).toString() + 's', (this.props.duration).toString() + 's');
    let ElementSvg;

    let nnum = getnnum(node), pnum = getpnum(node), gnum = getgnum(node), unum = getunum(node);
    ElementSvg = this.drawNodeArrow(grandparent(node), 'disappear', this.props.duration.toString() + 's', (this.props.duration).toString() + 's');

    // node border
    ElementSvg.push(<TreeNode border='deepskyblue' className='disappear' ani_dur={this.props.duration.toString() + 's'} ani_delay={(this.props.duration).toString() + 's'} key={this.keyid} data={getNodeData(node, this.treekind)} cx={this.drawPos[nnum][0]} cy={this.drawPos[nnum][1]} r={20} color={node.getColor()}/>)
    this.keyid +=1;
    // parent border
    ElementSvg.push(<TreeNode border='yellow' className='disappear' ani_dur={this.props.duration.toString() + 's'} ani_delay={(this.props.duration).toString() + 's'} key={this.keyid} data={getNodeData(parent(node), this.treekind)} cx={this.drawPos[pnum][0]} cy={this.drawPos[pnum][1]} r={20} color={parent(node).getColor()}/>)
    this.keyid +=1;
    // uncle border
    ElementSvg.push(<TreeNode border='magenta' className='disappear' ani_dur={this.props.duration.toString() + 's'} ani_delay={(this.props.duration).toString() + 's'} key={this.keyid} data={getNodeData(uncle(node), this.treekind)} cx={this.drawPos[unum][0]} cy={this.drawPos[unum][1]} r={20} color={uncle(node).getColor()}/>)
    this.keyid +=1;
    // grandparent border
    ElementSvg.push(<TreeNode border='gray' className='disappear' ani_dur={this.props.duration.toString() + 's'} ani_delay={(this.props.duration).toString() + 's'} key={this.keyid} data={getNodeData(grandparent(node), this.treekind)} cx={this.drawPos[gnum][0]} cy={this.drawPos[gnum][1]} r={20} color={grandparent(node).getColor()}/>)
    this.keyid +=1;

    // change
    const p = parent(node);
    const g = grandparent(node);
  
    if (node === p.getLeftChild()) {
      rotateRight(g)
      nnum = 1;
      pnum = 0;
      gnum = 2;
      unum = 6;
    } else {
      rotateLeft(g);
      nnum = 2;
      pnum = 0;
      gnum = 1;
      unum = 3;    
    }
    p.setColor('black');
    g.setColor('red');

    
    this.drawNodeArrow(parent(node), 'appear80', (this.props.duration).toString() + 's', (this.props.duration*2).toString() + 's').map(n=>ElementSvg.push(n));

    // node border
    ElementSvg.push(<TreeNode border='deepskyblue' className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={(this.props.duration*2).toString() + 's'} key={this.keyid} data={getNodeData(node, this.treekind)} cx={this.drawPos[nnum][0]} cy={this.drawPos[nnum][1]} r={20} color={node.getColor()}/>)
    this.keyid +=1;
    // parent border
    ElementSvg.push(<TreeNode border='yellow' className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={(this.props.duration*2).toString() + 's'} key={this.keyid} data={getNodeData(parent(node), this.treekind)} cx={this.drawPos[pnum][0]} cy={this.drawPos[pnum][1]} r={20} color={parent(node).getColor()}/>)
    this.keyid +=1;
    // uncle border
    if (nnum === 1) {
      // uncle border
      ElementSvg.push(<TreeNode border='magenta' className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={(this.props.duration*2).toString() + 's'} key={this.keyid} data={getNodeData(sibling(node).getRightChild(), this.treekind)} cx={this.drawPos[unum][0]} cy={this.drawPos[unum][1]} r={20} color={sibling(node).getRightChild().getColor()}/>)
      this.keyid +=1;
    } else {
      // uncle border
      ElementSvg.push(<TreeNode border='magenta' className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={(this.props.duration*2).toString() + 's'} key={this.keyid} data={getNodeData(sibling(node).getLeftChild(), this.treekind)} cx={this.drawPos[unum][0]} cy={this.drawPos[unum][1]} r={20} color={sibling(node).getLeftChild().getColor()}/>)
      this.keyid +=1;
    }
    // grandparent border
    ElementSvg.push(<TreeNode border='gray' className='appear80' ani_dur={this.props.duration.toString() + 's'} ani_delay={(this.props.duration*2).toString() + 's'} key={this.keyid} data={getNodeData(sibling(node), this.treekind)} cx={this.drawPos[gnum][0]} cy={this.drawPos[gnum][1]} r={20} color={sibling(node).getColor()}/>)
    this.keyid +=1;

    
    this.setState({ElementSvg, textSvg})
    this.props.initiate(this.props.duration*4*1000);
  }

  drawNodeArrow(root, aniname, ani_dur, ani_delay) {
    const ElementSvg = [];

    const existnum = this.drawPos.map(n=>null);
    if (root !== null) {
      existnum[0] = root
      if (root.getLeftChild() !== null) { 
        existnum[1] = root.getLeftChild()
        if (root.getLeftChild().getLeftChild() !== null) {
          existnum[3] = root.getLeftChild().getLeftChild()
          if (root.getLeftChild().getLeftChild().getLeftChild() !== null) { existnum[7] = root.getLeftChild().getLeftChild().getLeftChild() }
          if (root.getLeftChild().getLeftChild().getRightChild() !== null) { existnum[8] = root.getLeftChild().getLeftChild().getRightChild() }
        }
        if (root.getLeftChild().getRightChild() !== null) {
          existnum[4] = root.getLeftChild().getRightChild()
          if (root.getLeftChild().getRightChild().getLeftChild() !== null) { existnum[9] = root.getLeftChild().getRightChild().getLeftChild() }
          if (root.getLeftChild().getRightChild().getRightChild() !== null) { existnum[10] = root.getLeftChild().getRightChild().getRightChild() }
        }
      }
      if (root.getRightChild() !== null) {
        existnum[2] = root.getRightChild()
        if (root.getRightChild().getLeftChild() !== null) {
          existnum[5] = root.getRightChild().getLeftChild()
          if (root.getRightChild().getLeftChild().getLeftChild() !== null) { existnum[11] = root.getRightChild().getLeftChild().getLeftChild() }
          if (root.getRightChild().getLeftChild().getRightChild() !== null) { existnum[12] = root.getRightChild().getLeftChild().getRightChild() }
        }
        if (root.getRightChild().getRightChild() !== null) {
          existnum[6] = root.getRightChild().getRightChild()
          if (root.getRightChild().getRightChild().getLeftChild() !== null) { existnum[13] = root.getRightChild().getRightChild().getLeftChild() }
          if (root.getRightChild().getRightChild().getRightChild() !== null) { existnum[14] = root.getRightChild().getRightChild().getRightChild() }
        }
      }
    }

    [[0,1],[1,3],[3,7],[3,8],[1,4],[4,9],[4,10],[0,2],[2,5],[5,11],[5,12],[2,6],[6,13],[6,14]].map((n,i) => {
      if (existnum[n[0]] !== null && existnum[n[1]] !== null) {
        Arrow(this.drawPos[n[0]][0], this.drawPos[n[0]][1], this.drawPos[n[1]][0], this.drawPos[n[1]][1], aniname, this.keyid, ani_delay, ani_dur).map(n=>ElementSvg.push(n));
        this.keyid += 1;   
      }
      return true;
    })

    if (parent(root) !== null && parent(root).getLeftChild() === root) {
      Arrow(450, 0, this.drawPos[0][0], this.drawPos[0][1], aniname, this.keyid, ani_delay, ani_dur).map(n=>ElementSvg.push(n));
      this.keyid += 1;  
    } else if (parent(root) !== null && parent(root).getRightChild() === root) {
      Arrow(130 , 0, this.drawPos[0][0], this.drawPos[0][1], aniname, this.keyid, ani_delay, ani_dur).map(n=>ElementSvg.push(n));
      this.keyid += 1;
    }

    existnum.map((n,i) => {
      if (n !== null) {
        ElementSvg.push(<TreeNode key={this.keyid} className={aniname} ani_dur={ani_dur} ani_delay={ani_delay} data={getNodeData(n, this.treekind)} cx={this.drawPos[i][0]} cy={this.drawPos[i][1]} r={20} color={n.getColor()}/>)
        this.keyid += 1
      }
      return true;
    })

    return ElementSvg;
  }

  // render
  render() {
    return (
      <svg style={{width: "100%", height: "100%"}}>
        {this.state.textSvg}
        {this.newNodeExample}
        {this.state.ElementSvg}
      </svg>
    )
  }
}

Insert.propTypes = {
  stop: PropTypes.bool,
  initiate: PropTypes.func,
  object: PropTypes.object,
  params: PropTypes.array,
  duration: PropTypes.number,
}

Insert.defaultProps = {
  stop: false,
  initiate: f=>f,
  object: {},
  params: [],
  duration: 1,
}

export default Insert
