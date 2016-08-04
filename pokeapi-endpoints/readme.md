# pokeapi-endpoints

> Returns PokéAPI endpoints


## Install

Run `npm install` in the root directory.


## Usage

> HTTP Trigger

### Request

`GET https://<app-service>.azurewebsites.net/api/pokeapi-endpoints`

#### Headers

`x-functions-key <functionKey>`

> *functionKey* is located in `D:\home\data\Functions\secrets\host.json`

### Response

```
{
  results: [{
    name: 'pokemon',
    url: 'https://pokeapi.co/api/v2/pokemon/'
  }, ...]
}
```


## License

MIT © [Pier-Luc Gendreau](https://github.com/Zertz)
