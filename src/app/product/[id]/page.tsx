import productApiRequest from "@/apiRequest/product";
import ProductAddForm from "../_components/product-add-form";

export default async function ProductEdit({
  params,
}: {
  params: { id: string };
}) {
  let product = null;
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
    <ProductAddForm/>
    </div>
  );
}
