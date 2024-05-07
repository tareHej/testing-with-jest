const stack = require('../src/stack');

test('pop on a empty stack returns null', () => {
    expect(stack.pop()).toBeUndefined(); //förväntar undefined
});