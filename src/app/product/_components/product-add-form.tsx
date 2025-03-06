"use client";
// import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// import envConfig from "@/config";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import { useRef, useState } from "react";
import {
  CreateProductBody,
  CreateProductBodyType,
  ProductResType,
  UpdateProductBodyType,
} from "@/schemaValidations/product.schema";
import productApiRequest from "@/apiRequest/product";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
type Product = ProductResType['data']

// import { clientSessionToken} from "@/lib/http";

const ProductAddForm = ({product}:{product: Product}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: product?.name ?? '',
      price: product?.price ?? 0,
      description: product?.description ?? "",
      image: product?.image ?? "",
    },
  });
const image = form.watch('image')
const createProduct = async (values: CreateProductBodyType) => {
  setLoading(true);
  try {
    const formData = new FormData();
    formData.append("file", file as Blob);
    const uploadImageResult = await productApiRequest.uploadImage(formData);
    const imageUrl = uploadImageResult.payload.data;
    const result = await productApiRequest.create({
      ...values,
      image: imageUrl,
    });

    toast({
      description: result.payload.message,
    });

    router.push("/product");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    handleErrorApi({
      error,
      setError: form.setError,
    });
  } finally {
    setLoading(false);
  }
}
const updateProduct = async (_values: UpdateProductBodyType) => {
  if(!product) return
  setLoading(true);
  let values = _values
  try {
    if(file){
      const formData = new FormData();
      formData.append("file", file as Blob);
      const uploadImageResult = await productApiRequest.uploadImage(formData);
      const imageUrl = uploadImageResult.payload.data
      values = {
        ...values,
        image: imageUrl
      }
    }
  
    const result = await productApiRequest.update(product.id,values);

    toast({
      description: result.payload.message,
    });

 

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    handleErrorApi({
      error,
      setError: form.setError,
    });
  } finally {
    setLoading(false);
  }
}
  // 2. Define a submit handler.
  async function onSubmit(values: CreateProductBodyType) {
    if (loading) return
      setLoading(true);
    if(product){
      await updateProduct(values)
    }else{
      await createProduct(values)
    }
   
  }
 
  
  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (error) => {
          console.log(error);
        })}
        className="space-y-2 max-w-[600px] w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input placeholder="Tên" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gias car</FormLabel>
              <FormControl>
                <Input placeholder="Tên" type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea placeholder="Mô tả" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hình ảnh</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFile(file);
                      field.onChange("http://localhost:3000/" + file.name);
                    }
                    console.log(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {(file || image) && (
          <div>
            <Image
              src={file ? URL.createObjectURL(file): image}
              width={128}
              height={128}
              alt="preview"
              className="w-32 h-32 object-cover"
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setFile(null);
                form.setValue("image", "");
                if (inputRef.current) {
                  inputRef.current.value = "";
                }
              }}
            >
              Xóa hình ảnh
            </Button>
          </div>
        )}

        <Button type="submit" className="!mt-8 w-full">
          {product ? 'cập nhật sp': 'thêm sp'}
    
        </Button>
      </form>
    </Form>
  );
};

export default ProductAddForm;
