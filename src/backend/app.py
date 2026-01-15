from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tarefas = [
    {"id": 1, "titulo":"Comer algo","status": False},
    {"id": 2, "titulo":"Comer","status": False}
]

@app.route("/home", methods=["GET"])
def Listando():
    return jsonify(tarefas)
@app.route("/update/<int:id>", methods=["POST"])
def Editando(id):
    dados = request.json
    for t in tarefas:
        if t["id"] == id:
            t["titulo"] = dados["titulo"]
            t["status"] = dados["status"]
@app.route("/create", methods=["POST"])
def Criando():
    dados = request.json
   
    nova = {
                "id": len(tarefas)+1,
                "titulo": dados["titulo"],
                "status": dados["status"]
            }
    tarefas.append(nova)
    return tarefas
@app.route("/remover/<int:id>", methods=["DELETE"])
def Dleetando(id):
    for t in tarefas:
        if t["id"] == id:
            tarefas.remove(t)
            return jsonify(tarefas)



if __name__ == "__main__":
    app.run(debug=True)
    
    