class MartianLibrarySchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  # enable batch loading
  use BatchLoader::GraphQL
end
