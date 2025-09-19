// import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
// import { Card, CardContent } from "../components/ui/card";

// import { Button } from "../components/ui/button";
// import { Link } from "react-router-dom";
// import api from "../api/axios";
// import toast from "react-hot-toast";
// import { useCart } from "../context/cartcontext";
// import { useState } from "react";

// export default function CartPage() {
//   const { items, updateQuantity, removeItem, clearCart } = useCart();
//   const [isLoading, setIsLoading] = useState(false);

//   const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//   const handleQuantityChange = (id: string, newQuantity: number) => {
//     if (newQuantity < 1) {
//       removeItem(id);
//     } else {
//       updateQuantity(id, newQuantity);
//     }
//   };

//   const handleCheckout = async () => {
//     if (items.length === 0) {
//       toast.error("Your cart is empty");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const orderData = {
//         orderItems: items.map(item => ({
//           productId: item.id,
//           quantity: item.quantity,
//           unitPrice: item.price.toString()
//         })),
//         total: total.toString()
//       };

//       await api.post("/orders", orderData);
//       toast.success("Order placed successfully!");
//       clearCart();
//     } catch (error) {
//       console.error("Checkout failed:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (items.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="max-w-2xl mx-auto px-4">
//           <div className="text-center py-16">
//             <div className="text-6xl mb-4">🛒</div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
//             <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
//             <Link to="/">
//               <Button className="flex items-center gap-2">
//                 <ArrowLeft className="w-4 h-4" />
//                 Continue Shopping
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         <div className="mb-6">
//           <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4">
//             <ArrowLeft className="w-4 h-4" />
//             Continue Shopping
//           </Link>
//           <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
//           <p className="text-gray-600">{items.length} item(s) in your cart</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2 space-y-4">
//             {items.map((item) => (
//               <Card key={item.id} className="overflow-hidden">
//                 <CardContent className="p-4">
//                   <div className="flex items-center gap-4">
//                     <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
//                       {item.image ? (
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center text-gray-400">
//                           📦
//                         </div>
//                       )}
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
//                       <p className="text-green-600 font-medium">${item.price}</p>
//                     </div>

//                     <div className="flex items-center gap-2">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
//                         className="h-8 w-8 p-0"
//                       >
//                         <Minus className="w-3 h-3" />
//                       </Button>
//                       <span className="w-8 text-center font-medium">{item.quantity}</span>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
//                         className="h-8 w-8 p-0"
//                       >
//                         <Plus className="w-3 h-3" />
//                       </Button>
//                     </div>

//                     <div className="text-right">
//                       <p className="font-semibold text-gray-900">
//                         ${(item.price * item.quantity)}
//                       </p>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => removeItem(item.id)}
//                         className="text-red-500 hover:text-red-700 mt-1"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <Card className="sticky top-24">
//               <CardContent className="p-6">
//                 <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
//                 <div className="space-y-2 mb-4">
//                   <div className="flex justify-between text-gray-600">
//                     <span>Subtotal ({items.length} items)</span>
//                     <span>${total}</span>
//                   </div>
//                   <div className="flex justify-between text-gray-600">
//                     <span>Shipping</span>
//                     <span>Free</span>
//                   </div>
//                   <div className="border-t pt-2 mt-4">
//                     <div className="flex justify-between font-semibold text-lg">
//                       <span>Total</span>
//                       <span>${total}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <Button 
//                   onClick={handleCheckout} 
//                   disabled={isLoading}
//                   className="w-full"
//                 >
//                   {isLoading ? "Processing..." : "Proceed to Checkout"}
//                 </Button>

//                 <Button
//                   variant="outline"
//                   onClick={clearCart}
//                   className="w-full mt-2"
//                 >
//                   Clear Cart
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { CustomerInfo, ShippingAddress, useCheckout } from "../api/checkout";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cartcontext";
import { useState } from "react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const checkoutMutation = useCheckout();
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    email: "",
    firstName: "",
    lastName: "",
    phone: ""
  });
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA"
  });
  
  const [paymentMethod, setPaymentMethod] = useState<"credit_card" | "paypal" | "bank_transfer">("credit_card");

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setShowCheckoutForm(true);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Validate required fields
    const requiredCustomerFields: (keyof CustomerInfo)[] = ['email', 'firstName', 'lastName'];
    const requiredAddressFields: (keyof ShippingAddress)[] = ['street', 'city', 'state', 'zipCode', 'country'];
    
    for (const field of requiredCustomerFields) {
      if (!customerInfo[field]) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }
    
    for (const field of requiredAddressFields) {
      if (!shippingAddress[field]) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }

    try {
      const checkoutData = {
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity
        })),
        customerInfo,
        shippingAddress,
        paymentMethod
      };

      const response = await checkoutMutation.mutateAsync(checkoutData);
      
      if (response.success) {
        toast.success(response.message || "Order placed successfully!");
        console.log("Order details:", response.data);
        clearCart();
        setShowCheckoutForm(false);
        
        // Reset form
        setCustomerInfo({
          email: "",
          firstName: "",
          lastName: "",
          phone: ""
        });
        setShippingAddress({
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "USA"
        });
      } else {
        toast.error("Order placement failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Checkout failed:", error);
      const errorMessage = error.response?.data?.message || "Checkout failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
            <Link to="/">
              <Button className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (showCheckoutForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setShowCheckoutForm(false)}
              className="flex items-center gap-2 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          </div>

          <form onSubmit={handleCheckout}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Customer Information */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <Input
                          required
                          value={customerInfo.firstName}
                          onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <Input
                          required
                          value={customerInfo.lastName}
                          onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          required
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <Input
                          type="tel"
                          value={customerInfo.phone || ""}
                          onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Street Address *
                        </label>
                        <Input
                          required
                          value={shippingAddress.street}
                          onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City *
                          </label>
                          <Input
                            required
                            value={shippingAddress.city}
                            onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State *
                          </label>
                          <Input
                            required
                            value={shippingAddress.state}
                            onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ZIP Code *
                          </label>
                          <Input
                            required
                            value={shippingAddress.zipCode}
                            onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country *
                        </label>
                        <select 
                          className="w-full border rounded-lg p-2"
                          value={shippingAddress.country}
                          onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                          required
                        >
                          <option value="USA">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="Mexico">Mexico</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                    <div className="space-y-2">
                      {[
                        { value: 'credit_card' as const, label: 'Credit Card' },
                        { value: 'paypal' as const, label: 'PayPal' },
                        { value: 'bank_transfer' as const, label: 'Bank Transfer' }
                      ].map((method) => (
                        <label key={method.value} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.value}
                            checked={paymentMethod === method.value}
                            onChange={(e) => setPaymentMethod(e.target.value as typeof paymentMethod)}
                          />
                          {method.label}
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    
                    <div className="space-y-2 mb-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.name} (×{item.quantity})</span>
                          <span>${(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 mb-4 border-t pt-4">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal ({items.length} items)</span>
                        <span>${total}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="border-t pt-2 mt-4">
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span>${total}</span>
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="submit"
                      disabled={checkoutMutation.isPending}
                      className="w-full"
                    >
                      {checkoutMutation.isPending ? "Processing..." : "Place Order"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600">{items.length} item(s) in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          📦
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                      <p className="text-green-600 font-medium">${item.price}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${(item.price * item.quantity)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 mt-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({items.length} items)</span>
                    <span>${total}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t pt-2 mt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleProceedToCheckout}
                  className="w-full"
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-full mt-2"
                >
                  Clear Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}