const router = require('express').Router()
const { BoardService } = require('../services/boards.services')

const boardService = new BoardService()

// create boards
router.post('/', async (req, res) => {
    const { id, title, bgUrl, username } = req.body

    const board = await boardService.createBoard({
        id,
        title,
        bgUrl,
        username,
    })

    if (!board) {
        res.status(500).json({
            success: false,
            message: 'Board not created',
        })
    }

    res.json({
        success: true,
        message: 'Board created',
        board,
    })
})

// get all boards
router.get('/', async (req, res) => {
    res.json({ message: 'get all boards' })

    const boards = await boardService.getBoards()

    boards.length ? res.json(boards) : res.json({ message: 'The DB is empty' })
})

// get boards by username
router.get('/:username', async (req, res) => {
    const { username } = req.params

    const boards = await boardService.getBoardsFrom({ username })

    // console.log(boards)
    boards.length
        ? res.json({
              success: true,
              boards,
          })
        : res.json({ success: false, message: 'The DB is empty' })
})

// get board by id
router.get('/:boardId', async (req, res) => {
    const { boardId } = req.params

    const board = await boardService.getBoardById({ id: boardId })

    board
        ? res.json({
              success: true,
              board,
          })
        : res.json({
              success: false,
              message: 'Board not found',
          })
})

// update board
router.put('/:boardId', async (req, res) => {
    const { boardId } = req.params
    const { title } = req.body

    const board = await boardService.updateBoard({
        id: boardId,
        title,
    })

    if (!board) {
        res.status(500).json({
            success: false,
            message: 'Board not updated',
        })
    }

    res.json({
        success: true,
        message: 'Board updated',
        board,
    })
})

// delete board
router.delete('/:boardId', async (req, res) => {
    const { boardId } = req.params

    const board = await boardService.deleteBoard({ id: boardId })

    if (!board) {
        res.status(500).json({
            success: false,
            message: 'Board not deleted',
        })
    }

    res.json({
        success: true,
        message: 'Board deleted',
        board,
    })
})

// delete all boards
router.delete('/', async (req, res) => {
    
    const board = await boardService.deleteAllBoards()

    res.json({
        success: true,
        message: 'All boards deleted',
        board
    })

})

module.exports = router
