import axios from "axios";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const [tempProduct, setTempProduct] = useState({});
  const [productList, setProductList] = useState([]);

  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setAccount({
      ...account,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/admin/signin`, account)
      .then((res) => {
        const { token, expired } = res.data;

        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
        axios.defaults.headers.common["Authorization"] = token;

        axios
          .get(`${BASE_URL}/api/${API_PATH}/admin/products`)
          .then((res) => setProductList(res.data.products))
          .catch((error) => console.error(error));

        setIsLogin(true);
      })
      .catch((error) => alert("登入失敗"));
  };

  const checkIsLogin = () => {
    axios
      .post(`${BASE_URL}/api/user/check`)
      .then((res) => alert(`使用者已登入`))
      .catch((error) => console.error(error));
  };

  return (
    <>
      {isLogin ? (
        <div className="container mt-5">
          <button
            type="button"
            onClick={checkIsLogin}
            className="btn btn-success "
          >
            檢查是否登入
          </button>
          <hr />
          <div className="row row-cols-2">
            <div className="col">
              <h2 className="fw-bold">產品列表</h2>
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th scope="col">產品名稱</th>
                    <th scope="col">原價</th>
                    <th scope="col">售價</th>
                    <th scope="col">是否啟用</th>
                    <th scope="col">查看細節</th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map((product) => (
                    <tr key={product.id}>
                      <th scope="row">{product.title}</th>
                      <td>{product.origin_price}</td>
                      <td>{product.price}</td>
                      <td>{product.is_enabled ? "是" : "否"}</td>
                      <td>
                        <button
                          onClick={() => {
                            setTempProduct(product);
                          }}
                          type="button"
                          className="btn btn-primary"
                        >
                          查看細節
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col">
              <h2 className="fw-bold mb-3">單一產品細節</h2>

              {tempProduct.title ? (
                <div className="card">
                  <img
                    src={tempProduct.imageUrl}
                    className="card-img-top"
                    alt={tempProduct.title}
                  />
                  <div className="card-body">
                    <h4 className="card-title fw-bold">
                      {tempProduct.title}
                      <span className="badge text-bg-primary ms-2">
                        {tempProduct.category}
                      </span>
                    </h4>
                    <p className="card-text">
                      商品描述：{tempProduct.description}
                    </p>
                    <p className="card-text">商品內容：{tempProduct.content}</p>
                    <p className="card-text">
                      <del>{tempProduct.origin_price}</del> /{" "}
                      {tempProduct.price} 元
                    </p>
                    <h5 className="card-title mb-0">更多圖片：</h5>
                    <div className="row row-cols-2">
                      {tempProduct.imagesUrl?.map((image, index) => {
                        return (
                          <div className="col">
                            <img
                              className="img-fluid mt-3"
                              src={image}
                              key={index}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-secondary">請選擇一個商品查看</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <h1 className="mb-5">請先登入</h1>
          <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
            <div className="form-floating mb-3">
              <input
                name="username"
                value={account.username}
                onChange={handleInputChange}
                type="email"
                className="form-control"
                id="username"
                placeholder="name@example.com"
              />
              <label htmlFor="username">Email address</label>
            </div>
            <div className="form-floating">
              <input
                name="password"
                value={account.password}
                onChange={handleInputChange}
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
              />
              <label htmlFor="password">Password</label>
            </div>
            <button className="btn btn-primary">登入</button>
          </form>
          <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
        </div>
      )}
    </>
  );
}

export default App;
