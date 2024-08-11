import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const VITE_API = `${import.meta.env.VITE_API}`;

const CreateAuction = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    itemPrice: "",
    itemDescription: "",
    itemCategory: "",
    itemPhoto: null,
    itemStartDate: "",
    itemEndDate: "",
  });

  const [isValid, setIsValid] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const isValid =
      formData.itemName &&
      formData.itemPrice &&
      formData.itemDescription &&
      formData.itemCategory &&
      formData.itemPhoto &&
      formData.itemStartDate &&
      formData.itemEndDate;
    setIsValid(isValid);
  }, [formData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataForUpload = new FormData();
      formDataForUpload.append("itemName", formData.itemName);
      formDataForUpload.append("itemPrice", formData.itemPrice);
      formDataForUpload.append("itemDescription", formData.itemDescription);
      formDataForUpload.append("itemCategory", formData.itemCategory);
      formDataForUpload.append("itemPhoto", formData.itemPhoto);
      formDataForUpload.append("itemStartDate", formData.itemStartDate);
      formDataForUpload.append("itemEndDate", formData.itemEndDate);
      formDataForUpload.append("seller", user.userId);

      await axios.post(`${VITE_API}/api/auction/create`, formDataForUpload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFormData({
        itemName: "",
        itemPrice: "",
        itemDescription: "",
        itemCategory: "",
        itemPhoto: null,
        itemStartDate: "",
        itemEndDate: "",
      });
    } catch (error) {
      console.error("Error creating auction:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, itemPhoto: file });
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const minEndDate = formData.itemStartDate || today;

  return (
    <div className="min-h-[calc(100svh-9rem)] px-4 py-4">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <form onSubmit={handleSubmit}>
          <div className="-mx-3 flex flex-wrap">
            {/* Item Name */}
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="itemName"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Item Name
                </label>
                <input
                  value={formData.itemName}
                  onChange={(e) =>
                    setFormData({ ...formData, itemName: e.target.value })
                  }
                  type="text"
                  name="itemName"
                  id="itemName"
                  placeholder="Item Name"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            {/* Item Price */}
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="price"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Item Starting Price
                </label>
                <input
                  value={formData.itemPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, itemPrice: e.target.value })
                  }
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Enter the starting price"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          {/* Item Description */}
          <div className="mb-5">
            <label
              htmlFor="desctiption"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Item Description
            </label>
            <textarea
              value={formData.itemDescription}
              onChange={(e) =>
                setFormData({ ...formData, itemDescription: e.target.value })
              }
              rows="4"
              type="text"
              name="desctiption"
              id="desctiption"
              placeholder="Enter your description here"
              min="0"
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          {/* Item Category */}
          <div className="mb-5">
            <label
              className="mb-3 block text-base font-medium text-[#07074D]"
              htmlFor="category"
            >
              Item Category
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              name="category"
              value={formData.itemCategory}
              onChange={(e) =>
                setFormData({ ...formData, itemCategory: e.target.value })
              }
            >
              <option value="">Select a category</option>
              <option value="realestate">Real Estate</option>
              <option value="electronics">Electronic</option>
              <option value="education">Education</option>
              <option value="food">Food</option>
            </select>
          </div>
          {/* Item Image */}
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Upload item image
            </label>

            <div className="mb-5">
              <input
                type="file"
                name="itemPhoto"
                id="itemPhoto"
                className="sr-only"
                onChange={handleFileChange}
              />
              {formData.itemPhoto && (
                <div className="mb-4">
                  <span className="font-medium text-[#07074D]">
                    Selected file: {formData.itemPhoto.name}
                  </span>
                </div>
              )}
              <label
                htmlFor="itemPhoto"
                className="relative flex min-h-[100px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] text-center"
              >
                <div>
                  <span className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <span className="font-medium text-gray-600">
                      Drop image to Attach, or
                      <span className="text-blue-600 underline ml-[4px]">
                        browse
                      </span>
                    </span>
                  </span>
                  <input
                    type="file"
                    name="fitemPhoto"
                    className="hidden"
                    accept="image/png,image/jpeg"
                    id="itemPhoto"
                  />
                </div>
              </label>
            </div>
          </div>
          {/* Item start & end date */}
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="date"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Starting Date
                </label>
                <input
                  value={formData.itemStartDate}
                  onChange={(e) =>
                    setFormData({ ...formData, itemStartDate: e.target.value })
                  }
                  type="date"
                  name="date"
                  id="date"
                  min={today}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="date"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Ending Date
                </label>
                <input
                  value={formData.itemEndDate}
                  onChange={(e) =>
                    setFormData({ ...formData, itemEndDate: e.target.value })
                  }
                  type="date"
                  name="date"
                  id="date"
                  disabled={!formData.itemStartDate}
                  min={minEndDate}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          {/* Submit button */}
          <div className="flex justify-end">
            <button
              className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              type="submit"
              disabled={!isValid}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAuction;
