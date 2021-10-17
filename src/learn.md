1. `keyof T` 产生的类型是 T 的属性名称字符串字面量类型构成的联合类型
2. `[]` 获取某个索引的类型，支持传入联合类型
3. `in` 遍历索引
4. `inter` 和 extends 搭配使用，用来做类型推断并赋值，后面通常跟一个泛型变量，推断后的返回类型交给跟着的泛型变量

## 高级类型

1. Partial<T> 让 T 类型的所有属性变得可选

```ts
// 具体实现
type Partial<T> = {
  [P in keyof T]?: T[P]
}
```

2. Required<T> 让 T 类型的属性全部必填

```ts
type Required<T> = {
  [P in keyof T]-?: T[P]
}
```

3. Readonly<T> 让 T 类型所有属性都只读

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

4. Pick<T, K extends keyof T> 从 T 中提取 K 集合中的属性

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

5. Omit<T, K extends keyof any> 从 T 中提取不是 K 集合中的属性

```ts
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
```

6. Record<K extends keyof any, T> 构造一个有以 K 中的集合元素作为属性，T 作为值的类型

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T
}
```

7. 针对联合类型

```ts
// 去除T类型中的U类型
type Exclude<T, U> = T extends U ? never : T

// 提取T类型中的U类型
type Extract<T, U> = T extends U ? T : never

// 去除T类型中的null和undefined类型
type NonNullable<T> = T extends null || undefined ? never : T
```

## 类型保护

1. typeof 这个类型保护只能是 number、string、boolean、symbol
2. instanceof
3. is

##
