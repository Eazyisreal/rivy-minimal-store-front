import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Link, useParams } from "react-router-dom";

import { Button } from "../components/ui/button";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useCart } from "../context/cartcontext";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useProduct(id!);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (product?.stock && newQuantity > product.stock) return;
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.imageUrl || product.image
    });

    toast.success(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to cart!`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Product not found</h2>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <Link to="/">
              <Button>Back to Catalog</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {product.imageUrl || product.image ? (
                    <img
                      src={product.imageUrl || product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-6xl">📦</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-2xl lg:text-3xl font-bold text-green-600">${product.price}</p>
            </div>

            {product.description && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            {product.stock > 0 && (
              <Card>
                <CardContent className="p-4 lg:p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="font-medium text-gray-900 mb-2 block">Quantity</label>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(quantity - 1)}
                          disabled={quantity <= 1}
                          className="h-10 w-10 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-16 text-center font-medium text-lg">{quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(quantity + 1)}
                          disabled={quantity >= product.stock}
                          className="h-10 w-10 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <Button
                      onClick={handleAddToCart}
                      className="w-full flex items-center gap-2 py-3"
                      size="lg"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add {quantity > 1 ? `${quantity} items` : '1 item'} to Cart
                    </Button>

                    <div className="text-center pt-2">
                      <span className="text-lg font-medium text-gray-900">
                        Total: <span className="text-green-600">${(product.price * quantity)}</span>
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {product.stock === 0 && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4 lg:p-6 text-center">
                  <p className="text-red-600 font-medium mb-2">This product is currently out of stock</p>
                  <p className="text-red-500 text-sm">Check back later for availability</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}