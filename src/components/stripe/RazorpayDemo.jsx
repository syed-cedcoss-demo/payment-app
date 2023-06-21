import { useEffect, useState } from "react";
import data from "../utils/cartData.json";
const RazorpayDemo = () => {
  const [total, setTotal] = useState(85);
  const [subTotal, setSubtotal] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    data?.forEach((item) => {
      const price = item.price;
      setTotal((pre) => pre + price);
      setSubtotal((pre) => pre + price);
    });
  }, []);

  const handleSubmit = async () => {
    setLoader(true);
    const payload = [];
    data?.forEach((item) => {
      payload.push({ id: item?.source_product_id, quantity: 1 });
    });
    try {
      const res = await fetch("http://localhost:3002/razorpay/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGMyODAyNjgwM2ViMDBmOWYwNTdiMSIsImlhdCI6MTY4NzMyNjQ5NSwiZXhwIjoxNjg3NDEyODk1fQ.nhtyZTbvX67ZEhcTdnWMa8T3keWnK6hyY3BwnMuelRc",
        },
        body: JSON.stringify(payload),
      });
      setLoader(false);
      const data = await res.json();
      if (data?.success) {
        console.log("data", data?.data?.id);
        handlePayment(data?.data?.id);
        //   window.location.href = data?.url;
      }
    } catch (error) {
      setLoader(false);
      console.log("error", error);
    }
  };

  const handlePayment = (orderId) => {
    const options = {
      key: "rzp_test_7Cd7IPacdM6gN1",
      amount: "50000", // amount in paisa
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        console.log("response", response);
        //   alert(response.razorpay_payment_id);
        //   alert(response.razorpay_order_id);
        //   alert(response.razorpay_signature);
        const res = await fetch("http://localhost:3002/razorpay/validate-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGMyODAyNjgwM2ViMDBmOWYwNTdiMSIsImlhdCI6MTY4NzMyNjQ5NSwiZXhwIjoxNjg3NDEyODk1fQ.nhtyZTbvX67ZEhcTdnWMa8T3keWnK6hyY3BwnMuelRc",
          },
          body: JSON.stringify(response),
        });
        console.log("res", res);
      },
      prefill: {
        name: "Syed Hasnain",
        email: "syed-hasnain@yopmail.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    // eslint-disable-next-line no-undef
    const rzp1 = new Razorpay(options);
    console.log("rzp1", rzp1);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };

  return (
    <div
      className="w-screen h-full m-5 bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0"
      id="chec-div"
    >
      <div className="flex md:flex-row flex-col justify-end" id="cart">
        <div
          className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
          id="scroll"
        >
          <div className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-left"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="15 6 9 12 15 18" />
            </svg>
            <p className="text-sm pl-2 leading-none">Back</p>
          </div>
          <p className="text-5xl font-black leading-10 text-gray-800 pt-3">Bag</p>
          {data?.length &&
            data?.map((item) => (
              <div
                className="md:flex items-center mt-14 py-8 border-t border-gray-200"
                key={item.sku}
              >
                <div className="w-1/4">
                  <img
                    src={item?.imgUrl}
                    alt
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="md:pl-3 md:w-3/4">
                  <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">RF293</p>
                  <div className="flex items-center justify-between w-full pt-1">
                    <p className="text-base font-black leading-none text-gray-800">
                      {item?.name}
                    </p>
                    <p className="border  border-gray-200 mr-6 focus:outline-none">
                      <span className="text-3xl text-gray-800 cursor-pointer p-2">-</span>
                      <span className="text-3xl text-gray-800 cursor-pointer p-2">+</span>
                    </p>
                  </div>
                  <p className="text-xs leading-3 text-gray-600 pt-2">Height: 10 inches</p>
                  <p className="text-xs leading-3 text-gray-600 py-4">Color: Black</p>
                  <p className="w-96 text-xs leading-3 text-gray-600">
                    Composition: 100% calf leather
                  </p>
                  <div className="flex items-center justify-between pt-5 pr-6">
                    <div className="flex itemms-center">
                      <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                        Add to favorites
                      </p>
                      <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">
                        Remove
                      </p>
                    </div>
                    <p className="text-base font-black leading-none text-gray-800">
                      ${item?.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="xl:w-1/2 md:w-1/3 w-full bg-gray-100 h-full">
          <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
            <div>
              <p className="text-4xl font-black leading-9 text-gray-800">Summary</p>
              <div className="flex items-center justify-between pt-16">
                <p className="text-base leading-none text-gray-800">Subtotal</p>
                <p className="text-base leading-none text-gray-800">${subTotal}</p>
              </div>
              <div className="flex items-center justify-between pt-5">
                <p className="text-base leading-none text-gray-800">Shipping</p>
                <p className="text-base leading-none text-gray-800">$50</p>
              </div>
              <div className="flex items-center justify-between pt-5">
                <p className="text-base leading-none text-gray-800">Tax</p>
                <p className="text-base leading-none text-gray-800">$35</p>
              </div>
            </div>
            <div>
              <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                <p className="text-2xl leading-normal text-gray-800">Total</p>
                <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                  ${total}
                </p>
              </div>
              <button
                className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
                onClick={handleSubmit}
              >
                {loader ? "Processing..." : "Checkout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RazorpayDemo;
