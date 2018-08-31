import { readFileSync } from "fs"
import { makeExecutableSchema } from "graphql-tools"
import { IMocks } from "graphql-tools/dist/Interfaces"
import getNetworkLayer from "relay-mock-network-layer"
import { Network } from "relay-runtime"

let schema: any | undefined

export const createMockNetworkLayer = (mockResolvers: IMocks) => {
  if (!schema) {
    const metaphysicsSchema = readFileSync(
      "../data/metaphysics.graphql",
      "utf8"
    )
    schema = makeExecutableSchema({ typeDefs: metaphysicsSchema })
  }
  return Network.create(
    getNetworkLayer({
      schema,
      mocks: mockResolvers,
    })
  )
}
