export interface ProgressValueProps {
  color?: string;
  highlight?: boolean;
  label?: string;
  onClick?: () => void;
  onHover?: (isHover: boolean) => void;
  value?: number;
}
export interface ProgressProps {
  type: "bar" | "circle";
  background?: string;
  max?: number;
  indeterminate?: boolean;
  round?: boolean;
  size?: number;
  thickness?: number;
  values?: ProgressValueProps[];
}
