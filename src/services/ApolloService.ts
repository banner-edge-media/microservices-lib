import { ApolloServer } from 'apollo-server';
import ErrorProvider from '../providers/ErrorProvider';
import { DocumentNode } from 'graphql';
import UserRead from '../objects/UserRead';
import Context from '../objects/Context';
const { buildFederatedSchema } = require('@apollo/federation');

export default class ApolloService {
    public static async federatedServer(typeDefs: DocumentNode[], resolvers: object, showPlayground: boolean, selfFunction: Function) {
        const server = new ApolloServer({
            schema: buildFederatedSchema({typeDefs, resolvers}),
            context: async ({ req }) => {
                let user: UserRead | undefined = undefined;
                if (req.headers.authorization) {
                    user = await selfFunction(req.headers.authorization);
                }

                return ({
                    token: req.headers.authorization,
                    userAgent: req.headers['user-agent'],
                    ip: req.headers.ip,
                    user
                } as Context);
            },
            plugins: [{
                requestDidStart() {
                    const startHrTime = process.hrtime();

                    return {
                        willSendResponse(requestContext) {
                            let graphqlQuery = requestContext.request.query || '';
                            graphqlQuery = graphqlQuery.replace(/\s{2,}/g, ' ');
                            graphqlQuery = graphqlQuery.replace(/\t/g, ' ');
                            graphqlQuery = graphqlQuery.toString().trim().replace(/(\r\n|\n|\r)/g, "");
                            const elapsedHrTime = process.hrtime(startHrTime);
                            const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
                            console.log(`{"graphQLQuery": "${graphqlQuery}", graphql_execution_time_ms: ${Math.round(elapsedTimeInMs)}}`);
                        }
                    };
                },
            }],
            introspection: true,
            playground: showPlayground,
            debug: true,
            formatError: (err) => {
                if (err && err.extensions && err.extensions.exception && (err.extensions.exception.isFriendly || err.extensions.exception.accessDenied)) {
                    return err;
                }

                ErrorProvider.sendError(err);

                return err;
            }
        });

        const {url} = await server.listen(process.env.PORT);
        console.log(`🚀 Server ready at ${url}`);
    }
}
