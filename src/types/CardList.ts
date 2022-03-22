export interface CardList {
  title?: string;
  options: {
    icon_l: string;
    icon_r: string;
    text: string;
    goto?:string
  }[];
}
