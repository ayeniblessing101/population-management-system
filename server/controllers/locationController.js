import Location from '../models/Location';
import { validateCreateLocationInput, validateUpdateLocationInput } from '../validations/validations';

exports.createLocation = (req, res) => {
    validateCreateLocationInput(req);

    const requestErrors = req.validationErrors();
    const newLocation =  new Location({
        name: req.body.name,
        maleResidents: req.body.maleResidents,
        femaleResidents: req.body.femaleResidents
    });
    if (requestErrors) {
        res.status(400).json({ errors: requestErrors });
    } else {
        Location.findOne({ name: req.body.name })
            .then((existingLocation) => {
                if (existingLocation) {
                    return res.status(409).json({
                        error: 'Location with this name already exist',
                    });
                }
                newLocation.save().then((locationDetail) => {
                    return res.status(201).json({
                        newLocation: {
                            locationId: locationDetail._id,
                            name: locationDetail.name,
                            maleResidents: locationDetail.maleResidents,
                            femaleResidents: locationDetail.femaleResidents
                        },
                        message: 'Location created successfully',
                    });
                });
            })
        .catch((error) => {
            return res.status(500).json({ error });
        });
    }
};

exports.getALocation = (req, res) => {
    Location.findById(req.params._id)
        .then((response) => {
            if (response) {
                return res.status(200).json({
                    contact: {
                        locationId: response._id,
                        name: response.name,
                        maleResidents: response.maleResidents,
                        femaleResidents: response.femaleResidents,
                        TotalPopulation: Number(response.maleResidents + response.femaleResidents)
                    },
                });
            }
            return res.status(404).json({ message: 'Location not Found' });
        })
        .catch((error) => {
            return res.status(500).json({ error })
        });
};

exports.getAllLocations = (req, res) => {
    Location.find()
        .then((locations) => {
            if (locations) {
                const individualLocation = locations.map(location => ({
                    _id: location._id,
                    name: location.name,
                    totalNumberOfMale: location.maleResidents,
                    totalNumberOfFmale: location.femaleResidents,
                    totalPoulation: Number(location.maleResidents + location.femaleResidents),
                  }));
                return res.status(200).json({
                    individualLocation
                });
            }
            return res.status(404).json({ message: 'No Locations Found' });
        })
        .catch((error) => {
            return res.status(500).json({ error })
        });
};

exports.updateLocation = (req, res) => {
    validateUpdateLocationInput(req);

    const requestErrors = req.validationErrors();
    if (requestErrors) {
        res.status(400).json({ errors: requestErrors });
    } else {
        Location.findOneAndUpdate(
            { _id: req.params._id },
            { 
                $set: {
                    name: req.body.name,
                    maleResidents: req.body.maleResidents,
                    femaleResidents: req.body.femaleResidents
                },
            },
            { new: true }
        )
        .then((location, error) => {
            if (location) {
                return res.status(200).json({
                    location: {
                        locationId: location._id,
                        name: location.name,
                        maleResidents: location.maleResidents,
                        femaleResidents: location.femaleResidents,
                        TotalPopulation: Number(location.maleResidents + location.femaleResidents)
                    },
                    message: 'Location updated successfully'
                });
            }
            return res.status(404).json({ error, message: 'Location not Found' });
        })
        .catch((error) => {
            return res.status(500).json({ error, message: 'An Error occured' });
        });
    }
};

exports.deleteLocation = (req, res) => {
    Location.findByIdAndRemove(req.params._id)
        .then((response) => {
            if (response) {
                return res.status(200).json({ message: 'Location deleted successfully' });
            }
            return res.status(404).json({ message: 'Location not Found' });
        })
        .catch((error) => {
            return res.status(500).json({ error })
        });
};