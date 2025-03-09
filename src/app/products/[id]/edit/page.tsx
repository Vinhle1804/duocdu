import productApiRequest from "@/apiRequest/product";
import ProductAddForm from "../../_components/product-add-form";

import type { Metadata, ResolvingMetadata } from 'next'
// import { cache } from 'react'

// const cacheDetail = cache(productApiRequest.getDetail)
 
type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { payload } = await productApiRequest.getDetail(Number((await params).id))
  const product = payload.data
 
  // fetch data
 
  // optionally access and extend (rather than replace) parent metadata
 
  return {
    title: "edit sp "+product.name,
    description: product.description
  }
}

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
