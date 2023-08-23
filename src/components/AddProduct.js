import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

export const AddProduct = ({ width, register }) => {
  const { control } = useForm();
  const { fields, remove, append } = useFieldArray({
    control,
    name: "products",
  });

  return (
    <div className="">
      <form>
        <div className="dynamic-fields-container">
          {fields.map(({ id, name, description, price }, index) => (
            <div key={id} className="d-flex">
              <div className="w-100 add-product-card card">
                <label>Product Name</label>
                <input
                 
                  {...register(`products[${index}].name`)}
                  placeholder="Product Name"
                  defaultValue={name}
                  type="text"
                  className="form-control"
                />
                <label>Product Price</label>
                <input
                  {...register(`products[${index}].price`)}
                  placeholder="Product Price"
                  defaultValue={price}
                  type="number"
                  className="form-control"
                />
                <label>Product Description (100 words)</label>
                <textarea
                  {...register(`products[${index}].description`)}
                  placeholder="Product Description"
                  defaultValue={description}
                  type="textarea"
                  className="form-control"
                  style={{ height: "100px" }}
                  maxLength="100"
                />
              </div>
              <div className="remove-button-container">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="global-button cancel-item-button"
                  title="Remove Product"
                >
                {/* <button
                  onClick={() => {
                    console.log(index, "index");
                    remove(index);
                  }}
                >
                  Remove field
                </button> */}

                <i className="fa fa-times"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex">
          <div>
            <button
              type="button"
              onClick={() => append({})}
              className="global-bordered-button mt-2"
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};



// export const AddProduct = () => {
//   const { register, control } = useForm();
//   const { fields, remove, append } = useFieldArray({
//     control,
//     name: "products",
//   });

// import React, {useMemo, useEffect} from "react";
// import { useForm, useFieldArray } from "react-hook-form";


// export const AddProduct = ({ width, register,products }) => {
//   console.log(products)

//   const { control, reset } = useForm({
//     defaultValues: { products: [] },
//     mode: "onChange"
//   });

//   useEffect(() => {
//         reset({ products: products });
//   }, [products]);


//   const { fields, remove, append } = useFieldArray({
//     control,
//     name: "products",
//   });

//   return (
//     <div className="App">
//       <form>
//         <div className="dynamic-fields-container">
//           {fields.map(({ id, name, description, price }, index) => (
//             <div key={index} className="d-flex">
//               <div className="w-100 add-product-card card">
//                 <label>Product Name</label>
//                 <input
//                   {...register(`products[${index}].name`)}
//                   placeholder="Product Name"
//                   defaultValue={name}
//                   type="text"
//                   className="form-control"
//                 />
//                 <label>Product Price</label>
//                 <input
//                   {...register(`products[${index}].price`)}
//                   placeholder="Product Price"
//                   defaultValue={price}
//                   type="number"
//                   className="form-control"
//                 />
//                 <label>Product Description</label>
//                 <textarea
//                    {...register(`products[${index}].description`)}
//                                      placeholder="Product Description"
//                                      defaultValue={description}
//                                      type="textarea"
//                                      className="form-control"
//                                      style={{ height: "100px" }}
//                                      maxLength="100"
//                 />
//               </div>
//               <div className="remove-button-container">
//                 <button
//                   type="button"
//                   onClick={() => remove(index)}
//                   className="global-button cancel-item-button"
//                 >
//                   <i className="fa fa-times"></i>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//         <button
//           type="button"
//           onClick={() => append({})}
//           className="global-bordered-button mt-2"
//         >
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// };
