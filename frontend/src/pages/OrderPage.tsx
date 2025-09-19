import { Calendar, DollarSign, Eye, Package } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useOrders } from "../api/order";

const statusColors = {
  placed: "bg-blue-100 text-blue-800",
  processing: "bg-yellow-100 text-yellow-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabels = {
  placed: "Placed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function OrdersPage() {
  const { data: orders, isLoading, isError } = useOrders();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Failed to load orders</h2>
            <p className="text-gray-600 mb-8">Please try again later</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-8">Start shopping to see your orders here</p>
            <Link to="/">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Your Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        <div className="space-y-4 lg:space-y-6">
          {orders.map((order) => {
            const items = order.items || [];
            return (
              <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4 lg:p-6">
                  {/* Mobile and Desktop Layout */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex items-start gap-3 lg:gap-4 flex-1">
                      <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                        <Package className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm lg:text-base">
                          Order #{order.id?.slice(-8) || "N/A"}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs lg:text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 flex-shrink-0" />
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleDateString()
                              : "N/A"}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3 flex-shrink-0" />
                            ${order.total ?? "0.00"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status and Actions */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-3 lg:flex-shrink-0">
                      <span
                        className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          statusColors[order.status] ?? "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {statusLabels[order.status] ?? order.status}
                      </span>
                      <Link to={`/order/${order.id}`} className="w-full sm:w-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center justify-center gap-2 w-full sm:w-auto text-xs lg:text-sm"
                        >
                          <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                          <span className="whitespace-nowrap">View Details</span>
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="border-t mt-4 pt-4">
                    <div className="flex flex-wrap gap-2 lg:gap-4">
                      {items.slice(0, 3).map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded"
                        >
                          <span className="font-medium">{item.quantity}x</span>
                          <span className="truncate max-w-[120px] lg:max-w-none">
                            {item.product?.name || `Product ${item.productId}`}
                          </span>
                        </div>
                      ))}
                      {items.length > 3 && (
                        <span className="text-xs lg:text-sm text-gray-500 flex items-center px-2 py-1">
                          +{items.length - 3} more item{items.length - 3 > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}