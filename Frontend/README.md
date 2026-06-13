# OperaLens — Frontend

Plataforma SaaS de Inteligencia Operacional impulsada por IA. SPA desktop-first construida con React.

## Stack técnico

| Capa | Elección | Motivo |
|------|----------|--------|
| Build | Vite | DX rápida, HMR, estándar en startups tipo Vercel/Linear |
| Routing | React Router v7 | Rutas anidadas para shell + módulos |
| Estilos | Tailwind CSS v4 + CSS variables | Tokens de marca, utilidades, glassmorphism |
| Componentes base | Radix UI + shadcn/ui (customizado) | Accesibilidad + estética premium editable |
| Gráficos | Recharts + Tremor (opcional para KPI cards) | Visualizaciones tipo Tableau/Datadog |
| Estado servidor | TanStack Query | Cache, loading/error states, futura integración API |
| Estado UI | Zustand (ligero) | Sidebar colapsada, org seleccionada, tema |
| Iconos | Lucide React | Consistente con Linear/Notion |
| Tipografía | Inter (Google Fonts) | Legibilidad en dashboards, jerarquía clara |
| Formularios | React Hook Form + Zod | Configuración, constructor de reportes |
| Fechas | date-fns | Timelines y reportes programados |

## Desarrollo

```bash
npm install
npm run dev
```

La app corre en `http://localhost:5173`.

## Estructura de carpetas propuesta

```
Frontend/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── routes/
│   │   └── index.tsx              # Definición de rutas
│   ├── layouts/
│   │   └── AppShell.tsx           # Sidebar + TopBar + Outlet
│   ├── pages/
│   │   ├── dashboard/
│   │   ├── operations/
│   │   ├── analytics/
│   │   ├── alerts/
│   │   ├── reports/
│   │   ├── insights/
│   │   ├── integrations/
│   │   └── settings/
│   ├── components/
│   │   ├── layout/                # Sidebar, TopBar, OrgSwitcher
│   │   ├── ui/                    # shadcn: Button, Card, Table, etc.
│   │   ├── charts/                # LineChart, AreaChart, Gauge
│   │   ├── widgets/               # KpiCard, AiInsightCard, AlertBadge
│   │   └── shared/                # EmptyState, LoadingState, PageHeader
│   ├── design-system/
│   │   ├── tokens.css             # Variables CSS de marca
│   │   └── typography.ts
│   ├── lib/
│   │   ├── utils.ts               # cn(), formatters
│   │   └── api/                   # Cliente HTTP (stub → FastAPI)
│   ├── hooks/
│   ├── stores/                    # Zustand: uiStore, orgStore
│   ├── types/                     # Domain types alineados con Backend
│   └── data/
│       └── mocks/                 # Datos demo realistas por módulo
```

## Integración con el backend

Los tipos en `src/types/analysis.ts` siguen el contrato del backend FastAPI
(`Backend/services/analyzer.py`, `anomalies.py`, `ai/explainer.py`). Los hooks
consumen mocks vía `mockFetch`; cuando la API esté disponible, cambia cada hook
a `apiFetch` en `src/lib/api/client.ts` (URL configurable con `VITE_API_URL`,
por defecto `http://localhost:8000`).

## Referencias visuales

Los mockups que guían el diseño están en `docs/reference/`.

## Atajos

- `Ctrl/Cmd + K` — Command palette (búsqueda global)
- Botón **Asistente IA** en la barra superior — panel de copiloto contextual
