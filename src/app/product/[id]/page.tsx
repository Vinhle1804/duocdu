import productApiRequest from "@/apiRequest/product";
import ProductAddForm from "../_components/product-add-form";

export default async function ProductEdit({
  params,
}: {
  params: { id: string };
}) {
  let product = undefined
  try {
    const { payload } = await productApiRequest.getDetail(Number(params.id));
    product = payload.data;
    console.log(product);
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      {!product && <div>kh tìm thấy sp</div>}
    {product&& <ProductAddForm product={product}/>}
    </div>
  );
}
