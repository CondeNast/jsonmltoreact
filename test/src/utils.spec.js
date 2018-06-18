import { expect } from 'chai';

import {
  filter,
  reactHTMLTags,
  reactConverters,
  toStyleObject
} from '../../src/utils';

describe('filter', function () {
  it('should filter matching keys', function () {
    const foo = { bar: 1, foo: 2, class: 3 };
    expect(filter(foo, key => key !== 'class')).to.deep.equal({ bar: 1, foo: 2 });
  });
});

describe('reactConverters array', function () {
  it('is a object with all HTML tags as keys and a function as value', function () {
    expect(reactConverters).to.have.all.keys(reactHTMLTags);
  });
});

describe('toStyleObject function', function () {
  it('returns class object parsed from the CSS style string', function () {
    let css = 'display: block; color: #fff;';
    let result = toStyleObject(css);

    expect(result.display).to.be.equal('block');
    expect(result.color).to.be.equal('#fff');
  });
});
