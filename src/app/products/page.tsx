import productApiRequest from "@/apiRequest/product";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import DeleteProduct from "./_components/delete-product";
import { cookies } from "next/headers";

export default async function ProductListPage() {
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("sessionToken");
  const isAuthenticated = Boolean(sessionToken);
  const payload = await productApiRequest.getList();
  const productList = payload.payload.data;
  return (
    <div className="space-y-3">
      <h1>Product List</h1>
      {isAuthenticated && (
        <Link href={"products/add"}>
          <Button variant={"secondary"}>Thêm sản phẩm</Button>
        </Link>
      )}
      <div className="space-y-5">
        <ul>
          {productList.map((product) => (
            <li key={product.id} className="flex justify-center">
              <div>
                <Link href={`/products/${product.id}`}>
                   <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                />
                </Link>
             
                <h3>{product.name}</h3>
                <div>{product.price}</div>
                {isAuthenticated && (
                  <div className="flex space-x-2">
                    <Link href={`/products/${product.id}/edit`}>
                      <Button variant={"outline"}>Edit</Button>
                    </Link>

                    <DeleteProduct product={product} />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
