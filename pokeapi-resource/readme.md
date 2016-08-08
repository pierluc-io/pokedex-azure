# pokeapi-resource

> Returns PokéAPI resource for a specified resource and id


## Install

Run `npm install` in the root directory.


## Usage

> HTTP Trigger

### Request

`GET https://<app-service>.azurewebsites.net/api/pokeapi-resource?resource=<resource>&id=<id or name>`

- *resource* : PokéAPI resource to query for (`berry`, `pokemon`, etc.)
- *id* : numeric identifier or, for some resources, `name` property

#### Headers

`x-functions-key <functionKey>`

> *functionKey* : located in `D:\home\data\Functions\secrets\host.json`, which is accessible through `https://<app-service>.scm.azurewebsites.net/DebugConsole`

### Response

```
{
  "result": {
    "url": "https://pokeapi.co/api/v2/pokemon/1/",
    "name": "bulbasaur",
    ...
  }
}
```


## License

MIT © [Pier-Luc Gendreau](https://github.com/Zertz)
