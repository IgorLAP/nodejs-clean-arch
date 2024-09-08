import { Product } from "../../domain/products/entity/product";
import { ProductGateway } from "../../domain/products/gateway/product.gateway";
import { Usecase } from "../usecase";

export type ListProductInputDto = void;

export type ListProductOutputDto = {
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};

export class ListProductUsecase implements Usecase<ListProductInputDto, ListProductOutputDto> {
  private constructor(private readonly productGateway: ProductGateway) { }

  public static create(productGateway: ProductGateway) {
    return new ListProductUsecase(productGateway);
  }

  public async execute(): Promise<ListProductOutputDto> {
    const aProducts = await this.productGateway.list();

    const output = this.presentOutput(aProducts);

    return output;
  }

  private presentOutput(products: Product[]): ListProductOutputDto {
    // não retornamos diretamente a entity 
    return {
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
      })),
    };
  }
}