"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const ErrorProvider_1 = require("../providers/ErrorProvider");
const { buildFederatedSchema } = require('@apollo/federation');
class ApolloService {
    static federatedServer(typeDefs, resolvers, showPlayground, selfFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            const server = new apollo_server_1.ApolloServer({
                schema: buildFederatedSchema({ typeDefs, resolvers }),
                context: ({ req }) => __awaiter(this, void 0, void 0, function* () {
                    let user = undefined;
                    if (req.headers.authorization) {
                        user = yield selfFunction(req.headers.authorization);
                    }
                    return {
                        token: req.headers.authorization,
                        userAgent: req.headers['user-agent'],
                        ip: req.headers.ip,
                        user
                    };
                }),
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
                    ErrorProvider_1.default.sendError(err);
                    return err;
                }
            });
            const { url } = yield server.listen(process.env.PORT);
            console.log(`🚀 Server ready at ${url}`);
        });
    }
}
exports.default = ApolloService;
//# sourceMappingURL=ApolloService.js.map