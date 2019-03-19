import express from 'express';
import locationController from '../controllers/locationController';

const locationRoutes = express.Router();

locationRoutes.post('/location', locationController.createLocation);
locationRoutes.get('/location/:_id', locationController.getALocation);
locationRoutes.get('/locations', locationController.getAllLocations);
locationRoutes.put('/location/:_id', locationController.updateLocation);
locationRoutes.delete('/location/:_id', locationController.deleteLocation);

export default locationRoutes;