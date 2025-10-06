import { ProductCollection, ProductSize, ProductStatus } from "../enums/product.enums";

export interface Product{
    _id: string;
     productStatus: ProductStatus;
     productCollection: ProductCollection;
        productName: string;
        productPrice: number;
        productLeftCount: number;
        productSize: ProductSize;
        productImages: string[];
        productDesc?: string;
        productVolume: number;
        productViews: number;
        createdAt: Date;
        updatedAt: Date;
}

export interface ProductInquiry{
        order: string;
        page: number;
        limit: number;
        productCollection?: ProductCollection;
        search?: string;
}