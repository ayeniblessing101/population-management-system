const mongoose = require('mongoose');
import supertest from 'supertest';
import chai from 'chai';
import Location from '../models/Location';
import app from '../../index';

const { expect } = chai;
const request = supertest(app);
let newLocationId;

describe('Location Controller', () => {
    before((done) => {
        Location.remove({}).then(() => done());
    });
    describe('when a user creates a location', () => {
        it('should return the location details and a success message', (done) => {
            request
                .post('/api/v1/location')
                .set('Accept', 'application/x-www-form-urlencoded')
                .send({
                    name: 'Ibadan',
                    maleResidents: 300,
                    femaleResidents: 20
                })
                .expect(201)
                .end((err, res) => {
                    newLocationId = res.body.newLocation.locationId;
                    expect(res.body).to.be.an('object');
                    expect(res.body.newLocation.name).to.be.a('string');
                    expect(res.body.newLocation.maleResidents).to.equal(300);
                    expect(res.body.newLocation.femaleResidents).to.equal(20);
                    expect(res.body).to.have.a.property(
                        'message',
                        'Location created successfully'
                    );
                    done();
                });
        });
    });

    describe('when a user creates a Location with title field empty', () => {
        it('should return an error message `Name is required`', (done) => {
        request
            .post('/api/v1/location')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
                name: '',
                maleResidents: 300,
                femaleResidents: 20
            })
            .expect(400)
            .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.errors[0].msg).to.equal('Name is required');
            done();
            });
        });
    });

    describe('when a user updates a Location', () => {
        it('should return a success message `Idea was updated successfully`', (done) => {
            console.log(newLocationId);
            request
            .put(`/api/v1/location/${newLocationId}`)
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
                name: 'Ibadan',
                maleResidents: 300,
                femaleResidents: 200
            })
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.a.property(
                'message',
                'Location updated successfully'
                );
                done();
            });
        });
    });

    describe('when a user updates a Location that does not exist', () => {
        it('should return a success message `Location not Found or You dont have the right to edit this Location`', (done) => {
            request
            .put('/api/v1/location/5a24367e7d1e6a29d8b33c2b')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
                name: 'Ibadan',
                maleResidents: 300,
                femaleResidents: 200
            })
            .expect(404)
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.a.property(
                'message',
                'Location not Found'
                );
                done();
            });
        });
    });

    describe('when a user deletes a Location', () => {
        it('should return a success message `Idea was deleted successfully`', (done) => {
            request
            .delete(`/api/v1/location/${newLocationId}`)
            .set('Accept', 'application/x-www-form-urlencoded')
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.have.a.property(
                'message',
                'Location deleted successfully'
                );
                done();
            });
        });
    });
});