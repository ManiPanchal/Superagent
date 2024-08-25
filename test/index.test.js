const { add } = require('../add');
const { get_todos } = require("../get_todos");
const {get_fun}=require("../get_fun");
const { app } = require("../main");
const superagent = require('superagent');
test('toBe', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(1, 2)).toBeGreaterThan(1);
    expect(add(3, -4)).toBeLessThan(0);
});
test('toBe2', () => {
    expect(add(3, 4)).toBe(7);
})
test('match', () => {
    expect('abc').not.toMatch(/d/);
    expect('abc').toMatch(/a/);
})

const arr = ['a', 'b', 'c', 'd'];
test('contains', () => {
    expect(arr).toContain('a');
    expect(arr).not.toContain('e');
})

function fetchdata() {
    const a = 2;
    return new Promise((resolve, reject) => {
        if (a == 1) {
            resolve(1);
        }
        else {
            reject('error');
        }
    })
}
test('promises', () => {
    return fetchdata().then((data) => {
        expect(data).toBe(1);
    })
        .catch((data) => {
            expect(data).toMatch('error');
        })
})
test('async/await', async () => {
    expect.assertions(1);
    try {
        const data = await fetchdata();
        expect(data).toBe(1);
    }
    catch (error) {
        expect(error).toMatch('error');
    }
})

test("get request", async () => {
    try {
        const a = { userId: 1, id: 1, title: 'delectus aut autem', completed: false };
        const data = await get_todos();
        //for(let i=0;i<data.length;i++)
        //{
        //console.log(data[i]);
        expect(data[0]).toHaveProperty('title', 'userId', 'id', 'completed');
        //}
    }
    catch (error) {
        console.log(error);
    }
})

// describe('superagent', () => {
//     test('get request', async() => {
//         const url = 'https://jsonplaceholder.typicode.com/todos/';
//          return superagent.get(url)
//             .then((response) => {
//                 //console.log(data);
//                 console.log(response.length);
//                 expect(response.length).toBe(200);
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     })
// })
describe('superagent 2', () => {
    test('get request', async () => {
        try {
            const url = 'https://jsonplaceholder.typicode.com/todos/';
            const data = await superagent.get(url);
            console.log(data.body.length);
            expect(data.body.length).toBe(200);
        }
        catch (error) {
            console.log(error);
        }
    })
    test('post request', async () => {
        try {

            const url = 'https://httpbin.org/post';
            const body = { key: 'value' };
            const res = await superagent.post(url)
                .send(body)
                .set('Content-Type', 'application/json')
            // .then(response => {
            //     console.log(response.body);
            // })
            console.log(JSON.parse(res.body.data));
            
            // .catch(error => {
            //     console.error(error);
            // });
        }
        catch (error) {
            console.error(error);
        }

    })
})


describe('New survey creation',()=>{
    test('GET request ',async ()=>{
         const data=await get_fun();
        //  console.log(data.statusCode);
        //  console.log(data.body.statusCode);
        //  console.log(data.body.result.length);
         expect(data.statusCode).toBe(200);
         expect(data.body.statusCode).toBe(200);
         expect(data.body.message).toMatch("success");
         expect(data.body.result.length).toBe(15);

    })
    test('checking result object properties',async()=>{
        const data=await get_fun();
        for(let i=0;i<data.body.result.length;i++)
        {
            expect(data.body.result[i]).toHaveProperty('description','id','parentId','rank','sequence','tags','templateCategory','templateName','templateType');
        }
    })
})
