import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '@/layouts/AppShell'
import DashboardPage from '@/pages/dashboard'
import CargarPage from '@/pages/cargar'
import HistorialPage from '@/pages/historial'
import HistorialDetallePage from '@/pages/historial/detalle'
import SettingsPage from '@/pages/settings'
import { settingsRoutes } from '@/pages/settings/sections'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'cargar', element: <CargarPage /> },
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
      // Rutas mock viejas (tienda/ERP) redirigen al dashboard
      { path: 'operations', element: <Navigate to="/" replace /> },
      { path: 'analytics', element: <Navigate to="/" replace /> },
      { path: 'alerts', element: <Navigate to="/" replace /> },
      { path: 'reports', element: <Navigate to="/" replace /> },
      { path: 'insights', element: <Navigate to="/" replace /> },
      { path: 'inventario', element: <Navigate to="/" replace /> },
      { path: 'integrations', element: <Navigate to="/cargar" replace /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
