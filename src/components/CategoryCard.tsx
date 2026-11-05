import type { Category } from '../types'
import { useApp } from '../context'
import { CategoryImage } from './ProductImage'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const { navigate } = useApp()

  return (
    <button
      className="flex w-[120px] shrink-0 flex-col gap-2 border-0 bg-transparent p-0 text-center transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-brand-gold"
      onClick={() => navigate('category', { categoryId: category })}
      aria-label={`Browse ${category}`}
    >
      <div className="overflow-hidden rounded-xl border border-brand-border transition-transform">
        <CategoryImage category={category} />
      </div>
      <span className="text-xs font-semibold leading-tight text-brand-ink">
        {category}
      </span>
    </button>
  )
}
