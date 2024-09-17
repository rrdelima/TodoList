const connection = require("../database/connection");
const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");

router.post("/novaTarefa", TaskController.novaTarefa);

router.get("/tarefas", TaskController.listarTarefas);

router.get("/tarefa/:id", TaskController.listarUmaTarefa);

router.put("/tarefa/:id", TaskController.atualizarTarefa);

router.delete("/tarefa/:id", TaskController.excluirTarefa);

module.exports = router;
