import fs from "fs"
import path from "path"

const file = path.join(process.cwd(), "data/projects.json")

export default function handler(req, res) {
  const { project, key } = req.query
  const data = JSON.parse(fs.readFileSync(file))

  const proj = data.find(p => p.id === project)
  if (!proj) return res.json({ valid: false })

  const k = proj.keys.find(k => k.key === key)
  if (!k) return res.json({ valid: false })

  if (Date.now() > k.expiresAt)
    return res.json({ valid: false, expired: true })

  res.json({ valid: true })
}
