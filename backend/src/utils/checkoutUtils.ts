import Product from "../models/product";

export function calculateTotals(items: { price: number | string; quantity: number }[]) {
  const subtotal = items.reduce((sum, item) => {
    const price = Number(item.price);
    if (isNaN(price) || price < 0) {
      throw new Error(`Invalid price value: ${item.price}`);
    }
    return sum + price * item.quantity;
  }, 0);
  
  const taxRate = 0.08;
  const tax = Math.round(subtotal * taxRate * 100) / 100;
  const shippingThreshold = 100;
  const standardShipping = 10;
  const shipping = subtotal >= shippingThreshold ? 0 : standardShipping;
  const total = Math.round((subtotal + tax + shipping) * 100) / 100;

  return { subtotal, tax, shipping, total };
}



export async function simulatePayment(method: string, amount: number) {
  await new Promise(resolve => setTimeout(resolve, 50)); 

  const successRates = {
    credit_card: 0.95,
    paypal: 0.98,
    bank_transfer: 0.92
  };
  
  const successRate = successRates[method as keyof typeof successRates] || 0.9;
  const success = Math.random() < successRate;

  return {
    success,
    paymentId: success ? `${method}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` : null,
    method,
    amount,
    processedAt: new Date().toISOString(),
    message: success
      ? `Payment of $${amount} processed successfully via ${method}`
      : getPaymentFailureMessage(method),
  };
}

function getPaymentFailureMessage(method: string): string {
  const messages: Record<string, string> = {
    credit_card: "Credit card declined. Please check your card details.",
    paypal: "PayPal payment could not be processed. Please try again.",
    bank_transfer: "Bank transfer failed. Please verify your account details.",
  };
  return messages[method] || "Payment processing failed. Please try again.";
}


export async function prepareOrderItems(items: { productId: string; quantity: number }[]) {
  const orderItemsData: any[] = [];
  const validationErrors: string[] = [];

  for (const item of items) {
    const product = await Product.findByPk(item.productId);
    if (!product) {
      validationErrors.push(`Product ${item.productId} not found`);
      continue;
    }

    if (product.stock < item.quantity) {
      validationErrors.push(
        `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`
      );
      continue;
    }

    orderItemsData.push({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: Number(product.price),
      price: Number(product.price),
      productName: product.name,
    });
  }

  return { orderItemsData, validationErrors };
}


export async function decrementProductStock(orderItems: { productId: string; quantity: number }[]) {
  for (const item of orderItems) {
    await Product.decrement('stock', { by: item.quantity, where: { id: item.productId } });
  }
}
