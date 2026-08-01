import { PptOutline } from '@/utils/sb3-parser'

export interface SlideData {
  title: string
  content?: string
  bullets?: string[]
  image?: string // base64 dataURL
  bg?: string
}

// 基于解析结果,用教学模板生成幻灯片(原型阶段,后续接 AI 增强)
export function generateSlides(o: PptOutline): SlideData[] {
  const slides: SlideData[] = []

  // 1. 封面
  slides.push({
    title: o.projectName,
    content: `Scratch 作品教学解析\n角色 ${o.spriteCount} 个 · 积木 ${o.totalBlocks} 块`,
    bg: '#1890ff',
  })

  // 2. 项目简介
  const topCats = Object.entries(o.knowledgePoints).sort((a, b) => b[1] - a[1]).slice(0, 5)
  slides.push({
    title: '项目简介',
    bullets: [
      `本项目共包含 ${o.spriteCount} 个角色`,
      `使用 ${o.totalBlocks} 个积木块`,
      `主要知识点:${topCats.map(c => c[0]).join('、')}`,
      `积木分类:${topCats.map(c => `${c[0]}(${c[1]})`).join('、')}`,
    ],
  })

  // 3. 知识点分布
  slides.push({
    title: '知识点分布',
    bullets: Object.entries(o.knowledgePoints).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}: ${v} 个积木`),
    content: '通过分析积木使用情况,了解项目涉及的主要编程概念',
  })

  // 4-5. 主要角色(积木最多的前5)介绍 + 逻辑
  const mainSprites = [...o.sprites].sort((a, b) => b.blockCount - a.blockCount).slice(0, 5)
  for (const s of mainSprites) {
    slides.push({
      title: `角色:${s.name}`,
      image: s.thumbnail,
      bullets: [
        `造型数:${s.costumeCount}`,
        `声音数:${s.soundCount}`,
        `积木数:${s.blockCount}`,
      ],
    })
    if (s.scripts.length) {
      slides.push({
        title: `${s.name} - 核心逻辑`,
        bullets: s.scripts.slice(0, 6).map(sc => sc.slice(0, 120)),
      })
    }
  }

  // 6. 教学总结
  slides.push({
    title: '教学总结',
    bullets: [
      '本作品综合运用了多种 Scratch 编程概念',
      `重点知识点:${topCats.slice(0, 3).map(c => c[0]).join('、')}`,
      '可通过修改参数/添加角色拓展功能',
      '鼓励学生尝试 remix 改编',
    ],
    bg: '#52c41a',
  })

  // 7. 拓展练习
  slides.push({
    title: '拓展练习',
    bullets: [
      '尝试添加新的角色和功能',
      '修改现有积木参数,观察效果变化',
      '思考如何优化代码结构',
      '能否用更少的积木实现相同功能?',
    ],
    bg: '#722ed1',
  })

  return slides
}
