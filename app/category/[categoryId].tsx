// pages/category/[categoryId].tsx
import { useRouter } from 'next/router';

export default function CategoryDetailPage() {
  const router = useRouter();
  const { categoryId } = router.query;

  // Fetch products based on categoryId, similar to fetching categories
  // Render your products here

  return (
    <div>
      <h1>Products in Category: {categoryId}</h1>
      {/* List products here */}
    </div>
  );
}
