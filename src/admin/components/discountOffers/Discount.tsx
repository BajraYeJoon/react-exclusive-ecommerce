// import { useState } from "react";
// import { useForm, FormProvider } from "react-hook-form";
// import { Button } from "../../../common/ui/button";
// import DiscountForm from "./DiscountForm";
// import DesignSelector from "./DesignSelector";
// import Summary from "./Summary";
// import {
//   Dialog,
//   DialogContent,
//   DialogTrigger,
// } from "../../../common/ui/dialog";

// type DiscountData = {
//   name: string;
//   type: "Percentage" | "Fixed Amount";
//   value: number;
//   code: string;
//   status: "Active" | "Inactive";
//   startDate: string;
//   endDate: string;
//   minimumPurchase: number;
//   usageLimit: number;
//   // design: string;
// };

// export default function DiscountCreator() {
//   const [step, setStep] = useState(1);
//   const methods = useForm<DiscountData>();
//   const { handleSubmit } = methods;

//   const onSubmit = (data: DiscountData) => {
//
//   };

//   const nextStep = () => setStep(step + 1);
//   const prevStep = () => setStep(step - 1);

//   return (
//     <div>
//       <h1>Add Discount</h1>
//       <Dialog>
//         <DialogTrigger>
//           <Button>Add Discount</Button>
//         </DialogTrigger>
//         <DialogContent>
//           <FormProvider {...methods}>
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               className="w-full max-w-4xl"
//             >
//               <h1 className="mb-6 text-3xl font-bold">Create Discount Offer</h1>

//               {step === 1 && <DiscountForm />}
//               {step === 2 && <DesignSelector />}
//               {step === 3 && <Summary />}

//               <div className="mt-8 flex justify-between">
//                 {step > 1 && (
//                   <Button type="button" onClick={prevStep} variant="outline">
//                     Previous
//                   </Button>
//                 )}
//                 {step < 3 ? (
//                   <Button type="button" onClick={nextStep}>
//                     Next
//                   </Button>
//                 ) : (
//                   <Button type="submit">Create Discount</Button>
//                 )}
//               </div>
//             </form>
//           </FormProvider>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
