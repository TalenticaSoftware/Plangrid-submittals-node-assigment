
const request = require('supertest');
const User = require('../src/models/user');
const app = require('../src/app');
const { setupDB, userOne, userOneId } = require('./fixtures/db');

beforeEach(setupDB)

test('Should signup a new user', async()=>{
  const response =  await request(app).post('/users').send({
        name: "Andrew",
        email: "andrew@example.com",
        password: "Resentest6358U"
    }).expect(201);

    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();
    expect(response.body).toMatchObject({
        user: {
            name: "Andrew",
        email: "andrew@example.com",
        }
    })
})

test('Should login a existing user', async()=>{
  const response=  await request(app).post('/users/login').send(userOne).expect(200);
    const user = await User.findById(response.body.user._id);
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login a non-existing user', async()=>{
    await request(app).post('/users/login').send({email: 'karan@gmail.com',password: 'kafjaijgij'}).expect(400)
})

test('Should get user profile', async()=>{
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})


test('Should delete user account', async()=>{
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})


test('Should upload user avatar', async()=>{
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','tests/fixtures/philly.jpg')
    .expect(200)
})


test('Should update user info', async()=>{
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({name: 'karan'})
    .expect(200)
})


test('Should not update invaliduser info', async()=>{
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({location: 'karan'})
    .expect(400)
})
