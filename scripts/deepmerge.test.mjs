import { test } from 'node:test';
import assert from 'node:assert/strict';
import merge from 'deepmerge';

test('merge rejects prototype poisoning from either input, including nested values', () => {
	const payload = JSON.parse(
		'{"__proto__":{"polluted":true},"constructor":{"prototype":{"polluted":true}}}'
	);
	for (const result of [
		merge(payload, {}),
		merge({}, payload),
		merge({ nested: payload }, {}).nested,
		merge({}, { nested: payload }).nested
	]) {
		assert.equal(Object.getPrototypeOf(result), Object.prototype);
		assert.equal(result.polluted, undefined);
		assert.equal(Object.hasOwn(result, '__proto__'), false);
		assert.equal(Object.hasOwn(result, 'constructor'), false);
	}
	assert.equal({}.polluted, undefined);
});

test('normal plugin configuration merging retains functions, arrays and nested values', () => {
	const callback = () => true;
	assert.deepEqual(
		merge(
			{ compilerOptions: { dev: true }, extensions: ['.svelte'] },
			{ compilerOptions: { css: 'external' }, extensions: ['.svx'], callback }
		),
		{
			compilerOptions: { dev: true, css: 'external' },
			extensions: ['.svelte', '.svx'],
			callback
		}
	);
});
