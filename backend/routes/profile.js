const router = require("express").Router();
const auth = require("../middleware/token");
const User = require("../models/user");

router.put("/update", auth, async (req, res) => {
    try {
        const user = await User.findById(req.currentUser);
        user.name = req.body.newName;
        await user.save();
        res.json({
            reponse: {
                status: true,
            },
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get("/todo", auth, async (req, res) => {
    try {
        const user = await User.findById(req.currentUser);
        const todos = user.todos;
        res.json({
            reponse: {
                status: true,
                todos,
            },
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/todo/add", auth, async (req, res) => {
    try {
        const user = await User.findById(req.currentUser);
        user.todos.push({
            todo: req.body.newTodo,
        });
        await user.save();
        res.json({
            reponse: {
                status: true,
                todos: user.todos,
            },
        });
    } catch (error) {
        res.status(400).send(error);
    }
});
router.put("/todo/update", auth, async (req, res) => {
    try {
        const user = await User.findById(req.currentUser);
        const todoToUpdate = user.todos.find((todo) => todo._id == req.body.todoId);
        todoToUpdate.todo = req.body.updateTodo;
        user.save();
        res.json({
            reponse: {
                status: true,
                updatedTodo: todoToUpdate,
            },
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/todo/delete", auth, async (req, res) => {
    try {
        const user = await User.findById(req.currentUser);
        user.todos.pull(req.body.todoId);
        console.log(user);
        user.save();
        res.json({
            reponse: {
                status: true,
            },
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
