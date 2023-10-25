const request = require ('supertest');
const app =  require ('../../app');
const { Address }  = require ('../../models');

describe('Address Controller', () => {
  describe('POST /addresses', () => {
    it('should create a new address', async () => {
      const addressData = {
        street: '123 Main St',
        postalCode: '12345',
        state: 'CA',
        city: 'Los Angeles',
        userId: 1,
      };

      const response = await request(app)
        .post('/addresses')
        .send(addressData)
        .expect(201);

      const createdAddress = await Address.findByPk(response.body.data.id);

      expect(createdAddress).toMatchObject(addressData);
    });

    it('should return an error if the address already exists', async () => {
      const existingAddress = {
        street: '123 Main St',
        postalCode: '12345',
        state: 'CA',
        city: 'Los Angeles',
        userId: 1,
      };

      await Address.create(existingAddress);

      const response = await request(app)
        .post('/addresses')
        .send(existingAddress)
        .expect(400);

      expect(response.body.message).toBe('Address already exists');
    });
  });
});