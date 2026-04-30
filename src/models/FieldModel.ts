import { IPersonaProps } from 'office-ui-fabric-react';
import { IUserPicker } from './UserPicker';
import { IDropDownData } from './ConstsModel';

export interface IInputFieldProps {
  name: string;
  className?: string;
  value: string;
  onChange: (name: string, value: string) => void;
}

export interface IRadioGroupFieldProps {
  name: string;
  label: string;
  value: boolean;
  required?: boolean;
  underLabel?: string;
  onChange: (name: string, value: boolean) => void;
}

export interface ICancelButtonProps {
  onClick: () => void;
}

export interface IRadioGroupFieldProps {
  name: string;
  label: string;
  value: boolean;
  required?: boolean;
  underLabel?: string;
  onChange: (name: string, value: boolean) => void;
}

export interface IRadioButtonProps {
  name: string;
  label: string;
  value: boolean;
  checkedValue: boolean;
  onChange: (name: string, value: boolean) => void;
}

export interface IDropDownFieldProps {
  name: string;
  value: number | string;
  options: { value: number | string; label: string | number }[];
  className?: string;
  disabled?: boolean;
  onChange: (name: string, value: string) => void;
}

export interface IDateFieldProps {
  name: string;
  className?: string;
  disabled?: boolean;
  value: string;
  onChange: (name: string, value: string) => void;
}

export interface ICheckboxProps {
  name: string;
  className?: string;
  value: boolean;
  onChange: (name: string, value: boolean) => void;
}

export interface IPopUpWindow {
  onClose: () => void;
  success: boolean;
  message: string;
  closeButton: boolean;
}

export interface IUserPickerProps {
  onResolveSuggestions: (filterText: string) => Promise<IPersonaProps[]>;
  value: string;
  keyValue: number;
  onUserSelected?: (user: IUserPicker) => void;
  itemLimit: number;
  className?: string;
  clearSelection: boolean;
}

export interface IUserPickerState {
  selectedItems: IPersonaProps[];
}

export interface IUserHoverCardProps {
  item: IPersonaProps;
  children?: React.ReactNode;
}

export interface INumberInputFieldProps {
  name: string;
  value: number;
  onChange: (name: string, value: number) => void;
  min?: number;
}

export interface IMultiSelectDropDownState {
  selectedItems: string[];
  selectedItem?: { key: string | number | undefined };
}

export interface IMultiSelectDropdownProps {
  options: { value: number | string; label: string | number }[];
  name: string;
  placeholder: string;
  onChange: (name: string, values: string[]) => void;
  values: string[];
}

export interface MultipleFieldRowProps {
  label: string;
  required?: boolean;
  firstElement: React.ReactNode;
  secondElement: React.ReactNode;
  secondLabel: string;
  error?: string;
}

export interface RowProps {
  label: string;
  required?: boolean;
  element: React.ReactNode;
  error?: string;
  underLabel?: string;
}

export interface ITextAreaFieldProps {
  name: string;
  className?: string;
  value: string;
  onChange: (name: string, value: string) => void;
}