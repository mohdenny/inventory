const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const upload = require('../../middleware/upload');
const Item = require('../../models/Item');
const fs = require('fs');
const checkObjectId = require('../../middleware/checkObjectId');

// @route   POST api/Items
// @desc    Create a item
// @acces   Private
router.post(
    '/',
    auth,
    upload.single('photo'),
    check('name', 'Name is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erros: errors.array() });
        }

        const { name, buyingPrice, sellingPrice, stock } = req.body;
        const { originalname, mimetype, size } = req.file;

        try {
            let item = await Item.findOne({ name });

            if (item) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Item already exists' }] });
            };

            const newItem = new Item({
                photo: {
                    filename: originalname,
                    contentType: mimetype,
                    size: size,
                    url: req.file.path,
                },
                name: name,
                buyingPrice: buyingPrice,
                sellingPrice: sellingPrice,
                stock: stock
            })

            item = await newItem.save();

            res.json(item);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    
);

// @route   GET api/items
// @desc    Get all items
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const items = await Item.find().sort({ date: -1 });
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/items/:id
// @desc    Get item by ID
// @access  Private
router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if(!item) {
            return res.status(404).json({ msg: 'Item not found' });
        }

        res.json(item);
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/items/:id
// @desc    Delete a item
// @acess   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ msg: 'Item not found' });
        }

        const filePath = item.photo.url;
        if (filePath) {
            fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
        await item.deleteOne();

        res.json({ msg: 'Item removed' })
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

// @route   PUT api/items/:id
// @desc    update item
// @access  Private
router.put(
    '/:id',
    auth,
    checkObjectId('id'),
    upload.single('photo'),
    check('name', 'Name is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, buyingPrice, sellingPrice, stock } = req.body;
        const { originalname, mimetype, size } = req.file;

        const updateItem = {
            photo: {
                filename: originalname,
                contentType: mimetype,
                size: size,
                url: req.file.path
            },
            name: name,
            buyingPrice: buyingPrice,
            sellingPrice: sellingPrice,
            stock: stock,
            edited: Date.now()
        }

        try {
            let item = await Item.findById(req.params.id);
            const filePath = item.photo.url;
            if (filePath) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(err);
                    }
                }
            )};

            item = await Item.findByIdAndUpdate(
                req.params.id,
                { $set: updateItem },
                { new: true }
            );

            return res.json(item);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;