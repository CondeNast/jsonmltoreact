[![Build Status](https://travis-ci.org/CondeNast/jsonmltoreact.svg?branch=master)](https://travis-ci.org/CondeNast/jsonmltoreact)
[![Code Climate](https://codeclimate.com/github/diffcunha/jsonmltoreact/badges/gpa.svg)](https://codeclimate.com/github/diffcunha/jsonmltoreact)
[![Coverage Status](https://coveralls.io/repos/github/CondeNast/jsonmltoreact/badge.svg?branch=master)](https://coveralls.io/github/CondeNast/jsonmltoreact?branch=master)

# jsonmltoreact
JsonML to React converter

## Install

```shell
$ npm i --save jsonmltoreact
```

## Examples

```js
import _ from 'lodash';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import JsonmlToReact from './src';

// Some random React component
class CustomCompoenent extends React.Component {
  render() {
    return (
      <div className="container">
        {this.props.header && <h1>{this.props.header}</h1>}
        {this.props.subheader && <h2>{this.props.subheader}</h2>}
        {this.props.children}
      </div>
    );
  }
}

// Create instance with custom converters
let jsonmlToReact = new JsonmlToReact({
  'custom-tag': (props, data) => ({
    type: CustomCompoenent,
    props: _.assign({}, props, data),
  })
});

// JsonML tree
let jsonml = [
  'div', { class: 'container' },
  [
    'custom-tag', { subheader: 'bar' },
    [
      'span', 'content'
    ]
  ]
];

// Optional data to be passed to converters
let data = {
  'header': 'foo',
};

let reactComponent = jsonmlToReact.convert(jsonml, data);

console.log(ReactDOMServer.renderToStaticMarkup(reactComponent));
// <div class="container"><div class="container"><h1>foo</h1><h2>bar</h2><span>content</span></div></div>
```
