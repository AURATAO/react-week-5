import { useState, useEffect } from "react"
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactLoading from 'react-loading';

const BASE_URL = "https://ec-course-api.hexschool.io/v2";
const API_PATH ='taoaura2';


export default function ProductIdPage(){

    const [product, setProduct] = useState({});
    const [qtySelect, setQtySelect] = useState(1);
    const{id: product_id} = useParams();
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const getProduct = async () => {
        //   setIsLoading(true); // Show loader
          try {
            const res = await axios.get(`${BASE_URL}/api/${API_PATH}/product/${product_id}`);
            setProduct(res.data.product);
          } catch (error) {
            alert("取得產品失敗");
            console.log(error)
          }finally{
            // setIsLoading(false); // Hide loader after data is loaded
          }
        };
        getProduct();
    
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


    return(
         <div className="container mt-5">
            <div className="row">
                <div className="col-6">
                <img className="img-fluid" src={product.imageUrl} alt={product.title} />
                </div>
                <div className="col-6">
                <div className="d-flex align-items-center gap-2">
                    <h2>{product.title}</h2>
                    <span className="badge text-bg-success">{product.category}</span>
                </div>
                <p className="mb-3">{product.description}</p>
                {/* <p className="mb-3">{product.content}</p> */}
                <h5 className="mb-3">NT$ {product.price}</h5>
                <div className="input-group align-items-center w-75">
                    <select
                    value={qtySelect}
                    onChange={(e) => setQtySelect(e.target.value)}
                    id="qtySelect"
                    className="form-select"
                    >
                    {Array.from({ length: 10 }).map((_, index) => (
                        <option key={index} value={index + 1}>
                        {index + 1}
                        </option>
                    ))}
                    </select>
                    <button onClick={()=>addProduct(product_id, qtySelect)} type="button" className="btn btn-primary" disabled={isLoading}>
                    加入購物車
                    {isLoading && (<ReactLoading type={'spin'} color={'#000'} height={'1.5rem'} width={'1.5rem'}/>)}
                    </button>
                </div>
                </div>
            </div>
        </div>

    )
}