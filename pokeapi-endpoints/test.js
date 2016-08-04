import test from 'ava'
import sinon from 'sinon'
import pokeapiEndpoints from './'

test('pokeapi-endpoints', (t) => {
  const results = [{
    'name': 'berry',
    'url': 'https://pokeapi.co/api/v2/berry/'
  }, {
    'name': 'berry-firmness',
    'url': 'https://pokeapi.co/api/v2/berry-firmness/'
  }, {
    'name': 'berry-flavor',
    'url': 'https://pokeapi.co/api/v2/berry-flavor/'
  }, {
    'name': 'contest-type',
    'url': 'https://pokeapi.co/api/v2/contest-type/'
  }, {
    'name': 'contest-effect',
    'url': 'https://pokeapi.co/api/v2/contest-effect/'
  }, {
    'name': 'super-contest-type',
    'url': 'https://pokeapi.co/api/v2/super-contest-type/'
  }, {
    'name': 'encounter-method',
    'url': 'https://pokeapi.co/api/v2/encounter-method/'
  }, {
    'name': 'encounter-condition',
    'url': 'https://pokeapi.co/api/v2/encounter-condition/'
  }, {
    'name': 'encounter-method-value',
    'url': 'https://pokeapi.co/api/v2/encounter-method-value/'
  }, {
    'name': 'evolution-chain',
    'url': 'https://pokeapi.co/api/v2/evolution-chain/'
  }, {
    'name': 'evolution-trigger',
    'url': 'https://pokeapi.co/api/v2/evolution-trigger/'
  }, {
    'name': 'generation',
    'url': 'https://pokeapi.co/api/v2/generation/'
  }, {
    'name': 'pokedex',
    'url': 'https://pokeapi.co/api/v2/pokedex/'
  }, {
    'name': 'version',
    'url': 'https://pokeapi.co/api/v2/version/'
  }, {
    'name': 'version-group',
    'url': 'https://pokeapi.co/api/v2/version-group/'
  }, {
    'name': 'item',
    'url': 'https://pokeapi.co/api/v2/item/'
  }, {
    'name': 'item-attribute',
    'url': 'https://pokeapi.co/api/v2/item-attribute/'
  }, {
    'name': 'item-category',
    'url': 'https://pokeapi.co/api/v2/item-category/'
  }, {
    'name': 'item-fling-effect',
    'url': 'https://pokeapi.co/api/v2/item-fling-effect/'
  }, {
    'name': 'item-pocket',
    'url': 'https://pokeapi.co/api/v2/item-pocket/'
  }, {
    'name': 'machine',
    'url': 'https://pokeapi.co/api/v2/machine/'
  }, {
    'name': 'move',
    'url': 'https://pokeapi.co/api/v2/move/'
  }, {
    'name': 'move-ailment',
    'url': 'https://pokeapi.co/api/v2/move-ailment/'
  }, {
    'name': 'move-battle-style',
    'url': 'https://pokeapi.co/api/v2/move-battle-style/'
  }, {
    'name': 'move-category',
    'url': 'https://pokeapi.co/api/v2/move-category/'
  }, {
    'name': 'move-damage-class',
    'url': 'https://pokeapi.co/api/v2/move-damage-class/'
  }, {
    'name': 'move-learn-method',
    'url': 'https://pokeapi.co/api/v2/move-learn-method/'
  }, {
    'name': 'move-target',
    'url': 'https://pokeapi.co/api/v2/move-target/'
  }, {
    'name': 'location',
    'url': 'https://pokeapi.co/api/v2/location/'
  }, {
    'name': 'location-area',
    'url': 'https://pokeapi.co/api/v2/location-area/'
  }, {
    'name': 'pal-park-area',
    'url': 'https://pokeapi.co/api/v2/pal-park-area/'
  }, {
    'name': 'region',
    'url': 'https://pokeapi.co/api/v2/region/'
  }, {
    'name': 'ability',
    'url': 'https://pokeapi.co/api/v2/ability/'
  }, {
    'name': 'characteristic',
    'url': 'https://pokeapi.co/api/v2/characteristic/'
  }, {
    'name': 'egg-group',
    'url': 'https://pokeapi.co/api/v2/egg-group/'
  }, {
    'name': 'gender',
    'url': 'https://pokeapi.co/api/v2/gender/'
  }, {
    'name': 'growth-rate',
    'url': 'https://pokeapi.co/api/v2/growth-rate/'
  }, {
    'name': 'nature',
    'url': 'https://pokeapi.co/api/v2/nature/'
  }, {
    'name': 'pokeathlon-stat',
    'url': 'https://pokeapi.co/api/v2/pokeathlon-stat/'
  }, {
    'name': 'pokemon',
    'url': 'https://pokeapi.co/api/v2/pokemon/'
  }, {
    'name': 'pokemon-color',
    'url': 'https://pokeapi.co/api/v2/pokemon-color/'
  }, {
    'name': 'pokemon-form',
    'url': 'https://pokeapi.co/api/v2/pokemon-form/'
  }, {
    'name': 'pokemon-habitat',
    'url': 'https://pokeapi.co/api/v2/pokemon-habitat/'
  }, {
    'name': 'pokemon-shape',
    'url': 'https://pokeapi.co/api/v2/pokemon-shape/'
  }, {
    'name': 'pokemon-species',
    'url': 'https://pokeapi.co/api/v2/pokemon-species/'
  }, {
    'name': 'stat',
    'url': 'https://pokeapi.co/api/v2/stat/'
  }, {
    'name': 'type',
    'url': 'https://pokeapi.co/api/v2/type/'
  }, {
    'name': 'language',
    'url': 'https://pokeapi.co/api/v2/language/'
  }]

  const done = sinon.spy()
  const context = { done }

  pokeapiEndpoints(context)

  t.true(done.calledOnce)
  t.true(done.calledWithExactly())

  t.deepEqual(context.res, { results })
})
