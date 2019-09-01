module Types
  class MutationType < Types::BaseObject
    field :sign_in, mutation: Mutations::SignInMutation
    field :add_item_mutation, mutation: Mutations::AddItemMutation
    field :update_item, mutation: Mutations::UpdateItemMutation
  end
end
