import productApiRequest from "@/apiRequest/product";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import DeleteProduct from "./_components/delete-product";

export default async function ProductList() {
  const payload = await productApiRequest.getList();
  const productList = payload.payload.data;
  return (
    <div className="space-y-3">
      <Link href={"product/add"}>
        <Button variant={"secondary"}>Thêm sản phẩm</Button>
      </Link>
      <h1>Product List</h1>
      <div className="space-y-5">
        <ul>
          {productList.map((product) => (
            <li key={product.id} className="flex justify-center">
              <div>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                />
                <h3>{product.name}</h3>
                <div>{product.price}</div>
                <div className="flex space-x-2">
                  <Link href={`/product/${product.id}`}>
                    <Button variant={"outline"}>Edit</Button>
                  </Link>

              
               <DeleteProduct product = {product}/>
                  
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
