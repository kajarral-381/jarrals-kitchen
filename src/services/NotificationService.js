/**
 * Notification Service
 * 
 * This service handles sending notifications via WhatsApp and email
 * when orders are placed.
 */

// WhatsApp notification function
export const sendWhatsAppNotification = async (orderData) => {
  try {
    // In a production environment, this would use a WhatsApp Business API
    // For now, we'll simulate the API call
    
    // Format the order items for WhatsApp message
    const orderItems = orderData.items.map(item => 
      `${item.quantity}x ${item.name} (${item.price.toFixed(2)} each)`
    ).join('\\n');
    
    // Create the WhatsApp message
    const message = `
🔔 *New Order Received!* 🔔
*Order #:* ${orderData.orderId}
*Customer:* ${orderData.customerName}
*Phone:* ${orderData.phone}
*Address:* ${orderData.address}
*Total:* Rs. ${orderData.total.toFixed(2)}
*Payment:* ${orderData.paymentMethod}${orderData.transactionId ? ` (ID: ${orderData.transactionId})` : ''}

*Items:*
${orderItems}

*Notes:* ${orderData.notes || 'None'}
    `.trim();
    
    // Log the message for development purposes
    console.log('WhatsApp notification would be sent to +923125541410:');
    console.log(message);
    
    // In a real implementation, you would use a WhatsApp Business API
    // Example with a hypothetical API:
    /*
    const response = await fetch('https://api.whatsapp.com/business/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_WHATSAPP_API_KEY'
      },
      body: JSON.stringify({
        phone: '+923125541410',
        message: message,
        type: 'text'
      })
    });
    
    const result = await response.json();
    return result;
    */
    
    // For now, return a simulated successful response
    return {
      success: true,
      message: 'WhatsApp notification sent successfully (simulated)'
    };
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Email notification function
export const sendEmailNotification = async (orderData) => {
  try {
    // In a production environment, this would use an email service like SendGrid, Mailgun, etc.
    // For now, we'll simulate the API call
    
    // Format the order items for email
    const orderItems = orderData.items.map(item => 
      `<tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>Rs. ${item.price.toFixed(2)}</td>
        <td>Rs. ${(item.quantity * item.price).toFixed(2)}</td>
      </tr>`
    ).join('');
    
    // Create the email HTML content
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #8b5e34; color: white; padding: 10px 20px; text-align: center; }
    .content { padding: 20px; border: 1px solid #ddd; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background-color: #f2f2f2; }
    .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #777; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Order Received - #${orderData.orderId}</h2>
    </div>
    <div class="content">
      <h3>Customer Information</h3>
      <p><strong>Name:</strong> ${orderData.customerName}</p>
      <p><strong>Email:</strong> ${orderData.email}</p>
      <p><strong>Phone:</strong> ${orderData.phone}</p>
      <p><strong>Address:</strong> ${orderData.address}</p>
      
      <h3>Order Details</h3>
      <p><strong>Order ID:</strong> ${orderData.orderId}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      <p><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
      ${orderData.transactionId ? `<p><strong>Transaction ID:</strong> ${orderData.transactionId}</p>` : ''}
      <p><strong>Delivery Method:</strong> ${orderData.deliveryMethod}</p>
      
      <h3>Order Items</h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${orderItems}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3"><strong>Subtotal</strong></td>
            <td>Rs. ${orderData.subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="3"><strong>Delivery Fee</strong></td>
            <td>Rs. ${orderData.deliveryFee.toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="3"><strong>Tax</strong></td>
            <td>Rs. ${orderData.tax.toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="3"><strong>Total</strong></td>
            <td><strong>Rs. ${orderData.total.toFixed(2)}</strong></td>
          </tr>
        </tfoot>
      </table>
      
      ${orderData.notes ? `<h3>Customer Notes</h3><p>${orderData.notes}</p>` : ''}
      
      <p>Please process this order as soon as possible.</p>
    </div>
    <div class="footer">
      <p>This is an automated notification from Jarral's Kitchen.</p>
    </div>
  </div>
</body>
</html>
    `.trim();
    
    // Log the email content for development purposes
    console.log('Email notification would be sent to info@jarralskitchen.com:');
    console.log('Subject: New Order #' + orderData.orderId);
    console.log('HTML content length:', emailHtml.length);
    
    // In a real implementation, you would use an email service API
    // Example with a hypothetical API:
    /*
    const response = await fetch('https://api.emailservice.com/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_EMAIL_API_KEY'
      },
      body: JSON.stringify({
        from: 'orders@jarralskitchen.com',
        to: 'info@jarralskitchen.com',
        subject: 'New Order #' + orderData.orderId,
        html: emailHtml
      })
    });
    
    const result = await response.json();
    return result;
    */
    
    // For now, return a simulated successful response
    return {
      success: true,
      message: 'Email notification sent successfully (simulated)'
    };
  } catch (error) {
    console.error('Error sending email notification:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Combined function to send both notifications
export const sendOrderNotifications = async (orderData) => {
  const whatsappResult = await sendWhatsAppNotification(orderData);
  const emailResult = await sendEmailNotification(orderData);
  
  return {
    whatsapp: whatsappResult,
    email: emailResult,
    success: whatsappResult.success && emailResult.success
  };
};
