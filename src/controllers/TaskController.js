const database = require("../database/connection");

class TaskController {
  novaTarefa(request, response) {
    const { tarefa, descricao, responsavel } = request.body;

    if (!tarefa || !descricao || !responsavel) {
      return response
        .status(400)
        .json({ message: "Dados necessários: tarefa, descricao, responsavel" });
    }
    console.log(tarefa, descricao, responsavel);

    database
      .insert({ tarefa, descricao, responsavel })
      .table("tasks")
      .then((data) => {
        console.log(data);
        response.json({ message: "Tarefa criada com sucesso!" });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  listarTarefas(request, response) {
    database
      .select("*")
      .table("tasks")
      .then((tarefas) => {
        //console.log(tarefas);
        response.json(tarefas);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  listarUmaTarefa(request, response) {
    const { id } = request.params;

    database
      .select("*")
      .table("tasks")
      .where({ id })
      .then((tarefa) => {
        response.json(tarefa);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  atualizarTarefa(request, response) {
    const { id } = request.params;
    const removeEmptyValues = (obj) => {
      return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value)
      );
    };
    const filteredData = removeEmptyValues(request.body);
    console.log(filteredData);

    database
      .where({ id })
      .update(filteredData)
      .table("tasks")
      .then((data) => {
        response.json({ message: "Tarefa atualizada com sucesso!" });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  excluirTarefa(request, response) {
    const { id } = request.params;

    database
      .delete("*")
      .table("tasks")
      .where({ id })
      .then((tarefa) => {
        response.json(tarefa);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

module.exports = new TaskController();
