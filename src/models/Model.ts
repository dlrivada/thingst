import Error from '@controllers/Error.controller'

export default class Model<TModel, TQuery, TPayload, TFilter> {
    findUnique(query: TQuery): Promise<TModel> {
        throw new Error('Method not implemented.')
    }
    findMany(filter: TFilter): Promise<TModel[]> {
        throw new Error('Method not implemented.')
    }
    create(payload: TPayload): Promise<TModel> {
        throw new Error('Method not implemented.')
    }
}
