# smooth-input
Library for imitate human input

### Installation
```shell script
npm i smooth-input
```
### Simple example
![Demo Animation](https://media2.giphy.com/media/hsUfkT5rmqvk2DgCxS/giphy.gif)

```typescript
import {SmoothInput} from 'smooth-input';
const h1 = document.getElementById('title')
const si = new SmoothInput(h1, {
    symbolsPerSecond: 10,
    delay: 5000,
    symbolsDelay: {' ': 500},
    text: 'Hello, World!'
})
```

### API
Work in progress