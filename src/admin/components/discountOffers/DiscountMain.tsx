import React, { useState } from "react";
import {
  PlusCircle,
  Pencil,
  Trash2,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import { Button } from "../../../common/ui/button";
import { Input } from "../../../common/ui/input";

const AdminDiscount = () => {
  const [discounts, setDiscounts] = useState([
    {
      id: 1,
      name: "Summer Sale",
      type: "Percentage",
      value: 20,
      code: "SUMMER20",
      status: "Active",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      minimumPurchase: 50,
      usageLimit: 1000,
    },
    {
      id: 2,
      name: "New User",
      type: "Fixed Amount",
      value: 10,
      code: "NEWUSER10",
      status: "Inactive",
      startDate: "2023-05-01",
      endDate: "2023-12-31",
      minimumPurchase: 0,
      usageLimit: 500,
    },
  ]);

  const [editingDiscount, setEditingDiscount] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const initialDiscountState = {
    name: "",
    type: "Percentage",
    value: "",
    code: "",
    status: "Active",
    startDate: "",
    endDate: "",
    minimumPurchase: 0,
    usageLimit: "",
  };

  const [newDiscount, setNewDiscount] = useState(initialDiscountState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingDiscount) {
      setEditingDiscount({ ...editingDiscount, [name]: value });
    } else {
      setNewDiscount({ ...newDiscount, [name]: value });
    }
  };

  const handleAddDiscount = () => {
    setDiscounts([...discounts, { ...newDiscount, id: discounts.length + 1 }]);
    setNewDiscount(initialDiscountState);
    setShowForm(false);
  };

  const handleUpdateDiscount = () => {
    setDiscounts(
      discounts.map((d) => (d.id === editingDiscount.id ? editingDiscount : d)),
    );
    setEditingDiscount(null);
  };

  const handleDeleteDiscount = (id) => {
    setDiscounts(discounts.filter((d) => d.id !== id));
  };

  const handleEditClick = (discount) => {
    setEditingDiscount(discount);
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Discount Management</h1>

      <Button onClick={() => setShowForm(!showForm)} className="mb-4">
        <PlusCircle className="mr-2 h-4 w-4" />{" "}
        {showForm ? "Cancel" : "Add New Discount"}
      </Button>

      {showForm && (
        <div className="mb-6 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">Create New Discount</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="name"
              placeholder="Discount Name"
              value={newDiscount.name}
              onChange={handleInputChange}
            />
            <select
              name="type"
              value={newDiscount.type}
              onChange={handleInputChange}
            >
              <option value="Percentage">Percentage</option>
              <option value="Fixed Amount">Fixed Amount</option>
            </select>
            <Input
              name="value"
              type="number"
              placeholder="Value"
              value={newDiscount.value}
              onChange={handleInputChange}
            />
            <Input
              name="code"
              placeholder="Coupon Code"
              value={newDiscount.code}
              onChange={handleInputChange}
            />
            {/* <DatePicker
              name="startDate"
              placeholder="Start Date"
              value={newDiscount.startDate}
              onChange={(date) =>
                handleInputChange({
                  target: { name: "startDate", value: date },
                })
              }
            />
            <DatePicker
              name="endDate"
              placeholder="End Date"
              value={newDiscount.endDate}
              onChange={(date) =>
                handleInputChange({ target: { name: "endDate", value: date } })
              }
            /> */}
            <Input
              name="minimumPurchase"
              type="number"
              placeholder="Minimum Purchase Amount"
              value={newDiscount.minimumPurchase}
              onChange={handleInputChange}
            />
            <Input
              name="usageLimit"
              type="number"
              placeholder="Usage Limit"
              value={newDiscount.usageLimit}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-4 flex items-center">
            <span className="mr-2">Status:</span>
            {/* <Switch
              name="status"
              checked={newDiscount.status === "Active"}
              onChange={(checked) =>
                handleInputChange({
                  target: {
                    name: "status",
                    value: checked ? "Active" : "Inactive",
                  },
                })
              }
            /> */}
            <span className="ml-2">{newDiscount.status}</span>
          </div>
          <Button onClick={handleAddDiscount} className="mt-4">
            <Check className="mr-2 h-4 w-4" /> Add Discount
          </Button>
        </div>
      )}

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">Existing Discounts</h2>
        {/* <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Name</Table.Head>
              <Table.Head>Type</Table.Head>
              <Table.Head>Value</Table.Head>
              <Table.Head>Code</Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head>Actions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {discounts.map((discount) => (
              <Table.Row key={discount.id}>
                <Table.Cell>
                  {editingDiscount?.id === discount.id ? (
                    <Input
                      name="name"
                      value={editingDiscount.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    discount.name
                  )}
                </Table.Cell>
                <Table.Cell>
                  {editingDiscount?.id === discount.id ? (
                    <Select
                      name="type"
                      value={editingDiscount.type}
                      onChange={handleInputChange}
                    >
                      <option value="Percentage">Percentage</option>
                      <option value="Fixed Amount">Fixed Amount</option>
                    </Select>
                  ) : (
                    discount.type
                  )}
                </Table.Cell>
                <Table.Cell>
                  {editingDiscount?.id === discount.id ? (
                    <Input
                      name="value"
                      type="number"
                      value={editingDiscount.value}
                      onChange={handleInputChange}
                    />
                  ) : (
                    discount.value
                  )}
                </Table.Cell>
                <Table.Cell>
                  {editingDiscount?.id === discount.id ? (
                    <Input
                      name="code"
                      value={editingDiscount.code}
                      onChange={handleInputChange}
                    />
                  ) : (
                    discount.code
                  )}
                </Table.Cell>
                <Table.Cell>
                  {editingDiscount?.id === discount.id ? (
                    <Switch
                      name="status"
                      checked={editingDiscount.status === "Active"}
                      onChange={(checked) =>
                        handleInputChange({
                          target: {
                            name: "status",
                            value: checked ? "Active" : "Inactive",
                          },
                        })
                      }
                    />
                  ) : (
                    <span
                      className={
                        discount.status === "Active"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {discount.status}
                    </span>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {editingDiscount?.id === discount.id ? (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleUpdateDiscount}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingDiscount(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClick(discount)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteDiscount(discount.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table> */}
      </div>

      {/* <Alert className="mt-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Changes to discounts may take up to 5 minutes to reflect in the
          customer-facing site.
        </AlertDescription>
      </Alert> */}
    </div>
  );
};

export default AdminDiscount;
