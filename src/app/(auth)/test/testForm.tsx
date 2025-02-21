// "use client"

// // import { z } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input" 
// import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema"
// import envConfig from "@/config"




// const TestForm = () => {
  
//   // 1. Define your form.
//   const form = useForm<LoginBodyType>({
//     resolver: zodResolver(LoginBody),
//     defaultValues: {
//       email: '',
    
//       password:'',
  
      
//     },
//   })
  
//   // 2. Define a submit handler.
//   async function onSubmit(values: LoginBodyType) {
//     try {
//       const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,{
//         method: 'POST',
//         body: JSON.stringify(values),
//         headers:{
//         'Content-Type': 'application/json'
//         }
        
//       }).then( async (res) => {
//         const payload = await res.json()
//         const data = {
//           data: res.status,
//           payload
//       }
//       if(!res.ok){
//         throw data
//       }
//       return data
      
//       })
//     } catch (error: any) {
//       const errors = error.payload.errors as {field: string, message: string}[]
//       const status = error.status as number
//       console.log(errors)
//       console.log(status)
//       if(status === 422){
//         errors.forEach((error) => {
//           form.setError(error.field as "email" | "password", {
//             type: "server",
//             message: error.message,
//           });
//         });
//       }else{
//         console.log(okokokok)
//       }
//     }
  
  
   
//   }

  
//   return (
// <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-[600px] w-full">
       
//          <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input placeholder="shadcn" {...field} />
//               </FormControl>
//               <FormDescription>
//                 This is your public display name.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//          <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <Input placeholder="shadcn" {...field} />
//               </FormControl>
          
//               <FormMessage />
//             </FormItem>
//           )}
//         />
       
//         <Button type="submit" className="!mt-8 w-full">nhập</Button>
//       </form>
//     </Form>


//   )
// }

// export default TestForm
