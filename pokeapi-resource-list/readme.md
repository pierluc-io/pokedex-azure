# pokeapi-resource-list

> Returns PokéAPI resource list for a specified endpoint


## Install

Run `npm install` in the root directory.


## Usage

> HTTP Trigger

### Request

`GET https://<app-service>.azurewebsites.net/api/pokeapi-resource-list?resource=<resource>`

> *resource* : PokéAPI resource to query for

#### Headers

`x-functions-key <functionKey>`

> *functionKey* : located in `D:\home\data\Functions\secrets\host.json`, which is accessible through `https://<app-service>.scm.azurewebsites.net/DebugConsole`

### Response

```
{
  "count": 811,
  results: [{
    "url": "https://pokeapi.co/api/v2/pokemon/1/",
    "name": "bulbasaur"
  }, ...]
}
```


## License

MIT © [Pier-Luc Gendreau](https://github.com/Zertz)
