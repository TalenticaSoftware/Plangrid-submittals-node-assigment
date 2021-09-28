
const request = require('supertest');
const User = require('../src/models/user');
const app = require('../src/app');
const { setupDB, userOne, taskOne, userTwoId,userTwo,taskThree  } = require('./fixtures/db');

beforeEach(setupDB)


test('Should create a news task', async()=>{
    await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description: "New test case task"
    })
    .expect(201)
})


test('Should get tasks for users', async()=>{
   const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
    expect(response.body.length).toEqual(2);
})

test('Should delete user tasks', async()=>{
  await request(app)
     .delete(`/tasks/${taskThree._id}`)
     .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
     .send()
     .expect(200);
 })
 
 