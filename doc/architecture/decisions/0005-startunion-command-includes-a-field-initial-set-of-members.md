# 5. StartUnion command includes a field - initial set of members

Date: 2023-09-09

## Status

Accepted

## Context

We might have differennt ways to implement adding initial members - but since we need a way to create a Union only if all the members accept it, and do not create otherwise we need to have this option in the start Union command. We can only rely on the Commands and Events infrastructure when designin domain, therefore we have to have it here, and can not rely on bundling commands on infrastructure level.

## Decision

The change that we're proposing or have agreed to implement.

## Consequences

What becomes easier or more difficult to do and any risks introduced by the change that will need to be mitigated.
