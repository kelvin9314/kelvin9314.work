---
tags: ['react']
published: true
date: 2020-05-01T23:41:00.000Z
title: React Redux 學習 basic
---

# redux 學習

> 之前有一份是寫 react context api 這也是 React 16.3 後原生提供的一個在不同且非直接相連的 compoents 之間 managing state 的方法

如果整個系統的 compoents 樹狀圖很深的時侯，如果還是使用 props 的分式，就要一層一層的一直去傳給上層和下層更新 state, 實在太難管理了。
所以一些在不同 compoents 都會用到的 state, 就需要有一個統一狀態管理的地方。

## 0. Why Redux

- Good for managing large state
- Useful for sharing data between components
- Preictable state management using 3 principles
  1. Single source of truth
  2. State is read only
  3. Changes using pure functions

## 1. Redux flow (生命週期)

- Actions: 就是一些使者用真的會做的行為，像是 clicking on a buttonm or drop down menu
- Reducer： 處理前方有被建立出來的 actions, reducer 當中只會是一些 **prue functions**, receives an input and creates an output.
- Store: Reducer 的 output 就是會更新到 state 的內容 (or called store)
- DomChanges: 當原本在 state 中的一些值的內容更新了，頁面才會相對的更新

**one way data flow:**  
![](https://i.imgur.com/Sw2yn17.png)

## 2. redux basics

> ref. [DOCS 基礎](https://chentsulin.github.io/redux/docs/basics/index.html)

2.1 Action

> 告訴 reducer 要做什麼動作，是呼叫 dispatch(args)時的 args

```javascript=
//{ type: "ADD_TODO", text: '123'}
//dispatch
dispatch({ type: 'ADD_TODO', text: 'buy food' })
```

2.2 Action Creater

> 把 action 包裝成一個 function，也一樣是呼叫 dispatch(args)時的 args
> type of action and its payload

```javascript=
const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    text,
  }
}

dispatch(addTodo('buy food'))
```

2.3 Reducer

> 在接收 dispatch 所呼叫的 action，去按照對應的 type 去更新 store 的內容
> 這邊會是有一個 rootReducer 的 object， 當中可以包含了 N 個 reducer 的 obejcts

```javascript=
{
  todo: {...},
  user: {...},
  event: {...},
  ...
}
```

在上方 2.2 我們有 dispatch 一個 _addTodo_ 的 action, 這個 action 我們的 _actionReducer_ 就會需要去接收和處理，最後把 output 更新到 state 中

```javascript=
> /src/redux/reducers/todos.js
const initalState = {
  counter: 0,
  list: [{ id: 0, text: 'Happy Hacking ~v~', completed: false }],
}

// 這個 initalState 可以直接給一個 [] 或 {}
const todoReducer = (state = initalState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        counter: state.counter + 1,
        list: [...state.list, { id: state.counter + 1, text: action.text, completed: false }],
      }
    case CLEAR_TODO_LIST:
      return initalState
    // etc...
  }
}
```

2.4 Store

> 每一個 application 只會有一個 store

## 3. Implelement with React hook

來實作一個 Todo List 吧～

- github repo: https://github.com/kelvin9314/react-redux-todo-list
- demo page: https://kelvin9314.github.io/react-redux-todo-list/

```bash
yarn add redux redux-logger react-redux
```

### 3.1 建立 Store

```javascript=
//src/redux/store.js
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import rootReducer from './rootReducer'

// define a array is more scalable to add or remove other middleware in the future
const middleware = [logger]

const store = createStore(rootReducer, applyMiddleware(...middleware))

export default store
```

### 3.2 建立 react-redux 的 provider

> /src/index.js

```javascript=
//...
import { Provider } from 'react-redux'
import store from './redux/store'
//...
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
```

### 3.3 Root reducers

```javascript=
// /src/redux/rootReducer.js
import { combineReducers } from 'redux'

import todoReducer from './todo/todo.reducer'

const rootReducer = combineReducers({
  todo: todoReducer,
  // more other reducers...
})
```

### 3.4 Todo reducer & actions

```javascript=
// src/reduc/todo/todo.types.js
export const ADD_TODO = 'ADD_TODO'
export const CLEAR_TODO_LIST = 'CLEAR_TODO_LIST'
export const DELETE_TODO = 'DELETE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
```

```javascript=
// src/reduc/todo/todo.actions.js
import { ADD_TODO, CLEAR_TODO_LIST, DELETE_TODO, TOGGLE_TODO } from './todo.types'

export const addTodo = (text) => {
  return {
    type: ADD_TODO,
    text,
  }
}

export const clearTodoList = () => {
  return {
    type: CLEAR_TODO_LIST,
  }
}

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  }
}

export const toggleTodo = (id) => {
  return {
    type: TOGGLE_TODO,
    id,
  }
}
```

```javascript=
// src/reduc/todo/todo.reducer.js
import { ADD_TODO, CLEAR_TODO_LIST, DELETE_TODO, TOGGLE_TODO } from './todo.types'

const initalState = {
  counter: 0,
  list: [{ id: 0, text: 'Happy Hacking ~v~', completed: false }],
}

const todo = (state = initalState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        counter: state.counter + 1,
        list: [...state.list, { id: state.counter + 1, text: action.text, completed: false }],
      }
    case CLEAR_TODO_LIST:
      return initalState
    case DELETE_TODO:
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.id),
      }
    case TOGGLE_TODO:
      return {
        ...state,
        list: state.list.map((todo) => (todo.id === action.id ? { ...todo, completed: !todo.completed } : todo)),
      }
    default:
      return state
  }
}

export default todo
```

## 小總

在第一次設定 Redux 的時侯，只看著官方文件其實有一點搞不太懂這麼多東西之間的關係，下次自己忘記的時侯就可以回來看這份筆記了～～
