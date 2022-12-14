/**
 * @description colleciton of test cases on root request 
 * @author {author} dlrivada <{@mail dlrivada@hotmail.com}> ({@link http://dlrivada.com}) 
 * @param {string} - case name
 * @param {function} - test case
 * @param {function} - callback function
 * @see https://jestjs.io/docs/en/api#testname-fn-timeout
 */

import supertest from 'supertest';

import app from '../src/index';

const request = supertest(app);

/**
 * @description colleciton of test cases on root request
 * @param {string} - case name
 * @param {function} - test case
 * @param {function} - callback function
 * @see https://jestjs.io/docs/en/api#testname-fn-timeout
 */
beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
});

/**
 * @description colleciton of tests cases on root request
 * @param {string} - case name
 * @param {function} - test case
 * @param {function} - callback function
 * @see https://jestjs.io/docs/en/api#testname-fn-timeout
 */
describe('routes', () => {
    describe('GET /', () => {
        it('should respond with a json', async () => {
            const { status, body: response } = await request.get('/');
            expect(status).toBe(200);
            expect(typeof response.data).toBe('string');
        });
    });
});

/**
 * @description colleciton of test cases on task request
 * @param {string} - case name
 * @param {function} - test case
 * @param {function} - callback function
 * @see https://jestjs.io/docs/en/api#testname-fn-timeout
 */
describe('routes', () => {
    describe('GET /task', () => {
        it('should respond with a json', async () => {
            const { status, body: response } = await request.get('/task');
            expect(status).toBe(200);
            expect(Array.isArray(response.data)).toBeTruthy();
        });
    });
});