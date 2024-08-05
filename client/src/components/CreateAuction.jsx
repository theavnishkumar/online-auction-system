import { useState } from "react";
// import axios from "axios";
// const VITE_API = `${import.meta.env.VITE_API}`;

const CreateAuction = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    itemPrice: "",
    itemDescription: "",
    itemPhoto: null,
    itemStartDate: "",
    itemEndDate: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    // try {
    //   const response = await axios.post(`${VITE_API}/api/createauction`, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   console.log(response.data);
    // } catch (error) {
    //   console.error("Error creating auction", error);
    // }
  };

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
                onChange={(e) =>
                  setFormData({ ...formData, itemPhoto: e.target.value })
                }
              />
              <label
                htmlFor="itemPhoto"
                className="relative flex min-h-[150px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] text-center"
              >
                <div>
                  <span className="mb-2 block text-lg font-medium text-[#07074D]">
                    Drop image here
                  </span>
                  <span className="mb-2 block text-base font-medium text-[#6B7280]">
                    Or
                  </span>
                  <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                    Browse
                  </span>
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
