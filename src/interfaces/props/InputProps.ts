import { ChangeEventHandler, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  classes?: string;
  showRequired?: boolean;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
