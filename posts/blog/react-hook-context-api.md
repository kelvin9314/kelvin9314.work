---
tags: ["react"]
published: true
date: 2020-04-14T12:41:00.000Z
title: React hook Context Api 基本
---

# 0. 前言
其實一直都在 hackmd 上打一些技術上的記錄，想說好像可以做一個自已的網站來存放這些 blogs，因為原本是在寫 React.js，這次就找了 gatsby.js 加上 markdown 的來建立這個 blog 的 website. 不過這版是直接使用 Starter Library 上別人做好的 template 建立的，好像沒什麼直接的關係哈哈

github Repo:
- https://github.com/kelvin9314/react-context-hooks-practice

## 1. 起手式：Context Provider + userCnontext

### 1.1 建立一個 context 的 provider
- 在這個 context 中定義一些 state 或是 function
- 再放進去 provider 的 value 中給子層的 components 使用 (comsumer)
- value 要給 {} 物件

```javascript=
// src/contexts/BookContext.js

import React, { createContext, useState } from 'react';
import uuid from 'uuid/v1';

export const BookContext = createContext()

const BookContextProvider = props => {
  // init fake data
  const [books, setBooks] = useState([
    {title: 'name of the wind', author: 'patrick rothfuss', id: 1},
    {title: 'the final empire', author: 'brandon sanderson', id: 2},
  ]);
  const addBook = (title, author) => {
    setBooks([...books, {title, author, id: uuid()}]); 
  };
  const removeBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  }

  return (
    <BookContext.Provider value={{ books, addBook, removeBook }}>
      {props.children}
    </BookContext.Provider>
  );
}

export default BookContextProvider;
```

### 1.2 在外層提供 provider 給需要的 components

```javascript=
// src/App.js
import React from 'react';
import BookList from './components/BookList';

const App = () => {
  return (
    <div className="App">
     <BookContextProvider>
        <BookList />
      </BookContextProvider>
    </div>
  );
}

export default App;

```


### 1.3 在 compoents (comsumer) 中調用
- 使用 `useContext` 把要用的 state / function 從context 該 prvodier中取出來

```javascript=
import React, { useContext } from 'react';
import { BookContext } from '../contexts/BookContext';
import BookDetails from "../components/BookDetails";


const BookList = () => {
  const { books } = useContext(BookContext)
  
  return books.length ? ( 
    <div className="book-list" >
      <ul>
        {books.map(book => (
          <BookDetails book={book} key={book.id} />
        ))}
      </ul>
    </div>
  ) 
  : (
    <div className="empty">No books to read. Hello free time.</div>
  )
}
 
export default BookList;

```

```javascript=
// src/components/BookDetails.js
import React, { useContext } from 'react'
import { BookContext } from '../contexts/BookContext';

const BookDetails = ({book}) => {
  const { removeBook } = useContext(BookContext);

  return(
    <li onClick={() => removeBook(book.id)}>
      <div className="title">{ book.title }</div>
      <div className="author">{ book.author }</div>
    </li>
  )
}

export default BookDetails

```

---

## 2. 初心式：用 useReducer 去 管理 Actions & State 的更改
> 不是一定要用 reducer, 這只是一個 coding pattern 更好去管理
1. Reducer function: interacts with state / data
2. Action: `{type: 'ADD_BOOK', book:{} }`
3. Dispatch: `dispatch(type: 'ADD_BOOK', book:{})`

### 2.1 建立 constant 集中定義 reducer 用到的 types
> 這個不是一定要宣告，只是因為在 reducer 中和 dispatch 的時侯都很常使用到這個些string，當 reducers 中的 types 太多的時侯，很難記得那個 type 的string 確實是什麼內容

```javascript=
// src/constants/index.js
export const BOOK = {
  ADD: 'ADD_BOOK',
  REMOVE: 'REMOVE_BOOK',
}
```

### 2.2 建立 reducer

```javascript=
// src/reducers/bookReducer.js
import uuid from 'uuid/v1';
import { BOOK } from "../constants";

export const bookReducer =(state, action) =>{
  switch (action.type) {
    case BOOK.ADD:
      return [...state, {
        title: action.book.title,
        author: action.book.author,
        id: uuid()
      }]
    case BOOK.REMOVE:
      return state.filter(book => book.id !== action.id)
    default:
      return state
  }
}
```


### 2.3 把 context provider 中，原本的 useState hook 換成 [useReducer](useReducer)
- 原本使用 state hook 時侯，我們要把state 和全部用來更新state的function 都放到 provider 的 value中
- 現在只要放 state 和 dispatch function
- useReducer 
	- 第二個 param 是 initial value
	- 第三個 param 是 Lazy initialization 
>**注意** 
React 不使用 state = initialState 這個由 Redux 推廣開來的參數慣例。初始值有時需要依賴於 prop，因此需要在呼叫 Hook 時指定。如果你較偏愛上述的慣例，你可以呼叫 useReducer(reducer, undefined, reducer) 來摸擬 Redux 的行為，但這是不鼓勵的。

```javascript=
//src/contexts/BookContext.js

// ...

const BookContextProvider = props => {
  // init fake data
  const [books, dispatch] = useReducer(bookReducer, [], () => {
    const localData = localStorage.getItem('books')
    return localData ? JSON.parse(localData) : []
  });

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books))
  }, [books])

  return (
    <BookContext.Provider value={{ books, dispatch }}>
      {props.children}
    </BookContext.Provider>
  );
}
 
export default BookContextProvider;
```

### 2.4 compoents 換成使用 dispatch function

```javascript=
// src/components/BookDetails.js

// ...

import { BOOK } from "../constants";

const BookDetails = ({book}) => {
  const { dispatch } = useContext(BookContext);

  return(
    <li onClick={() => dispatch({type: BOOK.REMOVE, id: book.id })}>
      <div className="title">{ book.title }</div>
      <div className="author">{ book.author }</div>
    </li>
  )
}

export default BookDetails

```

---

## 心得

這兩個都只是基本的應用，其實也只是寫下來，記錄一下學習的過程哈哈。  
