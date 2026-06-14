import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '@/layouts/AppShell'
import DashboardPage from '@/pages/dashboard'
import CargarPage from '@/pages/cargar'
import HistorialPage from '@/pages/historial'
import HistorialDetallePage from '@/pages/historial/detalle'
import AlertsPage from '@/pages/alerts'
import InsightsPage from '@/pages/insights'
import SettingsPage from '@/pages/settings'
import { settingsRoutes } from '@/pages/settings/sections'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'cargar', element: <CargarPage /> },
      { path: 'alerts', element: <AlertsPage /> },
      { path: 'insights', element: <InsightsPage /> },
      { path: 'historial', element: <HistorialPage /> },
      { path: 'historial/:id', element: <HistorialDetallePage /> },
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
      { path: 'inventario', element: <Navigate to="/" replace /> },
      { path: 'inventario-old', element: <Navigate to="/" replace /> },
      { path: 'operations', element: <Navigate to="/alerts" replace /> },
      { path: 'reports', element: <Navigate to="/historial" replace /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
