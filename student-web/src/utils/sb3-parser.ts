import JSZip from 'jszip'
import { translateOpcode, opcodeCategory } from './opcode-dict'

// sb3 解析后的项目摘要
export interface PptOutline {
  projectName: string
  spriteCount: number
  totalBlocks: number
  sprites: SpriteInfo[]
  knowledgePoints: Record<string, number> // 分类 → 数量
  blockSummary: string // 积木逻辑摘要(喂给 AI)
}

export interface SpriteInfo {
  name: string
  costumeCount: number
  soundCount: number
  blockCount: number
  scripts: string[]
  thumbnail?: string
}

// 解析 sb3 文件,产出教学摘要
export async function parseSb3(file: File | Blob): Promise<PptOutline> {
  const zip = await JSZip.loadAsync(file)
  const projectJson = await zip.file('project.json')!.async('string')
  const project = JSON.parse(projectJson)

  const targets = project.targets || []
  const sprites: SpriteInfo[] = []
  const knowledgePoints: Record<string, number> = {}
  let totalBlocks = 0
  let blockSummary = ''

  for (const target of targets) {
    if (target.isStage) continue
    const blocks = target.blocks || {}
    const blockCount = Object.values(blocks).filter((b: any) => typeof b === 'object').length
    totalBlocks += blockCount

    const scripts = extractScripts(blocks)

    for (const b of Object.values(blocks) as any[]) {
      if (typeof b === 'object' && b?.opcode) {
        const cat = opcodeCategory(b.opcode)
        knowledgePoints[cat] = (knowledgePoints[cat] || 0) + 1
      }
    }

    let thumbnail: string | undefined
    if (target.costumes?.[0]?.md5ext) {
      const assetFile = zip.file(target.costumes[0].md5ext)
      if (assetFile) {
        const blob = await assetFile.async('blob')
        thumbnail = await blobToDataURL(blob)
      }
    }

    sprites.push({
      name: target.name,
      costumeCount: target.costumes?.length || 0,
      soundCount: target.sounds?.length || 0,
      blockCount,
      scripts,
      thumbnail,
    })

    if (scripts.length) {
      blockSummary += `\n【角色: ${target.name}】(${blockCount}块)\n`
      blockSummary += scripts.slice(0, 5).join('\n') + '\n'
    }
  }

  return {
    projectName: project.meta?.semver || 'Scratch项目',
    spriteCount: sprites.length,
    totalBlocks,
    sprites,
    knowledgePoints,
    blockSummary: blockSummary.slice(0, 8000),
  }
}

function extractScripts(blocks: Record<string, any>): string[] {
  const scripts: string[] = []
  const hats = Object.values(blocks).filter((b: any) =>
    typeof b === 'object' && b.opcode &&
    (b.opcode.startsWith('event_') || b.opcode === 'procedures_definition') &&
    !b.parent
  )
  for (const hat of hats) {
    const chain = followChain(blocks, hat)
    if (chain) scripts.push(chain)
  }
  return scripts
}

function followChain(blocks: Record<string, any>, start: any): string {
  const parts: string[] = []
  let current: any = start
  let depth = 0
  while (current && depth < 20) {
    const desc = translateOpcode(current.opcode)
    const inputs = current.inputs || {}
    const args: string[] = []
    for (const [, val] of Object.entries(inputs)) {
      const v = val as any
      if (Array.isArray(v) && v[1] && typeof v[1] === 'string') {
        const blockRef = blocks[v[1]]
        if (!blockRef && v.length > 2 && v[2]) args.push(String(v[2]))
      } else if (Array.isArray(v) && v.length > 1 && v[1] !== null && typeof v[1] !== 'object') {
        args.push(String(v[1]))
      }
    }
    const argStr = args.length ? `(${args.join(', ')})` : ''
    parts.push(desc + argStr)
    if (current.next && blocks[current.next]) {
      current = blocks[current.next]
    } else {
      break
    }
    depth++
  }
  return parts.join(' → ')
}

function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.readAsDataURL(blob)
  })
}
