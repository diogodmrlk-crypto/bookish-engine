async function loadProjects() {
  const res = await fetch("/api/projects")
  const data = await res.json()

  const ul = document.getElementById("projects")
  ul.innerHTML = ""

  data.forEach(p => {
    const li = document.createElement("li")
    li.innerHTML = `
      <b>${p.name}</b> | ID: ${p.id}
      <button onclick="createKey('${p.id}')">Criar Key</button>
    `
    ul.appendChild(li)
  })
}

async function createProject() {
  const name = document.getElementById("projectName").value
  await fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  })
  loadProjects()
}

async function createKey(projectId) {
  const days = prompt("Dias de validade:")
  await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ projectId, days })
  })
  alert("Key criada")
}

loadProjects()
