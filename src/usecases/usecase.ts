// Command Pattern - porta de entrada que a camada de controllers usará para adentrar os usecases
export interface Usecase<InputDto, OutputDto> {
  execute(input: InputDto): Promise<OutputDto>;
}