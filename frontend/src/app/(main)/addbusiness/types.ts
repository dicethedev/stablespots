import * as Yup from "yup";

// Validation schema
export const BusinessSchema = Yup.object().shape({
  name: Yup.string().required("Business name is required"),
  category: Yup.string().required("Category is required"),
  lat: Yup.number().required("Latitude is required"),
  lng: Yup.number().required("Longitude is required"),
  walletAddress: Yup.string()
    .required("Wallet address is required")
    .matches(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  description: Yup.string().required("Description is required"),
  contactEmail: Yup.string().email("Invalid email"),
  website: Yup.string().url("Invalid website URL"),
});
