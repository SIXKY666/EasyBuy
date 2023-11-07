import { useEffect,useState } from "react";
import { Card, CardBody ,Text} from "@chakra-ui/react";
import { product_get } from "../../service/product.js";
import "./index.css"
import { useRecoilValue } from "recoil";
import { roomState } from "../../config/atom/roomAtom.js";
import {io} from "socket.io-client";
const socket = io("http://localhost:3000");

export function Product() {
  const room = useRecoilValue(roomState);
  const [product, setProduct] = useState([]); 

  useEffect(() => {
    getAllProduct();
  }, [])

  useEffect(() => {
    socket.emit("join_room", room);
    console.log("join room", room);
    

    socket.on("product-list", updatedProducts => {
      if (updatedProducts.status === true) {
        getAllProduct();
      }
    });

    return () => {
      socket.off("product-list");
    };
  }, [room]);

  const getAllProduct = async () => {
    const res = await product_get();
    if(res.status === 200){
      console.log(res.data);
      setProduct(res.data);
    }else{
      console.log("error");
    }
  }

   return (
     <>
       <div className="product-grid">
         {product?.map(item => (
           <Card key={item.id}>
             <CardBody>
               <Text>{item.name}</Text>
               <Text>{item.price}</Text>
             </CardBody>
           </Card>
         ))}
       </div>
     </>
   );

}
