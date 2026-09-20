#!/usr/bin/env node
/**
 * 内容包自检（本仓唯一门禁）
 *
 * 两层判据：
 *   ① 结构层：spec / id 与文件名一致 / label / description / character / 契约（id 唯一、text 非空、≤120 字）；
 *   ② 真引擎层：把每张卡真的丢给引擎的 scripts/presets.mjs import（临时 DSH_HOME，不碰使用者的配置）——
 *      "能不能用"由引擎说了算，不是本仓自己想象的形状。没跑过这一层，卡就不算验证过。
 *
 * 跑法：node check.mjs    （引擎默认 D:/Tool/src/whale-persona，可用 WHALE_HARNESS 覆盖）
 * 退出码非 0 = 有失败。
 */
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.dirname(fileURLToPath(import.meta.url))
const HARNESS = process.env.WHALE_HARNESS || 'D:/Tool/src/whale-persona'
const SPEC = 'whale-persona-preset/1'
const MAX_CONTRACT = 120

let fail = 0
const t = (where, name, ok) => {
  console.log(where + ' ' + name + ': ' + ok)
  if (!ok) { fail++; process.exitCode = 1 }
}

function filesIn(dir) {
  try {
    return readdirSync(path.join(ROOT, dir)).filter((n) => n.endsWith('.json')).map((n) => dir + '/' + n)
  } catch {
    return []
  }
}

const list = filesIn('presets').concat(filesIn('adapted'))
t('ALL', '至少有内容（不是空跑）', list.length > 0)

// 隐私层（2026-09-20 维护者的红线）：本仓是**公开**的 —— 只放通用内容，
// 不许出现维护者的私人标识（人名 / 关系 / 私有工作目录）。词表拆开写 + 跳过本文件，避免自命中。
const PRIVATE = [
  ['鲸', '鱼', '姐', '姐'].join(''),
  ['徐', '石'].join(''),
  ['DS', '与', '<maintainer>'].join(''),
  ['Ti', 'Shi', 'Ci'].join(''),
  ['Warm', 'stone'].join(''),
  [String.fromCharCode(51, 51, 53, 48, 51)].join(''), // 本机用户名片段
]
const SELF = path.basename(fileURLToPath(import.meta.url))
function walkText(dir, acc) {
  const out = acc || []
  for (const name of readdirSync(dir)) {
    if (name === '.git' || name === 'node_modules') continue
    const p = path.join(dir, name)
    if (statSync(p).isDirectory()) walkText(p, out)
    else if (/\.(js|mjs|json|md|txt|yml|yaml)$/.test(name)) out.push(p)
  }
  return out
}
const privHits = []
for (const p of walkText(ROOT, [])) {
  if (path.basename(p) === SELF) continue
  const txt = readFileSync(p, 'utf8')
  for (const pat of PRIVATE) if (txt.includes(pat)) privHits.push(path.relative(ROOT, p) + ' <- ' + pat)
}
t('ALL', '隐私：私人标识零出现（' + walkText(ROOT, []).length + ' 个文件）', privHits.length === 0, privHits.slice(0, 3).join(' | '))

const tmpHome = mkdtempSync(path.join(os.tmpdir(), 'wpp-check-'))
for (const rel of list) {
  const file = path.join(ROOT, rel)
  let card = null
  try {
    card = JSON.parse(readFileSync(file, 'utf8'))
  } catch (e) {
    t(rel, 'JSON 可解析', false)
    continue
  }
  const stem = path.basename(rel, '.json')
  const p = card.persona || {}
  const contracts = Array.isArray(p.contracts) ? p.contracts : []
  const ids = contracts.map((c) => String((c && c.id) || ''))
  t(rel, 'spec 正确', card.spec === SPEC)
  t(rel, 'id 与文件名一致', card.id === stem)
  t(rel, 'label / description 非空', !!String(card.label || '').trim() && !!String(card.description || '').trim())
  t(rel, '有身份正文', !!String(p.character || '').trim())
  t(rel, '不许带 memory 段', card.memory === undefined)
  t(rel, '契约 ' + contracts.length + ' 条（4~8）', contracts.length >= 4 && contracts.length <= 8)
  t(rel, '契约 id 唯一且非空', ids.length === contracts.length && ids.every((x) => /^[a-z0-9-]{2,32}$/.test(x)) && new Set(ids).size === ids.length)
  t(rel, '契约正文非空且 ≤ ' + MAX_CONTRACT + ' 字',
    contracts.every((c) => String((c && c.text) || '').trim().length > 0 && String(c.text).length <= MAX_CONTRACT))
  t(rel, '契约默认开启', contracts.every((c) => c && c.on === true))
  // 真引擎导入
  const r = spawnSync(process.execPath, [path.join(HARNESS, 'scripts', 'presets.mjs'), 'import', file], {
    encoding: 'utf8',
    env: Object.assign({}, process.env, { DSH_HOME: tmpHome, DSH_WHALE_CONFIG: path.join(tmpHome, 'whale-persona', 'config.json') }),
  })
  t(rel, '引擎导入成功', r.status === 0 && /导入|import|已存|saved/i.test(String(r.stdout || '')), String(r.stdout || r.stderr || '').trim().split('\n').slice(-1)[0].slice(0, 80))
}
rmSync(tmpHome, { recursive: true, force: true })
console.log(fail ? ('-- 失败 ' + fail + ' 项') : ('-- 内容包自检：' + list.length + ' 张卡全过'))
