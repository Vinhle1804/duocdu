import productApiRequest from "@/apiRequest/product";
import Image from "next/image";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from 'next'
import envConfig from "@/config";


 
type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { payload } = await productApiRequest.getDetail(Number(params))
  const product = payload.data
  const url = envConfig.NEXT_PUBLIC_URL+ '/products/'+product.id

 
 
  return {
    title: product.name,
    description: product.description,
  
      openGraph: {
        title: product.name,
        description: product.description,
        url,
        siteName: 'Productic Company hihi',
        images: [
          {
            url: product.image, // Must be an absolute URL
            width: 800,
            height: 600,
          }
        ],
        locale: 'en_US',
        type: 'website',
      },
      alternates:{
        canonical: url
      }
    
    
  }
}
 


export default async function ProductDetail({
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
    {product&& <div>
        <Link href={`/product/${product.id}`}>
                   <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                />
                </Link>
             
                <h3>{product.name}</h3>
                <div>{product.price}</div>
        </div>}
    </div>
  );
}
