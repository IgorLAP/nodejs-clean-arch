import { Request, Response } from "express";
import { CreateProductInputDto, CreateProductOutputDto, CreateProductUsecase } from "../../../../../usecases/create-product/create-product.usecase";
import { HttpMethod, Route } from "../route";

export type CreateProductResponseDto = {
  id: string;
}

export class CreateProductRoute implements Route {

  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createProductService: CreateProductUsecase
  ) { }

  public static create(createProductService: CreateProductUsecase) {
    return new CreateProductRoute(
      '/products',
      HttpMethod.POST,
      createProductService,
    );
  };

  public getHandler() {
    return async (request: Request, response: Response) => {
      const { name, price } = request.body;

      const input: CreateProductInputDto = {
        name,
        price,
      };

      const output: CreateProductOutputDto = await this.createProductService.execute(input);

      const responseBody = this.present(output);

      response.status(201).json(responseBody).send();
    }
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  public getPath(): string {
    return this.path;
  }

  private present(input: CreateProductOutputDto): CreateProductResponseDto {
    const response = { id: input.id };

    return response;
  }
}