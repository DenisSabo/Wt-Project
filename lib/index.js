const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const data = {
        title: 'Home'
    };
    const vueOptions = {
        head: {
            title: ''
        }
    };
    res.renderVue('index', data, vueOptions);
});

module.exports = router;