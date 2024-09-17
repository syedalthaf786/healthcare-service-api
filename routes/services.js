// routes/services.js
const express = require('express');
const router = express.Router();
const Service = require('../models/service');

// @route   POST /services
// @desc    Add a new service
router.post('/', async (req, res) => {
    const { name, description, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ msg: 'Please include a name and price' });
    }

    try {
        const newService = new Service({
            name,
            description,
            price
        });

        const service = await newService.save();
        res.json(service);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   GET /services
// @desc    Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT /services/:id
// @desc    Update a service
router.put('/:id', async (req, res) => {
    const { name, description, price } = req.body;

    try {
        let service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ msg: 'Service not found' });
        }

        service.name = name || service.name;
        service.description = description || service.description;
        service.price = price || service.price;

        await service.save();
        res.json(service);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /services/:id
// @desc    Delete a service
router.delete('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ msg: 'Service not found' });
        }

        await service.remove();
        res.json({ msg: 'Service removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
