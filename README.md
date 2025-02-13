# -Hexschool-2024-React-homework-w3

## 在登入頁面檢查是否登入

- 將後台產品頁面的驗證按鈕拔掉，改在登入頁面渲染時取出 token 並觸發驗證登入 API
- 若驗證成功則跳轉到後台產品頁面
  <br>
  從 cookie 取得 token 範例：

```jsx
const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
);
```

<br>
token 怎麼帶？

```jsx
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
```

<br>
<hr>
<br>

## 產品列表加入編輯、刪除按鈕

將原本的查看細節按鈕改成下面這段

```html
<div className="btn-group">
  <button type="button" className="btn btn-outline-primary btn-sm">編輯</button>
  <button type="button" className="btn btn-outline-danger btn-sm">刪除</button>
</div>
```

<br>

### 後台頁面加入新增產品按鈕

```html
<button type="button" className="btn btn-primary">建立新的產品</button>
```

<br>
<hr>
<br>

## 加入產品 Modal

1. 匯入 Modal

```jsx
import { Modal } from "bootstrap";
```

2. 透過 useRef 取得 DOM

3. 建立 Modal 實例
   可透過 `new Modal(ref)` 建立

4. 撰寫 Modal 開關方法
   可透過 `Modal.getInstance(ref)` 取得實例

<br>
<hr>
<br>

### 綁定產品 Modal 狀態

1. 在各個 input 上監聽事件
2. 撰寫 handleModalInputChange 函式
   Modal 狀態的預設值

```jsx
const defaultModalState = {
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: "",
  price: "",
  description: "",
  content: "",
  is_enabled: 0,
  imagesUrl: [""],
};
```

<aside>
💡

綁定 checkbox 的勾選狀態時，應透過 checked 屬性，而非 value

checked：綁定 input 是否勾選的狀態

value：綁定 input 的值

</aside>

綁成 value 會發生什麼事？

- 改變狀態時永遠都只會拿到 value 的值，而不是 checked 的 true 與 false

<br>
<hr>
<br>

### 判斷當前動作是新增產品還是編輯產品

1. 新增一個狀態來判斷
2. 在點擊新增或編輯產品按鈕時改變它的值
3. 調整產品 Modal 的標題、傳入的值

### 綁定產品 Modal 多圖 input 狀態

監聽 input 的 change 事件（只處理 input 變化）

### 撰寫產品 Modal 多圖按鈕顯示邏輯

模板

```jsx
<div className="btn-group w-100">
  <button className="btn btn-outline-primary btn-sm w-100">新增圖片</button>

  <button className="btn btn-outline-danger btn-sm w-100">取消圖片</button>
</div>
```

新增按鈕顯示條件：

- 最後一個欄位有值且未達上限時顯示

預設圖片上限為 5 張

點擊時對陣列新增一個空字串

<br>

取消按鈕顯示條件：

- 當多圖陣列有值且非唯一的欄位就顯示

點擊時預設移除陣列中最後一個欄位

至少有一個 input 欄位

<br>
<hr>
<br>

### 串接新增、編輯商品 API

Note：留意 API 要帶的資料、origin_price 和 price 要是 number（可透過 Number 轉型

```jsx
{
  data: {
    title: '',
    unit: '',
    ...
  }
}
```

Number 轉型

```jsx
Number(product.price);
```

is_enabled 要存成 0 和 1，0 代表未啟用，1 代表啟用

1. 將戳 API 的部分寫成函式
2. 撰寫 prouductModal 上確認按鈕的監聽函式
3. 透過 modalMode 判斷要呼叫哪個函式（可透過三元運算子）
4. 呼叫函式後重新取得產品，並將 Modal 關閉

<br>
<hr>
<br>

### 加入刪除產品 Modal

模板

```jsx
<div
  className="modal fade"
  id="delProductModal"
  tabIndex="-1"
  style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5">刪除產品</h1>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        你是否要刪除
        <span className="text-danger fw-bold">{tempProduct.title}</span>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary">
          取消
        </button>
        <button type="button" className="btn btn-danger">
          刪除
        </button>
      </div>
    </div>
  </div>
</div>
```

- 打開刪除產品 Modal 時將點選的產品設為 tempProduct
  ​

<br>
<hr>
<br>

### 串接刪除商品 API

1. 將戳 API 的部分寫成函式
2. 撰寫 delProuductModal 上刪除按鈕的監聽函式
3. 呼叫函式後重新取得產品，並將 Modal 關閉

<br>
<hr>
<br>

### 產品列表啟用顏色切換

透過三元運算子切換

```jsx
<span className="text-success">啟用</span>

<span>未啟用</span>
```
