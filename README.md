# smooth-input
Library for imitate human input

### Installation
```shell script
npm i smooth-input
```
### Simple example
![Demo Animation](../assets/example.gif?raw=true)

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