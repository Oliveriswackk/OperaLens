import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '@/layouts/AppShell'
import DashboardPage from '@/pages/dashboard'
import CargarPage from '@/pages/cargar'
import HistorialPage from '@/pages/historial'
import HistorialDetallePage from '@/pages/historial/detalle'
import InventoryPage from '@/pages/inventory'
import AlertsPage from '@/pages/alerts'
import OperationsPage from '@/pages/operations'
import InsightsPage from '@/pages/insights'
import ReportsPage from '@/pages/reports'
import SettingsPage from '@/pages/settings'
import { settingsRoutes } from '@/pages/settings/sections'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'cargar', element: <CargarPage /> },
      { path: 'inventario', element: <InventoryPage /> },
      { path: 'alerts', element: <AlertsPage /> },
      { path: 'operations', element: <OperationsPage /> },
      { path: 'insights', element: <InsightsPage /> },
      { path: 'historial', element: <HistorialPage /> },
      { path: 'historial/:id', element: <HistorialDetallePage /> },
      { path: 'reports', element: <ReportsPage /> },
      {
        path: 'settings',
        element: <SettingsPage />,
        children: [
          { index: true, element: <Navigate to="appearance" replace /> },
          ...settingsRoutes,
        ],
      },
      { path: 'analytics', element: <Navigate to="/" replace /> },
      { path: 'integrations', element: <Navigate to="/cargar" replace /> },
      { path: 'inventario-old', element: <Navigate to="/inventario" replace /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
