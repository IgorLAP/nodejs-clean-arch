import { PrismaClient } from "@prisma/client";
import { Product } from "../../../domain/products/entity/product";
import { ProductGateway } from "../../../domain/products/gateway/product.gateway";

export class ProductRepositoryPrisma implements ProductGateway {

  private constructor(private readonly prismaClient: PrismaClient) { }

  public static create(prismaClient: PrismaClient) {
    return new ProductRepositoryPrisma(prismaClient);
  }

  // conversão de entidade para modelo prisma
  public async save(product: Product): Promise<void> {
    // não salvar de forma direta a entidade, 
    // transformar garante a inclusão apenas dos dados necessários
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };

    await this.prismaClient.product.create({
      data,
    });
  }

  // conversão de modelo prisma para um modelo de entidade
  public async list(): Promise<Product[]> {
    const products = await this.prismaClient.product.findMany();

    const productList = products.map((p) => {
      const product = Product.with({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
      });

      return product;
    });

    return productList;
  }
}