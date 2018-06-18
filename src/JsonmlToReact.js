import React from 'react';
import JsonML from 'jsonml.js/lib/utils';
import isFunction from 'lodash.isfunction';

import {
  filter,
  reactConverters,
  toStyleObject,
  voidElementTags
} from './utils';


/**
 * JsonmlToReact class
 */
export default class JsonmlToReact {

  /**
   * Constructor
   * @param {Object} converters - Aditional converters
   */
  constructor(converters) {
    this.converters = Object.assign({}, reactConverters, converters);
  }

  /**
   * Visit JsonML nodes recursively and convert to React
   * @param {Array} node - JsonML structure
   * @param {Number} index - Node index to be used as key
   * @param {Object} [data] - Data to be passed to the converters
   * @returns {Object} React component
   * @private
   */
  _visit(node, index, data) {
    // Is leaf node
    if (!node || typeof node === 'string') {
      return node;
    }

    const rawAttrs = Object.assign({}, JsonML.getAttributes(node));
    const tag = JsonML.getTagName(node);
    const converter = this.converters[tag];
    const result = isFunction(converter) ? converter(rawAttrs, data) : {};

    const type = result.type || tag;
    const resultProps = result.props || rawAttrs || {};
    const props = Object.assign({}, filter(resultProps, key => key !== 'class'), {
      className: resultProps.className || resultProps.class,
      key: index,
      style: rawAttrs.style && toStyleObject(rawAttrs.style)
    });

    // If it's a void element, don't create children
    if (voidElementTags[type]) {
      return React.createElement(tag, props);
    }

    const children = JsonML.getChildren(node) || [];

    return React.createElement(type, props, ...children.map((child, index) => this._visit(child, index, data)));
  }

  /**
   * Convert JsonML to React component
   * @param {Array} jsonml - JsonML structure
   * @param {Object} [data] - Data to be passed to the converters
   * @returns {Object} React component
   */
  convert(jsonml, data) {
    return this._visit(jsonml, 0, data);
  }

}
