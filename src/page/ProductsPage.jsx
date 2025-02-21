import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BASE_URL = "https://ec-course-api.hexschool.io/v2";
const API_PATH ='taoaura2';



export default function ProductsPage(){

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true); // Show loader
      try {
        const res = await axios.get(`${BASE_URL}/api/${API_PATH}/products`);
        setProducts(res.data.products);
      } catch (error) {
        alert("取得產品失敗");
        console.log(error)
      }finally{
        setIsLoading(false); // Hide loader after data is loaded
      }
    };
    getProducts();

  }, []);

  const addProduct = async( product_id, qty)=>{
    try{
      const res = await axios.post(
        `${BASE_URL}/api/${API_PATH}/cart`, {
          data:{
            product_id,
            qty:Number(qty)
          }
        }
      )
      console.log('成功加入:', res.data)
    }catch(error){
      alert('加入購物車失敗');
      console.log(error);

    }
  }
    return (
       <>
        <div className="container">
        <table className="table align-middle">
            <thead>
                <tr>
                <th>圖片</th>
                <th>商品名稱</th>
                <th>價格</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                <tr key={product.id}>
                    <td style={{ width: "200px" }}>
                    <img
                        className="img-fluid"
                        src={product.imageUrl}
                        alt={product.title}
                    
                    />
                    </td>
                    <td>{product.title}</td>
                    <td>
                    <del className="h6">原價 {product.origin_price} 元</del>
                    <div className="h5">特價 {product.origin_price}元</div>
                    </td>
                    <td>
                    <div className="btn-group btn-group-sm">
                        <Link
                        to={`/products/${product.id}`}
                        type="button"
                        className="btn btn-outline-secondary"
                        >
                        查看更多
                        </Link>
                        <button type="button" className="btn btn-outline-danger" onClick={()=>addProduct(product.id, 1)}>
                        加到購物車
                        </button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {isLoading && (
            <div className="d-flex justify-content-center align-items-center"
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(255,255,255,0.3)",
                zIndex: 999,
            }}>
            <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            </div>
        )}
       </>
    )
}