import { ArrowLeft, Calendar, DollarSign, Package, Truck } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Link, useParams } from "react-router-dom";

import { Button } from "../components/ui/button";
import { useOrder } from "../api/order";

const statusColors = {
  placed: "bg-blue-100 text-blue-800",
  processing: "bg-yellow-100 text-yellow-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800"
};

const statusLabels = {
  placed: "Placed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled"
};

const orderSteps = [
  { key: "placed", label: "Order Placed", icon: Package },
  { key: "processing", label: "Processing", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Package }
];

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, isError } = useOrder(id!);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Order not found</h2>
            <p className="text-gray-600 mb-8">The order you're looking for doesn't exist or you don't have permission to view it.</p>
            <Link to="/orders">
              <Button>Back to Orders</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStepStatus = (stepKey: string) => {
    const currentIndex = orderSteps.findIndex(step => step.key === order.status);
    const stepIndex = orderSteps.findIndex(step => step.key === stepKey);
    
    if (order.status === "cancelled") {
      return stepIndex === 0 ? "completed" : "cancelled";
    }
    
    return stepIndex <= currentIndex ? "completed" : "pending";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Link to="/orders" className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order #{order.id.slice(-8)}</h1>
              <p className="text-gray-600 mt-1">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
              {statusLabels[order.status]}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {order.status !== "cancelled" && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Order Progress</h2>
                  <div className="relative">
                    <div className="absolute top-5 left-4 w-0.5 h-32 bg-gray-200"></div>
                    {orderSteps.map((step) => {
                      const status = getStepStatus(step.key);
                      const Icon = step.icon;
                      
                      return (
                        <div key={step.key} className="relative flex items-center mb-6 last:mb-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                            status === "completed" ? "bg-green-500 text-white" :
                            status === "pending" ? "bg-gray-200 text-gray-400" :
                            "bg-red-500 text-white"
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="ml-4">
                            <p className={`font-medium ${
                              status === "completed" ? "text-gray-900" : "text-gray-400"
                            }`}>
                              {step.label}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                <div className="space-y-4">
                  {order.orderItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                        {item.product?.image ? (
                          <img
                            src={item.product.image}
                            alt={item.product?.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            📦
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {item.product?.name || `Product ${item.productId.slice(-8)}`}
                        </h3>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-green-600 font-medium">${parseFloat(item.unitPrice).toFixed(2)} each</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${(parseFloat(item.unitPrice) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Package className="w-4 h-4" />
                    <span className="text-sm">{order.orderItems.length} item(s)</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">Total: ${parseFloat(order.total).toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg mb-4">
                    <span>Total Paid</span>
                    <span>${parseFloat(order.total).toFixed(2)}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/orders">View All Orders</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/">Continue Shopping</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}