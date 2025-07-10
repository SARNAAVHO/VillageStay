import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import {
  createListing,
  uploadImageForListing,
  getUserByClerkId,
  fetchAllLocations,
} from "@/services/api";
import { Button } from "@/components/ui/button";

const CreateListing = () => {
  const { user } = useUser();
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be signed in to submit.");

    try {
      // Step 1: Get backend user ID (numeric)
      const backendUser = await getUserByClerkId(user.id);
      const backendUserId = backendUser.id;

      // Step 2: Fetch location_id from village/state/district
      const allLocations = await fetchAllLocations();
      const matchedLocation = allLocations.find(
        (loc) =>
          loc.village.toLowerCase() === form.village.toLowerCase() &&
          loc.state.toLowerCase() === form.state.toLowerCase() &&
          loc.district.toLowerCase() === form.district.toLowerCase()
      );

      if (!matchedLocation) {
        alert("Location not found in database. Please add it first.");
        return;
      }

      const locationId = matchedLocation.id;

      // Step 3: Create listing
      const listingData = {
        title: form.title,
        description: form.description,
        max_guests: form.max_guests,
        base_price: form.base_price,
        host_id: backendUserId,
        location_id: locationId,
      };

      const listingRes = await createListing(listingData);
      const listingId = listingRes.listing_id;

      // Step 4: Upload image
      if (form.image) {
        const imageFormData = new FormData();
        imageFormData.append("listing_id", listingId);
        imageFormData.append("user_id", backendUserId);
        imageFormData.append("image", form.image);
        imageFormData.append("alt_text", form.title);
        await uploadImageForListing(imageFormData);
      }

      alert("Listing submitted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error creating listing:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <section className="min-h-screen px-6 py-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex flex-col md:pt-20">
          <h1 className="text-4xl font-extrabold text-green-600 mb-4 leading-tight">
            List Your Stay
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-3 max-w-md">
            Share your space with guests looking for peaceful village experiences.
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-md mb-2">
            Empower rural communities by opening up your home to responsible travelers.
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-md">
            Earn income while preserving tradition and promoting sustainable tourism.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 space-y-6 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800"
        >
          <div className="space-y-2">
            <label className="font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Cozy Mud House in Himachal"
              className="w-full border px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 ring-green-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Tell us about the stay, amenities, nearby attractions, etc."
              rows={4}
              className="w-full border px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 ring-green-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              className="border px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
            <input
              name="district"
              value={form.district}
              onChange={handleChange}
              placeholder="District"
              className="border px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
            <input
              name="village"
              value={form.village}
              onChange={handleChange}
              placeholder="Village"
              className="border px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="max_guests"
              value={form.max_guests}
              onChange={handleChange}
              placeholder="Max Guests"
              className="border px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
            <input
              type="number"
              name="base_price"
              value={form.base_price}
              onChange={handleChange}
              placeholder="Price per night (₹)"
              className="border px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium block">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-white file:bg-green-600 hover:file:bg-green-700"
            />
            {form.image && (
              <div className="mt-3">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Preview:</p>
                <img
                  src={URL.createObjectURL(form.image)}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-md border"
                />
              </div>
            )}
          </div>

          <Button
            type="submit"
            size="custom"
            className="w-full text-lg bg-green-600 hover:bg-green-700 text-white rounded-full py-2"
          >
            Add Listing
          </Button>
        </form>
      </div>
    </section>
  );
};

export default CreateListing;