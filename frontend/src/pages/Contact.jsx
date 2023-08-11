import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add_msg, get_msg, messageClear } from "../store/reducers/messageReducer";
import { toast } from "react-toastify";

const ContactPage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { msgs, successMessage, errorMessage } = useSelector((state) => state.msg);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(add_msg({ name, email, message, userId: userInfo.id }));

    setName("");
    setEmail("");
    setMessage("");
  };

  useEffect(() => {
    dispatch(get_msg());
  }, [successMessage, dispatch, errorMessage]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="container mx-auto mt-10 p-5">
      <h1 className="text-3xl font-semibold mb-4 text-slate-600">Contact Us</h1>
      <p className="text-gray-600 mb-6">
        Have a question or need assistance? Reach out to us using the contact information below.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-medium mb-2 text-slate-600">Contact Information</h2>
          <p>Email: info@jobportal.com</p>
          <p>Phone: +123-456-7890</p>
          <p>Address: 123 Job Street, City, Country</p>
        </div>
        <div>
          <h2 className="text-xl font-medium mb-2 text-slate-600">Office Hours</h2>
          <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
          <p>Saturday: 10:00 AM - 2:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-medium mb-2 text-slate-600">Visit Us</h2>
        <div className="embed-responsive aspect-w-24 aspect-h-9">
          <iframe
            className="w-1/2 h-52"
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.67890123456!2d-123.45678901234567!3d12.345678901234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDI4JzA4LjciTiAxMjPCsDAwJzExLjMiVw!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <div className="mt-10">
        {userInfo ? (
          <>
            {msgs[0]?.user?._id === userInfo?.id ? (
              <>
                <div className="min-h-[20vh] flex justify-center items-center ">
                  <h3 className="text-2xl font-medium text-slate-500 text-center">
                    You Already Send Message
                  </h3>
                </div>
              </>
            ) : (
              <div>
                <h2 className="text-xl font-medium mb-2 text-slate-600">Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-orange-500"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block font-medium">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-orange-500"
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="block font-medium">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-orange-500"
                      rows="4"
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={userInfo?.id ? false : true}
                    className="bg-orange-500 text-white py-2 px-6 rounded font-medium text-lg hover:bg-orange-600 transition duration-300"
                  >
                    {userInfo?.id ? "Send" : "Login First"}
                  </button>
                </form>
              </div>
            )}
          </>
        ) : (
          <div>Please Login first</div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
