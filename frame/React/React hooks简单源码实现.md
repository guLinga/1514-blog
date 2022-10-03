## React hooks简单源码实现

虚拟DOM上保存了自身组件和hooks，如果有多个hooks则以链表的形式保存。当使用updateNum()等更新函数的时候，调用dispatchAction函数，在hooks.queue.pending里面储存环状链表来表示需要更新的值，然后从新调用schedule函数，再次执行组件的更新，改变hooks的状态值。
```js
let isNount = true;
let workInProgressHook = null;//储存所有的hooks，以链表的形式

const fiber = {//表示虚拟DOM
  stateNode: App,//自身
  memoizedState: null,
}

//useState hooks
function useState(initialState) {//initialState是useState初始化值
  let hooks;
  if (isNount) {//首次渲染
    hooks = {
      memoizedState: initialState,//保存初始化值
      next: null,//保存下一个节点
      queue: {
        pending: null//保存状态的改变，为环状链表
      }
    }
    if (!fiber.memoizedState) {//如果是组件中的第一个hooks
      fiber.memoizedState = hooks;//将hooks赋值给fiber.memoizedState
      workInProgressHook = hooks;//将hooks赋值给workInProgressHook
    } else {//如果不是组件中的第一个hooks
      workInProgressHook.next = hooks;//则将workInProgressHook连接下一个链表节点
    }
    workInProgressHook = hooks;//将workInProgressHook重新赋值为尾节点
  } else {//不是首次渲染
    hooks = workInProgressHook;//将hooks赋值上第一次创建的useState
    workInProgressHook = workInProgressHook.next;//workInProgressHook指向下一个节点
  }
  let baseState = hooks.memoizedState;//获取hooks上一次的状态
  if (hooks.queue.pending) {//如果更新，表示有新的update
    let firstUpdate = hooks.queue.pending.next;//找到环状链表的第一个update
    do {
      const action = firstUpdate.action;
      baseState = action(baseState);//获取更新函数里面的值，updateNum(num => num + 1);里面的值就是num => num + 1
      firstUpdate = firstUpdate.next;//让链表指向下一个节点
    } while (firstUpdate !== hooks.queue.pending.next);//结束环状链表遍历
    hooks.queue.pending = null;//更新完毕，赋值为null
  }
  hooks.memoizedState = baseState;//将hooks.memoizedState赋值为新的值
  return [baseState, dispatchAction.bind(null, hooks.queue)];//返回值和更新函数
}

function dispatchAction(queue, action) {
  const update = {//环状链表
    action,//调用更新函数里面的传参
    next: null
  }
  if (queue.pending === null) {//没有触发更新，触发第一个更新
    //u0 -> u0 -> u0
    update.next = update;//让自身的下一个节点指向自身，形成环状链表
  } else {
    //如果有多个更新，update保存的是最后一个更新函数，则update.next保存第一个更新函数才能形成环状链表
    update.next = queue.pending.next;//u0 -> u1
    queue.pending.next = update;//u1 -> u0
    //形成环状链表
  }
  queue.pending = update;//将queue.pending赋值为环状链表的最后一个节点
  schedule();//调用函数重新加载数据
}

//当首次渲染和更新的时候调用schedule
function schedule() {
  workInProgressHook = fiber.memoizedState;//workInProgressHook储存所有的hooks，以链表的形式。
  const app = fiber.stateNode();//执行App()。
  isNount = false;//将isNount设置成false，表示以后不是第一层渲染。
  return app;//返回APP()执行后的结果，我们模拟APP函数只有onClick和onFocus函数。
}

function App() {
  const [num, updateNum] = useState(0);
  const [num1, updateNum1] = useState(10);
  console.log('num:', num);
  console.log('num1:', num1);
  return {
    onClick() {
      updateNum(num => num + 1);
    },
    onFocus() {
      updateNum1(num1 => num1 + 10);
    }
  }
}

window.app = schedule();
app.onClick();
app.onFocus();
```