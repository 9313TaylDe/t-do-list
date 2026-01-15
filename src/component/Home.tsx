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
      status: status,
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
      <section className="flex flex-wrap w-full h-[600px] justify-center items-center  ">
        <section className="border w-full flex items-center justify-centere p-4">
          <div className="flex flex-col gap-2 w-full items-center shadow-2xl shadow-black rounded-xl p-2">
            {lista.length < 0 || openmodal ? (
              <button></button>
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
              <div className="flex flex-wrap w-full items-center justify-center gap-2">
                <input
                  type="text"
                  placeholder="Título"
                  className="bg-slate-500 text-white placeholder:text-white pl-3 pt-2 pb-2 rounded-xl w-[100%]"
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

                <div className="w-full flex gap-2 justify-center">
                  <button
                    className="bg-black text-white h-fit p-2 w-[110px] rounded-xl hover:bg-gray-600"
                    onClick={() => {
                      criandoTarefa();
                      settitulo("");
                      setstatus(false);
                    }}
                  >
                    Salvar tarefa
                  </button>

                  <button
                    className="bg-black text-white h-fit p-2 w-[110px] rounded-xl hover:bg-gray-600"
                    onClick={() => {
                      editar(id);
                    }}
                  >
                    Editar
                  </button>

                  <button
                    className="bg-black text-white h-fit p-2 w-[110px] rounded-xl hover:bg-gray-600"
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
        <section className="w-full flex h-[60%] p-4 rounded-xl">
          <ol className="w-full min-h-[50%] bg-gray-70] rounded-xl border list-inside text-black p-2">
            {lista.map((prod) => (
              <li
                key={prod.id}
                className="w-full cursor-pointer list-disc"
                onClick={() => {
                  settitulo(prod.titulo);
                  setstatus(prod.status);
                  setid(prod.id);
                  setopenmodal(true);
                }}
              >
                <article className="w-full flex-col">
                  <header className="flex gap-3 flex-col ">
                    <h3 className="text-red-500 flex gap-2 focus-visible:border focus:border-black">
                      Título: <p className="text-white"> {prod.titulo}</p>
                    </h3>

                    <h3 className="w-full flex gap-2 text-red-500">
                      Concluída:{" "}
                      <p className="text-white">
                        {prod.status ? "Sim" : "Não"}
                      </p>
                    </h3>
                  </header>
                </article>

                <hr className="my-3" />
              </li>
            ))}
          </ol>
        </section>
      </section>
    </div>
  );
};

export default Home;
