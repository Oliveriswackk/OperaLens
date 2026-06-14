import type { RouteObject } from 'react-router-dom'
import { useState } from 'react'
import {
  Accessibility,
  Bell,
  BookOpen,
  ExternalLink,
  Globe,
  Info,
  Monitor,
  Shield,
  Sparkles,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { Table, TBody, Td, Th, THead, Tr } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  OptionGroup,
  SelectField,
  SettingsCard,
  ToggleRow,
} from '@/components/settings/SettingsControls'
import { useSettingsStore } from '@/stores/settingsStore'
import { useUiStore } from '@/stores/uiStore'
import { useUserStore } from '@/stores/userStore'

function AppearanceSection() {
  const { textSize, density, theme, set } = useSettingsStore()

  return (
    <SettingsCard title="Apariencia" subtitle="Personaliza el tamaño, densidad y tema de la interfaz">
      <OptionGroup
        label="Tamaño de texto"
        description="Ajusta la legibilidad del contenido"
        value={textSize}
        options={[
          { value: 'small', label: 'Pequeño' },
          { value: 'medium', label: 'Mediano' },
          { value: 'large', label: 'Grande' },
        ]}
        onChange={(v) => set('textSize', v)}
      />
      <OptionGroup
        label="Densidad de interfaz"
        description="Espaciado entre elementos de la UI"
        value={density}
        options={[
          { value: 'compact', label: 'Compacto' },
          { value: 'comfortable', label: 'Cómodo' },
          { value: 'spacious', label: 'Espacioso' },
        ]}
        onChange={(v) => set('density', v)}
      />
      <OptionGroup
        label="Tema"
        description="Modo claro u oscuro para el área de contenido"
        value={theme}
        options={[
          { value: 'light', label: 'Claro' },
          { value: 'dark', label: 'Oscuro' },
        ]}
        onChange={(v) => set('theme', v)}
      />
    </SettingsCard>
  )
}

function AccessibilitySection() {
  const { highContrast, reduceAnimations, keyboardNavigation, focusVisibility, set } =
    useSettingsStore()

  return (
    <SettingsCard title="Accesibilidad" subtitle="Opciones para mejorar la usabilidad y accesibilidad">
      <ToggleRow
        label="Modo de alto contraste"
        description="Incrementa el contraste entre texto y fondo"
        checked={highContrast}
        onChange={(v) => set('highContrast', v)}
      />
      <ToggleRow
        label="Reducir animaciones"
        description="Minimiza transiciones y efectos de movimiento"
        checked={reduceAnimations}
        onChange={(v) => set('reduceAnimations', v)}
      />
      <ToggleRow
        label="Navegación por teclado"
        description="Atajos y navegación optimizada con teclado"
        checked={keyboardNavigation}
        onChange={(v) => set('keyboardNavigation', v)}
      />
      <ToggleRow
        label="Visibilidad de foco"
        description="Resalta claramente el elemento activo al navegar"
        checked={focusVisibility}
        onChange={(v) => set('focusVisibility', v)}
      />
    </SettingsCard>
  )
}

function NotificationsSection() {
  const {
    systemAlerts,
    riskAlerts,
    inventoryAlerts,
    aiRecommendations,
    emailNotifications,
    set,
  } = useSettingsStore()

  return (
    <SettingsCard title="Notificaciones" subtitle="Controla qué alertas e insights recibes">
      <ToggleRow
        label="Alertas del sistema"
        description="Eventos generales de la plataforma"
        checked={systemAlerts}
        onChange={(v) => set('systemAlerts', v)}
      />
      <ToggleRow
        label="Alertas de riesgo"
        description="Anomalías y scores de riesgo operativo"
        checked={riskAlerts}
        onChange={(v) => set('riskAlerts', v)}
      />
      <ToggleRow
        label="Alertas de inventario"
        description="Stock crítico, rotación y capital inmovilizado"
        checked={inventoryAlerts}
        onChange={(v) => set('inventoryAlerts', v)}
      />
      <ToggleRow
        label="Recomendaciones IA"
        description="Insights y sugerencias del motor de inteligencia"
        checked={aiRecommendations}
        onChange={(v) => set('aiRecommendations', v)}
      />
      <ToggleRow
        label="Notificaciones por email"
        description="Resúmenes y alertas críticas por correo"
        checked={emailNotifications}
        onChange={(v) => set('emailNotifications', v)}
      />
    </SettingsCard>
  )
}

function UserExperienceSection() {
  const {
    autoCollapseSidebar,
    enableTooltips,
    showOnboardingTips,
    rememberNavigationState,
    set,
  } = useSettingsStore()
  const setSidebarCollapsed = useUiStore((s) => s.setSidebarCollapsed)

  return (
    <SettingsCard title="Experiencia de usuario" subtitle="Preferencias de navegación e interacción">
      <ToggleRow
        label="Auto-contraer barra lateral"
        description="Contrae el menú automáticamente en pantallas medianas"
        checked={autoCollapseSidebar}
        onChange={(v) => {
          set('autoCollapseSidebar', v)
          if (v) setSidebarCollapsed(true)
        }}
      />
      <ToggleRow
        label="Habilitar tooltips"
        description="Muestra etiquetas al pasar el cursor con el menú contraído"
        checked={enableTooltips}
        onChange={(v) => set('enableTooltips', v)}
      />
      <ToggleRow
        label="Mostrar tips de onboarding"
        description="Sugerencias contextuales para nuevos usuarios"
        checked={showOnboardingTips}
        onChange={(v) => set('showOnboardingTips', v)}
      />
      <ToggleRow
        label="Recordar estado de navegación"
        description="Mantiene las secciones expandidas entre sesiones"
        checked={rememberNavigationState}
        onChange={(v) => set('rememberNavigationState', v)}
      />
    </SettingsCard>
  )
}

function LanguageRegionSection() {
  const { language, timeFormat, dateFormat, currencyFormat, set } = useSettingsStore()

  return (
    <SettingsCard title="Idioma y región" subtitle="Formatos regionales y preferencias de localización">
      <SelectField
        label="Idioma"
        description="Idioma de la interfaz"
        value={language}
        options={[
          { value: 'es', label: 'Español' },
          { value: 'en', label: 'English' },
          { value: 'pt', label: 'Português' },
        ]}
        onChange={(v) => set('language', v)}
      />
      <OptionGroup
        label="Formato de hora"
        value={timeFormat}
        options={[
          { value: '12h', label: '12 h' },
          { value: '24h', label: '24 h' },
        ]}
        onChange={(v) => set('timeFormat', v)}
      />
      <SelectField
        label="Formato de fecha"
        value={dateFormat}
        options={[
          { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
          { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
          { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
        ]}
        onChange={(v) => set('dateFormat', v)}
      />
      <SelectField
        label="Formato de moneda"
        value={currencyFormat}
        options={[
          { value: 'MXN', label: 'MXN — Peso mexicano' },
          { value: 'USD', label: 'USD — Dólar estadounidense' },
          { value: 'EUR', label: 'EUR — Euro' },
          { value: 'COP', label: 'COP — Peso colombiano' },
        ]}
        onChange={(v) => set('currencyFormat', v)}
      />
    </SettingsCard>
  )
}

function AccountSection() {
  const { nombre, rol, iniciales } = useUserStore()

  return (
    <div className="space-y-6">
      <SettingsCard title="Información de perfil" subtitle="Datos personales de tu cuenta">
        <div className="flex items-center gap-4 py-4">
          <Avatar initials={iniciales} className="h-14 w-14 text-base" />
          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">{nombre}</p>
            <p className="text-sm text-zinc-500">{rol}</p>
          </div>
        </div>
        <div className="grid gap-4 py-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-zinc-500">Nombre completo</label>
            <Input defaultValue={nombre} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-zinc-500">Correo electrónico</label>
            <Input defaultValue="juan.davila@manufacturanorte.com" type="email" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-zinc-500">Teléfono</label>
            <Input defaultValue="+52 81 1234 5678" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-zinc-500">Cargo</label>
            <Input defaultValue={rol} />
          </div>
        </div>
        <div className="pb-2">
          <Button>Guardar perfil</Button>
        </div>
      </SettingsCard>

      <SettingsCard title="Cambiar contraseña" subtitle="Actualiza tu credencial de acceso">
        <div className="grid max-w-md gap-4 py-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-zinc-500">Contraseña actual</label>
            <Input type="password" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-zinc-500">Nueva contraseña</label>
            <Input type="password" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-zinc-500">Confirmar contraseña</label>
            <Input type="password" />
          </div>
          <Button className="w-fit">Actualizar contraseña</Button>
        </div>
      </SettingsCard>

      <SettingsCard title="Gestión de sesiones" subtitle="Dispositivos con sesión activa">
        <Table>
          <THead>
            <Tr>
              <Th>Dispositivo</Th>
              <Th>Ubicación</Th>
              <Th>Última actividad</Th>
              <Th>Estado</Th>
            </Tr>
          </THead>
          <TBody>
            <Tr>
              <Td className="font-medium text-zinc-900 dark:text-zinc-100">Windows · Chrome</Td>
              <Td>Monterrey, MX</Td>
              <Td className="text-zinc-400">Activo ahora</Td>
              <Td><Badge variant="success">Actual</Badge></Td>
            </Tr>
            <Tr>
              <Td className="font-medium text-zinc-900 dark:text-zinc-100">iPhone · Safari</Td>
              <Td>Monterrey, MX</Td>
              <Td className="text-zinc-400">hace 2 días</Td>
              <Td><Button variant="ghost" size="sm">Cerrar</Button></Td>
            </Tr>
          </TBody>
        </Table>
      </SettingsCard>
    </div>
  )
}

const loginHistory = [
  { id: '1', fecha: '12 Jun 2026, 09:14', ip: '192.168.1.42', dispositivo: 'Windows · Chrome', estado: 'exitoso' },
  { id: '2', fecha: '11 Jun 2026, 18:32', ip: '192.168.1.42', dispositivo: 'Windows · Chrome', estado: 'exitoso' },
  { id: '3', fecha: '10 Jun 2026, 22:01', ip: '201.144.88.12', dispositivo: 'iPhone · Safari', estado: 'exitoso' },
  { id: '4', fecha: '09 Jun 2026, 03:17', ip: '45.33.21.88', dispositivo: 'Desconocido', estado: 'bloqueado' },
]

const devices = [
  { id: '1', nombre: 'Laptop corporativa', tipo: 'Windows 11', ultimo: 'Activo ahora', confiable: true },
  { id: '2', nombre: 'iPhone 15 Pro', tipo: 'iOS 18', ultimo: 'hace 2 días', confiable: true },
  { id: '3', nombre: 'Tablet almacén', tipo: 'Android 14', ultimo: 'hace 5 días', confiable: false },
]

function SecuritySection() {
  const [twoFactor, setTwoFactor] = useState(true)

  return (
    <div className="space-y-6">
      <SettingsCard title="Autenticación de dos factores" subtitle="Capa adicional de seguridad para tu cuenta">
        <ToggleRow
          label="Autenticación de dos factores (2FA)"
          description="Requiere código de verificación al iniciar sesión"
          checked={twoFactor}
          onChange={setTwoFactor}
        />
        {twoFactor && (
          <div className="rounded-xl bg-primary/5 px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
            2FA activo mediante aplicación autenticadora. Última verificación: hace 3 días.
          </div>
        )}
      </SettingsCard>

      <SettingsCard title="Historial de inicio de sesión" subtitle="Registro de accesos recientes a tu cuenta">
        <Table>
          <THead>
            <Tr>
              <Th>Fecha</Th>
              <Th>IP</Th>
              <Th>Dispositivo</Th>
              <Th>Estado</Th>
            </Tr>
          </THead>
          <TBody>
            {loginHistory.map((entry) => (
              <Tr key={entry.id}>
                <Td>{entry.fecha}</Td>
                <Td className="font-mono text-xs">{entry.ip}</Td>
                <Td>{entry.dispositivo}</Td>
                <Td>
                  <Badge variant={entry.estado === 'exitoso' ? 'success' : 'danger'}>
                    {entry.estado === 'exitoso' ? 'Exitoso' : 'Bloqueado'}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </SettingsCard>

      <SettingsCard title="Gestión de dispositivos" subtitle="Dispositivos autorizados para acceder a la plataforma">
        <div className="divide-y divide-zinc-50 dark:divide-zinc-800">
          {devices.map((device) => (
            <div key={device.id} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{device.nombre}</p>
                <p className="text-xs text-zinc-500">
                  {device.tipo} · {device.ultimo}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {device.confiable ? (
                  <Badge variant="success">Confiable</Badge>
                ) : (
                  <Badge variant="warning">Pendiente</Badge>
                )}
                <Button variant="ghost" size="sm">Revocar</Button>
              </div>
            </div>
          ))}
        </div>
      </SettingsCard>
    </div>
  )
}

function AboutSection() {
  const setSupportOpen = useUiStore((s) => s.setSupportOpen)

  const links = [
    { label: 'Notas de la versión', href: '#', icon: Sparkles },
    { label: 'Documentación', href: '#', icon: BookOpen },
    { label: 'Centro de soporte', href: '#', icon: ExternalLink, opensSupport: true },
  ] as const

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-white to-secondary/5 p-8 shadow-card dark:from-primary/20 dark:via-zinc-900 dark:to-zinc-900">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
            <Sparkles className="h-7 w-7 text-white" />
          </span>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">OperaLens</h3>
            <p className="text-sm text-zinc-500">Plataforma de inteligencia de inventario impulsada por IA</p>
            <p className="mt-1 text-xs font-semibold text-primary">Versión 2.5.0 · Build 2026.06.12</p>
          </div>
        </div>
      </div>

      <SettingsCard title="Recursos" subtitle="Documentación, soporte y actualizaciones">
        <div className="divide-y divide-zinc-50 dark:divide-zinc-800">
          {links.map(({ label, href, icon: Icon, ...rest }) => {
            const opensSupport = 'opensSupport' in rest && rest.opensSupport
            const className =
              'flex w-full items-center justify-between gap-4 py-4 transition-colors hover:text-primary'
            const content = (
              <>
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-zinc-400" />
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {label}
                  </span>
                </div>
                <ExternalLink className="h-4 w-4 text-zinc-400" />
              </>
            )
            if (opensSupport) {
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setSupportOpen(true)}
                  className={className}
                >
                  {content}
                </button>
              )
            }
            return (
              <a key={label} href={href} className={className}>
                {content}
              </a>
            )
          })}
        </div>
      </SettingsCard>

      <SettingsCard title="Información legal" subtitle="">
        <p className="py-4 text-sm text-zinc-500">
          © 2026 OperaLens. Todos los derechos reservados. Esta plataforma utiliza análisis
          estadístico e inteligencia artificial para la detección de anomalías, riesgos operativos
          y optimización de inventario.
        </p>
      </SettingsCard>
    </div>
  )
}

export const settingsRoutes: RouteObject[] = [
  { path: 'appearance', element: <AppearanceSection /> },
  { path: 'accessibility', element: <AccessibilitySection /> },
  { path: 'notifications', element: <NotificationsSection /> },
  { path: 'experience', element: <UserExperienceSection /> },
  { path: 'language', element: <LanguageRegionSection /> },
  { path: 'account', element: <AccountSection /> },
  { path: 'security', element: <SecuritySection /> },
  { path: 'about', element: <AboutSection /> },
]

export const settingsNav = [
  { to: 'appearance', label: 'Apariencia', icon: Monitor },
  { to: 'accessibility', label: 'Accesibilidad', icon: Accessibility },
  { to: 'notifications', label: 'Notificaciones', icon: Bell },
  { to: 'experience', label: 'Experiencia', icon: Sparkles },
  { to: 'language', label: 'Idioma y región', icon: Globe },
  { to: 'account', label: 'Cuenta', icon: User },
  { to: 'security', label: 'Seguridad', icon: Shield },
  { to: 'about', label: 'Acerca de', icon: Info },
]
