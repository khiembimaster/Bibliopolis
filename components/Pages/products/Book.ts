import { Decimal } from "@prisma/client/runtime/library";

export interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    price: number | Decimal; // Sửa kiểu dữ liệu của price
    publication_year: Date;
    description: string;
    cover_image: string;
    publisher: string;
    stock_quantity: number;
    rating: number | Decimal; // Tương tự, nếu rating cũng có kiểu Decimal
}
