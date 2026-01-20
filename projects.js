import fs from "fs"
import path from "path"
import crypto from "crypto"

const file = path.join(process.cwd(), "data/projects.json")

function read() {
  return JSON.parse(fs.readFileSync(file))
}

function save(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.json(read())
  }

  if (req.method === "POST") {
    const { name } = req.body
    const data = read()

    data.push({
      id: crypto.randomUUID(),
      name,
      keys: []
    })

    save(data)
    return res.json({ ok: true })
  }
}
