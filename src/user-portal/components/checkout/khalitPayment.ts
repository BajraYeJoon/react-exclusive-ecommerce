export const submitKhaltiPayment = async (paymentData: any): Promise<void> => {

  

   const { signature, signed_field_names } = paymentData.paymentInitiate;
   const { transaction_uuid } = paymentData;
   const total_amount = paymentData.purchasedProduct.totalPrice;

   const form = document.createElement("form");
   form.method = "POST";
   form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
   form.style.display = "none";

   const fields = {
     amount: total_amount.toString(),
     tax_amount: "0",
     total_amount: total_amount.toString(),
     transaction_uuid,
     product_code: "EPAYTEST",
     product_service_charge: "0",
     product_delivery_charge: "0",
     success_url: "https://nest-ecommerce-1fqk.onrender.com/payment/verify",
     failure_url: "https://developer.esewa.com.np/failure",
     signed_field_names,
     signature,
   };

   Object.entries(fields).forEach(([key, value]) => {
     const input = document.createElement("input");
     input.type = "hidden";
     input.name = key;
     input.value = value;
     form.appendChild(input);
   });

   document.body.appendChild(form);
   form.submit();
   document.body.removeChild(form);
  
   
  };