import React, { useState } from "react";
import { promoteUserToHost, createListing } from "@/services/api";
import { Button } from "@/components/ui/button";

function BecomeHost() {
  const [step, setStep] = useState("email"); // email → form
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(""); // store returned ID if needed
  const [form, setForm] = useState({
    title: "",
    description: "",
    state: "",
    district: "",
    village: "",
    max_guests: "",
    base_price: "",
    image: null,
  });

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      // Generate a fake ID if you aren't using Clerk/Auth provider
      const id = email.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      setUserId(id);

      await promoteUserToHost(id, "Host User", email);
      setStep("form");
    } catch (err) {
      alert("Error promoting user: " + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) formData.append(key, form[key]);
    formData.append("host_id", userId);

    try {
      await createListing(formData);
      alert("Listing created!");
    } catch (err) {
      alert("Error creating listing");
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 max-w-xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4">Become a Host</h1>
      <p className="text-center text-gray-600 mb-8">
        Share your home with travelers. Your peaceful stay can be someone’s next story!
      </p>

      {step === "email" && (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <label className="block text-lg font-medium">Enter your email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border px-4 py-2 rounded"
          />
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
            Continue
          </Button>
        </form>
      )}

      {step === "form" && (
        <form onSubmit={handleFormSubmit} className="space-y-4 text-left mt-6">
          <div>
            <label className="block font-medium mb-1">Title of Stay</label>
            <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full border rounded px-3 py-2" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input name="state" placeholder="State" value={form.state} onChange={handleChange} className="border rounded px-3 py-2" required />
            <input name="district" placeholder="District" value={form.district} onChange={handleChange} className="border rounded px-3 py-2" required />
            <input name="village" placeholder="Village" value={form.village} onChange={handleChange} className="border rounded px-3 py-2" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="number" name="max_guests" placeholder="Max Guests" value={form.max_guests} onChange={handleChange} className="border rounded px-3 py-2" required />
            <input type="number" name="base_price" placeholder="Price (₹ per night)" value={form.base_price} onChange={handleChange} className="border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block font-medium mb-1">Upload Image</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
          </div>
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2">
            Submit Listing
          </Button>
        </form>
      )}
    </div>
  );
}

export default BecomeHost;
