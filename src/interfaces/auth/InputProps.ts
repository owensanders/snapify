import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string; // The label prop must be a string
  id: string; // The id prop must be a string
}
