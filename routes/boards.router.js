const router = require('express').Router()

// create boards
router.post('/create', async (req, res) => {})

// get all boards
router.get('/', async (req, res) => {})

// get board by id
router.get('/:boardId', async (req, res) => {})

// update board
router.put('/:boardId', async (req, res) => {})

// delete board
router.delete('/:boardId', async (req, res) => {})

module.exports = router
