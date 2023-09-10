# 7. UnionCreted event with one fields - ID of union

Date: 2023-09-10

## Status

Accepted

## Context

We could embed into this event also intiail set of rules and members, but there will be than a duplication of logic since all the members can be added seprately and for the projection view it's should be not much difference if the members where added in initial set or after, and sicne tehre might be many places where we will need to work with these events, having adding rules and member logic in both event handlers is not optimal.

## Decision

The change that we're proposing or have agreed to implement.

## Consequences

What becomes easier or more difficult to do and any risks introduced by the change that will need to be mitigated.
