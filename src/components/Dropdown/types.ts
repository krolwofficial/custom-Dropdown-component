import { customSuccessFunctionT } from "../../types";

export type OptionT = {
  id: string;
  label: string;
};

export type DropdownPropsT = {
  options: OptionT[];
  placeholder: string;
  onOptionSelect: customSuccessFunctionT;
};
