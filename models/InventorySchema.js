import { number, object, string } from "yup";

const InventorySchema = object().shape({
  name: string()
    .min(3, "Too Short!")
    .max(25, "Too Long!")
    .required("Name can't be empty"),
  quantity: number().required("Quantity can't be empty"),
});

export default InventorySchema;
