# 来源与许可台账

> 规则：**本仓不出现许可不明的文本**。抄了别人的（MIT / CC0 / 公有领域）就要在这里逐件登记：
> 仓库 + 文件路径 + 许可 + 改了什么。原创的也登记一行（来源写"本仓原创"）。
> 触发来源：2026-09-20 维护者提出"关联仓能不能从 agency-agents 找点通用的"。

| 文件 | 来源 | 许可 | 做了什么 |
|---|---|---|---|
| `presets/starter-plus.json` | 本仓原创（契约框架沿用 whale-persona 本体 `core/presetStore.js` 的 starter 语义） | MIT | 创作；在通用五条上加「省 token」「动手前想清影响面」两条 |
| `presets/evidence-first.json` | 本仓原创 | MIT | 创作 |
| `presets/teacher-patient.json` | 本仓原创 | MIT | 创作 |
| `presets/writer-tight.json` | 本仓原创 | MIT | 创作 |
| `adapted/reviewer-strict.json` | [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) · `engineering/engineering-code-reviewer.md` | **MIT** | **改编**：只取该文件的「Critical Rules + 评审分层」这一层纪律，映射成本引擎的逐条契约；身份句、措辞、"一次给完整意见"一条为本仓重写；**未复制其正文段落**。原许可与出处已在此登记。 |

## 关于 agency-agents（为什么只借一点点）

- 它的体量：约 15.4 万星（中文版 2.08 万星，277 个角色，覆盖 20 个部门）；许可 **MIT**，可改编可商用（需保留许可见 LICENSE）。
- 它的形态：**角色提示词**（"你是 Reddit 社区运营专家…"），目标是"这个 agent 会干那件事"。
- 我们的形态：**人设引擎的预设**（立场 + 可勾选工作契约），目标是"这个 AI 长期怎么和你干活"。
- 结论：**不搬它的角色，只借它的纪律层**。搬角色 = 把本引擎变成又一个角色库（自毁长处，且每轮注入暴涨）；
  借纪律 = 恰好补我们的稀缺项。要扩内容，走"把某一类工作的纪律写清楚"这条路，而不是"把部门数量堆上去"。
