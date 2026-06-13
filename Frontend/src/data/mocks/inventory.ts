import type { InventoryProduct } from '@/types/inventory'

function nivel(stock: number): InventoryProduct['nivelStock'] {
  if (stock <= 15) return 'bajo'
  if (stock <= 45) return 'medio'
  return 'alto'
}

function p(
  id: string,
  nombre: string,
  descripcion: string,
  stock: number,
  precioUnitario: number,
  volumenCompras: number,
): InventoryProduct {
  return { id, nombre, descripcion, stock, precioUnitario, volumenCompras, nivelStock: nivel(stock) }
}

export const inventoryProducts: InventoryProduct[] = [
  p('INV-001', 'Laptop HP ProBook 450 G9', 'Laptop empresarial 15.6" Intel Core i7, 16GB RAM', 12, 24999, 342),
  p('INV-002', 'Monitor Dell UltraSharp 27"', 'Monitor IPS QHD para estaciones de trabajo', 38, 8999, 218),
  p('INV-003', 'Teclado Mecánico RGB', 'Teclado mecánico retroiluminado switch red', 67, 1899, 156),
  p('INV-004', 'Mouse Gamer RGB', 'Mouse óptico 16000 DPI con iluminación RGB', 94, 649, 47),
  p('INV-005', 'Impresora LaserJet Pro M404', 'Impresora láser monocromática oficina', 8, 7499, 89),
  p('INV-006', 'Disco SSD NVMe 1TB', 'Almacenamiento NVMe Gen4 alta velocidad', 52, 2199, 203),
  p('INV-007', 'Memoria RAM DDR4 16GB', 'Módulo RAM 3200MHz para equipos desktop', 29, 1299, 178),
  p('INV-008', 'Webcam Logitech C920', 'Cámara HD 1080p para videoconferencias', 41, 1599, 134),
  p('INV-009', 'Audífonos Bluetooth JBL', 'Audífonos inalámbricos cancelación de ruido', 22, 2799, 112),
  p('INV-010', 'Tablet Samsung Galaxy Tab A8', 'Tablet 10.5" para operaciones de campo', 15, 5499, 76),
  p('INV-011', 'Router WiFi 6 TP-Link', 'Router dual band para redes corporativas', 33, 3299, 95),
  p('INV-012', 'Switch de Red 24 Puertos', 'Switch gigabit administrable capa 2', 11, 6899, 41),
  p('INV-013', 'UPS 1500VA APC', 'Sistema de respaldo de energía para servidores', 6, 4999, 28),
  p('INV-014', 'Docking Station USB-C', 'Estación de acoplamiento multipuerto', 44, 3499, 167),
  p('INV-015', 'Laptop HP EliteBook 840', 'Ultrabook premium 14" para ejecutivos', 19, 32999, 124),
  p('INV-016', 'Proyector Epson EB-X49', 'Proyector XGA para salas de juntas', 7, 11999, 33),
  p('INV-017', 'Escáner de Documentos Fujitsu', 'Escáner duplex alta velocidad', 13, 8999, 58),
  p('INV-018', 'Micrófono USB Blue Yeti', 'Micrófono condensador para streaming', 56, 4299, 91),
  p('INV-019', 'Hub USB 7-en-1 Anker', 'Concentrador USB-C con HDMI y Ethernet', 78, 899, 210),
  p('INV-020', 'Cable HDMI 2.1 3m', 'Cable certificado 4K 120Hz', 120, 349, 445),
  p('INV-021', 'Silla Ergonómica ErgoMax', 'Silla oficina soporte lumbar ajustable', 9, 8499, 62),
  p('INV-022', 'Escritorio Ajustable FlexDesk', 'Escritorio eléctrico sit-stand 140cm', 5, 12999, 19),
  p('INV-023', 'Archivador Metálico 4 Gavetas', 'Archivador oficina con cerradura', 14, 4599, 37),
  p('INV-024', 'Papel Bond Carta 5000 hojas', 'Resma papel blanco 75g oficina', 88, 899, 312),
  p('INV-025', 'Toner HP 58A Original', 'Cartucho tóner negro LaserJet compatible', 24, 1899, 186),
]

export const emptyInventoryProducts: InventoryProduct[] = []
