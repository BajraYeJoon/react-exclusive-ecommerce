// import React, { useState, useEffect } from "react";
// import { fetchAllProducts } from "../../../common/api/productApi";
// import { useQuery } from "@tanstack/react-query";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../../../common/ui/card";

// const RecommendedProducts = ({ currentProductId }) => {
//   const [recommendations, setRecommendations] = useState([]);

//   // Fetch all products
//   const {
//     data: allProducts,
//     isLoading,
//     error,
//   } = useQuery({ queryKey: ["products"], queryFn: fetchAllProducts });

//   useEffect(() => {
//     const getRecommendations = () => {
//       if (!allProducts) return;

//      
//      

//       const currentProduct = allProducts.find((p) => p.id === currentProductId);
//       if (!currentProduct) {
//        
//         return;
//       }

//      

//       // Get products in the same categories
//       const sameCategories = allProducts.filter(
//         (product) =>
//           product.id !== currentProductId &&
//           product.categories &&
//           currentProduct.categories &&
//           product.categories.some((cat) =>
//             currentProduct.categories.some(
//               (currentCat) => currentCat.id === cat.id,
//             ),
//           ),
//       );

//      

//       // Sort by number of matching categories and take top 3
//       const topRecommendations = sameCategories
//         .map((product) => ({
//           ...product,
//           matchingCategories: product.categories.filter((cat) =>
//             currentProduct.categories.some(
//               (currentCat) => currentCat.id === cat.id,
//             ),
//           ).length,
//         }))
//         .sort((a, b) => b.matchingCategories - a.matchingCategories)
//         .slice(0, 3);

//      

//       setRecommendations(topRecommendations);
//     };

//     getRecommendations();
//   }, [allProducts, currentProductId]);

//   if (isLoading) return <div>Loading recommendations...</div>;
//   if (error) return <div>Error loading recommendations: {error.message}</div>;

//   return (
//     <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//       {recommendations.length > 0 ? (
//         recommendations.map((product) => (
//           <Card key={product.id}>
//             <CardHeader>
//               <CardTitle>{product.title}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {product.image && product.image[0] && (
//                 <img
//                   src={product.image[0]}
//                   alt={product.title}
//                   className="mb-2 h-48 w-full object-cover"
//                 />
//               )}
//               <p className="text-sm">
//                 {product.description && typeof product.description === "string"
//                   ? product.description
//                       .replace(/<[^>]*>?/gm, "")
//                       .slice(0, 100) + "..."
//                   : "No description available"}
//               </p>
//             </CardContent>
//             <CardFooter>
//               <p className="text-lg font-bold">${product.price}</p>
//             </CardFooter>
//           </Card>
//         ))
//       ) : (
//         <div>No recommendations available</div>
//       )}
//     </div>
//   );
// };

// export default RecommendedProducts;
