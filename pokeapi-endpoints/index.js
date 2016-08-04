'use strict'

module.exports = function (context, req) {
  const baseUrl = 'https://pokeapi.co/api/v2'
  const endpoints = [
    // Berries
    'berry',
    'berry-firmness',
    'berry-flavor',
    // Contests
    'contest-type',
    'contest-effect',
    'super-contest-type',
    // Encounters
    'encounter-method',
    'encounter-condition',
    'encounter-method-value',
    // Evolution
    'evolution-chain',
    'evolution-trigger',
    // Games
    'generation',
    'pokedex',
    'version',
    'version-group',
    // Items
    'item',
    'item-attribute',
    'item-category',
    'item-fling-effect',
    'item-pocket',
    // Machines
    'machine',
    // Moves
    'move',
    'move-ailment',
    'move-battle-style',
    'move-category',
    'move-damage-class',
    'move-learn-method',
    'move-target',
    // Locations
    'location',
    'location-area',
    'pal-park-area',
    'region',
    // Pokemon
    'ability',
    'characteristic',
    'egg-group',
    'gender',
    'growth-rate',
    'nature',
    'pokeathlon-stat',
    'pokemon',
    'pokemon-color',
    'pokemon-form',
    'pokemon-habitat',
    'pokemon-shape',
    'pokemon-species',
    'stat',
    'type',
    // Utility
    'language'
  ]

  context.res = {
    results: endpoints.map((e) => ({
      name: e,
      url: `${baseUrl}/${e}/`
    }))
  }

  context.done()
}
