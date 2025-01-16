export interface Data {
  id: number;
  name: number;
  description: string;
  brandName: number;
  totalSellPrice: number;
  categoryName: string;
  purchasePrice: number;
  quantityInStock: number;
  rating: number;
  sellPrice: number;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  width: number;
  sortable?: boolean;
}

export const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
    width: 150,
    sortable: true,
  },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
    width: 150,
    sortable: true,
  },
  {
    id: "totalSellPrice",
    numeric: true,
    disablePadding: false,
    label: "Total Sell Price",
    width: 150,
    sortable: true,
  },
  {
    id: "brandName",
    numeric: true,
    disablePadding: false,
    label: "Brand Name",
    width: 150,
  },
  {
    id: "categoryName",
    numeric: true,
    disablePadding: false,
    label: "Category Name",
    width: 150,
  },
  {
    id: "purchasePrice",
    numeric: true,
    disablePadding: false,
    label: "Purchase Price",
    width: 150,
  },
  {
    id: "quantityInStock",
    numeric: true,
    disablePadding: false,
    label: "Quantity In Stock",
    width: 150,
  },
  {
    id: "rating",
    numeric: true,
    disablePadding: false,
    label: "Rating",
    width: 150,
  },
  {
    id: "sellPrice",
    numeric: true,
    disablePadding: false,
    label: "Sell Price",
    width: 150,
  },
];
