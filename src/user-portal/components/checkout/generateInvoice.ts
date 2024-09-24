import jsPDF from "jspdf";
import { OrderData } from "./Checkout";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";

export const generateInvoice = (orderData: OrderData): void => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.setTextColor(44, 62, 80);
      doc.text('Invoice', 105, 15, { align: 'center' });
  
      doc.setFontSize(12);
      doc.setTextColor(52, 73, 94);
      doc.text(`Order ID: ${orderData.id}`, 20, 30);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 37);
  
      doc.setFontSize(14);
      doc.text('Bill To:', 20, 50);
      doc.setFontSize(12);
      doc.text(`${orderData.billingInfo.firstname} ${orderData.billingInfo.lastname}`, 20, 57);
      doc.text(orderData.billingInfo.streetaddress, 20, 64);
      doc.text(`${orderData.billingInfo.country}, ${orderData.billingInfo.postalcode}`, 20, 71);
      doc.text(`Phone: ${orderData.billingInfo.phone}`, 20, 78);
      doc.text(`Email: ${orderData.billingInfo.email}`, 20, 85);
  
      const tableData = orderData.itemId.map((item) => [
        item.title,
        item.quantity,
        `$${item.price}`,
        `$${item.quantity * item.price}`,
      ]);
  
      autoTable(doc, {
        startY: 95,
        head: [['Item', 'Quantity', 'Price', 'Total']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        styles: { textColor: 52, fontSize: 10 },
      });
  
      const finalY = (doc as any).lastAutoTable.finalY || 95;
      doc.setFontSize(12);
      doc.text(`Subtotal: $${orderData.totalPrice}`, 140, finalY + 15);
      doc.text(`Shipping: $45.00`, 140, finalY + 22);
      doc.text(`Discount: $${orderData.discount}`, 140, finalY + 29);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`Total: $${orderData.totalPrice + 45 - orderData.discount}`, 140, finalY + 38);
  
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Thank you for your business!', 105, 280, { align: 'center' });
  
      doc.save(`invoice_${orderData.id}.pdf`);
      console.log('Invoice generated successfully');
    } catch (error) {
      console.error('Error generating invoice:', error);
      toast.error('Failed to generate invoice. Please contact support.');
    }
  };