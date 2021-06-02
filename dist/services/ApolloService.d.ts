import { DocumentNode } from 'graphql';
export default class ApolloService {
    static federatedServer(typeDefs: DocumentNode[], resolvers: object, showPlayground: boolean, selfFunction: Function): Promise<void>;
}
