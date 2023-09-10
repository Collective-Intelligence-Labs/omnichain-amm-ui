workspace {

  model {
    User = person "User" "A user who can initiate commands and listen to events."

    UnionAggregate = softwareSystem "Union Aggregate" "Handles the Union's state and logic" {
      
      CommandService = container "Command Service" "Handles incoming commands to mutate the Union's state" {
        technology "GRPC/Protobuf"
      }

      EventService = container "Event Service" "Emits events based on state changes in the Union" {
        technology "GRPC/Protobuf"
      }

      StateService = container "State Service" "Maintains the Union's state, Members, and Rules" {
        technology "In-Memory/Database"
      }
    }

    User -> CommandService "Sends commands [StartUnion, AddMember, RemoveMember, SetRule]"
    EventService -> User "Emits events [UnionCreated, MemberAdded, MemberRemoved, RuleSet]"
    CommandService -> StateService "Mutates state"
    StateService -> EventService "Triggers events"
  }

  views {
    systemContext UnionAggregate {
      include *
      autolayout lr
    }

    container UnionAggregate {
      include *
      autolayout lr
    }

    theme default
  }

}
