module Types
  class ItemType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :description, String, null: true
    field :image_url, String, null: true
    field :user, Types::UserType, null: false, resolve: -> (item, args, ctx) do
      BatchLoader::GraphQL.for(item.user_id).batch do |user_ids, loader|
        User.where(id: user_ids).each { |user| loader.call(user.id, user) }
      end
    end
  end
end
