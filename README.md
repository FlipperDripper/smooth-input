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

### Initialization
```typescript
import {SmoothInput} from 'smooth-input';
const si = new SmoothInput(htmlElement, {...})
```
If you want to use default carriage you have to import css:
```typescript
import 'smooth-input/css/style.css'
```
And set special class to text container:
```css
smooth-text-container
```
#### Options 
|Name|Type|Default|Description|
|---|---|---|---|
|symbolsPerSecond|_number_|10|Count of symbols per second|
| delay  |  _number_ | 0  |  Time before start |
|symbolsDelay|_Object_|  {} |  Delay for certain symbols |
| text  |  _string or  null_ | null | Content of target element. If there isn't take textContent of element |
|  carriage |  _CarriageOptions_ | -  | Config for default carriage  |

#####CarriageOptions
|Name|Type|Default|Description|
|---|---|---|---|
|visible|_boolean_|true|Visibility of carriage|
|hideAfterInput|_boolean_|true|Hide carriage after all text input|
|hideDelay|_boolean_|true|Time before hide carriage after input|

### Methods
Methods of SmoothInput instance

---
▸ **setText**(`text`: string): *void*

Removing old text and start input new one

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`text` | string | - |

**Returns:** *void*

---

▸ **addTextToEnd**(`text`: string): *void*

Adding text to enter at the end

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`text` | string |  -  |

**Returns:** *void*
