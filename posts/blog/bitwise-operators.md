---
tags: ["javascript", "leetcode"]
published: true
date: 2020-04-24T21:47:00.000Z
title: Bitwise operators 位元運算子
---


## 起因
今天在寫 leetcode 的 [201. Bitwise AND of Numbers Range](https://leetcode.com/problems/subarray-sum-equals-k/)的時侯，發現題目需要用使用到 binary bits 的東西

### 想法
1. 把 M 和 N 都轉成 binary 後
2. 一直向右 shift （K 次），去掉右邊的 bit ，直剩下的 M 和 N 是等於的
3. IF 有 M == N, 再住左 shift K 次 去補 0，就可以等到答案
4. ELSE  return 0

> 110000  
> 110001  
> 110001  
> ...  
> ..  
> .  
> 111111  

**在最左邊的 bits 是完全等於前，右邊剩下的 bits 會從N個0到N個1的組合，代表這些在做 AND 也都還是 0**

### 實作
一開始是打算，定義一個把 number 轉成 binary string, 再在前方補上 x 個‘0’ 的 function  
把題目可能的最大值*2147483647*進去，轉換後取得最大值的長度 Z，其他的數字補 ‘0’ 也補上這個長度 Z

```javascript
function numToBinary(num, len) {
  let binNum = num.toString(2)
  return binNum.padStart(len,0)
}

let {length} = numToBinary(2147483647)

//...

```

後來想了一下才發現這個做法不行，然後才在 MDN javascript 運算式與運算子的文件中，找到**位元運算子**的應用

## Bitwise operators
> [MDN Docs - 位元運算子](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Expressions_and_Operators#%E4%BD%8D%E5%85%83%E9%81%8B%E7%AE%97%E5%AD%90)



像**比較運算子**，**邏輯運算子**平常都很常使用到，但是**位元運算子**的話好像之前在大學上計概在寫 C 語言的時侯好像有寫過?(忘記了～這次就當重溫一下吧，做前端後好久沒有直接處理 bits 的東西了)

> LET a = 0, b = 1

AND ： `a & b` , output: 0  

OR : `a | b` , output: 1  

XOR: `a ^ b`, output: 1  

NOT: `~a` , output: 1  


um...這些都是很正常的位元邏輯運算子麻

---

但這次有要使用到的是

- 左移： `a << b` 將 a 的每個bit向左移動 b 個bits，空餘的位數以0填滿。
example:
```javascript=
var bar = 5; //  (00000000000000000000000000000101)
bar <<= 2; // 20 (00000000000000000000000000010100)
```

- 有號右移: `a >> b` 將 a 的每個bit向右移動 b 個bits，空餘位數以最高位補滿。

example: 
```javascript=
var bar = 5; //   (00000000000000000000000000000101)
bar >>= 2;   // 1 (00000000000000000000000000000001)

var bar = -5; //    (-00000000000000000000000000000101)
bar >>= 2;  // -2 (-00000000000000000000000000000010)

```

p.s. 以上兩個 example 只是把 位元運算子 + 賦值運算子一起組合成**復合運算子**
```
4+=1
3*=2
2**=10
...
```
這都是復合運算子

## 題目最後的解答
> javascript
```javascript=
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
// runtime: 152 ms
const rangeBitwiseAnd = (m, n) => {
  let shiftTimes = 0

  while (m !== n) {
    // right shift
    m >>=1
    n >>=1
    shiftTimes+=1
  }
  // left shift
  return ( m <<= shiftTimes)
};

```
