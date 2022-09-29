export interface SideBarSection {
  heading?: {
    icon: string,
    text: string,
  },
  buttons: SideBarButton[];
}

export interface SideBarButton {
  action: () => void;
  icon: string;
  disabled?: boolean;
  text: string;
}
