
/**
 * Define an use case and its input/output model
 * input/output represent the boundaries betweem the application layer and
 * external layers
 */
export interface UseCase<TInput, TOutput>{
    run(input: TInput): Promise<TOutput>;
}