import { DeviceVariants, IphoneModelVariants, ProductCollection, ProductStatus, ProductStorage } from "../enums/product.enums";

export interface Product{
    _id: string;
     productStatus: ProductStatus;
     productCollection: ProductCollection;
        productName: string;
        productPrice: number;
        productLeftCount: number;
        iphoneModelVariants: IphoneModelVariants;
        productStorage: ProductStorage
        productImages: string[];
        productDesc?: string;
        deviceVariants: DeviceVariants;
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