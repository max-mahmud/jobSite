import React from "react";

const ContactPage = () => {
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
        <h2 className="text-xl font-medium mb-2 text-slate-600">Send Us a Message</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
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
              className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block font-medium">
              Your Message
            </label>
            <textarea
              id="message"
              className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
              rows="4"
              placeholder="Your Message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-6 rounded font-medium text-lg hover:bg-orange-600 transition duration-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
