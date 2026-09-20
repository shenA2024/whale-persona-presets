# 来源与许可台账

> 规则：**本仓不出现许可不明的文本**。抄了别人的（MIT / CC0 / 公有领域）就在 `adapted/` 里逐件登记：
> 仓库 + 文件路径 + 许可 + 改了什么。原创的也登记（来源写"本仓原创"）。
> 触发来源：2026-09-20 维护者提出"关联仓能不能从 agency-agents 找点通用的"。
> 另一条同级纪律（同日拍板）：**私人标识零出现** —— 不写维护者的真名/关系/私有目录，`check.mjs` 有机器判据。

## 原创（`presets/`，共 15 张）

| 文件 | 用途一句话 | 许可 |
|---|---|---|
| `starter-plus` | 通用起步：纪律七条 + 一句立场 | MIT |
| `evidence-first` | 排障/研究：结论必须带证据，禁把猜测写成结论 | MIT |
| `teacher-patient` | 讲到你懂：小步、例子、能自查的练习 | MIT |
| `writer-tight` | 中文去水改稿：逐处交代改动 | MIT |
| `requirement-analyst` | 需求澄清：先问清再动手，一次问完 | MIT |
| `debug-partner` | 排障：假设-验证循环、二分定位、留回退点 | MIT |
| `refactor-surgeon` | 重构：行为不变、小步可回退、护栏先行 | MIT |
| `data-analyst` | 看数：口径先定、脏数据先说、图不撒谎 | MIT |
| `product-spec` | 产品评审：问题先于方案，给取舍与验收 | MIT |
| `study-coach` | 陪练：抽问、判卷、错题归因、安排复习 | MIT |
| `doc-organizer` | 整理：只留决定与待办，标出处 | MIT |
| `translator-zh` | 中英互译：术语一致、格式不动、不越界表态 | MIT |
| `security-reviewer` | 安全审查：威胁建模 + 按可利用性排序 | MIT |
| `prompt-engineer` | 提示词：自包含、判据可二值、封死假实现 | MIT |
| `team-lead` | 多智能体分工：领土制、交付物与验收写清 | MIT |

契约框架沿用了 whale-persona 本体 `core/presetStore.js` 里 starter 的语义（同一套字段与写法），
文字为本仓自写。

## 改编（`adapted/`，共 1 张）

| 文件 | 来源 | 许可 | 做了什么 |
|---|---|---|---|
| `reviewer-strict` | [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) · `engineering/engineering-code-reviewer.md` | **MIT** | **改编**：只取该文件的「Critical Rules + 评审分层」这一层纪律，映射成本引擎的逐条契约；身份句、措辞、"一次给完整意见"一条为本仓重写；**未复制其正文段落**。原许可与出处在此登记。 |

## 关于 agency-agents（为什么只借一点点）

- 体量：约 15.4 万星（中文版 2.08 万星、277 个角色、覆盖 20 个部门）；许可 **MIT**，可改编可商用（保留许可声明）。
- 形态：**角色提示词**（"你是 Reddit 社区运营专家…"），目标是"这个 agent 会干那件事"。
- 我们的形态：**人设引擎的预设**（立场 + 可勾选工作契约），目标是"这个 AI 长期怎么和你干活"。
- 结论：**不搬角色，只借纪律层**。搬角色 = 本引擎变成又一个角色库（自毁长处，每轮注入还会暴涨）；
  借纪律 = 恰好补我们稀缺的那一项。要扩内容，走"把某一类工作的纪律写清楚"，而不是"把部门数量堆上去"。
