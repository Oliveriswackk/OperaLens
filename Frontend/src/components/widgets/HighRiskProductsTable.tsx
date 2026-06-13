import { Card, CardHeader } from '@/components/ui/card'
import { Table, TBody, THead, Th, Tr, Td } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import type { HighRiskProduct } from '@/types/dashboard'

interface HighRiskProductsTableProps {
  products: HighRiskProduct[]
}

function riskColor(score: number) {
  if (score >= 85) return 'bg-red-500'
  if (score >= 70) return 'bg-amber-500'
  return 'bg-primary'
}

export function HighRiskProductsTable({ products }: HighRiskProductsTableProps) {
  return (
    <Card>
      <CardHeader
        title="Productos de Alto Riesgo"
        subtitle="Mayor probabilidad de generar pérdidas por obsolescencia, merma o baja rotación"
      />
      <Table>
        <THead>
          <Tr>
            <Th>Producto</Th>
            <Th>SKU</Th>
            <Th>Días sin movimiento</Th>
            <Th>Pérdida estimada</Th>
            <Th>Riesgo</Th>
            <Th>Acción recomendada</Th>
          </Tr>
        </THead>
        <TBody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Td className="font-medium text-zinc-900">{product.product}</Td>
              <Td>
                <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-600">
                  {product.sku}
                </code>
              </Td>
              <Td>
                <span className="font-semibold text-amber-600">{product.daysWithoutMovement}</span>
                <span className="text-zinc-400"> días</span>
              </Td>
              <Td className="font-semibold text-red-600">{product.estimatedLoss}</Td>
              <Td>
                <div className="flex items-center gap-2">
                  <Progress
                    value={product.riskScore}
                    barClassName={riskColor(product.riskScore)}
                    className="h-1.5 w-16"
                  />
                  <span className="text-xs font-bold text-zinc-700">{product.riskScore}</span>
                </div>
              </Td>
              <Td className="text-sm text-primary">{product.action}</Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </Card>
  )
}
