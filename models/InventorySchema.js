import { number, object, string } from "yup";

const InventorySchema = object().shape({
  name: string()
    .min(3, "Too Short!")
    .max(25, "Too Long!")
    .required("Name can't be empty"),
  quantity: number().required("Quantity can't be empty"),
});

export default InventorySchema;

/*
// Inventory model in api
  {
    added: { type: Date, default: Date.now },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    user: { type: String, required: true },
    photo: { type: String, required: false },
    updated: { type: Date, default: Date.now },
  }
*/
