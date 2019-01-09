const expect = require('expect');
const request = require('supertest');

const {app} = require('./../app');
const {Patient} = require('./../models/patient');
const {ObjectID} = require('mongodb');
const HttpStatus = require('http-status-codes');


const patients = [{
  _id: new ObjectID(),
  name: 'Test patient name 1',
  age : 15,
  outstanding: 40
}, {
  _id: new ObjectID(),
  name: 'Test patient name 2',
  age : 43,
  outstanding: 1240
}];


beforeEach((done) => {
  Patient.remove({}).then(() => done());
});

describe('POST /api/patients', () => {
  it('should create a new Patient', (done) => {
    var dummy = {
      name: 'Test patient name 3',
      age: 21,
      outstanding: 203
    };

    request(app)
      .post('/api/patients')
      .send(dummy)
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe(dummy.name);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Patient.find({name: 'Test patient name 3'}).then((books) => {
          expect(books.length).toBe(1);
          expect(books[0].name).toBe('Test patient name 3');
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create patient with invalid body data', (done) => {
    request(app)
      .post('/api/patients')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Patient.find().then((patients) => {
          expect(patients.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /api/patients', () => {
  it('should retrieve existing Patients', (done) => {
    Patient.insertMany(patients).then(() => done());
    request(app)
      .get('/api/patients')
      .expect(200)
      .expect((res) => {
        expect(res.body.patient.length).toBe(2);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
      });
  });
});


describe('GET /api/patients/:id', () => {
  it('should return 404 if patient not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/api/patients/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/api/patients/123abc')
      .expect(404)
      .end(done);
  });
});
