import { useEffect, useState } from "react";

const Home = () => {
  const [id, setid] = useState(0);
  const [titulo, settitulo] = useState("");
  const [status, setstatus] = useState(false);
  const [lista, setlista] = useState([]);
  const [openmodal, setopenmodal] = useState(false);

  const listando = async () => {
    const url = "http://127.0.0.1:5000/home";
    const res = await fetch(url);
    const data = await res.json();
    setlista(data);
  };

  const criandoTarefa = async () => {
    const url = "http://127.0.0.1:5000/create";
    const dados = { titulo, status };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    const data = await res.json();
    setid(data.id);
    settitulo(data.titulo);
    setstatus(data.status);

    alert("Tarefa criada!");
    listando();
  };

  const editar = async (id) => {
    const url = `http://127.0.0.1:5000/update/${id}`;

    const recebimento = {
      titulo: titulo,
      estado: status,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recebimento),
    });
    alert("Tarefa atualizada");
    const data = await res.json();
    listando(); // atualiza a lista
  };

  const remover = async (id) => {
    const url = `http://127.0.0.1:5000/remover/${id}`;
    const res = await fetch(url, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Tarefa removida com sucesso");
      alert("Recarregando");
      listando();
    }
  };

  const limaprLista = () => {
    listando([]);
    alert("limpando lista");
  };

  useEffect(() => {
    listando();
  }, []);

  return (
    <div className="relative w-full min-h-[99.9vh] flex bg-gray-700 justify-center items-center ">
      <section className="flex flex-wrap w-full h-[500px] justify-center items-center border ">
        <section>
          <div className="flex flex-col gap-2 mt-2">
            {lista.length < 0 ? (
              ""
            ) : (
              <button
                type="button"
                className="bg-black text-white w-fit h-fit p-2"
                onClick={() => setopenmodal(true)}
              >
                Criar
              </button>
            )}

            {openmodal && (
              <div>
                <input
                  type="text"
                  placeholder="Título"
                  value={titulo}
                  onChange={(e) => settitulo(e.target.value)}
                />

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={status}
                    onChange={(e) => setstatus(e.target.checked)}
                  />
                  Concluída
                </label>

                <div className="w-full flex gap-2">
                  <button
                    className="bg-black text-white w-fit h-fit p-2"
                    onClick={() => {
                      criandoTarefa();
                      settitulo("");
                      setstatus(false);
                    }}
                  >
                    Salvar tarefa
                  </button>

                  <button
                    className="bg-black text-white w-fit h-fit p-2"
                    onClick={() => {
                      editar(id);
                      settitulo("");
                    }}
                  >
                    Editar
                  </button>

                  <button
                    className="bg-black text-white w-fit h-fit p-2"
                    onClick={() => {
                      remover(id);
                      settitulo("");
                    }}
                  >
                    Remover
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
        <ol className="w-full min-h-[50%] bg-red-700 border list-inside">
          {lista.map((prod) => (
            <li
              key={prod.id}
              className="w-full cursor-pointer list-decimal"
              onClick={() => {
                settitulo(prod.titulo);
                setstatus(prod.status);
                setid(prod.id);
                setopenmodal(true);
              }}
            >
              <article className="w-full">
                <header className="flex gap-3">
                  <h3 className="text-red-500">Título: {prod.titulo}</h3>

                  <p>Concluída: {prod.status ? "Sim" : "Não"}</p>
                </header>
              </article>

              <hr className="my-3" />
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};

export default Home;
