import {
  expectType,
  expectAssignable,
  expectNotAssignable,
  expectNotType,
} from 'tsd';

import {
  ArrayElement,
  DeepPartial,
  IfEmptyObject,
  DeepOmit,
} from '../build/ts/types';

interface Person {
  firstName: string;
}

/**
 * ArrayElement<T>
 */

expectType<ArrayElement<Person[]>>({firstName: 'foo'});

expectAssignable<ArrayElement<string[]>>('string');
expectAssignable<ArrayElement<any[]>>(true);
expectAssignable<ArrayElement<(string | boolean)[]>>(false);
expectAssignable<ArrayElement<string>>('string' as never);

expectNotAssignable<ArrayElement<string>>('string');

/**
 * DeepPartial<T>
 */

interface Base {
  required: string;
  optional?: string;
  nested?: Base;
}

expectAssignable<DeepPartial<Base>>({});
expectAssignable<DeepPartial<Base>>({optional: 'test'});
expectAssignable<DeepPartial<Base>>({required: undefined});
expectAssignable<DeepPartial<Base>>({
  nested: {nested: {nested: {required: 'test'}}},
});

interface ListObj {
  list: Base[];
}

expectAssignable<DeepPartial<ListObj>>({list: []});
expectAssignable<DeepPartial<ListObj>>({list: undefined});
expectAssignable<DeepPartial<ListObj>>({
  list: [{nested: {required: undefined}}],
});

interface ReadOnlyListObj {
  list: ReadonlyArray<Base>;
}

expectAssignable<DeepPartial<ReadOnlyListObj>>({list: []});
expectAssignable<DeepPartial<ReadOnlyListObj>>({list: undefined});

expectAssignable<DeepPartial<ReadOnlyListObj>>({
  list: [{}],
});

expectAssignable<DeepPartial<string>>('test');

/**
 * IfEmptyObject<T>
 */

expectType<IfEmptyObject<{}, true>>(true);
expectType<IfEmptyObject<{foo: string}, never, false>>(false);

expectNotType<IfEmptyObject<{foo: string}, true>>(true);
expectNotType<IfEmptyObject<boolean, true>>(true);

/**
 * IfAllOptionalKeys
 */

/**
 * IfAllNullableKeys
 */

/**
 * NonOptionalKeys
 */

/**
 * NonNullableKeys
 */

/**
 * NoInfer
 */

/**
 * NonReactStatics
 */

/**
 * ExtendedWindow
 */

/**
 * DeepOmit
 */

expectAssignable<DeepOmit<string, 'test'>>('string');

interface Obj {
  __typename: string;
  foo: string;
  bar?: {
    __typename: string;
    baz: string;
  };
  list?: Obj[];
}

expectAssignable<DeepOmit<Obj, '__typename'>>({
  foo: 'string',
  bar: {
    /**
     * This should error:
     * DeepOmit does not seem to be recursing on nested types
     */
    __typename: 'Nested',
    baz: 'string',
  },
});

expectNotAssignable<DeepOmit<Obj, '__typename'>>({
  foo: 'string',
  list: [
    {
      /**
       * this should NOT error:
       * DeepOmit also seems to not respect existing optional properties
       */
      bar: undefined,
      list: undefined,
    },
  ],
});

expectNotType<DeepOmit<Obj, '__typename'>>({
  __typename: 'string',
  foo: 'string',
});

/**
 * DeepOmitArray
 */

/**
 * PartialSome
 */

/**
 * RequireSome
 */
