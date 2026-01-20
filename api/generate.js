import fs from "fs"
import path from "path"
import crypto from "crypto"

const file = path.join(process.cwd(), "data/projects.json")

export default function handler(req, res) {
  const { projectId, days } = req.body
  const data = JSON.parse(fs.readFileSync(file))

  const project = data.find(p => p.id === projectId)
  if (!project) return res.status(404).json({ error: "Projeto não existe" })

  project.keys.push({
    key: crypto.randomBytes(20).toString("hex"),
    expiresAt: Date.now() + days * 86400000
  })

  fs.writeFileSync(file, JSON.stringify(data, null, 2))
  res.json({ ok: true })
}
