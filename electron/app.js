const loadBtn = document.getElementById("load");
const ul = document.getElementById("list");

loadBtn.onclick = async () => {
  ul.innerHTML = "";

  const res = await fetch("http://localhost:3000/updates");
  const data = await res.json();

  data.modules.forEach(m => {
    const li = document.createElement("li");
    li.textContent = `${m.id} (v${m.version})`;
    li.onclick = () => assign(m.id);
    ul.appendChild(li);
  });
};

async function assign(moduleId) {
  const res = await fetch("http://localhost:3000/assign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ module: moduleId })
  });

  const info = await res.json();
  alert(JSON.stringify(info, null, 2));
}
