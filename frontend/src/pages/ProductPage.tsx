import { Card, CardContent } from "../components/ui/card";
import { Eye, ShoppingCart } from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useBrands } from "../api/brand";
import { useCart } from "../context/cartcontext";
import { useCategories } from "../api/categories";
import { useProducts } from "../api/product";
import { useState } from "react";

export default function CatalogPage() {
  const [filters, setFilters] = useState({
    search: "",
    categoryId: "",
    subCategoryId: "",
    brandId: "",
    min: undefined as number | undefined,
    max: undefined as number | undefined,
    page: 1,
    limit: 12,
  });

  const { data: products, isLoading, isError } = useProducts(filters);
  const { data: categories } = useCategories();
  const { data: brands } = useBrands();
  const { addItem } = useCart();

  const selectedCategory = categories?.find((c) => c.id === filters.categoryId);
  const subCategories = selectedCategory?.subCategories || [];

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.imageUrl || product.image
    });
    toast.success(`${product.name} added to cart!`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Failed to load products</h2>
            <p className="text-gray-600 mb-8">Please try again later</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-4 lg:p-6 space-y-6">
                <div>
                  <h2 className="font-semibold mb-3 text-gray-700">Search</h2>
                  <Input
                    placeholder="Search products..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  />
                </div>

                <div>
                  <h2 className="font-semibold mb-3 text-gray-700">Category</h2>
                  <select
                    className="w-full border rounded-lg p-2 bg-white"
                    value={filters.categoryId}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        categoryId: e.target.value,
                        subCategoryId: "",
                      })
                    }
                  >
                    <option value="">All Categories</option>
                    {categories?.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  {subCategories?.length > 0 && (
                    <select
                      className="w-full border rounded-lg p-2 mt-2 bg-white"
                      value={filters.subCategoryId}
                      onChange={(e) =>
                        setFilters({ ...filters, subCategoryId: e.target.value })
                      }
                    >
                      <option value="">All Subcategories</option>
                      {subCategories.map((sc) => (
                        <option key={sc.id} value={sc.id}>
                          {sc.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <h2 className="font-semibold mb-3 text-gray-700">Brand</h2>
                  <select
                    className="w-full border rounded-lg p-2 bg-white"
                    value={filters.brandId}
                    onChange={(e) =>
                      setFilters({ ...filters, brandId: e.target.value })
                    }
                  >
                    <option value="">All Brands</option>
                    {brands?.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <h2 className="font-semibold mb-3 text-gray-700">Price Range</h2>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          min: Number(e.target.value) || undefined,
                        })
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          max: Number(e.target.value) || undefined,
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <section className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Product Catalog</h1>
              <p className="text-gray-600">
                {products?.length ? `${products.length} products found` : "Browse our products"}
              </p>
            </div>

            {!products || products.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">No products found</h2>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white group"
                  >
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="text-gray-400 text-4xl">📦</div>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                      </div>
                      
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-lg font-bold text-green-600 mb-4">
                          ${product.price}
                        </p>
                        
                        <div className="mt-auto space-y-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                            </span>
                          </div>
                          
                          <div className="flex gap-2">
                            <Link to={`/product/${product.id}`} className="flex-1">
                              <Button 
                                variant="outline" 
                                className="w-full flex items-center gap-1 text-xs"
                                size="sm"
                              >
                                <Eye className="w-3 h-3" />
                                View
                              </Button>
                            </Link>
                            <Button 
                              className="flex-1 flex items-center gap-1 text-xs"
                              onClick={() => handleAddToCart(product)}
                              disabled={product.stock === 0}
                              size="sm"
                            >
                              <ShoppingCart className="w-3 h-3" />
                              Add
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}