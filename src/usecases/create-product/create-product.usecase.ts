import { Product } from "../../domain/products/entity/product";
import { ProductGateway } from "../../domain/products/gateway/product.gateway";
import { Usecase } from "../usecase";

export type CreateProductInputDto = {
  name: string;
  price: number;
}

export type CreateProductOutputDto = {
  id: string;
}

export class CreateProductUsecase implements Usecase<CreateProductInputDto, CreateProductOutputDto> {

  private constructor(private readonly productGateway: ProductGateway) { }

  public static create(productGateway: ProductGateway) {
    return new CreateProductUsecase(productGateway);
  }

  // gerencia o fluxo
  public async execute({
    name,
    price,
  }: CreateProductInputDto): Promise<CreateProductOutputDto> {
    //manda o produto ser criado
    const aProduct = Product.create(name, price);

    //manda ser persistido no banco de dados
    await this.productGateway.save(aProduct);

    // manda apresentar o retorno
    const output = this.presentOutput(aProduct);

    return output;
  }

  private presentOutput(product: Product): CreateProductOutputDto {
    const output: CreateProductOutputDto = {
      id: product.id,
    };

    return output;
  }
}