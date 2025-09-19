import { Package, ShoppingCart } from "lucide-react";

import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartcontext";

export default function Header() {
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Rivy Store</h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Products
            </Link>
            <Link 
              to="/orders" 
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              Orders
            </Link>
          </nav>

          <Link to="/cart">
            <Button variant="outline" className="relative">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}