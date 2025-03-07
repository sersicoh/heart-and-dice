export interface IDrawerItems {
  isOpen: boolean;
  onClose: () => void;
  items: { label: string; onClick: () => void }[];
}
